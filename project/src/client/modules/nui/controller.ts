import { DecodePayload, EncodeBase64, EncodePayload, EncodeString, GenerateKey } from "@shared/anime";
import { Logger } from "@shared/logger";

export default class {
    #resource: string;
    #H: string;
    #I: string;
    #O: string;
    #ready: boolean;
    #count: number;
    #queue: any[];
    #pending: Map<number, {
        resolve: Function;
        reject: Function;
        timeout: number;
    }>;

    constructor() {
        this.#resource = GetCurrentResourceName();

        this.#H = GenerateKey(64);
        this.#I = GenerateKey(64);
        this.#O = GenerateKey(64);

        this.#ready = false;
        this.#count = 0;
        this.#queue = [];
        this.#pending = new Map();

        this.#onRaw("__cpx_sdk:init", this.#init.bind(this));
    }

    #onRaw(event: string, callback: Function) {
        RegisterNuiCallback(event, ({ args }: any, cb: Function) => {
            cb(true);
            return callback(...args);
        });
    }

    #on(event: string, callback: Function) {
        if (this.#ready) {
            const hash = EncodeString(event, this.#H);
            return this.#onRaw(hash, callback);
        }

        this.#queue.push({ type: "on", event, callback });
    }

    #emitRaw(event: string, ...args: any[]) {
        SendNuiMessage(JSON.stringify({ event, args }, null));
    }

    #emit(event: string, ...args: any[]) {
        if (this.#ready) {
            const hash = EncodeString(event, this.#H);
            return this.#emitRaw(hash, ...args);
        }

        this.#queue.push({ type: "emit", event, args });
    }

    async #init() {
        if (this.#ready) return Logger.error("[NUI] SDK already initialized");

        this.#ready = true;

        this.#on(`__nui_res:${this.#resource}`, (id: number, [success, response]: [boolean, any]) => {
            if (!id) return Logger.error(`[NUI] Invalid response received`);

            const pending = this.#pending.get(id);
            if (!pending) return Logger.error(`[NUI] Invalid response received`);

            clearTimeout(pending.timeout);

            if (success) {
                pending.resolve(response);
            } else {
                pending.reject(response);
            }
        });

        this.#emitRaw("__cpx_sdk:ready", EncodeBase64(`${this.#H}:${this.#I}:${this.#O}`));

        Logger.debug("[NUI] SDK initialized");

        for (const item of this.#queue) {
            if (item.type === "on") {
                this.#on(item.event, item.callback);
            } else if (item.type === "emit") {
                setTimeout(() => this.#emit(item.event, ...item.args), 1000);
            } else if (item.type === "execute") {
                const pending = this.#pending.get(item.metadata.id);
                if (!pending) {
                    Logger.error(`[RPC] ${item.event} - Failed to execute queued RPC call`);
                    continue;
                }

                pending.timeout = +setTimeout(() => pending.reject(new Error(`RPC timed out | ${item.event}`)), 60000);

                setTimeout(() => this.#emit(item.event, EncodePayload(item.metadata, this.#O), item.args), 1000);
            }
        }
    }

    async register(event: string, callback: Function) {
        this.#on(`__nui_req:${event}`, async (meta: any, args: any[]) => {
            let response, success;

            const metadata = DecodePayload(meta, this.#I);
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

            this.#emit(`__nui_res:${metadata.resource}`, metadata.id, [success, response]);
        });
    }

    remove(event: string) {
        const hash = EncodeString(`__nui_req:${event}`, this.#H);
        UnregisterRawNuiCallback(hash);
    }

    async execute<T = unknown>(event: string, ...args: any[]): Promise<T> {
        const metadata = { id: ++this.#count, resource: this.#resource } as any;

        const promise = new Promise<T>((resolve, reject) => {
            let timeout;

            if (this.#ready) {
                timeout = +setTimeout(() => reject(new Error(`RPC timed out | ${event}`)), 60000);
            } else {
                timeout = 0;
            }

            this.#pending.set(metadata.id, { resolve, reject, timeout });
        });

        promise.finally(() => this.#pending.delete(metadata.id));

        if (!this.#ready) {
            this.#queue.push({ type: "execute", event: `__nui_req:${event}`, metadata, args });
        } else {
            this.#emit(`__nui_req:${event}`, EncodePayload(metadata, this.#O), args);
        }

        return promise;
    }
}