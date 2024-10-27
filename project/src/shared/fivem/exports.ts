import { Utils } from "../utils";

const ReferenceCache = {} as Record<string, any>;

const getExportEventName = (resourceName: string, exportName: string) => `__cfx_export_${resourceName}_${exportName}`;

const Async = new Proxy(
    (pKey: string, pCallback: Function) => {
        const wrapperCB = (cb: Function, ...args: any) => {
            const result = pCallback(...args);
            if (result instanceof Promise) {
                result.then((promiseResult) => cb(promiseResult));
            } else {
                cb(result);
            }
        };
        const resourceName = GetCurrentResourceName();
        if (resourceName == undefined) {
            throw new Error("Failed to get resource name, are you sure you are using this in a fivem resource?");
        }
        on(getExportEventName(resourceName, pKey), (cb: Function) => {
            cb(wrapperCB);
        });
    },
    {
        apply: (cb: Function, _: any, args: any) => {
            cb(...args);
        },
        get: (_: any, resource: string) => {
            if (ReferenceCache[resource] == undefined)
                ReferenceCache[resource] = {};
            return new Proxy(
                {},
                {
                    get: (_2, key: string) => {
                        const cacheId = `${key}_async`;
                        return (...args: any) => {
                            return new Promise(async (resolve, reject) => {
                                const isNotRunning = await Utils.waitForCondition(() => GetResourceState(resource) === "started", 6e4);
                                if (isNotRunning) {
                                    return reject(`Resource ${resource} is not running`);
                                }
                                if (ReferenceCache[resource][cacheId] === undefined) {
                                    emit(getExportEventName(resource, key), (reference: any) => {
                                        ReferenceCache[resource][cacheId] = reference;
                                    });
                                    const notCached = await Utils.waitForCondition(() => ReferenceCache[resource][cacheId] !== undefined, 1e3);
                                    if (notCached) {
                                        return reject(`Failed to get export ${key} from resource ${resource}`);
                                    }
                                }
                                try {
                                    ReferenceCache[resource][cacheId](resolve, ...args);
                                } catch (e) {
                                    reject(e);
                                }
                            });
                        };
                    }
                }
            );
        }
    }
);

const Sync = new Proxy(
    (pKey: string, pCallback: Function) => {
        const resourceName = GetCurrentResourceName();
        if (resourceName == undefined) {
            throw new Error("Failed to get resource name, are you sure you are using this in a fivem resource?");
        } else if (typeof pCallback !== "function") {
            throw new Error("Callback is not a function");
        } else if (typeof pKey !== "string") {
            throw new Error("Export name must be a string");
        }
        on(getExportEventName(resourceName, pKey), (cb: Function) => {
            cb(pCallback);
        });
    },
    {
        apply: (cb: Function, _: any, args: any) => {
            cb(...args);
        },
        get: (_: any, resource: string) => {
            if (ReferenceCache[resource] == undefined)
                ReferenceCache[resource] = {};
            return new Proxy(
                {},
                {
                    get: (_2, key: string) => {
                        const cacheId = `${key}_sync`;
                        if (ReferenceCache[resource][cacheId] === undefined) {
                            emit(getExportEventName(resource, key), (reference: any) => {
                                ReferenceCache[resource][cacheId] = reference;
                            });
                            if (ReferenceCache[resource][cacheId] === undefined) {
                                if (GetResourceState(resource) !== "started") {
                                    throw new Error(`Resource ${resource} is not running`);
                                } else {
                                    throw new Error(`No such export ${key} in resource ${resource}`);
                                }
                            }
                        }
                        return (...args: any) => {
                            try {
                                return ReferenceCache[resource][cacheId](...args);
                            } catch (e) {
                                throw new Error(`An error occurred while calling export ${key} of resource ${resource} - see above for details`);
                            }
                        };
                    }
                }
            );
        }
    }
);

on("onResourceStop", (resource: string) => ReferenceCache[resource] = undefined);

export const Exports = {
    Async,
    Sync
};