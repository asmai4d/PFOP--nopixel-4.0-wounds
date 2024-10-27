import { DecodeBase64, DecodePayload, EncodePayload, EncodeString } from "../../../shared/anime";
import { Logger } from "../../../shared/logger";

export default class Controller {
    #resource: string;
    #devEnv: boolean;
    #H: any;
    #I: any;
    #O: any;
    #ready: boolean;
    #count: number;
    #queue: any[];
    #events: Map<string, any>;
    #pending: Map<number, {
        resolve: Function;
        reject: Function;
        timeout: number;
    }>;

    constructor() {
        this.#ready = false;
        this.#count = 0;
        this.#queue = [];
        this.#events = new Map();
        this.#pending = new Map();
        this.#devEnv = typeof (window as any).GetParentResourceName !== "function";
        this.#resource = this.#devEnv ? window.crypto.randomUUID() : (window as any).GetParentResourceName();

        this.#emitRaw("__cpx_sdk:init");
        this.#onRaw("__cpx_sdk:ready", this.#init.bind(this));

        window.addEventListener("message", async ({ data }) => {
            const { event, args } = data;
            if (!event) return;
            // console.log(`[NUI] Received message | Event: ${event} | Args: ${JSON.stringify(args)}`);
            const callback = this.#events?.get(event);
            // console.log(`[NUI] Events: ${JSON.stringify([...this.#events?.keys()], null, 2)}`)
            if (callback) callback(...args);
        });
    }

    #onRaw(event: string, callback: Function) {
        this.#events?.set(event, callback);
    }

    #on(event: string, callback: Function) {
        if (this.#ready) {
            const hash = EncodeString(event, this.#H);
            // console.log(`[NUI] Registering event on | Hash: ${hash} | Event: ${event}`);
            return this.#onRaw(hash, callback);
        }

        this.#queue?.push({ type: "on", event, callback });
    }

    #emitRaw(event: string, ...args: any) {
        fetch(`https://${this.#resource}/${event}`, {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            body: JSON.stringify({ args })
        });
    }

    #emit(event: string, ...args: any) {
        if (this.#ready) {
            const hash = EncodeString(event, this.#H);
            return this.#emitRaw(hash, ...args);
        }
    }

    async #init(token: string) {
        if (this.#ready) return Logger.error("NUI] SDK already initialized");

        const decoded = DecodeBase64(token);
        const tokens = decoded == null ? undefined : decoded.split(":").filter((v) => v.length > 0);
        if (!tokens || tokens.length === 0) {
            return Logger.error("SDK NUI handlers failed to initialize");
        }

        this.#H = tokens[0];
        this.#I = tokens[2];
        this.#O = tokens[1];

        this.#ready = true;

        this.#on(`__nui_res:${this.#resource}`, (id: number, [success, response]: [boolean, any]) => {
            const pending = this.#pending.get(id);
            if (!pending) return Logger.error(`[NUI] Invalid response received`);

            clearTimeout(pending.timeout);

            if (success) {
                pending.resolve(response);
            } else {
                pending.reject(response);
            }
        });

        Logger.debug("[NUI] SDK initialized");

        for (const item of this.#queue) {
            if (item.type === "on") {
                // console.log(`[NUI] [Q] Sending on | Event: ${item.event}`); // This was getting spammed???
                this.#on(item.event, item.callback);
            } else if (item.type === "emit") {
                // console.log(`[NUI] [Q] Sending emit | Event: ${item.event} | Args: ${JSON.stringify(item.args)}`);
                this.#emit(item.event, ...item.args);
            } else if (item.type === "execute") {
                const pending = this.#pending.get(item.metadata.id);
                if (!pending) {
                    Logger.error(`[RPC] ${item.event} - Failed to execute queued RPC call`);
                    continue;
                }

                pending.timeout = +setTimeout(() => pending.reject(new Error(`NUI execute timed out | ${item.event}`)), 60000);

                // console.log(`[NUI] [Q] Sending execute | ID: ${item.metadata.id} | Event: ${item.event} | Args: ${JSON.stringify(item.args)}`);
                this.#emit(item.event, EncodePayload(item.metadata, this.#O), item.args);
            }
        }
    }

    async register(event: string, callback: Function) {
        // console.log(`[NUI] Registering event | Event: ${event}`);

        this.#on(`__nui_req:${event}`, async (meta: any, args: any) => {
            // console.log(`[NUI] Received request | Event: ${event} | Args: ${JSON.stringify(args)}`);

            let response, success;

            const metadata = DecodePayload(meta, this.#I);

            // console.log("metadata", JSON.stringify(metadata, null, 2));

            if (!metadata?.id || !metadata?.resource) {
                return Logger.error(`[NUI] ${event} - Invalid metadata received`);
            }

            try {
                response = await callback(...args);
                success = true;
            } catch (e: any) {
                response = e.message;
                success = false;
            }

            // console.log(`[NUI] Received request, sending response | ID: ${metadata.id} | Event: ${event}`)
            this.#emit(`__nui_res:${metadata.resource}`, metadata.id, [success, response]);
        });
    }

    async execute<T>(event: string, ...args: any): Promise<T> {
        // console.log(`[NUI] Executing event | Event: ${event} | Args: ${JSON.stringify(args)}`);

        const metadata = { id: ++this.#count, resource: this.#resource };
        const lastArg = args[args.length - 1];
        const hasMockupData = typeof lastArg === "object" && (lastArg == null ? undefined : lastArg.mockupData);

        if (!this.#devEnv && hasMockupData) {
            args.splice(args.length - 1, 1);
        } else if (this.#devEnv && hasMockupData) {
            const delay = lastArg?.delay ?? 0;

            if (delay > 0) {
                await new Promise((resolve) => setTimeout(resolve, delay));
            }

            return lastArg?.mockupData ?? null;
        }

        const promise = new Promise<T>((resolve, reject) => {
            let timeout;

            if (this.#ready) {
                timeout = +setTimeout(() => reject(new Error(`RPC timed out | ${event}`)), 60000);
            } else {
                timeout = 0;
            }

            this.#pending?.set(metadata.id, { resolve, reject, timeout });
        });

        promise.finally(() => this.#pending?.delete(metadata.id));

        if (!this.#ready) {
            this.#queue?.push({ type: "execute", event: `__nui_req:${event}`, metadata, args });
        } else {
            // console.log(`[NUI] Sending execute | ID: ${metadata.id} | Event: ${event} | Args: ${JSON.stringify(args)}`);
            this.#emit(`__nui_req:${event}`, EncodePayload(metadata, this.#O), args);
        }

        return promise;
    }
}