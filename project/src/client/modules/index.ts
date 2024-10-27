import { Utils } from "@shared/utils";
import { NUI } from "./nui";

export class Resource {
    #codename: string;
    #version: string;
    #resourceName: string;
    #projectName: string;
    #apiURL: string = "";
    #apiKey: string = "";
    #ready: boolean = false;
    #onReadyCallbacks: Function[] = [];

    constructor(resource: { codename: string, version: string }) {
        const info = resource; // ResourceInfoSchema.parse(resource)

        this.#codename = info.codename;
        this.#version = info.version;
        this.#resourceName = GetCurrentResourceName();
        this.#projectName = "cool-ts-boilerplate";

        emit("__cpx_core:handshake", info, this.#init.bind(this));

        NUI.register("__cpx_core:handshake", async (info: any) => {
            if (info.codename !== this.#codename) return;

            const timedOut = await Utils.waitForCondition(() => this.#ready, 484);
            if (timedOut) return;

            return { API_URL: this.#apiURL, API_KEY: this.#apiKey };
        });
    }

    async #init(handshake: { API_URL: string, API_KEY: string }) {
        this.#apiURL = handshake.API_URL;
        this.#apiKey = handshake.API_KEY;

        this.#ready = true;

        for (const callback of this.#onReadyCallbacks) {
            callback();
        }
    }

    get codename() {
        return this.#codename;
    }

    get version() {
        return this.#version;
    }

    get isReady() {
        return this.#ready;
    }

    onReady(callback: Function) {
        if (this.#ready) {
            callback();
        } else {
            this.#onReadyCallbacks.push(callback);
        }
    }
}