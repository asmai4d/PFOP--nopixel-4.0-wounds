import { Show, type Component, onMount, createMemo } from "solid-js";
import { createStore } from "solid-js/store";
import { useWoundsContext } from "../WoundsProvider";
import { NUI } from "../nui/modules/nui";
import styles from "./Incapacitated.module.scss";

const Incapacitated: Component = () => {
    const { data, setData } = useWoundsContext();

    const [time, setTime] = createStore({
        hour: {
            first: 0,
            second: 0
        },
        minutes: {
            first: 0,
            second: 0
        },
        seconds: {
            first: 0,
            second: 0
        }
    });

    NUI.register("cool-wounds:death", async (data: WoundsData) => {
        setData(data);

        const timestamp = Math.floor(data.time / 1000);
        const hours = Math.floor(timestamp / 3600);
        const minutes = Math.floor(timestamp % 3600 / 60);
        const seconds = Math.floor(timestamp % 3600 % 60);

        setTime({
            hour: {
                first: Math.floor(hours / 10),
                second: hours % 10
            },
            minutes: {
                first: Math.floor(minutes / 10),
                second: minutes % 10
            },
            seconds: {
                first: Math.floor(seconds / 10),
                second: seconds % 10
            }
        });
    });

    return (
        <Show when={data().show}>
            <div class={styles.death}>
                <div class={styles.poly}>
                    <div class={styles.rotate}>
                        <div class={styles.title}>
                            You are incapacitated
                        </div>
                        <div class={styles.text}>
                            {createMemo(() => typeof data().timeHold == "number")() ? (
                                <span>
                                    Hold <span class={styles.red}>E {`(${data().timeHold})`}</span> to respawn or wait for the <span class={styles.red}>EMS</span>
                                </span>
                            ) : (
                                <span>
                                    You are incapacitated. Please wait for doctors, everything will be fine.
                                </span>
                            )}
                        </div>
                        <div class={styles.time}>
                            <div class={styles.rectangle}>
                                <div class={styles.rotateOpposite}>
                                    {time.minutes.first}
                                </div>
                            </div>
                            <div class={styles.rectangle}>
                                <div class={styles.rotateOpposite}>
                                    {time.minutes.second}
                                </div>
                            </div>
                            :
                            <div class={styles.rectangle}>
                                <div class={styles.rotateOpposite}>
                                    {time.seconds.first}
                                </div>
                            </div>
                            <div class={styles.rectangle}>
                                <div class={styles.rotateOpposite}>
                                    {time.seconds.second}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Show>
    );
};

export default Incapacitated;