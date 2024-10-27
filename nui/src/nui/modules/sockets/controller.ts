import { EventEmitter } from "node:events";
import { NUI } from "../nui";
import { Logger } from "../../../shared/logger";

const RESERVED_EVENTS = ["ACK", "HEARTBEAT"];

export default class {
    #API_URL: string | null = null;
    #API_KEY: string | null = null;
    #connection: WebSocket | null = null;
    #connected: boolean;
    #count: number;
    #pending: Map<number, any>;
    #emitter: any;
    #reconnectHandler: Function | null = null;
    #reconnectTimeout: number | null = null;

    constructor() {
        this.#count = 0;
        this.#connected = false;
        this.#pending = new Map();
        this.#emitter = new EventEmitter();
    }

    #init(url: string, token: string) {
        this.#connected = false;

        this.#API_URL = url;
        this.#API_KEY = token;

        this.#connection = new WebSocket(`${url}?authorization=bearer%20${token}`);

        this.#connection.onopen = this.#onOpen.bind(this);
        this.#connection.onerror = this.#onError.bind(this);
        this.#connection.onclose = this.#onClose.bind(this);
        this.#connection.onmessage = this.#onMessage.bind(this);

        Logger.debug("[NUI] SDK Sockets initialized");

        return new Promise((resolve) => {
            let attempts = 0;

            clearInterval(this.#reconnectTimeout!);

            this.#reconnectTimeout = +setInterval(() => {
                if (++attempts > 100) {
                    clearInterval(this.#reconnectTimeout!);
                    resolve(false);

                    Logger.error("[NUI] SDK Sockets failed to connect");

                    return;
                }

                if (this.#connected) {
                    clearInterval(this.#reconnectTimeout!);
                    resolve(true);
                }
            }, 100);
        });
    }

    async #reconnect() {
        if (typeof this.#API_URL !== "string" || typeof this.#API_KEY !== "string") return;

        Logger.debug("[NUI] SDK Sockets reconnecting");

        const connected = await this.#init(this.#API_URL, this.#API_KEY);

        if (connected && this.#reconnectHandler) {
            this.#reconnectHandler();
        }
    }

    #onOpen() {
        Logger.debug("[NUI] SDK Sockets connected");
        this.#connected = true;
    }

    #onError(error: Event) {
        Logger.error("[NUI] SDK Sockets error", error);
    }

    #onClose(event: CloseEvent) {
        Logger.debug("[NUI] SDK Sockets closed", event);
        setTimeout(() => this.#reconnect.bind(this), 1500);
    }

    #onMessage(message: MessageEvent) {
        const { event, data } = this.#decode(message.data);
        if (!event) return;

        if (event === "HEARTBEAT") {
            this.#onHeartbeat();
        } else if (event === "ACK") {
            const { id, data: response } = data;
            this.#onResponse(id, response);
        } else {
            this.#emitter.emit(event, data);
        }
    }

    #onHeartbeat() {
        const payload = this.#encode({ event: "HEARTBEAT", data: "PONG" });
        this.#connection?.send(payload);
    }

    #onResponse(id: number, data: { success: boolean, data: any }) {
        const pending = this.#pending.get(id);
        if (!pending) return;

        clearTimeout(pending.timeout);

        pending.resolve([data.success, data.data]);
    }

    #encode(payload: any) {
        return JSON.stringify(payload);
    }

    #decode(payload: any) {
        return JSON.parse(payload);
    }

    async connect() {
        if (typeof (window as any).GetParentResourceName !== "function") {
            return this.#init("ws://localhost:5000", "dev");
        }

        const result = await NUI.execute<{ API_URL?: string, API_KEY?: string }>("__cpx_sdk:sockets:init");
        if (!result?.API_URL || !result?.API_KEY) return false;

        this.#init(result.API_URL, result.API_KEY);
    }

    on(event: string, callback: Function) {
        if (RESERVED_EVENTS.includes(event)) return;
        this.#emitter.on(event, callback);
    }

    once(event: string, callback: Function) {
        if (RESERVED_EVENTS.includes(event)) return;
        this.#emitter.once(event, callback);
    }

    off(event: string, callback: Function) {
        if (RESERVED_EVENTS.includes(event)) return;
        this.#emitter.off(event, callback);
    }

    emit(event: string, data: any) {
        if (RESERVED_EVENTS.includes(event)) return;
        const payload = this.#encode({ id: ++this.#count, event, data });
        this.#connection?.send(payload);
    }

    execute(event: string, data: any) {
        const message = { id: ++this.#count, data };

        const promise = new Promise((resolve) => {
            const timeout = +setTimeout(() => resolve([false, `Request timed out | ${event}`]), 60000);
            this.#pending.set(message.id, { resolve, timeout });
        });

        promise.finally(() => this.#pending.delete(message.id));

        const payload = this.#encode({ event, data: message });

        this.#connection?.send(payload);

        return promise;
    }

    register(event: string, callback: Function) {
        this.#emitter.on(event, async (request: any) => {
            let result;

            try {
                result = { success: true, data: await callback(request.data) };
            } catch (error: any) {
                result = { success: false, data: error.message };
            }

            const payload = this.#encode({ id: request.id, event: "ACK", data: result });

            this.#connection?.send(payload);
        });
    }

    onReconnect(callback: Function) {
        this.#reconnectHandler = callback;
    }

    get isOnline() {
        return this.#connection?.readyState === WebSocket.OPEN;
    }
}