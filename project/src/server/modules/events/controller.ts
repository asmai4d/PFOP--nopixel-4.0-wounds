import hashing from "@shared/hashing";
import { Utils } from "@shared/utils";

export default class {
    #hashing: hashing;

    constructor() {
        const ResourceName = GetCurrentResourceName();
        // const convarId = Utils.getStringHash(`__cpx_sdk:${ResourceName}:token`);
        const convarId = Utils.getStringHash(`__cpx_sdk:events:token`);
        const token = GetConvar(convarId, "");

        this.#hashing = new hashing(token, "0x1A3E035E");
    }

    on(event: string, callback: Function) {
        const hash = this.#hashing.hashString(event);
        return on(hash, callback);
    }

    onNet(event: string, callback: Function) {
        const hash = this.#hashing.hashString(event);
        onNet(hash, callback);

        const hashCompressed = this.#hashing.hashString(`${event}-c`);
        onNet(hashCompressed, (payload: any) => {
            const decompressed = Utils.inflate(payload);
            const unpacked = msgpack_unpack(decompressed);
            return callback(...unpacked);
        });
    }

    emit(event: string, ...args: any[]) {
        const hash = this.#hashing.hashString(event);
        return emit(hash, ...args);
    }

    emitNet(event: string, source: number, ...args: any[]) {
        let payload = msgpack_pack(args);
        let byteLength = payload.length;

        const hash = this.#hashing.hashString(event);

        if (byteLength < 5859) {
            TriggerClientEventInternal(hash, source as any, payload, payload.length);
        } else {
            TriggerLatentClientEventInternal(hash, source as any, payload, payload.length, 76003);
        }
    }
}