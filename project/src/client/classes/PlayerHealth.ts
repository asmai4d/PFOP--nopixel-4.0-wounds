import { ControlIndex } from "@shared/controls";
import { PlayerState } from "./PlayerState";
import { Utils } from "@shared/utils";
import { Logger } from "@shared/logger";
import { Events } from "client/modules/events";

export abstract class PlayerHealth {
    public static limpingInterval: NodeJS.Timeout | undefined = undefined;
    public static injuredAnimSet: string = "move_m@injured";
    public static isBleeding: boolean = false;
    public static disabledBleeding: boolean = false;
    public static inPainKillers: boolean = false;

    public static async Init() {
        global.exports("disableBleeding", this.disableBleeding.bind(this));
    }

    public static disableBleeding(disableBleeding: boolean) {
        this.disabledBleeding = disableBleeding;
    }

    public static load() {
        this.vision();
    }

    public static check() {
        this.limping();
        this.bleeding();
    }

    public static painkiller() {
        this.inPainKillers = true;
        this.resetMovement();

        setTimeout(() => {
            this.inPainKillers = false;
        }, 10000);
    }

    public static async limping() {
        const wounds = PlayerState.currentState.wounds;

        if (wounds.leftLeg.broken || wounds.rightLeg.broken) {
            if (this.limpingInterval || this.inPainKillers) {
                return;
            }

            this.limpingInterval = setInterval(async () => {
                const playerPed = PlayerPedId();
                RequestAnimSet(this.injuredAnimSet);

                while (!HasAnimSetLoaded(this.injuredAnimSet)) {
                    await Utils.wait(0);
                }

                SetPedMovementClipset(playerPed, this.injuredAnimSet, 1);
            }, 1000);
        } else {
            this.resetMovement();
        }
    }

    public static resetMovement() {
        clearInterval(this.limpingInterval);
        emit("Animation:Set:Reset");
    }

    public static async bleeding() {
        if (!this.isBleeding) return;

        let bleedValue = Object.values(PlayerState.currentState.wounds).filter((wound) => {
            return wound.bleeding;
        }).length;

        while (bleedValue > 0 && !PlayerState.currentState.isDead && !this.disabledBleeding) {
            bleedValue = Object.values(PlayerState.currentState.wounds).filter((wound) => {
                return wound.bleeding;
            }).length;

            if (bleedValue === 0) break;

            this.isBleeding = true;

            const playerPed = PlayerPedId();

            PlayerState.setEntityHealth(playerPed, GetEntityHealth(playerPed) - bleedValue);

            Logger.debug("[cool-wounds]", "Bleeding", bleedValue);

            const randomNumber = Utils.MathUtils.getRandomNumber(0, 100);

            if (randomNumber <= 30) {
                Events.emit("evidence:bleeding");
            }

            await Utils.wait(5000);
        }

        this.isBleeding = false;
    }

    public static calculateVision(value: number) {
        const minValue = 5000 + value * 500;
        const maxValue = 10000 + value * 600;
        const intensity = 2750 - (value - 1) * 20;

        return {
            interval: Utils.MathUtils.getRandomNumber(minValue, maxValue),
            intensity: intensity
        };
    }

    public static vision() {
        const realHealth = GetEntityHealth(PlayerPedId()) - 100;
        const vision = this.calculateVision(realHealth);

        const interval = vision.interval;
        const intensity = vision.intensity;

        setTimeout(this.vision.bind(this), interval);
    }

    public static mobility() {
        setTick(() => {
            if (this.inPainKillers) {
                return;
            }

            const wounds = PlayerState.currentState.wounds;
            const value = 1 - (wounds.leftLeg.damage + wounds.rightLeg.damage) / 250;

            const playerPed = PlayerPedId();

            SetPedMoveRateOverride(playerPed, value);

            if (IsPedJumping(playerPed) && value <= 0.75) {
                const fwdVector = GetEntityForwardVector(playerPed);
                SetPedToRagdollWithFall(playerPed, 1000, 1000, 1, fwdVector[0], fwdVector[1], fwdVector[2], 1, 0, 0, 0, 0, 0, 0);
            }

            if (wounds.leftLeg.broken || wounds.rightLeg.broken) {
                DisableControlAction(2, ControlIndex.LEFTSHIFT, true);
            }
        });
    }
}