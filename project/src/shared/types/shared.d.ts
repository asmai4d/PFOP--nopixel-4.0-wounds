interface WoundsInjury {
    issue: string;
    removeArmor: boolean;
    severity: number;
    breakBone?: number;
    bleedChance?: number;
    addBullet?: boolean;
}

interface WoundsWound {
    label: string;
    bullets: number;
    damage: number;
    maxDamage: number;
    injuryList: string[];
    broken: boolean;
    severity: {
        level: number;
        name: string;
    };
    bleeding: boolean;
}

type WoundsWoundParams = keyof WoundsWound;

interface IPlayerState {
    wounds: { [key: string]: WoundsWound };
    vision: number;
    sound: number;
    burns: number;
    isDead: boolean;
}

interface ItemAnimation {
    animDict: string;
    anim: string;
    flag: number;
    duration: number;
    label: string;
    health: number;
}

interface ArmorStack {
    quality: number;
}

type ReviveAnimation = [string, string, number];