export class Vector2 {
    x: number;
    y: number;

    constructor(x: number | Vector2 | Array<number>, y = 0) {
        const vectors = this.#parseVectors(x, y);

        this.x = vectors.x;
        this.y = vectors.y;
    }

    #parseVectors(x: number | Vector2 | Array<number>, y: number) {
        let coords = { x: 0, y: 0 };

        if (x instanceof Vector2) {
            coords = x;
        } else if (x instanceof Array) {
            coords = { x: x[0], y: x[1] };
        } else if (typeof x === "object") {
            coords = x;
        } else {
            coords = { x, y };
        }

        if (typeof coords.x !== "number" || typeof coords.y !== "number") {
            throw new Error("Invalid vector coordinates");
        }

        return coords;
    }

    equals(x: number | Vector2 | Array<number>, y: number) {
        const vectors = this.#parseVectors(x, y);

        return this.x === vectors.x && this.y === vectors.y;
    }

    add(x: number | Vector2 | Array<number>, y: number, s?: number) {
        const vectors = this.#parseVectors(x, y);

        this.x += s ? vectors.x * s : vectors.x;
        this.y += s ? vectors.y * s : vectors.y;

        return this;
    }

    addScalar(scalar: number) {
        if (typeof scalar !== "number") {
            throw new Error("Invalid scalar");
        }

        this.x += scalar;
        this.y += scalar;

        return this;
    }

    sub(x: number | Vector2 | Array<number>, y: number, s?: number) {
        const vectors = this.#parseVectors(x, y);

        this.x -= s ? vectors.x * s : vectors.x;
        this.y -= s ? vectors.y * s : vectors.y;

        return this;
    }

    subScalar(scalar: number) {
        if (typeof scalar !== "number") {
            throw new Error("Invalid scalar");
        }

        this.x -= scalar;
        this.y -= scalar;

        return this;
    }

    multiply(x: number | Vector2 | Array<number>, y: number) {
        const vectors = this.#parseVectors(x, y);

        this.x *= vectors.x;
        this.y *= vectors.y;

        return this;
    }

    multiplyScalar(scalar: number) {
        if (typeof scalar !== "number") {
            throw new Error("Invalid scalar");
        }

        this.x *= scalar;
        this.y *= scalar;

        return this;
    }

    divide(x: number | Vector2 | Array<number>, y: number) {
        const vectors = this.#parseVectors(x, y);

        this.x /= vectors.x;
        this.y /= vectors.y;

        return this;
    }

    divideScalar(scalar: number) {
        if (typeof scalar !== "number") {
            throw new Error("Invalid scalar");
        }

        this.x /= scalar;
        this.y /= scalar;

        return this;
    }

    round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);

        return this;
    }

    floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);

        return this;
    }

    ceil() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);

        return this;
    }

    getCenter(x: number | Vector2 | Array<number>, y: number) {
        const vectors = this.#parseVectors(x, y,);

        return new Vector2((this.x + vectors.x) / 2, (this.y + vectors.y) / 2);
    }

    getDistance(x: number | Vector2 | Array<number>, y: number) {
        const [x1, y1] = x instanceof Array ? x : typeof x === "object" ? [x.x, x.y] : [x, y];

        if (typeof x1 !== "number" || typeof y1 !== "number") {
            throw new Error("Invalid vector coordinates");
        }

        const [dX, dY] = [this.x - x1, this.y - y1];

        return Math.sqrt(dX * dX + dY * dY);
    }

    toArray(fractionDigits?: number) {
        if (typeof fractionDigits === "number") {
            return [
                parseFloat(this.x.toFixed(fractionDigits)),
                parseFloat(this.y.toFixed(fractionDigits))
            ];
        }

        return [this.x, this.y];
    }

    toJSON(fractionDigits?: number) {
        if (typeof fractionDigits === "number") {
            return {
                x: parseFloat(this.x.toFixed(fractionDigits)),
                y: parseFloat(this.y.toFixed(fractionDigits))
            };
        }

        return { x: this.x, y: this.y };
    }

    toString(fractionDigits: number) {
        return JSON.stringify(this.toJSON(fractionDigits));
    }
}