import * as CryptoJS from 'crypto-js';
import { Logger } from './logger';

export const GenerateKey = (length = 128) => {
    return CryptoJS.lib.WordArray.random(length / 8).toString();
};

export const EncodeAES = (payload: string, passphrase: string) => {
    if (typeof payload !== "string" || typeof passphrase !== "string") return "";
    return CryptoJS.AES.encrypt(payload, passphrase).toString();
};

export const DecodeAES = (payload: string, passphrase: string) => {
    if (typeof payload !== "string" || typeof passphrase !== "string") return "";
    return CryptoJS.AES.decrypt(payload, passphrase).toString(CryptoJS.enc.Utf8);
};

export const EncodeBase64 = (payload: string) => {
    if (typeof payload !== "string") return "";
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(payload));
};

export const HashHMACMD5 = (payload: string, secret: string) => {
    return EncodeBase64((0, CryptoJS.HmacMD5)(payload, secret).toString());
};

const StringCache = {} as { [key: string]: string };

export const EncodeString = (event: string, key = GenerateKey()) => {
    if (StringCache[event] === undefined) {
        StringCache[event] = HashHMACMD5(event, key);
    }

    return StringCache[event];
};

export const EncodePayload = (payload: string, key = GenerateKey()) => {
    try {
        return EncodeAES(JSON.stringify(payload), key);
    } catch (e: any) {
        Logger.error("Failed to encode payload");
    }
};

export const DecodePayload = (payload: string, key = GenerateKey()) => {
    try {
        return JSON.parse(DecodeAES(payload, key));
    } catch (e: any) {
        Logger.error("Failed to decode payload");
    }
};