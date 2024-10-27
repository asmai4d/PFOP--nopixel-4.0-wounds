import { For, type Component } from "solid-js";
import { useWoundsContext } from "../WoundsProvider";
import styles from "./InspectionGeneralStatus.module.scss";

import Head from "../assets/svgs/head.svg";
import Body from "../assets/svgs/body.svg";
import LeftArm from "../assets/svgs/leftArm.svg";
import RightArm from "../assets/svgs/rightArm.svg";
import LeftLeg from "../assets/svgs/leftLeg.svg";
import RightLeg from "../assets/svgs/rightLeg.svg";

const bodyParts = [{
    name: "Head",
    id: "head",
    image: Head
}, {
    name: "Body",
    id: "body",
    image: Body
}, {
    name: "Left Arm",
    id: "leftArm",
    image: LeftArm
}, {
    name: "Right Arm",
    id: "rightArm",
    image: RightArm
}, {
    name: "Left Leg",
    id: "leftLeg",
    image: LeftLeg
}, {
    name: "Right Leg",
    id: "rightLeg",
    image: RightLeg
}];

const InspectionGeneralStatus: Component = () => {
    const { inspectionState } = useWoundsContext();

    return (
        <div class={styles.generalStatus}>
            <div class={styles.text}>
                <div class={styles.title}>
                    General status of Health
                </div>
                <div class={styles.description}>
                    You can see the status of each body part below.
                </div>
            </div>
            <div class={styles.itemsList}>
                <For each={bodyParts}>
                    {(bodyPart) => (
                        <div class={styles.item}>
                            <div class={styles.box}>
                                <div
                                    class={styles.image}
                                    style={{
                                        "background-image": `url("${bodyPart.image}")`
                                    }}
                                />
                            </div>
                            <div class={styles.data}>
                                <div class={styles.text}>
                                    <div class={styles.title}>
                                        {bodyPart.name}
                                    </div>
                                </div>
                                <div class={styles.status}>
                                    {100 - Math.round(inspectionState.wounds[bodyPart.id].damage / inspectionState.wounds[bodyPart.id].maxDamage * 100)}%
                                </div>
                            </div>
                        </div>
                    )}
                </For>
            </div>
        </div>
    );
};

export default InspectionGeneralStatus;