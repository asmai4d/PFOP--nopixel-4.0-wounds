import { NUI } from "client/modules/nui";
import { RPCNew } from "client/modules/rpc";
import { Camera } from "./Camera";
import { Events } from "client/modules/events";
import { Utils } from "@shared/utils";
import { itemAnimations } from "client/constants/itemAnimations";

export abstract class Inspection {
    public static bones = {
        head: 31086,
        body: 0,
        leftArm: 61163,
        rightArm: 28252,
        leftLeg: 63931,
        rightLeg: 36864
    };
    public static currentPlayer: number = 0;
    public static flagDead: boolean = false;

    public static async Init() {
        NUI.register("wounds:inspection:getItems", this.getItems.bind(this));
        NUI.register("wounds:inspection:dragEnd", this.dragEnd.bind(this));
        NUI.register("wounds:inspection:refreshData", this.refreshData.bind(this));
        NUI.register("wounds:inspection:close", this.close.bind(this));

        on("wounds:inspection:open", this.inspect.bind(this));

        globalThis.exports.focusmanager.RegisterFocusHandler((hasFocus: boolean, hasCursor: boolean) => {
            if (hasCursor) {
                SetCursorLocation(0.5, 0.5);
            }

            SetNuiFocus(hasFocus, hasCursor);
        });
    }

    public static async getItems() {
        // TODO: Return healing items!
        return [
            {
                id: "bandage",
                item: {
                    name: "Bandage",
                    description: "Heals Wounds and ...",
                    image: "https://assets.nopixel.net/dev/images/inventory/icons/bandage_2.png"
                },
                quantity: 5
            },
            {
                id: "tweezers",
                item: {
                    name: "Tweezers",
                    description: "Removes bullets from wounds.",
                    image: "https://assets.nopixel.net/dev/images/inventory/icons/tweezers_1.png"
                },
                quantity: 5
            },
            {
                id: "splint",
                item: {
                    name: "Splint",
                    description: "Fixes broken bones.",
                    image: "https://assets.nopixel.net/dev/images/inventory/icons/splint_1.png"
                },
                quantity: 5
            },
            {
                id: "ifak",
                item: {
                    name: "IFAK",
                    description: "Government (PD/EMS/DOC) Issued Equipment",
                    image: "https://assets.nopixel.net/dev/images/inventory/icons/ifak.png"
                },
                quantity: 5
            }
        ]
    }

    public static async dragEnd(itemId: string, offsetId: string) {
        const results = await RPCNew.execute<{ itemId: string }>("wounds:inspection:dragEnd", itemId, this.currentPlayer, offsetId);
        if (!results) return;

        const animation = itemAnimations[results.itemId];
        if (!animation) return;

        const playerPed = PlayerPedId();

        await global.exports["srp-taskbar"].taskBar(animation.duration, animation.label);

        ClearPedSecondaryTask(playerPed);
    }

    public static async refreshData() {
        const playerState = await RPCNew.execute<IPlayerState>("cool-wounds:playerState:get", this.currentPlayer);
        if (!playerState) return;

        const serverId = GetPlayerServerId(PlayerId());

        NUI.execute("wounds:inspection:data", {
            wounds: playerState.wounds,
            show: true,
            edit: serverId !== this.currentPlayer
        });
    }

    public static async inspect(args: any[], entity: number) {
        const playerPed = entity ?? PlayerPedId();
        const pedFlags = global.exports["srp-flags"].GetPedFlags(playerPed);

        Camera.start(playerPed, pedFlags.isDead);

        const player = NetworkGetPlayerIndexFromPed(playerPed);
        const serverId = GetPlayerServerId(player);

        this.currentPlayer = serverId;
        this.flagDead = pedFlags.isDead;

        if (!pedFlags.isDead) {
            Events.emitNet("wounds:inspection:freeze", this.currentPlayer, true);
        }

        this.refreshData();

        global.exports.focusmanager.SetUIFocus(true, true);

        await Utils.wait(800);

        const offsets = [];

        for (const [boneName, boneId] of Object.entries(this.bones)) {
            const bone = GetPedBoneIndex(playerPed, boneId);
            const bonePos = GetWorldPositionOfEntityBone(playerPed, bone);

            const [_, screenX, screenY] = GetHudScreenPositionFromWorldPosition(bonePos[0], bonePos[1], bonePos[2]);

            offsets.push({
                id: boneName,
                x: screenX * 100,
                y: screenY * 100,
                isLeft: boneName === "leftArm" || boneName === "leftLeg" || boneName === "body"
            });
        }

        NUI.execute("wounds:inspection:offsets", offsets);
    }

    public static close() {
        Camera.stop();

        if (!this.flagDead) {
            Events.emitNet("wounds:inspection:freeze", this.currentPlayer, false);
            this.flagDead = false;
        }

        global.exports.focusmanager.SetUIFocus(false, false);
    }
}