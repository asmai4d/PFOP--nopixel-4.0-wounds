import { Utils } from "@shared/utils";
import { NUI } from "client/modules/nui";

export abstract class QuickInspection {
    public static isPersistent: boolean = false;
    public static showFor: number = 3000;
    public static timeout: NodeJS.Timeout | undefined = undefined;

    public static async Init() {
        on("cool-preferences:setPreferences", this.setPersistentState.bind(this));
        global.exports["srp-keybinds"].registerKeyMapping("", "Player", "Show Character UI", "+wounds:showCharacter", "-wounds:showCharacter", "J");
        RegisterCommand("+wounds:showCharacter", this.keyPressed.bind(this), false);
        RegisterCommand("-wounds:showCharacter", this.keyReleased.bind(this), false);
    }

    public static setPersistentState(preferences: any) {
        this.isPersistent = preferences["wounds.character.enabled"];
        NUI.execute("cool-wounds:show", this.isPersistent);
    }

    public static show() {
        if (this.isPersistent) {
            return;
        }

        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        NUI.execute("cool-wounds:show", true);

        this.timeout = setTimeout(() => {
            NUI.execute("cool-wounds:show", false);
        }, this.showFor);
    }

    public static async keyPressed() {
        if (this.isPersistent) return;

        NUI.execute("wounds:quickInspection:show", true);

        global.exports.focusmanager.SetUIFocus(true, true);

        SetNuiFocusKeepInput(true);

        while (IsNuiFocused()) {
            DisableControlAction(0, 1, true);
            DisableControlAction(0, 2, true);

            await Utils.wait(0);
        }
    }

    public static keyReleased() {
        if (this.isPersistent) {
            return;
        }

        NUI.execute("wounds:quickInspection:show", false);

        global.exports.focusmanager.SetUIFocus(false, false);

        SetNuiFocusKeepInput(false);
    }
}