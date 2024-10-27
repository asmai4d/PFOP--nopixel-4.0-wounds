import { Events } from "client/modules/events";
import { RPCNew } from "client/modules/rpc";
import { PlayerState } from "./PlayerState";
import { NUI } from "client/modules/nui";
import { Streaming } from "@shared/cpx/client";
import { Utils } from "@shared/utils";
import { Interface } from "client/modules/interface";

export abstract class PlayerArmor {
    public static savedArmor: number = 0;
    public static applyingPlate: boolean = false;
    public static anim = {
        dict: "invitems@anims",
        name: "armor_plate",
        model: "invitem_g_armorplate"
    };

    public static async Init() {
        global.exports("setArmor", this.setArmor.bind(this));

        Events.onNet("wounds:armor:Equip", this.equipArmor.bind(this));
        Events.onNet("wounds:armor:unEquip", this.unequipArmor.bind(this));

        RPCNew.register("wounds:armor:applyPlate", this.applyPlate.bind(this));
    }

    public static async getArmorStack() {
        const armorStack = await RPCNew.execute<ArmorStack>("wounds:armor:getArmorStack");
        if (!armorStack) return;

        return armorStack;
    }

    public static async equipArmor() {
        const armorStack = await this.getArmorStack();
        if (!armorStack) return;

        this.setArmor(armorStack.quality, true);
    }

    public static unequipArmor() {
        this.setArmor(0, true);
    }

    public static setArmor(quality: number, ignoreUpdate?: boolean) {
        if (!PlayerState.loaded) return;

        const playerPed = PlayerPedId();

        if (quality < 0) {
            quality = 0;
        }

        if (quality > 100) {
            quality = 100;
        }

        let newArmor = 0;

        if (quality > this.savedArmor) {
            newArmor = quality - this.savedArmor;
        } else {
            newArmor = -(this.savedArmor - quality);
        }

        SetPedArmour(playerPed, quality);
        this.savedArmor = quality;

        NUI.execute("cool-wounds:setArmor", quality);

        if (!ignoreUpdate && Math.abs(newArmor) > 0) {
            Events.emitNet("wounds:armor:update", newArmor);
        }
    }

    public static async applyPlate() {
        if (this.applyingPlate) return;

        const armorStack = await this.getArmorStack();
        if (!armorStack) {
            emit("DoLongHudText", "You don't have any armor plates equipped.", 2);
            return;
        }

        await Streaming.loadAnim(this.anim.dict);

        Events.emitNet("wounds:armor:sound");

        const playerPed = PlayerPedId();

        TaskPlayAnim(playerPed, this.anim.dict, this.anim.name, 8, -8, -1, 49, 0, false, false, false);

        this.applyingPlate = true;

        let object = 0;

        setTimeout(async () => {
            if (!this.applyingPlate) return;

            object = CreateObjectNoOffset(this.anim.model, 0, 0, 0, true, true, false);
            AttachEntityToEntity(object, playerPed, GetPedBoneIndex(playerPed, 18905), 0.2799, -0.0655, 0.2005, -133.5597, -21.0822, -234.2877, false, false, false, false, 5, true);

            await Utils.wait(1500);

            DeleteEntity(object);
        }, 1000);

        const progress = await Interface.taskBar(3500, "Applying...");

        this.setArmor(armorStack.quality + 10);
        Events.emitNet("wounds:sound:cleanup");

        ClearPedTasks(playerPed);
        DeleteEntity(object);

        this.applyingPlate = false;

        return progress === 100;
    }
}