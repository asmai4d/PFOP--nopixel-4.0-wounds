import { Show, createMemo, createSignal, type Component } from "solid-js";
import { createStore } from "solid-js/store";
import { useWoundsContext } from "../WoundsProvider";
import { NUI } from "../nui/modules/nui";
import CharacterBody from "./CharacterBody";
import styles from "./Character.module.scss";

const Character: Component = () => {
    const [showWounds, setShowWounds] = createSignal(false);

    const { playerState, setPlayerState } = useWoundsContext();

    const [armor, setArmor] = createStore({
        value: 0
    });

    NUI.register("cool-wounds:setPlayerState", async (playerState: any) => {
        setPlayerState({
            ...playerState
        });

        return "OK";
    });

    NUI.register("cool-wounds:setArmor", async (armor: number) => {
        setArmor({
            value: armor
        });

        return "OK";
    });

    NUI.register("cool-wounds:show", async (show: boolean) => {
        setShowWounds(show);
        return "OK";
    });

    const bleeding = createMemo(() => playerState.wounds ? Object.values(playerState.wounds).some((wound) => wound.bleeding) : false);
    const broken = createMemo(() => playerState.wounds ? Object.values(playerState.wounds).some((wound) => wound.broken) : false);

    return (
        <Show when={createMemo(() => !!showWounds())() && Object.entries(playerState).length}>
            <div class={styles.container}>
                <CharacterBody />
                <div class="mt-auto flex flex-col items-start justify-start gap-[0.5vh]">
                    <Show when={bleeding()}>
                        <div class={styles.characterIndicator}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1.48vh" width="1.11vh" viewBox="0 0 384 512"><path fill="#ffffff" d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"></path></svg>
                        </div>
                    </Show>
                    <Show when={broken()}>
                        <div class={styles.characterIndicator}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="2.22vh" viewBox="0 -960 960 960" width="2.22vh"><path fill="#ffffff" d="M280-80v-174l-83-84q-16-17-25-37.5T161-417q23 27 55.5 42t68.5 15q31 0 58.5-11t56.5-35q2-2 5-4t5-3q2 1 5.5 3t5.5 4q29 24 56.5 35t57.5 11q37 0 69.5-15t55.5-42q-2 22-11 42.5T624-338l-84 84v174H280Zm5-320q-52 0-88.5-36.5T160-525q0-26 10-48.5t27-39.5l83-84v-183h260v182l84 84q17 17 26.5 40t9.5 49q0 52-36 88.5T535-400q-33 0-53.5-12.5T447-437q-15-12-23.5-14.5T410-454q-9 0-18.5 6T374-437q-14 12-34.5 24.5T285-400Zm621 129-195-64 26-77 195 65-26 76Zm14-169H735v-80h185v80Zm11-175-196 66-24-77 196-65 24 76Z"></path></svg>
                        </div>
                    </Show>
                </div>
            </div>
        </Show>
    );
};

export default Character;