export class Vector3 {
    x: number;
    y: number;
    z: number;

    constructor(x: number | Vector3 | Array<number>, y = 0, z = 0) {
        const vectors = this.#parseVectors(x, y, z);

        this.x = vectors.x;
        this.y = vectors.y;
        this.z = vectors.z;
    }

    #parseVectors(x: number | Vector3 | Vector3Type | Array<number>, y: number, z: number) {
        let coords = { x: 0, y: 0, z: 0 };

        if (x instanceof Vector3) {
            coords = x;
        } else if (x instanceof Array) {
            coords = { x: x[0], y: x[1], z: x[2] };
        } else if (typeof x === "object") {
            coords = x;
        } else {
            coords = { x, y, z };
        }

        if (typeof coords.x !== "number" || typeof coords.y !== "number" || typeof coords.z !== "number") {
            throw new Error("Invalid vector coordinates");
        }

        return coords;
    }

    equals(x: number | Vector3 | Array<number>, y: number, z: number) {
        const vectors = this.#parseVectors(x, y, z);

        return this.x === vectors.x && this.y === vectors.y && this.z === vectors.z;
    }

    add(x: number | Vector3 | Array<number>, y: number, z: number, s?: number) {
        const vectors = this.#parseVectors(x, y, z);

        this.x += s ? vectors.x * s : vectors.x;
        this.y += s ? vectors.y * s : vectors.y;
        this.z += s ? vectors.z * s : vectors.z;

        return this;
    }

    addScalar(scalar: number) {
        if (typeof scalar !== "number") {
            throw new Error("Invalid scalar");
        }

        this.x += scalar;
        this.y += scalar;
        this.z += scalar;

        return this;
    }

    sub(x: number | Vector3 | Vector3Type | Array<number>, y = 0, z = 0, s?: number) {
        const vectors = this.#parseVectors(x, y, z);

        this.x -= s ? vectors.x * s : vectors.x;
        this.y -= s ? vectors.y * s : vectors.y;
        this.z -= s ? vectors.z * s : vectors.z;

        return this;
    }

    subScalar(scalar: number) {
        if (typeof scalar !== "number") {
            throw new Error("Invalid scalar");
        }

        this.x -= scalar;
        this.y -= scalar;
        this.z -= scalar;

        return this;
    }

    multiply(x: number | Vector3 | Array<number>, y: number, z: number) {
        const vectors = this.#parseVectors(x, y, z);

        this.x *= vectors.x;
        this.y *= vectors.y;
        this.z *= vectors.z;

        return this;
    }

    multiplyScalar(scalar: number) {
        if (typeof scalar !== "number") {
            throw new Error("Invalid scalar");
        }

        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;

        return this;
    }

    divide(x: number | Vector3 | Array<number>, y: number, z: number) {
        const vectors = this.#parseVectors(x, y, z);

        this.x /= vectors.x;
        this.y /= vectors.y;
        this.z /= vectors.z;

        return this;
    }

    divideScalar(scalar: number) {
        if (typeof scalar !== "number") {
            throw new Error("Invalid scalar");
        }

        this.x /= scalar;
        this.y /= scalar;
        this.z /= scalar;

        return this;
    }

    round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);

        return this;
    }

    floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.z = Math.floor(this.z);

        return this;
    }

    ceil() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        this.z = Math.ceil(this.z);

        return this;
    }

    getCenter(x: number | Vector3 | Array<number>, y: number, z: number) {
        const vectors = this.#parseVectors(x, y, z);

        return new Vector3((this.x + vectors.x) / 2, (this.y + vectors.y) / 2, (this.z + vectors.z) / 2);
    }

    getDistance(x: number | Vector3 | Vector3Type | Array<number>, y = 0, z = 0) {
        const [x1, y1, z1] = x instanceof Array ? x : typeof x === "object" ? [x.x, x.y, x.z] : [x, y, z];

        if (typeof x1 !== "number" || typeof y1 !== "number" || typeof z1 !== "number") {
            throw new Error("Invalid vector coordinates");
        }

        const [dX, dY, dZ] = [this.x - x1, this.y - y1, this.z - z1];

        return Math.sqrt(dX * dX + dY * dY + dZ * dZ);
    }

    toArray(fractionDigits?: number) {
        if (typeof fractionDigits === "number") {
            return [
                parseFloat(this.x.toFixed(fractionDigits)),
                parseFloat(this.y.toFixed(fractionDigits)),
                parseFloat(this.z.toFixed(fractionDigits))
            ];
        }

        return [this.x, this.y, this.z];
    }

    toJSON(fractionDigits?: number) {
        if (typeof fractionDigits === "number") {
            return {
                x: parseFloat(this.x.toFixed(fractionDigits)),
                y: parseFloat(this.y.toFixed(fractionDigits)),
                z: parseFloat(this.z.toFixed(fractionDigits))
            };
        }

        return { x: this.x, y: this.y, z: this.z };
    }

    toString(fractionDigits: number) {
        return JSON.stringify(this.toJSON(fractionDigits));
    }
}