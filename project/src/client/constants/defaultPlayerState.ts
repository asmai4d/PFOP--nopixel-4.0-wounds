export const defaultPlayerState = {
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
} as IPlayerState;