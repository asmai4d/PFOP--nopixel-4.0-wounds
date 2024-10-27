declare const msgpack_pack: any;
declare const msgpack_unpack: any;

interface Vector3Type {
    x: number;
    y: number;
    z: number;
}

declare const RPC: { 
    register<T>(name: string, callback: Function): T,
    execute<T>(name: string, ...args: any): T
};

declare const SQL: { 
    execute<T>(name: string, ...args: any): T;
    query<T>(name: string, ...args: any): T;
};

declare const CPX: any;