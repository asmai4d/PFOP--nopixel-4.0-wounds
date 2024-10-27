import { type Component } from "solid-js";
import styles from "./InspectionItems.module.scss";
import { createDraggable, transformStyle } from "@thisbeyond/solid-dnd";

const InspectionItem: Component<{
    item: InspectionItem;
}> = ({
    item
}) => {
        const draggable = createDraggable(item.id);

        return (
            <div
                // @ts-ignore
                use:draggable
                class={styles.box}
                style={{
                    position: draggable.isActiveDraggable ? "absolute" : "relative",
                    cursor: "grab",
                    "margin-left": draggable.isActiveDraggable ? "-3.25vh" : 0,
                    "pointer-events": draggable.isActiveDraggable ? "none" : "all",
                    ...transformStyle(draggable.transform)
                }}
            >
                <div
                    class={styles.image}
                    style={{
                        "background-image": `url(${item.item.image})`
                    }}
                />
            </div>
        );
    };

export default InspectionItem;