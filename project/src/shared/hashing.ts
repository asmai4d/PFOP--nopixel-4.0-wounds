import * as CryptoJS from 'crypto-js';
import { Logger } from './logger';

export default class {
    #H: string;
    #I: string;
    #O: string;
    #cache: { [key: string]: any };

    constructor(pToken: string, pSecret: string) {
        const token = this.#decodeBase64(pToken);
        // const decoded = this.#decodeAES(token, pSecret);
        const decoded = token.split(':').map((string: string, index: number) => {
            return this.#decodeAES(string, pSecret);
        });
        const [h, i, o] = decoded; // decoded.split(':');

        this.#H = h;
        this.#I = i;
        this.#O = o;

        this.#cache = {};
    }

    #hashKey() {
        return this.#H != null ? this.#H : this.#generateKey();
    }

    #decodeKey() {
        return this.#I != null ? this.#I : this.#generateKey();
    }

    #encodeKey() {
        return this.#O != null ? this.#O : this.#generateKey();
    }

    #encodeBase64(payload: string) {
        if (typeof payload !== "string") return "";
        return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(payload));
    }

    #decodeBase64(payload: string): any {
        if (typeof payload !== "string") return "";
        return CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(payload));
    }

    #encodeAES(payload: any, passphrase: string) {
        if (typeof payload !== "string" || typeof passphrase !== "string") return "";
        return CryptoJS.AES.encrypt(payload, passphrase).toString();
    }

    #decodeAES(payload: any, passphrase: string) {
        if (typeof payload !== "string" || typeof passphrase !== "string") return "";
        return CryptoJS.AES.decrypt(payload, passphrase).toString(CryptoJS.enc.Utf8);
    }

    #generateKey(length = 128) {
        return CryptoJS.lib.WordArray.random(length / 8).toString(CryptoJS.enc.Utf8);
    }

    hashString(string: string) {
        const key = this.#hashKey();
        const cache = this.#cache?.[key]?.[string] ?? undefined;

        if (cache) return cache;

        if (!this.#cache?.[key]) this.#cache[key] = {};

        const hash = this.#encodeBase64(CryptoJS.HmacMD5(string, key).toString());

        this.#cache[key][string] = hash;

        if (IsDuplicityVersion()) {
            Logger.log(`[SDK] Hash Debug | Event: ${string} | Hash: ${hash}`);
        }

        return hash;
    }

    encode(payload: any) {
        let encoded;

        const key = this.#encodeKey();

        try {
            encoded = this.#encodeAES(JSON.stringify(payload), key);
        } catch (e: any) {
            Logger.error("Failed to encode payload");
        }

        return encoded;
    }

    decode(payload: any) {
        let decoded;

        const key = this.#encodeKey(); // this.#decodeKey();

        try {
            decoded = this.#decodeAES(payload, key);
        } catch (e: any) {
            Logger.error("Failed to decode payload");
        }

        return decoded;
    }
}