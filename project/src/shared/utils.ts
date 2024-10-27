import { v4 as uuidv4, v5 as uuidv5 } from "uuid";
import { MathUtils } from "./math";
import pako from "pako";

function Cacheable(getValueCb: (ctx: any, ...args: any) => any, options: any) {
    const key = "_";

    const map = CacheableMap((ctx: any, _: any, ...args: any) => {
        return getValueCb(ctx, ...args);
    }, options);

    return {
        get: function (...args: any) {
            return map.get(key, ...args);
        },
        reset: function () {
            map.reset(key);
        }
    };
}

function CacheableMap(getValueCb: any, options: any) {
    const ttl = options.timeToLive || 1764;
    const cachedValues = {} as { [key: string]: { value: any, lastUpdated: number } };

    async function ensureCachedValue(key: string, ...args: any) {
        let cachedValue = cachedValues[key];

        if (!cachedValue) {
            cachedValue = { value: null, lastUpdated: 0 };
            cachedValues[key] = cachedValue;
        }

        const now = Date.now();

        if (cachedValue.lastUpdated === 0 || now - cachedValue.lastUpdated > ttl) {
            const [shouldCache, value] = await getValueCb(cachedValue, key, ...args);

            if (shouldCache) {
                cachedValue.lastUpdated = now;
                cachedValue.value = value;
            }

            return value;
        }

        return await new Promise((resolve) => setTimeout(() => resolve(cachedValue.value), 0));
    }

    return {
        get: async function (key: string, ...args: any) {
            return await ensureCachedValue(key, ...args);
        },
        reset: function (key: string) {
            const cachedValue = cachedValues[key];
            if (cachedValue) cachedValue.lastUpdated = 0;
        }
    };
}

function getUUID() {
    return uuidv4();
}

function hashString(pString: string) {
    return uuidv5(pString, uuidv5.URL);
}

function WaitForCondition(conditionCallback: () => boolean, timeoutMS: number) {
    return new Promise((resolve, reject) => {
        const start = Date.now();
        const tickId = setInterval(() => {
            const hasTimedOut = Date.now() - start > timeoutMS;
            if (conditionCallback() || hasTimedOut) {
                clearInterval(tickId);
                return resolve(hasTimedOut);
            }
        }, 1);
    });
}

function Wait(pTime: number) {
    return new Promise<void>((resolve) => setTimeout(() => resolve(), pTime));
}

function WaitForNextFrame() {
    return Wait(0);
}

export const Utils = {
    cache: Cacheable,
    cacheableMap: CacheableMap,
    waitForCondition: WaitForCondition,
    getUUID,
    getStringHash: hashString,
    wait: Wait,
    waitForNextFrame: WaitForNextFrame,
    deflate: pako.deflate,
    inflate: pako.inflate,
    ...MathUtils,
    MathUtils: MathUtils
};