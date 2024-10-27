import { Utils } from "@shared/utils";
import { PlayerState } from "./PlayerState";
import { NUI } from "client/modules/nui";
import { Events } from "client/modules/events";
import { Interface } from "client/modules/interface";
import { Streaming } from "@shared/cpx/client";
import { PlayerArmor } from "./PlayerArmor";
import { ControlIndex } from "@shared/controls";

export abstract class PlayerDeath {
    public static anim = {
        normal: {
            dict: "dead",
            anim: "dead_a"
        },
        vehicle: {
            dict: "veh@low@front_ps@idle_duck",
            anim: "sit"
        }
    };
    public static submix = {
        freqLow: 650,
        freqHi: 750
    };
    public static time = {
        default: 300000,
        current: 300000
    };
    public static stopRevive = false;

    public static async Init() {
        global.exports("revive", this.revive.bind(this));
        global.exports("allowRespawn", this.allowRespawn.bind(this));
        onNet("wounds:revive", this.revive.bind(this));
        onNet("wounds:respawnLocal", this.localEMSRevive.bind(this));
        on("wounds:medic:revive", this.reviveTarget.bind(this));
    }

    public static allowRespawn() {
        return PlayerState.currentState.isDead && this.time.current <= 0;
    }

    public static async onDeath() {
        if (!PlayerState.currentState.isDead) return;

        PlayerState.currentState.isDead = true;
        PlayerState.setState(PlayerState.currentState);

        const playerPed = PlayerPedId();

        global.exports["srp-flags"].SetPedFlag(playerPed, "isDead", true);

        emit("wounds:changeDeathState", true);
        emit("civilian:alertPolice", 35, "death");

        Events.emit("evidence:bleeding", true);

        NUI.execute("cool-wounds:death", {
            show: true,
            time: this.time.current
        });

        while (!IsPedInAnyVehicle(playerPed, false)) {
            await Utils.waitForCondition(() => GetEntitySpeed(playerPed) < 0.5, 60000);
        }

        this.resurrect();

        SetEntityInvincible(playerPed, true);

        global.exports.inventory.SetInventoryDisabled(true);

        const animNormal = this.anim.normal;
        const animVehicle = this.anim.vehicle;

        await Streaming.loadAnim(animNormal.dict);
        await Streaming.loadAnim(animVehicle.dict);

        SetAudioSubmixEffectRadioFx(0, 0);
        SetAudioSubmixEffectParamInt(0, 0, GetHashKey("default"), 1);
        SetAudioSubmixEffectParamFloat(0, 0, GetHashKey("freq_low"), this.submix.freqLow);
        SetAudioSubmixEffectParamFloat(0, 0, GetHashKey("freq_hi"), this.submix.freqHi);

        setImmediate(async () => {
            TriggerScreenblurFadeIn(2000);
            await Utils.wait(2500);
            TriggerScreenblurFadeOut(20000);
            await Utils.wait(20000);
            this.doScreenFade();
            this.clearSubmix();
        });

        setImmediate(async () => {
            const plyMaxHealth = GetEntityMaxHealth(playerPed);
            SetEntityHealth(playerPed, plyMaxHealth);

            while (PlayerState.currentState.isDead) {
                if (IsPedInAnyVehicle(playerPed, false)) {
                    if (!IsEntityPlayingAnim(playerPed, animVehicle.dict, animVehicle.anim, 1)) {
                        TaskPlayAnim(playerPed, animVehicle.dict, animVehicle.anim, 1, 1, -1, 1, 0, false, false, false);
                    }
                } else if (!IsEntityPlayingAnim(playerPed, animNormal.dict, animNormal.anim, 1)) {
                    TaskPlayAnim(playerPed, animNormal.dict, animNormal.anim, 1, 8, -1, 1, 0, false, false, false);
                }

                await Utils.wait(0);
            }
        });

        let currentTime = GetGameTimer();
        let timeHold = 5;

        setImmediate(async () => {
            while (PlayerState.currentState.isDead) {
                this.time.current -= GetGameTimer() - currentTime;
                currentTime = GetGameTimer();

                if (this.time.current <= 0) {
                    this.time.current = 0;

                    if (IsControlPressed(0, ControlIndex.E)) {
                        timeHold -= 1;

                        if (timeHold <= 0) {
                            this.localEMSRevive();
                            return [3, 2];
                        }
                    } else {
                        timeHold = 5;
                    }

                    NUI.execute("cool-wounds:death", {
                        show: true,
                        time: 0,
                        timeHold: timeHold
                    });
                } else {
                    NUI.execute("cool-wounds:death", {
                        show: true,
                        time: this.time.current
                    });
                }

                await Utils.wait(1000);
            }
        });
    }

    public static resurrect() {
        const playerPed = PlayerPedId();

        const plyCoords = GetEntityCoords(playerPed, false);
        const plyHeading = GetEntityHeading(playerPed);

        if (IsPedInAnyVehicle(playerPed, false)) {
            const vehicle = GetVehiclePedIsIn(playerPed, false);
            const seats = GetVehicleModelNumberOfSeats(GetEntityModel(vehicle));

            for (let i = -1; i < seats; i++) {
                const ped = GetPedInVehicleSeat(vehicle, i);

                if (ped === playerPed) {
                    NetworkResurrectLocalPlayer(plyCoords[0], plyCoords[1], plyCoords[2], plyHeading, true, false);

                    setTimeout(() => {
                        TaskWarpPedIntoVehicle(playerPed, vehicle, i);
                    }, 100);
                }
            }
        } else {
            NetworkResurrectLocalPlayer(plyCoords[0], plyCoords[1], plyCoords[2], plyHeading, true, false);
        }
    }

    public static async revive(player: any, shouldReset: boolean) {
        const isDead = PlayerState.currentState.isDead;

        this.time.current = this.time.default;

        NUI.execute("cool-wounds:death", {
            show: false,
            time: this.time.current,
            timeHold: false
        });

        const playerPed = PlayerPedId();

        global.exports["srp-flags"].SetPedFlag(playerPed, "isDead", false);

        const isPedDeadOrDying = IsPedDeadOrDying(playerPed, true);

        if (isPedDeadOrDying) {
            this.resurrect();
        }

        const plyMaxHealth = GetEntityMaxHealth(playerPed);
        SetEntityHealth(playerPed, plyMaxHealth);

        TriggerScreenblurFadeOut(1000);

        if (!isDead) return;

        ClearPedTasks(playerPed);

        await this.doScreenFade();
        this.clearSubmix();

        const savedArmor = PlayerArmor.savedArmor;
        PlayerArmor.setArmor(savedArmor);

        if (shouldReset) {
            PlayerState.resetState();
        }

        emit("wounds:changeDeathState", false);
        emit("playerRevived", player);

        TriggerEvent("actionbar:setEmptyHanded", true);

        const plyModel = GetEntityModel(playerPed);
        const isAnimalModel = global.exports["cool-character"].isAnimalModel(plyModel);

        if (isAnimalModel && isDead) {
            const animDict = "get_up@sat_on_floor@to_stand";
            const animName = "getup_0";

            await Streaming.loadAnim(animDict);

            TaskPlayAnim(playerPed, animDict, animName, 8, 1, -1, 0, 0, false, false, false);

            setTimeout(() => {
                ClearPedTasks(playerPed);
            }, 2000);
        }

        NUI.execute("cool-wounds:death", {
            show: false,
            time: this.time.current
        });

        SetEntityInvincible(playerPed, false);

        globalThis.exports.inventory.SetInventoryDisabled(false);

        PlayerState.currentState.isDead = false;
        PlayerState.setState(PlayerState.currentState);
    }

    public static async playReviveAnims(reviveAnims: ReviveAnimation[]) {
        const playerPed = PlayerPedId();
        const defaultAnimDict = "amb@medic@standing@tendtodead@";

        for (const [animDict, animName, duration] of reviveAnims) {
            if (this.stopRevive) {
                ClearPedTasks(playerPed);
                this.stopRevive = false;
                break;
            }

            const finalAnimDict = `${defaultAnimDict}${animDict}`;

            await Streaming.loadAnim(finalAnimDict);

            TaskPlayAnim(playerPed, finalAnimDict, animName, 8, 1, -1, 0, 0, false, false, false);

            await Utils.wait(duration);
        }
    }

    public static async reviveTarget(p1: any, pPed: number) {
        if (!pPed) return;

        const targetPlayer = NetworkGetPlayerIndexFromPed(pPed);
        const targetServerId = GetPlayerServerId(targetPlayer);

        const reviveAnims: ReviveAnimation[] = [
            ["enter", "enter", 1700],
            ["base", "base", 2000],
            ["idle_a", "idle_a", 3566],
            ["idle_a", "idle_a", 3566],
            ["idle_a", "idle_a", 3566],
            ["exit", "exit", 366]
        ];

        const length = reviveAnims.reduce((acc, curr) => {
            return acc + +curr[2];
        }, 0);

        const progress = await Promise.race([Interface.taskBar(length, "Reviving..."), this.playReviveAnims(reviveAnims)])
        const playerPed = PlayerPedId();

        if (progress !== 100) {
            ClearPedTasks(playerPed);
            this.stopRevive = true;
            return;
        }

        ClearPedTasks(playerPed);

        Events.emitNet("wounds:medic:reviveTarget", targetServerId);
    }

    public static async localEMSRevive() {
        NUI.execute("cool-wounds:death", {
            show: false,
            time: this.time.current
        });

        await this.doScreenFade();

        Events.emitNet("ems:bed:spawn");
    }

    public static async doScreenFade() {
        DoScreenFadeOut(350);
        await Utils.wait(750);
        DoScreenFadeIn(1000);
    }

    public static clearSubmix() {
        SetAudioSubmixEffectRadioFx(0, 0);
        SetAudioSubmixEffectParamInt(0, 0, GetHashKey("enabled"), 0);
    }
}