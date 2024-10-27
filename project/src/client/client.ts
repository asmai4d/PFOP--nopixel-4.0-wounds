import { Resource } from "./modules";
import { PlayerDamage } from "./classes/PlayerDamage";
import { PlayerState } from "./classes/PlayerState";
import { PlayerDeath } from "./classes/PlayerDeath";
import { QuickInspection } from "./classes/QuickInspection";
import { PlayerHealth } from "./classes/PlayerHealth";
import { HealingItems } from "./classes/HealingItems";
import { PlayerArmor } from "./classes/PlayerArmor";
import { Inspection } from "./classes/Inspection";
import { DebugCommands } from "./classes/DebugCommands";
import { injuryList } from "./constants/injuryList";

const resource = new Resource({
    codename: "wounds",
    version: "1.0.0"
});

on("onClientResourceStart", async (resourceName: string) => {
    if (resourceName !== GetCurrentResourceName()) return;

    await PlayerDamage.Init();
    await PlayerState.Init();
    await PlayerDeath.Init();
    await QuickInspection.Init();
    await PlayerHealth.Init();
    await HealingItems.Init();
    await PlayerArmor.Init();
    await Inspection.Init();

    if (GetConvar("sv_environment", "prod") === "debug") {
        for (const [key, _] of Object.entries(injuryList)) {
            SetWeaponDamageModifier(parseInt(key), 0.5);
        }

        await DebugCommands.Init();
    }
});

on("wounds:hotreload", async (message: string) => {
    if (!message) return;
    console.log(message);

    await PlayerState.load();
});

onNet("srp-spawn:characterSpawned", async () => {
    await PlayerState.load();
});