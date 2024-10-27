import { cloneDeep } from "lodash";
import { NUI } from "client/modules/nui";
import { Events } from "client/modules/events";
import { RPCNew } from "client/modules/rpc";
import { Logger } from "@shared/logger";
import { defaultPlayerState } from "client/constants/defaultPlayerState";
import { injuryList } from "client/constants/injuryList";
import { PlayerArmor } from "./PlayerArmor";
import { PlayerHealth } from "./PlayerHealth";
import { Utils } from "@shared/utils";
import { PlayerDamage } from "./PlayerDamage";
import { PlayerDeath } from "./PlayerDeath";
import { severityLevels } from "client/constants/severityLevels";
import { getQualityValueByString } from "client/constants/qualities";

export abstract class PlayerState {
    public static loaded: boolean = false;
    public static currentState: IPlayerState = cloneDeep(defaultPlayerState);
    public static savedHealth: number | undefined = undefined;
    public static defaultMaxHealth: number = 200;

    public static async Init() {
        const thisKeyWord = this;

        global.exports("damageBone", this.damageBone.bind(this));
        global.exports("addCustomIssue", this.addCustomIssue.bind(this));
        global.exports("isLimping", this.isLimping.bind(this));
        global.exports("isDead", this.isDead.bind(this));
        global.exports("setState", this.setState.bind(this));
        global.exports("resetState", this.resetState.bind(this));
        global.exports("getArmsDamage", this.getArmsDamage.bind(this));
        global.exports("overrideMaxHealth", this.overrideMaxHealth.bind(this));
        global.exports("setEntityHealth", this.setEntityHealth.bind(this));
        global.exports("getState", () => {
            return thisKeyWord.currentState;
        });
        global.exports("reSync", this.reSync.bind(this));
    }

    public static async load() {
        const playerState = await RPCNew.execute<IPlayerState>("cool-wounds:playerState:get");
        this.currentState = playerState;

        await Utils.wait(1000);

        const playerPed = PlayerPedId();

        SetPedMaxHealth(playerPed, this.defaultMaxHealth);

        this.sync();

        Logger.debug("[cool-wounds]", "Loaded player state");

        PlayerDamage.load();
        PlayerHealth.load();

        this.loaded = true;

        const armorStack = await PlayerArmor.getArmorStack();

        if (armorStack) {
            PlayerArmor.setArmor(armorStack.quality, true);
        }

        if (playerState.isDead) {
            this.currentState.isDead = false;

            this.resetState();
            this.setEntityHealth(playerPed, 130);
            this.setState(this.currentState);
        }
    }

    public static async reSync() {
        if (!this.loaded) return;

        const playerPed = PlayerPedId();

        SetPedMaxHealth(playerPed, this.defaultMaxHealth);

        await Utils.wait(1000);

        this.sync();

        Logger.debug("[cool-wounds]", "Loaded player state");

        PlayerDamage.load();
        PlayerHealth.load();

        this.loaded = true;

        const armorStack = await PlayerArmor.getArmorStack();

        if (armorStack) {
            PlayerArmor.setArmor(armorStack.quality, true);
        }

        if (this.currentState.isDead) {
            this.currentState.isDead = false;

            this.setEntityHealth(playerPed, 130);
            this.setState(this.currentState);
        }
    }

    public static setEntityHealth(entity: number, health: number) {
        if (!this.loaded) return;

        if (!entity) {
            entity = PlayerPedId();
        }

        const currentHealth = GetEntityHealth(entity);
        const currentHealthLeft = currentHealth - health;

        const maxHealth = GetEntityMaxHealth(entity);

        if (maxHealth !== PlayerState.defaultMaxHealth) {
            SetEntityHealth(entity, health);
            return;
        }

        if (currentHealthLeft > 0) {
            PlayerDamage.action(currentHealthLeft);
        } else {
            PlayerState.heal(Math.abs(currentHealthLeft), false);
        }
    }

    public static setState(state: IPlayerState) {
        this.currentState = state;

        NUI.execute("cool-wounds:setPlayerState", this.currentState);

        Events.emitNet("cool-wounds:playerState:update", global.exports.isPed.isPed("cid"), this.currentState);
        PlayerHealth.check();
    }

    public static resetState() {
        const defaultState = cloneDeep(defaultPlayerState);

        this.setState(defaultState);
        this.sync();
    }

    public static damageBone(bone: string, damage: number, attacker?: any, weaponHashKey?: number, bone2?: any) {
        const playerPed = PlayerPedId();
        const weaponInfo = this.getWeaponInfo(weaponHashKey);

        if (GlobalState.weapons && weaponInfo && attacker && IsPedAPlayer(attacker) && !bone2) {
            const attackerPlayer = NetworkGetPlayerIndexFromPed(attacker);
            const attackerServerId = GetPlayerServerId(attackerPlayer);

            const quality = GlobalState.weapons[attackerServerId]?.quality;
            const itemId = GlobalState.weapons[attackerServerId]?.itemId;

            if (quality) {
                const qualityValue = getQualityValueByString(quality);
                const modifiedValue = Math.round(damage * qualityValue);

                Logger.debug(`^7Hit by ^4${itemId}^7 quality ^4${quality}^7`);
                Logger.debug(`^7Switch from ^1${damage} ^7to ^2${modifiedValue}^7`);

                damage = modifiedValue;
            }
        }

        ClearEntityLastDamageEntity(playerPed);
        ClearPedLastDamageBone(playerPed);

        let copiedDamage = damage;

        SetEntityHealth(playerPed, this?.savedHealth! + copiedDamage);

        PlayerArmor.setArmor(PlayerArmor.savedArmor);

        if (weaponInfo?.breakBone) {
            const randomValue = Math.random() * 100;

            if (randomValue <= weaponInfo.breakBone) {
                this.currentState.wounds[bone].broken = true;
                Logger.debug("[cool-wounds]", `Set ${bone} bone to BROKEN`);
            }
        }

        if (weaponInfo?.bleedChance) {
            const randomValue = Math.random() * 100;

            if (randomValue <= weaponInfo.bleedChance) {
                this.currentState.wounds[bone].bleeding = true;
                Logger.debug("[cool-wounds]", `Set ${bone} bone to BLEEDING`);
            }
        }

        if (weaponInfo?.severity) {
            this.currentState.wounds[bone2 || bone].severity.level += weaponInfo.severity;
            this.calculateSeverity(bone2 || bone);
        }

        if (weaponInfo?.issue && !bone2) {
            this.currentState.wounds[bone].injuryList.push(weaponInfo.issue);
        }

        const shouldDamageArmor = this.shouldDamageArmor(bone, weaponInfo);

        if (shouldDamageArmor) {
            const newArmor = PlayerArmor.savedArmor - copiedDamage;

            PlayerArmor.setArmor(newArmor);

            if (newArmor <= 0) {
                this.damageBone("body", copiedDamage, attacker, weaponHashKey, bone);
            }
        } else {
            this.currentState.wounds[bone].damage += copiedDamage;

            Logger.debug("[cool-wounds]", `Set ${bone} damage to ${this.currentState.wounds[bone].damage}`);

            if (weaponInfo?.addBullet && !bone2) {
                this.currentState.wounds[bone].bullets += 1;
            }

            if (this.currentState.wounds[bone].damage > this.currentState.wounds[bone].maxDamage) {
                copiedDamage = this.currentState.wounds[bone].damage - this.currentState.wounds[bone].maxDamage;

                this.currentState.wounds[bone].damage = this.currentState.wounds[bone].maxDamage;

                const boneToDamage = this.getBoneToDamage();

                if (boneToDamage) {
                    this.damageBone(boneToDamage, copiedDamage, attacker, weaponHashKey, bone);
                }
            }
        }

        this.sync();

        if (IsPedDeadOrDying(playerPed, true)) {
            Logger.debug("[cool-wounds]", "Player died");
            PlayerDeath.onDeath();
        }
    }

    public static calculateSeverity(bone: string) {
        for (const [key, value] of Object.entries(severityLevels)) {
            if (this.currentState.wounds[bone].severity.level >= value) {
                this.currentState.wounds[bone].severity.name = key;
            }
        }

        Logger.debug("[cool-wounds]", `Set ${bone} severity to ${this.currentState.wounds[bone].severity.name}`);
    }

    public static addCustomIssue(bone: string, injury: string) {
        this.currentState.wounds[bone].injuryList.push(injury);
    }

    public static sync() {
        const playerPed = PlayerPedId();

        const newHealth = Math.round(GetEntityMaxHealth(playerPed) - this.getTotalDamage());
        const newArmor = GetPedArmour(playerPed);

        this.savedHealth = newHealth;
        PlayerArmor.savedArmor = newArmor;

        SetEntityHealth(playerPed, this.savedHealth);
        SetPedArmour(playerPed, PlayerArmor.savedArmor);

        if (IsPedDeadOrDying(playerPed, true) || this.savedHealth <= 100) {
            Logger.debug("[cool-wounds]", "Player died");
            PlayerDeath.onDeath();
        }

        this.setState(this.currentState);
    }

    public static heal(healValue: number, isArmor: boolean, item?: string, bone?: string) {

    }

    public static fixBleeding(bone: string) {
        const foundBone = this.getBoneWithParam("bleeding", bone);

        if (!foundBone) {
            return emit("DoLongHudText", "You do not have any bleeding wounds", 2);
        }

        this.currentState.wounds[foundBone].bleeding = false;
        this.sync();
    }

    public static fixBroken(bone: string) {
        const foundBone = this.getBoneWithParam("broken", bone);

        if (!foundBone) {
            return emit("DoLongHudText", "You do not have any broken bones", 2);
        }

        this.currentState.wounds[foundBone].broken = false;
        this.sync();
    }

    public static removeBullets(bone: string) {
        const foundBone = this.getBoneWithParam("bullets", bone);

        if (!foundBone) {
            return emit("DoLongHudText", "You do not have any bullets in your body", 2);
        }

        this.currentState.wounds[foundBone].bullets = 0;
        this.sync();
    }

    public static overrideMaxHealth(newMaxHealth: number | boolean) {
        const playerPed = PlayerPedId();

        if (typeof newMaxHealth === "number") {
            SetEntityMaxHealth(playerPed, newMaxHealth);
        } else {
            SetEntityMaxHealth(playerPed, this.defaultMaxHealth);
        }
    }

    public static getArmsDamage() {
        return this.currentState.wounds.leftArm.damage + this.currentState.wounds.rightArm.damage;
    }

    public static getWeaponInfo(hashKey?: number) {
        if (hashKey) {
            return injuryList[hashKey];
        }

        return undefined;
    }

    public static shouldDamageArmor(bone: string, weaponInfo?: any) {
        let shouldDamageArmor = true;

        if (bone === "body" && PlayerArmor.savedArmor > 0) {
            if (!weaponInfo?.removeArmor) {
                shouldDamageArmor = false;
            }
        } else {
            shouldDamageArmor = false;
        }

        return shouldDamageArmor;
    }

    public static getBoneToDamage() {
        const thisKeyWord = this;

        const wounds = Object.keys(this.currentState.wounds).filter((bone) => {
            return thisKeyWord.currentState.wounds[bone].damage < thisKeyWord.currentState.wounds[bone].maxDamage;
        });

        if (wounds.length > 0) {
            const boneToDamage = wounds.reduce((bone1, bone2) => {
                if (thisKeyWord.currentState.wounds[bone1].damage < thisKeyWord.currentState.wounds[bone2].damage) {
                    return bone1;
                } else {
                    return bone2;
                }
            });

            return boneToDamage;
        }

        return undefined;
    }

    public static getBoneToHeal(bone?: string) {
        const thisKeyWord = this;

        const wounds = Object.keys(this.currentState.wounds).filter(function (b) {
            return thisKeyWord.currentState.wounds[b].damage > 0 && (bone ? b === bone : true);
        });

        if (wounds.length > 0) {
            const boneToHeal = wounds.reduce(function (bone1, bone2) {
                if (thisKeyWord.currentState.wounds[bone1].damage > thisKeyWord.currentState.wounds[bone2].damage) {
                    return bone1;
                } else {
                    return bone2;
                }
            });

            return boneToHeal;
        }

        return undefined;
    }

    public static getBoneWithParam(param: string, bone: string) {
        const thisKeyWord = this;

        const wounds = Object.keys(this.currentState.wounds).filter(function (b) {
            return thisKeyWord.currentState.wounds[b][param as WoundsWoundParams] && (bone ? b === bone : true);
        });

        if (wounds.length > 0) {
            const boneWithParam = wounds.reduce(function (bone1, bone2) {
                if (thisKeyWord.currentState.wounds[bone1].damage > thisKeyWord.currentState.wounds[bone2].damage) {
                    return bone1;
                } else {
                    return bone2;
                }
            });

            return boneWithParam;
        }

        return undefined;
    }

    public static isLimping() {
        return this.currentState.wounds.leftLeg.broken || this.currentState.wounds.rightLeg.broken;
    }

    public static getTotalDamage() {
        return Object.values(this.currentState.wounds).reduce((acc, curr) => {
            return acc + curr.damage;
        }, 0);
    }

    public static isDead() {
        return this.currentState.isDead;
    }
}