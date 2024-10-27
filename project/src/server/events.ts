import { Events } from "./modules/events";
import { RPCNew } from "./modules/rpc";

export const InitEvents = () => { };

export const playerStates = new Map<number, IPlayerState>();

playerStates.set(1, {
    wounds: {
        head: {
            label: "Head",
            bullets: 0,
            damage: 0,
            maxDamage: 15,
            injuryList: [],
            broken: false,
            severity: {
                level: 0,
                name: "none"
            },
            bleeding: false
        },
        body: {
            label: "Body",
            bullets: 0,
            damage: 0,
            maxDamage: 25,
            injuryList: [],
            broken: false,
            severity: {
                level: 0,
                name: "none"
            },
            bleeding: false
        },
        leftArm: {
            label: "Left Arm",
            bullets: 0,
            damage: 0,
            maxDamage: 15,
            injuryList: [],
            broken: false,
            severity: {
                level: 0,
                name: "none"
            },
            bleeding: false
        },
        rightArm: {
            label: "Right Arm",
            bullets: 0,
            damage: 0,
            maxDamage: 15,
            injuryList: [],
            broken: false,
            severity: {
                level: 0,
                name: "none"
            },
            bleeding: false
        },
        leftLeg: {
            label: "Left Leg",
            bullets: 0,
            damage: 0,
            maxDamage: 15,
            injuryList: [],
            broken: false,
            severity: {
                level: 0,
                name: "none"
            },
            bleeding: false
        },
        rightLeg: {
            label: "Right Leg",
            bullets: 0,
            damage: 0,
            maxDamage: 15,
            injuryList: [],
            broken: false,
            severity: {
                level: 0,
                name: "none"
            },
            bleeding: false
        }
    },
    vision: 100,
    sound: 100,
    burns: 0,
    isDead: false
})

// Client Registered Events (onNet/Events.onNet):
// wounds:armor:Equip (New)
// wounds:armor:unEquip (New)
// wounds:revive (Old)
// wounds:respawnLocal (Old)

// Server Registered Events (onNet/Events.onNet):
// wounds:armor:update (New)
// wounds:armor:sound (New)
// wounds:sound:cleanup (New)
// wounds:medic:reviveTarget (New)
// ems:bed:spawn (prob not in wounds)
// cool-wounds:playerState:update (New)
// wounds:sound (New)
// wounds:inspection:freeze (New)

// Client Registered RPCs
// wounds::applyPlate
// wounds:useHealingItem

// Server Registered RPCs
// wounds:armor:getArmorStack
// cool-wounds:playerState:get
// wounds:inspection:dragEnd

RPCNew.register("wounds:armor:getArmorStack", (pSource: number): ArmorStack => {
    return {
        quality: 100
    }
});

RPCNew.register("wounds:inspection:dragEnd", (pSource: number, pItemId: string, pCurrentPlayer: number, pOffsetId: string) => {
    // TODO: Logic!

    return pItemId;
});

RPCNew.register("cool-wounds:playerState:get", (pSource: number, pCurrentPlayer: number): IPlayerState => {
    if (!playerStates.has(pCurrentPlayer)) {
        // Fetch from db, set player state map
    }

    return playerStates.get(pCurrentPlayer)!;
});

Events.onNet("cool-wounds:playerState:update", (cid: number, currentState: IPlayerState) => {

});

Events.onNet("wounds:armor:update", (newArmor: number) => {

});

Events.onNet("wounds:medic:reviveTarget", (targetServerId: number) => {

});

Events.onNet("wounds:sound", (soundName: string, duration: number) => {

});

Events.onNet("wounds:armor:sound", () => {

});

Events.onNet("wounds:sound:cleanup", () => {

});