import hashing from "@shared/hashing";
import { Logger } from "@shared/logger";
import { Utils } from "@shared/utils";

export default class {
    #ready: boolean;
    #pending: Map<number, {
        resolve: Function;
        reject: Function;
        timeout: number;
    }>;
    #callCount: number;
    #resource: string;
    #hashing: hashing;

    constructor() {
        this.#ready = false;
        this.#pending = new Map();
        this.#callCount = GetGameTimer();
        this.#resource = GetCurrentResourceName();

        const convarId = Utils.getStringHash(`__cpx_sdk:rpc:token`);
        const token = GetConvar(convarId, "");

        this.#hashing = new hashing(token, "0x1A3E035E");

        this.#init();
    }

    #on(event: string, callback: Function) {
        const hash = this.#hashing.hashString(event);

        onNet(hash, callback);

        const hashCompressed = this.#hashing.hashString(`${event}-c`);
        onNet(Object.keys(hashCompressed)[0], (payload: any) => {
            // const source = global.source;
            const decompressed = Utils.inflate(payload);
            const unpacked = msgpack_unpack(decompressed);
            return callback(...unpacked);
        });
    }

    #emit(event: string, source: number, ...args: any[]) {
        let payload = msgpack_pack(args);
        let byteLength = payload.length;

        const hash = this.#hashing.hashString(event);

        if (byteLength < 16000) {
            TriggerClientEventInternal(hash, source as any, payload, payload.length);
        } else {
            TriggerLatentClientEventInternal(hash, source as any, payload, payload.length, 128000);
        }
    }

    #init() {
        if (this.#ready) return Logger.error("SDK RPC handlers already initialized");

        this.#on(`__rpc_res:${this.#resource}`, (reqId: number, [success, response]: [boolean, any]) => {
            const pending = this.#pending.get(reqId);
            if (!pending) return;

            clearTimeout(pending.timeout);

            if (success) {
                pending.resolve(response);
            } else {
                pending.reject(new Error(response));
            }
        });

        this.#ready = true;
        Logger.debug("SDK RPC handlers initialized");
    }

    register(event: string, callback: Function) {
        this.#on(`__rpc_req:${event}`, async (meta: any, args: any[]) => {
            const source = global.source;

            let response, success;

            const invokingResource = GetInvokingResource();
            if (invokingResource) return;

            const decoded = this.#hashing.decode(meta) as any;
            const metadata = JSON.parse(decoded);

            if (!metadata?.id || !metadata?.origin) {
                return Logger.error(`[RPC] ${event} - Invalid metadata received`);
            }

            try {
                response = await callback(source, ...args);
                success = true;
            } catch (e: any) {
                response = e.message;
                success = false;
            }

            this.#emit(`__rpc_res:${metadata.origin}`, source, metadata.id, [success, response]);
        });
    }

    execute<T>(event: string, source: number, ...args: any[]): Promise<T> {
        const metadata = { id: ++this.#callCount, origin: this.#resource };

        const promise = new Promise<T>((resolve, reject) => {
            let timeout = +setTimeout(() => reject(new Error(`RPC timed out | ${event}`)), 60000);
            this.#pending.set(metadata.id, { resolve, reject, timeout });
        });

        promise.finally(() => this.#pending.delete(metadata.id));

        this.#emit(`__rpc_req:${event}`, source, this.#hashing.encode(metadata), args);

        return promise;
    }

    executeCustom<T>(event: string, source: number, options: any, ...args: any[]): Promise<T> {
        const metadata = { id: ++this.#callCount, origin: this.#resource };

        const promise = new Promise<T>((resolve, reject) => {
            let timeout = +setTimeout(() => reject(new Error(`RPC timed out | ${event}`)), options?.timeout ?? 60000);
            this.#pending.set(metadata.id, { resolve, reject, timeout });
        });

        promise.finally(() => this.#pending.delete(metadata.id));

        this.#emit(`__rpc_req:${event}`, source, this.#hashing.encode(metadata), args);

        return promise;
    }
}