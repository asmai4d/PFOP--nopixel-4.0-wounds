import { For, type Component } from "solid-js";
import { useWoundsContext } from "../WoundsProvider";
import styles from "./InspectionInjuryList.module.scss";

import Injury from "../assets/svgs/injury.svg";

const InspectionInjuryList: Component = () => {
    const { inspectionState } = useWoundsContext();

    const calculateInjuryCounts = () => Object.entries(inspectionState.wounds).reduce((wounds: any, [_bodyPartId, wound]) => wound.injuryList ? [...wounds, ...wound.injuryList] : wounds, []).reduce((acc: any, curr: any) => {
        acc[curr] ||= 0;
        acc[curr]++;
        return acc;
    }, {});

    return (
        <div class={styles.injuryList}>
            <div class={styles.text}>
                <div class={styles.title}>
                    Combined Injury List
                </div>
                <div class={styles.description}>
                    List of all injuries on the patient.
                </div>
            </div>
            <div class={styles.itemsList}>
                <For each={Object.entries(calculateInjuryCounts())}>
                    {([bodyPartId, count]) => (
                        <div class={styles.item}>
                            <div class={styles.box}>
                                <div
                                    class={styles.image}
                                    style={{
                                        "background-image": `url("${Injury}")`
                                    }}
                                />
                            </div>
                            <div class={styles.data}>
                                <div class={styles.text}>
                                    <div class={styles.title}>
                                        {bodyPartId}
                                    </div>
                                </div>
                                <div class={styles.amount}>
                                    {count as number}
                                </div>
                            </div>
                        </div>
                    )}
                </For>
            </div>
        </div>
    );
};

export default InspectionInjuryList;