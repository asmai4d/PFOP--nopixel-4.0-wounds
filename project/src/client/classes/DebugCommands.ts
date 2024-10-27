import { NUI } from "client/modules/nui";
import { PlayerArmor } from "./PlayerArmor";
import { PlayerHealth } from "./PlayerHealth";
import { PlayerState } from "./PlayerState";

export abstract class DebugCommands {
    public static async Init() {
        RegisterCommand("health", (src: number, args: any[]) => {
            const playerPed = PlayerPedId();
            PlayerState.setEntityHealth(playerPed, 200);
        }, false);

        RegisterCommand("armor", (src: number, args: any[]) => {
            PlayerArmor.setArmor(parseInt(args[0]));
        }, false);

        RegisterCommand("removeArmor", (src: number, args: any[]) => {
            const playerPed = PlayerPedId();
            const plyArmor = GetPedArmour(playerPed);
            SetPedArmour(playerPed, plyArmor - parseInt(args[0]));
        }, false);

        RegisterCommand("rev", () => {
            const playerPed = PlayerPedId();
            const plyCoords = GetEntityCoords(playerPed, false);
            NetworkResurrectLocalPlayer(plyCoords[0], plyCoords[1], plyCoords[2], 0, true, false);
        }, false);

        RegisterCommand("stats", () => {
            console.log(PlayerState.currentState);

            const playerPed = PlayerPedId();
            const plyHealth = GetEntityHealth(playerPed);
            const plyArmor = GetPedArmour(playerPed);

            console.log(`Health: ${plyHealth} Armor: ${plyArmor}`);
        }, false);

        RegisterCommand("maxDamageToArms", () => {
            PlayerState.currentState.wounds.leftArm.damage = PlayerState.currentState.wounds.leftArm.maxDamage;
            PlayerState.setState(PlayerState.currentState);
            PlayerState.sync();
        }, false);

        RegisterCommand("getTotalDamage", () => {
            const wounds = PlayerState.currentState.wounds;
            const damage = Object.values(wounds).reduce(function (acc, curr) {
                return acc + curr.damage;
            }, 0);

            const playerPed = PlayerPedId();
            const plyHealth = GetEntityHealth(playerPed);

            console.log("[cool-wounds]", 100 - damage, plyHealth - 100);
        }, false);

        RegisterCommand("intensity", (src: number, args: any[]) => {
            const vision = PlayerHealth.calculateVision(parseInt(args[0]));
            console.log(vision);
        }, false);

        RegisterCommand("open", () => {
            SetNuiFocus(true, true);
            NUI.execute("cool-wounds:openUI", true);
        }, false);

        RegisterCommand("close", () => {
            SetNuiFocus(false, false);
            NUI.execute("cool-wounds:openUI", false);
        }, false);

        RegisterCommand("sub", () => {
            const freqLow = 650;
            const freqHigh = 750;

            SetAudioSubmixEffectRadioFx(0, 0);
            SetAudioSubmixEffectParamInt(0, 0, GetHashKey("default"), 1);
            SetAudioSubmixEffectParamFloat(0, 0, GetHashKey("freq_low"), freqLow);
            SetAudioSubmixEffectParamFloat(0, 0, GetHashKey("freq_hi"), freqHigh);
        }, false);

        RegisterCommand("substop", () => {
            SetAudioSubmixEffectRadioFx(0, 0);
            SetAudioSubmixEffectParamFloat(0, 0, GetHashKey("enabled"), 0);
        }, false);

        RegisterCommand("getWounds", (src: number, args: any[]) => {
            PlayerState.overrideMaxHealth(args[0] === "false" ? false : parseInt(args[0]));

            const playerPed = PlayerPedId();

            SetPedMaxHealth(playerPed, GetEntityMaxHealth(playerPed));

            PlayerState.sync();
        }, false);

        RegisterCommand("getBoneToDamage", () => {
            console.log(PlayerState.getBoneToDamage());
        }, false);

        RegisterCommand("getBoneToHeal", () => {
            console.log(PlayerState.getBoneToHeal());
        }, false);
    }
}