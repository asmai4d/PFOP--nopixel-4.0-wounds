import { JSX, createContext, createSignal, useContext } from "solid-js";
import { createStore } from "solid-js/store";

const WoundsContext = createContext({});

export function useWoundsContext<T = WoundsContextType>() {
    return useContext(WoundsContext) as T;
};

export function WoundsProvider(props: {
    children: JSX.Element;
}) {
    const [data, setData] = createSignal({
        // show: false,
        // time: Date.now() + 300000,
        // timeHold: 10
    });
    const [playerState, setPlayerState] = createStore({
        wounds: {
            head: {
                label: "Head",
                damage: 100,
                maxDamage: 100,
                injuryList: ["AP Pistol Bullets", "AP Pistol Bullets", "Fall Damage"],
                bleeding: true,
                broken: true
            },
            body: {
                label: "Body",
                damage: 0,
                maxDamage: 100,
                bleeding: true,
                broken: true
            },
            leftArm: {
                label: "Left Arm",
                damage: 0,
                maxDamage: 100,
                bleeding: true,
                broken: true
            },
            rightArm: {
                label: "Right Arm",
                damage: 0,
                maxDamage: 100,
                bleeding: true,
                broken: true
            },
            leftLeg: {
                label: "Left Leg",
                damage: 0,
                maxDamage: 100,
                bleeding: true,
                broken: true
            },
            rightLeg: {
                label: "Right Leg",
                damage: 0,
                maxDamage: 100,
                bleeding: true,
                broken: true
            }
        }
    });
    const [inspectionState, setInspectionState] = createStore({
        // show: false,
        // edit: true,
        // wounds: {
        //     head: {
        //         label: "Head",
        //         damage: 0,
        //         maxDamage: 100,
        //         injuryList: ["AP Pistol Bullets", "AP Pistol Bullets", "Fall Damage"],
        //         bleeding: true,
        //         broken: true
        //     },
        //     body: {
        //         label: "Body",
        //         damage: 0,
        //         maxDamage: 100,
        //         bleeding: true,
        //         broken: true
        //     },
        //     leftArm: {
        //         label: "Left Arm",
        //         damage: 0,
        //         maxDamage: 100,
        //         bleeding: true,
        //         broken: true
        //     },
        //     rightArm: {
        //         label: "Right Arm",
        //         damage: 0,
        //         maxDamage: 100,
        //         bleeding: true,
        //         broken: true
        //     },
        //     leftLeg: {
        //         label: "Left Leg",
        //         damage: 0,
        //         maxDamage: 100,
        //         bleeding: true,
        //         broken: true
        //     },
        //     rightLeg: {
        //         label: "Right Leg",
        //         damage: 0,
        //         maxDamage: 100,
        //         bleeding: true,
        //         broken: true
        //     }
        // }
    });
    const [items, setItems] = createStore([]);
    const [quickInspection, setQuickInspection] = createSignal(true);

    return (
        <WoundsContext.Provider value={{
            data,
            setData,
            playerState,
            setPlayerState,
            inspectionState,
            setInspectionState,
            items,
            setItems,
            quickInspection,
            setQuickInspection
        }}>
            {props.children}
        </WoundsContext.Provider>
    );
};