import { Utils } from "../utils";
import { Vector2 } from "./vector2";
import { ZoneGrid } from "./zoneGrid";

export class Polyzone {
    #id: string;
    #points: Vector2[];
    #min: Vector2;
    #max: Vector2;
    #area: number;
    #size: Vector2;
    #center: Vector2;
    #grid: ZoneGrid;

    constructor(pPoints: Vector2[], pOptions = {}, pData = {}) {
        this.#id = Utils.getUUID();
        this.#points = pPoints;
    }

    #getMin() {}

    #getMax() {}

    #getCenter() {}

    #getSize() {}

    #getArea() {}

    get id() {
        return this.#id;
    }

    get center() {
        return this.#center;
    }

    get min() {
        return this.#min;
    }

    get max() {
        return this.#max;
    }

    get points() {
        return [...this.#points];
    }

    isPointInside(pPoint: Vector2) {
        return false;
    }

    addPoint(pPoint: Vector2) {
        this.#points.push(pPoint);
    }
};