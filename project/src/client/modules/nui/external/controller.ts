import { Exports } from "@shared/fivem/exports";
import { Utils } from "@shared/utils";

export default class {
    #resource: string;
    #ready: boolean;
    #registeredEvents: Map<string, Function>;

    constructor(resourceName: string) {
        this.#resource = resourceName;
        this.#ready = false;
        this.#registeredEvents = new Map();

        const currentResourceName = GetCurrentResourceName();

        on("onResourceStop", (resource: string) => {
            if (resource === currentResourceName) {
                for (const [event, callback] of this.#registeredEvents.entries()) {
                    Exports.Sync[this.#resource].removeNuiEvent(event);
                }
            }
        });

        on("onResourceStart", async (resource: string) => {
            if (resource === this.#resource) {
                await Utils.waitForCondition(() => GetResourceState(this.#resource) === "started", 484);

                if (this.#ready) {
                    for (const [event, callback] of this.#registeredEvents.entries()) {
                        Exports.Sync[this.#resource].removeNuiEvent(event);
                        this.register(event, callback);
                    }
                }

                this.#ready = true;
            }

            if (resource === currentResourceName) {
                await Utils.waitForCondition(() => GetResourceState(this.#resource) === "started", 484);
                this.#ready = true;
            }
        });
    }

    async execute(event: string, ...args: any) {
        return await Exports.Async[this.#resource].sendNuiEvent(event, args);
    }

    async register(event: string, callback: Function) {
        await Utils.waitForCondition(() => this.#ready, 484);

        const result = Exports.Sync[this.#resource].registerNuiEvent(event, callback);

        if (result) {
            this.#registeredEvents.set(event, callback);
        }
    }
}