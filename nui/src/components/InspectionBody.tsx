import { For, Match, Show, Switch, type Component } from "solid-js";
import { createStore } from "solid-js/store";
import { useWoundsContext } from "../WoundsProvider";
import { createDroppable, useDragDropContext, transformStyle } from "@thisbeyond/solid-dnd";
import { NUI } from "../nui/modules/nui";
import styles from "./InspectionBody.module.scss";

const InspectionBody: Component = () => {
    const { inspectionState, setItems } = useWoundsContext();

    const [inspectionOffsets, setInspectionOffsets] = createStore<InspectionOffset[]>([
        // {
        //     id: "head",
        //     isLeft: false,
        //     x: 45,
        //     y: 20
        // },
        // {
        //     id: "body",
        //     isLeft: true,
        //     x: 45,
        //     y: 50
        // },
        // {
        //     id: "leftArm",
        //     isLeft: true,
        //     x: 50,
        //     y: 35
        // },
        // {
        //     id: "rightArm",
        //     isLeft: false,
        //     x: 38,
        //     y: 35
        // },
        // {
        //     id: "leftLeg",
        //     isLeft: true,
        //     x: 45,
        //     y: 70
        // },
        // {
        //     id: "rightLeg",
        //     isLeft: false,
        //     x: 39,
        //     y: 70
        // }
    ]);
    const [data, setData] = createStore({
        show: false,
        id: "",
        offset: {
            x: 0,
            y: 0,
            isLeft: false
        }
    });

    NUI.register("wounds:inspection:offsets", async (offsets: InspectionOffset[]) => {
        setInspectionOffsets(offsets);
    });

    const handleMouseEnter = (e: MouseEvent, id: string) => {
        const offset = inspectionOffsets.find((offset) => offset.id === id);

        if (offset) {
            setData({
                show: true,
                id: id,
                offset: {
                    x: e.clientX,
                    y: e.clientY,
                    isLeft: offset.isLeft
                }
            });
        }
    };

    const handleMouseLeave = (e: MouseEvent, id: string) => {
        setData({
            show: false,
            id: id,
            offset: {
                x: e.clientX,
                y: e.clientY,
                isLeft: false
            }
        });
    };

    const makeFirstLetterUppercase = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

    const dragDropContext = useDragDropContext();
    if (!dragDropContext) {
        return null;
    }

    const [, {
        onDragEnd
    }] = dragDropContext;

    onDragEnd(async (drag) => {
        const draggable = drag.draggable;
        const droppable = drag.droppable;

        if (!droppable) {
            return;
        }

        await NUI.execute("wounds:inspection:dragEnd", draggable.id, droppable.id);

        const items = await NUI.execute<InspectionItem[]>("wounds:inspection:getItems");

        if (items) {
            setItems(items);

            await NUI.execute("wounds:inspection:refreshData");
        }
    });

    return (
        <div class={styles.body}>
            <For each={inspectionOffsets}>
                {(offset) => {
                    const droppable = createDroppable(offset.id);

                    return (
                        <div
                            class={styles.status + " rounded-md hover:bg-gray-200/20"}
                            style={{
                                position: "fixed",
                                "margin-top": "-13.5vh",
                                left: offset.x + "%",
                                top: offset.y + "%",
                                transform: offset.isLeft ? "translateX(0)" : "translateX(-14.75vh)"
                            }}
                        >
                            <Switch>
                                <Match when={!offset.isLeft}>
                                    <div
                                        // @ts-ignore
                                        use:droppable
                                        class="flex flex-row items-start justify-end gap-2"
                                        style={{
                                            ...transformStyle(droppable.transform)
                                        }}
                                    >
                                        <div
                                            class={styles.button}
                                            onMouseEnter={(e) => handleMouseEnter(e, offset.id)}
                                            onMouseLeave={(e) => handleMouseLeave(e, offset.id)}
                                        >
                                            <svg
                                                width="0.74vh"
                                                height="0.9259vh"
                                                viewBox="0 0 8 10"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                style={{
                                                    transform: "rotate(180deg)"
                                                }}
                                            >
                                                <path d="M1 1L6 5L1 9" stroke="black" stroke-opacity="0.44" stroke-width="1.5" />
                                            </svg>
                                        </div>
                                        <div class="flex flex-col items-start justify-end gap-2">
                                            <div class="flex flex-col items-start justify-start">
                                                <div class={styles.title}>
                                                    {inspectionState.wounds[offset.id].label}
                                                </div>
                                                <div class={styles.state}>
                                                    {100 - Math.round(inspectionState.wounds[offset.id].damage / inspectionState.wounds[offset.id].maxDamage * 100)}% Health
                                                </div>
                                            </div>
                                            <svg width="11.75vh" height="6.11vh" viewBox="0 0 127 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3 2H62L125 65" stroke="white" stroke-opacity="0.35" />
                                                <rect width="5" height="5" fill="#00F8B9" />
                                                <rect x="122" y="61" width="5" height="5" fill="#00F8B9" />
                                            </svg>
                                        </div>
                                    </div>
                                </Match>
                                <Match when={offset.isLeft}>
                                    <div
                                        // @ts-ignore
                                        use:droppable
                                        class="flex flex-row items-start justify-end gap-2"
                                    >
                                        <div class="flex flex-col items-end justify-end gap-2">
                                            <div class="flex flex-col items-end justify-start">
                                                <div class={styles.title}>
                                                    {inspectionState.wounds[offset.id].label}
                                                </div>
                                                <div class={styles.state}>
                                                    {100 - Math.round(inspectionState.wounds[offset.id].damage / inspectionState.wounds[offset.id].maxDamage * 100)}% Health
                                                </div>
                                            </div>
                                            <svg width="11.75vh" height="6.11vh" viewBox="0 0 127 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M124 2H65L2 65" stroke="white" stroke-opacity="0.35" />
                                                <rect width="5" height="5" transform="matrix(-1 0 0 1 127 0)" fill="#00F8B9" />
                                                <rect width="5" height="5" transform="matrix(-1 0 0 1 5 61)" fill="#00F8B9" />
                                            </svg>
                                        </div>
                                        <div
                                            class={styles.button}
                                            onMouseEnter={(e) => handleMouseEnter(e, offset.id)}
                                            onMouseLeave={(e) => handleMouseLeave(e, offset.id)}
                                        >
                                            <svg width="0.74vh" height="0.9259vh" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 1L6 5L1 9" stroke="black" stroke-opacity="0.44" stroke-width="1.5" />
                                            </svg>
                                        </div>
                                    </div>
                                </Match>
                            </Switch>
                        </div>
                    );
                }}
            </For>
            <Show when={data.show}>
                <div
                    class={styles.info}
                    style={{
                        left: data.offset.x + "px",
                        top: data.offset.y + "px",
                        "margin-left": data.offset.isLeft ? "1.6vh" : "-24.33vh"
                    }}
                >
                    Information
                    <For each={Object.entries(inspectionState.wounds[data.id])}>
                        {([wound, injury]) => {
                            if (wound.includes("maxDamage") || wound.includes("damage") || wound.includes("label") || wound.includes("injuryList")) {
                                return;
                            }

                            const formattedWound = makeFirstLetterUppercase(wound);

                            if (wound.includes("bleeding") || wound.includes("broken")) {
                                injury = injury ? "Yes" : "No";
                            }

                            if (wound.includes("severity")) {
                                injury = injury;
                                injury = makeFirstLetterUppercase((injury as any).name);
                            }

                            return (
                                <div class={styles.item}>
                                    {formattedWound}
                                    <div class={styles.result}>
                                        {injury.toString()}
                                    </div>
                                </div>
                            );
                        }}
                    </For>
                </div>
            </Show>
        </div>
    );
};

export default InspectionBody;