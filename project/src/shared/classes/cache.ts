export class Cache {
    #map: Map<string, { value: any, expiration: number }>;
    #ttl: number;

    constructor(ttl: number) {
        this.#ttl = ttl != null ? ttl : 5;
        this.#map = new Map();
    }

    setTTL(ttl: number) {
        this.#ttl = ttl;
    }

    set(key: string, value: any, ttl: number) {
        this.#map.set(key, { value, expiration: Date.now() + (ttl != null ? ttl : this.#ttl) * 1000 });
        return this;
    }

    get(key: string, stale = false) {
        const entry = this.#map.get(key);
        const valid = entry ? stale ? true : entry.expiration > Date.now() : false;

        if (!entry || !valid) {
            if (entry) this.#map.delete(key);
            return;
        }

        return entry.value;
    }

    has(key: string, stale = false) {
        const entry = this.#map.get(key);
        const valid = entry ? stale ? true : entry.expiration > Date.now() : false;

        if (entry || !valid) {
            this.#map.delete(key);
        }

        return valid;
    }

    delete(key: string) {
        return this.#map.delete(key);
    }

    clear() {
        this.#map.clear();
    }

    values(stale = false) {
        const values = [];
        const date = Date.now();

        for (const entry of this.#map.values()) {
            if (stale || entry.expiration > date) {
                values.push(entry.value);
            }
        }

        return values;
    }

    keys(stale = false) {
        const keys = [];
        const date = Date.now();

        for (const [key, entry] of this.#map.entries()) {
            if (stale || entry.expiration > date) {
                keys.push(key);
            }
        }

        return keys;
    }

    entries(stale = false) {
        const entries = [];
        const date = Date.now();

        for (const [key, entry] of this.#map.entries()) {
            if (stale || entry.expiration > date) {
                entries.push([key, entry.value]);
            }
        }

        return entries;
    }
};