export const injuryList = {
    [GetHashKey("WEAPON_UNARMED")]: {
        issue: "Fist Marks",
        removeArmor: false,
        severity: 0.1
    },
    [GetHashKey("WEAPON_KNUCKLE")]: {
        issue: "Knuckle Shaped Wound",
        removeArmor: false,
        breakBone: 20,
        bleedChance: 10,
        severity: 0.1
    },
    [GetHashKey("WEAPON_WRENCH")]: {
        issue: "Large Blunt Object (Metal)",
        removeArmor: false,
        breakBone: 80,
        bleedChance: 20,
        severity: 0.1
    },
    [GetHashKey("WEAPON_MACHETE")]: {
        issue: "Large Knife Wounds (Metal)",
        removeArmor: false,
        breakBone: 20,
        bleedChance: 90,
        severity: 0.3
    },
    [GetHashKey("WEAPON_HATCHET")]: {
        issue: "Large Hacking Wounds (Metal)",
        removeArmor: false,
        breakBone: 20,
        bleedChance: 90,
        severity: 0.3
    },
    [GetHashKey("WEAPON_ANIMAL")]: {
        issue: "Animal Bites and Claws",
        removeArmor: false,
        breakBone: 20,
        bleedChance: 90,
        severity: 0.4
    },
    [GetHashKey("WEAPON_COUGAR")]: {
        issue: "Animal Bites and Claws",
        removeArmor: false,
        breakBone: 1,
        bleedChance: 90,
        severity: 0.8
    },
    [GetHashKey("WEAPON_BOAR")]: {
        issue: "Animal Bites and Claws",
        removeArmor: false,
        breakBone: 1,
        bleedChance: 90,
        severity: 0.8
    },
    [GetHashKey("WEAPON_KNIFE")]: {
        issue: "Knife Wounds",
        removeArmor: false,
        breakBone: 50,
        bleedChance: 90,
        severity: 0.5
    },
    [GetHashKey("WEAPON_FLASHLIGHT")]: {
        issue: "Small Blunt Object (Metal)",
        removeArmor: false,
        breakBone: 50,
        bleedChance: 20,
        severity: 0.2
    },
    [GetHashKey("WEAPON_BOTTLE")]: {
        issue: "Shards of Glass Found In Victim",
        removeArmor: false,
        bleedChance: 33,
        severity: 0.2
    },
    [GetHashKey("WEAPON_SWITCHBLADE")]: {
        issue: "Knife Wounds",
        removeArmor: false,
        breakBone: 20,
        bleedChance: 90,
        severity: 0.6
    },
    [GetHashKey("WEAPON_NIGHTSTICK")]: {
        issue: "Blunt Object (Wooden)",
        removeArmor: false,
        breakBone: 5,
        bleedChance: 10,
        severity: 2
    },
    [GetHashKey("WEAPON_HAMMER")]: {
        issue: "Small Blunt Object (Metal)",
        removeArmor: false,
        breakBone: 10,
        bleedChance: 10,
        severity: 3
    },
    [GetHashKey("WEAPON_BAT")]: {
        issue: "Large Blunt Object (Wooden)",
        removeArmor: false,
        breakBone: 10,
        bleedChance: 10,
        severity: 3
    },
    [GetHashKey("WEAPON_GOLFCLUB")]: {
        issue: "Long Metal Blunt Object",
        removeArmor: false,
        breakBone: 1,
        bleedChance: 10,
        severity: 1
    },
    [GetHashKey("WEAPON_CROWBAR")]: {
        issue: "Medium Size Jagged Metal Object",
        removeArmor: false,
        breakBone: 4,
        bleedChance: 10,
        severity: 2
    },
    [GetHashKey("WEAPON_HEAVYPISTOL")]: {
        issue: "Heavy Pistol Bullets",
        removeArmor: true,
        breakBone: 1,
        bleedChance: 50,
        severity: 2,
        addBullet: true
    },
    [GetHashKey("WEAPON_VINTAGEPISTOL")]: {
        issue: "Vintage Pistol Bullets",
        removeArmor: true,
        breakBone: 35,
        bleedChance: 50,
        severity: 1.5,
        addBullet: true
    },
    [GetHashKey("WEAPON_SNSPISTOL")]: {
        issue: "SNS Pistol Bullets",
        removeArmor: true,
        breakBone: 15,
        bleedChance: 50,
        severity: 1.2,
        addBullet: true
    },
    [GetHashKey("WEAPON_COMBATPISTOL")]: {
        issue: "Combat Pistol Bullets",
        removeArmor: true,
        breakBone: 50,
        bleedChance: 50,
        severity: 1.5,
        addBullet: true
    },
    [GetHashKey("WEAPON_APPISTOL")]: {
        issue: "AP Pistol Bullets",
        removeArmor: true,
        breakBone: 25,
        bleedChance: 20,
        severity: 1.3,
        addBullet: true
    },
    [GetHashKey("WEAPON_MICROSMG")]: {
        issue: "Micro SMG Bullets",
        removeArmor: true,
        breakBone: 1,
        bleedChance: 30,
        severity: 1.5,
        addBullet: true
    },
    [GetHashKey("WEAPON_GUSENBERG")]: {
        issue: "Gusenberg Bullets",
        removeArmor: true,
        breakBone: 35,
        bleedChance: 30,
        severity: 1.5,
        addBullet: true
    },
    [GetHashKey("WEAPON_SMG")]: {
        issue: "SMG Bullets",
        removeArmor: true,
        breakBone: 0.15,
        bleedChance: 30,
        severity: 1.2,
        addBullet: true
    },
    [GetHashKey("WEAPON_MACHINEPISTOL")]: {
        issue: "Machine Pistol Bullets",
        removeArmor: true,
        bleedChance: 30,
        severity: 1.2,
        addBullet: true
    },
    [GetHashKey("WEAPON_COMBATPDW")]: {
        issue: "Combat PDW Bullets",
        removeArmor: true,
        breakBone: 2,
        bleedChance: 30,
        severity: 1.8,
        addBullet: true
    },
    [GetHashKey("WEAPON_ASSAULTSMG")]: {
        issue: "Assault SMG Bullets",
        removeArmor: true,
        breakBone: 25,
        bleedChance: 30,
        severity: 2.5,
        addBullet: true
    },
    [GetHashKey("WEAPON_ADVANCEDRIFLE")]: {
        issue: "Advanced Rifle Bullets",
        removeArmor: true,
        breakBone: 25,
        bleedChance: 40,
        severity: 2.5,
        addBullet: true
    },
    [GetHashKey("WEAPON_SPECIALCARBINE")]: {
        issue: "Special Carbine Bullets",
        removeArmor: true,
        breakBone: 25,
        bleedChance: 40,
        severity: 2.5,
        addBullet: true
    },
    [GetHashKey("WEAPON_MG")]: {
        issue: "Machine Gun Bullets",
        removeArmor: true,
        breakBone: 15,
        bleedChance: 40,
        severity: 4,
        addBullet: true
    },
    [GetHashKey("WEAPON_COMBATMG")]: {
        issue: "Combat MG Bullets",
        removeArmor: true,
        breakBone: 15,
        bleedChance: 40,
        severity: 4,
        addBullet: true
    },
    [GetHashKey("WEAPON_PUMPSHOTGUN")]: {
        issue: "Pump Shotgun Bullets",
        removeArmor: true,
        breakBone: 35,
        bleedChance: 0.7,
        severity: 5,
        addBullet: true
    },
    [GetHashKey("WEAPON_SAWNOFFSHOTGUN")]: {
        issue: "Sawn Off Bullets",
        removeArmor: true,
        breakBone: 35,
        bleedChance: 90,
        severity: 4,
        addBullet: true
    },
    [GetHashKey("WEAPON_ASSAULTSHOTGUN")]: {
        issue: "Assault Shotgun Bullets",
        removeArmor: true,
        breakBone: 35,
        bleedChance: 30,
        severity: 4,
        addBullet: true
    },
    [GetHashKey("WEAPON_BULLPUPSHOTGUN")]: {
        issue: "Bullpup Shotgun Bullets",
        removeArmor: true,
        breakBone: 45,
        bleedChance: 40,
        severity: 5,
        addBullet: true
    },
    [GetHashKey("WEAPON_STUNGUN")]: {
        issue: "Stun Gun Damage",
        removeArmor: false,
        severity: 0.1
    },
    [GetHashKey("WEAPON_SNIPERRIFLE")]: {
        issue: "Sniper Rifle Wounds",
        removeArmor: true,
        breakBone: 50,
        bleedChance: 90,
        severity: 5,
        addBullet: true
    },
    [GetHashKey("WEAPON_HEAVYSNIPER")]: {
        issue: "Sniper Rifle Wounds",
        removeArmor: true,
        breakBone: 50,
        bleedChance: 90,
        severity: 5,
        addBullet: true
    },
    [GetHashKey("WEAPON_REMOTESNIPER")]: {
        issue: "Sniper Rifle Wounds",
        removeArmor: true,
        breakBone: 50,
        bleedChance: 90,
        severity: 5,
        addBullet: true
    },
    [GetHashKey("WEAPON_GRENADELAUNCHER")]: {
        issue: "Explosive Damage (Grenades)",
        removeArmor: true,
        breakBone: 75,
        bleedChance: 90,
        severity: 7,
        addBullet: true
    },
    [GetHashKey("WEAPON_GRENADELAUNCHER_SMOKE")]: {
        issue: "Smoke Damage",
        removeArmor: false,
        severity: 0.1
    },
    [GetHashKey("WEAPON_RPG")]: {
        issue: "RPG Damage",
        removeArmor: true,
        breakBone: 90,
        bleedChance: 90,
        severity: 8,
        addBullet: true
    },
    [GetHashKey("WEAPON_STINGER")]: {
        issue: "RPG Damage",
        removeArmor: true,
        breakBone: 90,
        bleedChance: 90,
        severity: 8,
        addBullet: true
    },
    [GetHashKey("WEAPON_MINIGUN")]: {
        issue: "Minigun Wounds",
        removeArmor: true,
        breakBone: 35,
        bleedChance: 20,
        severity: 7,
        addBullet: true
    },
    [GetHashKey("WEAPON_GRENADE")]: {
        issue: "Grenade Wounds",
        removeArmor: true,
        breakBone: 65,
        bleedChance: 90,
        severity: 7
    },
    [GetHashKey("WEAPON_STICKYBOMB")]: {
        issue: "Sticky Bomb Wounds",
        removeArmor: true,
        breakBone: 75,
        bleedChance: 90,
        severity: 8
    },
    [GetHashKey("WEAPON_SMOKEGRENADE")]: {
        issue: "Smoke Grenade Wounds",
        removeArmor: false,
        severity: 0.1
    },
    [GetHashKey("WEAPON_BZGAS")]: {
        issue: "BZ Gas Damage",
        removeArmor: false,
        bleedChance: 10,
        severity: 0.5
    },
    [GetHashKey("WEAPON_MOLOTOV")]: {
        issue: "Molotov Fire Damage",
        removeArmor: false,
        bleedChance: 10,
        severity: 0.4
    },
    [GetHashKey("WEAPON_FIREEXTINGUISHER")]: {
        issue: "Fire Extinguisher Damage",
        removeArmor: false,
        bleedChance: 10,
        severity: 0.3
    },
    [GetHashKey("WEAPON_PETROLCAN")]: {
        issue: "Petrol Can Fire Damage",
        removeArmor: false,
        bleedChance: 10,
        severity: 0.3
    },
    [GetHashKey("WEAPON_DIGISCANNER")]: {
        issue: "Digiscanner Wounds",
        removeArmor: false,
        severity: 0.1
    },
    [GetHashKey("WEAPON_BALL")]: {
        issue: "Ballistic Damage",
        removeArmor: true,
        bleedChance: 10,
        severity: 1
    },
    [GetHashKey("WEAPON_FLARE")]: {
        issue: "Flare Damage",
        removeArmor: false,
        bleedChance: 10,
        severity: 0.2
    },
    [GetHashKey("WEAPON_DAGGER")]: {
        issue: "Dagger Wounds",
        removeArmor: false,
        breakBone: 20,
        bleedChance: 90,
        severity: 1.5
    },
    [GetHashKey("WEAPON_VINTAGEPISTOL_MK2")]: {
        issue: "Vintage Pistol Mk II Bullets",
        removeArmor: true,
        breakBone: 35,
        bleedChance: 50,
        severity: 1.5,
        addBullet: true
    },
    [GetHashKey("WEAPON_SNSPISTOL_MK2")]: {
        issue: "SNS Pistol Mk II Bullets",
        removeArmor: true,
        breakBone: 15,
        bleedChance: 50,
        severity: 1.2,
        addBullet: true
    },
    [GetHashKey("WEAPON_REVOLVER")]: {
        issue: "Revolver Bullets",
        removeArmor: true,
        breakBone: 10,
        bleedChance: 33,
        severity: 3,
        addBullet: true
    },
    [GetHashKey("WEAPON_REVOLVER_MK2")]: {
        issue: "Revolver Mk II Bullets",
        removeArmor: true,
        breakBone: 10,
        bleedChance: 33,
        severity: 3,
        addBullet: true
    },
    [GetHashKey("WEAPON_DOUBLEACTION")]: {
        issue: "Double-Action Revolver Bullets",
        removeArmor: true,
        breakBone: 10,
        bleedChance: 30,
        severity: 3,
        addBullet: true
    },
    [GetHashKey("WEAPON_CERAMICPISTOL")]: {
        issue: "Ceramic Pistol Bullets",
        removeArmor: true,
        breakBone: 15,
        bleedChance: 40,
        severity: 1.2
    },
    [GetHashKey("WEAPON_NAVYREVOLVER")]: {
        issue: "Navy Revolver Bullets",
        removeArmor: true,
        breakBone: 10,
        bleedChance: 40,
        severity: 3,
        addBullet: true
    },
    [GetHashKey("WEAPON_GADGETPISTOL")]: {
        issue: "Gadget Pistol Bullets",
        removeArmor: true,
        breakBone: 15,
        severity: 1.2,
        addBullet: true
    },
    [GetHashKey("WEAPON_BARBED_WIRE")]: {
        issue: "Barbed Wire Damage",
        removeArmor: false,
        breakBone: 10,
        bleedChance: 90,
        severity: 2
    },
    [GetHashKey("WEAPON_DROWNING")]: {
        issue: "Drowning",
        removeArmor: false,
        severity: 0.1
    },
    [GetHashKey("WEAPON_DROWNING_IN_VEHICLE")]: {
        issue: "Drowned in Vehicle",
        removeArmor: false,
        severity: 0.1
    },
    [GetHashKey("WEAPON_BLEEDING")]: {
        issue: "Bleeding",
        removeArmor: false,
        severity: 0.1
    },
    [GetHashKey("WEAPON_ELECTRIC_FENCE")]: {
        issue: "Electric Fence Damage",
        removeArmor: false,
        severity: 0.1
    },
    [GetHashKey("WEAPON_EXPLOSION")]: {
        issue: "Explosion Damage",
        removeArmor: false,
        severity: 10
    },
    [GetHashKey("WEAPON_FALL")]: {
        issue: "Fall Damage",
        removeArmor: false,
        severity: 0.3
    },
    [GetHashKey("WEAPON_EXHAUSTION")]: {
        issue: "Exhaustion",
        removeArmor: false,
        severity: 0.1
    },
    [GetHashKey("WEAPON_HIT_BY_WATER_CANNON")]: {
        issue: "Water Cannon Pelts",
        removeArmor: false,
        severity: 0.1
    },
    [GetHashKey("WEAPON_RAMMED_BY_CAR")]: {
        issue: "Vehicular Accident",
        removeArmor: false,
        breakBone: 10,
        bleedChance: 0.2,
        severity: 3
    },
    [GetHashKey("WEAPON_RUN_OVER_BY_CAR")]: {
        issue: "Runover by Vehicle",
        removeArmor: false,
        breakBone: 10,
        bleedChance: 0.2,
        severity: 3
    },
    [GetHashKey("WEAPON_HELI_CRASH")]: {
        issue: "Helicopter Crash",
        removeArmor: false,
        breakBone: 20,
        bleedChance: 50,
        severity: 5
    },
    [GetHashKey("WEAPON_FIRE")]: {
        issue: "Fire Damage",
        removeArmor: false,
        severity: 0.1
    },
    [GetHashKey("WEAPON_ASSAULTRIFLE")]: {
        issue: "AK 74 Bullets",
        removeArmor: true,
        breakBone: 3.5,
        bleedChance: 50,
        severity: 2.5,
        addBullet: true
    },
    [GetHashKey("WEAPON_GLOCKSAND")]: {
        issue: "Glock Bullets",
        removeArmor: true,
        breakBone: 1,
        bleedChance: 50,
        severity: 2,
        addBullet: true
    },
    [GetHashKey("WEAPON_GLOCKBLACK")]: {
        issue: "Glock Bullets",
        removeArmor: true,
        breakBone: 1,
        bleedChance: 50,
        severity: 2,
        addBullet: true
    },
    [GetHashKey("weapon_glock_fc")]: {
        issue: "Glock SMG Bullets",
        removeArmor: true,
        breakBone: 1,
        bleedChance: 50,
        severity: 2,
        addBullet: true
    },
    [GetHashKey("WEAPON_PISTOL50")]: {
        issue: "50 Cal Pistol Bullets",
        removeArmor: true,
        breakBone: 1,
        bleedChance: 80,
        severity: 5,
        addBullet: true
    },
    [GetHashKey("WEAPON_PISTOL")]: {
        issue: "M1911 Bullets",
        removeArmor: true,
        breakBone: 35,
        bleedChance: 50,
        severity: 1,
        addBullet: true
    },
    [GetHashKey("WEAPON_CARBINERIFLE")]: {
        issue: "M4 Bullets",
        removeArmor: true,
        breakBone: 23,
        bleedChance: 50,
        severity: 2.5,
        addBullet: true
    },
    [GetHashKey("weapon_ak_12")]: {
        issue: "AK 12 Bullets",
        removeArmor: true,
        breakBone: 22,
        bleedChance: 50,
        severity: 2.5,
        addBullet: true
    },
    [GetHashKey("np_mac10")]: {
        issue: "MAC 10 Bullets",
        removeArmor: true,
        breakBone: 15,
        bleedChance: 30,
        severity: 2.5,
        addBullet: true
    },
    [GetHashKey("weapon_mac_10_compact")]: {
        issue: "MAC 10 Compact Bullets",
        removeArmor: true,
        breakBone: 15,
        bleedChance: 30,
        severity: 2.5,
        addBullet: true
    },
    [GetHashKey("weapon_taser")]: {
        issue: "Taser Damage",
        removeArmor: false,
        severity: 0.1
    },
} as { [key: number]: WoundsInjury };