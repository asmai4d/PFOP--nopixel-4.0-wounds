import { onMount, type Component, onCleanup, Show } from "solid-js";
import { useWoundsContext } from "../WoundsProvider";
import { NUI } from "../nui/modules/nui";
import InspectionBody from "./InspectionBody";
import InspectionHeader from "./InspectionHeader";
import InspectionItems from "./InspectionItems";
import InspectionInjuryList from "./InspectionInjuryList";
import InspectionGeneralStatus from "./InspectionGeneralStatus";
import styles from "./Inspection.module.scss";

const Inspection: Component = () => {
    const { inspectionState, setInspectionState } = useWoundsContext();

    NUI.register("wounds:inspection:data", async (data: InspectionState) => {
        setInspectionState(data);
    });

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            setInspectionState({
                show: false
            });

            NUI.execute("wounds:inspection:close");
        }
    };

    onMount(async () => {
        document.addEventListener("keydown", onKeyDown);
    });

    onCleanup(() => {
        document.removeEventListener("keydown", onKeyDown);
    });

    return (
        <Show when={inspectionState.show}>
            <div class={styles.inspection}>
                <InspectionBody />
                <div class={styles.main}>
                    <div class={styles.list}>
                        <InspectionHeader />
                        <div class="flex h-full w-full flex-col items-start justify-start gap-[2.4vh] overflow-auto">
                            <InspectionItems />
                            <InspectionInjuryList />
                            <InspectionGeneralStatus />
                        </div>
                    </div>
                    <div class={styles.lines} />
                </div>
            </div>
        </Show>
    );
};

export default Inspection;