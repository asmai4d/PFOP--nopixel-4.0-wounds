import { Logger } from "@shared/logger";
import { NUI } from "../nui";

export default class {
    #API_URL: string = "";
    #API_KEY: string = "";
    #ready: boolean;

    constructor() {
        this.#ready = false;

        NUI.register("__cpx_sdk:sockets:init", async () => {
            Logger.debug("Sockets", "Initializing sockets...");

            if (this.#ready) return { API_URL: this.#API_URL, API_KEY: this.#API_KEY };

            const result = await new Promise((resolve) => {
                emit("__cpx_core:sockets:init", resolve);
            }) as { API_URL?: string, API_KEY?: string };

            if (!result?.API_URL || !result?.API_KEY) return;

            this.#API_URL = result.API_URL;
            this.#API_KEY = result.API_KEY;

            this.#ready = true;

            Logger.debug("Sockets", "Sockets initialized.");

            return result;
        });
    }

    register(event: string, callback: Function) {
        NUI.execute("__cpx_sdk:sockets:register", event);
        NUI.register(`__cpx_sdk:sockets:pipe:${event}`, async (data: any) => {
            return callback(data);
        });
    }

    async execute(event: string, data: any) {
        return NUI.execute("__cpx_sdk:sockets:execute", event, data);
    }
}