type WoundsData = {
    show: boolean;
    timeHold: number | undefined;
    time: number;
};

type InspectionWound = {
    label: string;
    damage: number;
    maxDamage: number;
    bleeding: boolean;
    broken: boolean;
    injuryList: {
        name: string;
    }[] | string[];
};

type InspectionState = {
    show: boolean;
    edit: boolean;
    wounds: { [key: string]: InspectionWound };
};

type InspectionOffset = {
    id: string;
    x: number;
    y: number;
    isLeft: boolean;
};

type InspectionItem = {
    id: string;
    item: {
        name: string;
        description: string;
        image: string;
    };
    quantity: number;
};

type WoundsPlayerState = {
    wounds: { [key: string]: InspectionWound };
};

type WoundsContextType = {
    data: () => WoundsData;
    setData: (data: WoundsData) => void;
    playerState: WoundsPlayerState;
    setPlayerState: import("solid-js/store").SetStoreFunction<WoundsPlayerState>;
    inspectionState: InspectionState;
    setInspectionState: import("solid-js/store").SetStoreFunction<InspectionState>;
    items: InspectionItem[];
    setItems: import("solid-js/store").SetStoreFunction<InspectionItem[]>;
    quickInspection: () => boolean;
    setQuickInspection: (quickInspection: boolean) => void;
};