import type { Component } from "solid-js";
import styles from "./InspectionHeader.module.scss";

const InspectionHeader: Component = () => {
    return (
        <div class={styles.header}>
            <svg
                width="2.59vh"
                height="2.22vh"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    filter: "drop-shadow(0px 0.37vh 1.2vh rgba(248, 105, 105, 0.55))"
                }}
            >
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.9153 0.0316983C5.31483 0.184506 3.80578 0.888524 2.57684 2.05579C0.226856 4.28771 -0.612496 7.79388 0.461395 10.8926C1.42204 13.6646 3.91646 16.73 7.72642 19.8208C9.35271 21.14 11.5985 22.7092 13.3955 23.7818C13.9278 24.0996 14.107 24.0828 14.826 23.6484C15.8053 23.0567 17.5408 21.8794 18.6231 21.0727C24.1017 16.9889 27.282 12.9861 27.9029 9.39281C28.0524 8.52769 28.027 7.29153 27.842 6.42447C26.7971 1.52835 22.029 -1.23469 17.6921 0.542825C16.8082 0.905099 16.0793 1.38394 15.348 2.08287C14.9229 2.48913 14.3333 3.19515 14.134 3.53673C14.0775 3.63353 14.0173 3.71278 14.0002 3.71278C13.983 3.71278 13.9228 3.63353 13.8663 3.53673C13.6503 3.16655 13.0651 2.4745 12.5879 2.02491C11.0314 0.558371 8.97341 -0.164768 6.9153 0.0316983Z" fill="#F86969" />
            </svg>
            <div class="flex flex-col items-start justify-start">
                <div class={styles.title}>
                    Health Inspection
                </div>
                <div class={styles.description}>
                    Inspect the patient to determine their health status.
                </div>
            </div>
            <div
                class={styles.title}
                classList={{
                    [styles.line]: true
                }}
            >
                {"/"}{"/"}{"/"}{"/"}{"/"}{"/"}{"/"}{"/"}{"/"}{"/"}{"/"}{"/"}{"/"}{"/"}
            </div>
        </div>
    );
};

export default InspectionHeader;