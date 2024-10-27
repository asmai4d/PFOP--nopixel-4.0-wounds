import { For, type Component, onMount, onCleanup, Show } from "solid-js";
import { useWoundsContext } from "../WoundsProvider";
import { NUI } from "../nui/modules/nui";
import InspectionItem from "./InspectionItem";
import styles from "./InspectionItems.module.scss";

const InspectionItems: Component = () => {
    const { inspectionState, items, setItems } = useWoundsContext();

    // bandage_1, bandage_2, bandage_3, bandage_4, ifak_1, ifak_2, splint_1, splint_2

    onMount(async () => {
        const items = await NUI.execute<InspectionItem[]>("wounds:inspection:getItems", {
            mockupData: [
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
            ] as InspectionItem[]
        });
        setItems(items);
    });

    onCleanup(() => {
        setItems([]);
    });

    return (
        <Show when={inspectionState.edit && items.length > 0}>
            <div class={styles.items}>
                <div class={styles.text}>
                    <div class={styles.title}>
                        Healing items you have
                    </div>
                    <div class={styles.description}>
                        Drag and drop items onto the patient to use them.
                    </div>
                </div>
                <div class={styles.itemsList}>
                    <For each={items}>
                        {(item) => (
                            <div class={styles.item}>
                                <InspectionItem
                                    item={item}
                                />
                                <div class={styles.data}>
                                    <div class={styles.text}>
                                        <div class={styles.title}>
                                            {item.item.name}
                                        </div>
                                        <div class={styles.description}>
                                            {item.item.description}
                                        </div>
                                    </div>
                                    <div class={styles.amount}>
                                        {item.quantity}
                                    </div>
                                </div>
                            </div>
                        )}
                    </For>
                </div>
            </div>
        </Show>
    );
};

export default InspectionItems;