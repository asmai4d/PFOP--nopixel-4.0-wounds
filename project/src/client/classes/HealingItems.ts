import { RPCNew } from "client/modules/rpc";
import { PlayerHealth } from "./PlayerHealth";
import { itemAnimations } from "client/constants/itemAnimations";
import { Streaming } from "@shared/cpx/client";
import { Events } from "client/modules/events";
import { PlayerState } from "./PlayerState";

export abstract class HealingItems {
    public static busy: boolean = false;

    public static async Init() {
        RPCNew.register("wounds:useHealingItem", this.useHealingItem.bind(this));
    }

    public static async useHealingItem(itemId: string, bone?: string) {
        if (itemId === "painkiller" && PlayerHealth.inPainKillers) {
            emit("DoLongHudText", "You are already on painkillers", 2);
            return false;
        }

        if (this.busy) {
            emit("DoLongHudText", "You are already using an item", 2);
            return false;
        }

        if (!!bone) { }

        const hasItem = global.exports["srp-inventory"].hasEnoughOfItem(itemId, 1);
        if (!hasItem) {
            emit("DoLongHudText", "You do not have this item", 2);
            return false;
        }

        this.busy = true;

        const animation = itemAnimations[itemId];

        const playerPed = PlayerPedId();

        if (!!bone) { }

        await Streaming.loadAnim(animation.animDict);

        TaskPlayAnim(playerPed, animation.animDict, animation.anim, 8, 1, -1, animation.flag, 0, false, false, false);

        Events.emitNet("wounds:sound", "bandaging_01", animation.duration);

        const progress = await global.exports["srp-taskbar"].taskBar(animation.duration, animation.label)

        ClearPedSecondaryTask(playerPed);

        this.busy = false;

        if (progress !== 100) {
            Events.emitNet("wounds:sound:cleanup");
            return false;
        }

        switch (itemId) {
            case "tourniquet":
                PlayerState.fixBleeding(bone!);
                break;
            case "splint":
                PlayerState.fixBroken(bone!);
                break;
            case "tweezers":
                PlayerState.removeBullets(bone!);
                break;
            default:
                PlayerState.heal(animation.health, false, itemId, bone);
                break;
        }

        return true;
    }
}