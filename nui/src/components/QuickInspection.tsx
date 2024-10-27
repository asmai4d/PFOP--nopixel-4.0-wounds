import { Show, onCleanup, onMount, type Component } from "solid-js";
import { useWoundsContext } from "../WoundsProvider";
import { NUI } from "../nui/modules/nui";
import { Transition } from "solid-transition-group";
import QuickInspectionHeader from "./QuickInspectionHeader";
import QuickInspectionBody from "./QuickInspectionBody";
import QuickInspectionInjuryList from "./QuickInspectionInjuryList";
import QuickInspectionGeneralStatus from "./QuickInspectionGeneralStatus";
import styles from "./QuickInspection.module.scss";

const QuickInspection: Component = () => {
    const { quickInspection, setQuickInspection } = useWoundsContext();

    NUI.register("wounds:quickInspection:show", async (data: boolean) => {
        setQuickInspection(data);
    });

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            setQuickInspection(false);
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
        <Transition name="slide-right">
            <Show when={quickInspection}>
                <div class={styles.inspection}>
                    <div class={styles.main}>
                        <div class={styles.list}>
                            <QuickInspectionHeader />
                            <div class="flex h-full w-full flex-col items-start justify-start gap-[2.4vh] overflow-auto">
                                <QuickInspectionBody />
                                <QuickInspectionInjuryList />
                                <QuickInspectionGeneralStatus />
                            </div>
                        </div>
                    </div>
                </div>
            </Show>
        </Transition>
    );
};

export default QuickInspection;