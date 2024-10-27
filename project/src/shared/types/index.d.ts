interface Dance {
    category: string;
    dict: string;
    anim: string;
    disabled?: boolean;
}

interface Emote {
    id?: string;
    dict?: string;
    anim?: string;
    category: string;
    label?: string;
    disabled?: boolean;
    exit?: string;

    scenario?: string;
    flag?: number;
    duration?: number;
    prop?: string;
    prop2?: string;

    event?: string;

    requiredItem?: { itemId: string, variant?: string };
}

interface AnimData {
    dict: string;
    anim: string;
    flag?: number;
}

interface SyncedEmote {
    category: string;
    id: string;
    label: string;
    sender: AnimData;
    receiver: AnimData;
    flag: number;
    offset: Offset;
    cutDuration?: number;
    blendInSpeed?: number;
    blendOutSpeed?: number;
    startPhase?: number;
}

interface Offset {
    position: Vector3Type;
    rotation: Vector3Type;
}

interface Expression {
    category: string;
    label: string;
    value: string;
}

interface Placed {
    category: string;
    id: string;
    label: string;
    dict: string;
    anim: string;
    flag: number;
    duration?: number;
    scenario?: string;
    prop?: string;
    prop2?: string;
}

interface Chair {
    prop: string;
    scenario: string;
    scenarioExit?: string;
    verticalOffset: number;
    forwardOffset: number;
    leftOffset: number;
    headingOffset?: number;
}

interface Walk {
    category: string;
    label: string;
    value: string;
}

interface QuickEmote {
    category: string;
    index: number;
    value: string;
}

interface QPEmote extends QuickEmote {
    id?: number;
    type: string;
}

interface EmotesMetadata {
    animSet: string;
    expression: string;
    quickEmotes: Record<number, QuickEmote>;
}