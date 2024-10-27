import type { Component } from "solid-js";
import CharacterBody from "./CharacterBody";
import styles from "./QuickInspectionGeneralStatus.module.scss";

const QuickInspectionBody: Component = () => {
    return (
        <div class={styles.generalStatus}>
            <div class={styles.text}>
                <div class={styles.title}>
                    Body
                </div>
                <div class={styles.description}>
                    View your wounds and injuries.
                </div>
            </div>
            <div class={styles.itemsList}>
                <CharacterBody />
            </div>
        </div>
    );
};

export default QuickInspectionBody;