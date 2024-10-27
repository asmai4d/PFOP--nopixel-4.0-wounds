import { PlayerArmor } from "./PlayerArmor";
import { PlayerHealth } from "./PlayerHealth";
import { PlayerState } from "./PlayerState";
import { QuickInspection } from "./QuickInspection";
import { bones, spineMid } from "client/constants/bones";

export abstract class PlayerDamage {
    public static async Init() {
        on("DamageEvents:EntityDamaged", this.entityDamaged.bind(this));
    }

    public static load() {
        PlayerHealth.mobility();
    }

    public static entityDamaged(entity: number, attacker: number, weapon: number, isMelee: boolean) {
        const playerPed = PlayerPedId();

        if (entity !== playerPed) {
            return;
        }

        if (!PlayerState.loaded) {
            return;
        }

        const maxHealth = GetEntityMaxHealth(playerPed);

        if (maxHealth !== PlayerState.defaultMaxHealth) {
            return;
        }

        const savedHealth = PlayerState.savedHealth!;
        const currentHealth = GetEntityHealth(playerPed);

        const savedArmor = PlayerArmor.savedArmor;
        const currentArmor = GetPedArmour(playerPed);

        const remainingHealth = Math.abs(savedHealth - currentHealth);
        const remainingArmor = Math.abs(savedArmor - currentArmor);

        if (savedHealth !== currentHealth && !PlayerState.currentState.isDead) {
            this.action(remainingHealth, attacker, weapon);
        }

        if (savedArmor !== currentArmor && !PlayerState.currentState.isDead) {
            this.action(remainingArmor, attacker, weapon);
        }
    }

    public static action(damage: number, attacker?: number, weapon?: number) {
        const playerPed = PlayerPedId();

        const [_, part] = GetPedLastDamageBone(playerPed);

        const woundBone = this.getWoundBone();

        if (woundBone) {
            const [bone, _] = woundBone;

            if (damage > 5) {
                QuickInspection.show();
                if (spineMid.includes(part) || bone === "head") {
                    const fwdVector = GetEntityForwardVector(playerPed);
                    SetPedToRagdollWithFall(playerPed, 1000, 1000, 1, fwdVector[0], fwdVector[1], fwdVector[2], 1, 0, 0, 0, 0, 0, 0);
                }
            }

            PlayerState.damageBone(bone, damage, attacker, weapon);
        }
    }

    public static getWoundBone() {
        const playerPed = PlayerPedId();

        const [_, part] = GetPedLastDamageBone(playerPed);

        const woundBone = Object.entries(bones).find((bone) => {
            const [_, boneIds] = bone;

            return boneIds.includes(part);
        });

        return woundBone;
    }
}