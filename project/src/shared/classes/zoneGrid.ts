import { Utils } from "../utils";
import { Vector2 } from "./vector2";

export class ZoneGrid {
    #points: Vector2[];
    #size: Vector2;
    #min: Vector2;
    #max: Vector2;
    #area: number;
    #lazy: boolean;
    #cellSize: number;
    #cellArea: number;
    #cellWidth: number;
    #cellHeight: number;
    #cells: Record<number, Record<number, boolean>>;
    #gridArea: number;

    constructor(pPoints: Vector2[], pMin: Vector2, pMax: Vector2, pSize: Vector2, pArea: number, pCellSize = 30, pLazy = false) {
        this.#points = pPoints;
        this.#size = pSize;
        this.#area = pArea;
        this.#min = pMin;
        this.#max = pMax;
        this.#lazy = pLazy;
        this.#cellSize = pCellSize;
        this.#cellWidth = this.#size.x / pCellSize;
        this.#cellHeight = this.#size.y / pCellSize;
        this.#cellArea = this.#cellWidth * this.#cellHeight;

        this.#cells = this.#getGridCells(this.#points, this.#cellSize, this.#cellWidth, this.#cellHeight, this.#lazy);
        this.#gridArea = this.#getGridArea(this.#cells, this.#cellArea);
    }

    #getGridCells(pPoints: Vector2[], pSize: number, pWidth: number, pHeight: number, pLazy: boolean) {
        const cells = {} as Record<number, Record<number, boolean>>;

        for (let x = 0; x < pSize; x++) {
            cells[x] = {};

            if (pLazy) continue;

            for (let y = 0; y < pSize; y++) {
                const inside = this.#isCellInsidePoly(x, y, pWidth, pHeight, pPoints);
                if (!inside) continue;

                cells[x][y] = true;
            }
        }

        return cells;
    }

    #getGridArea(pCells: Record<number, Record<number, boolean>>, pCellArea: number) {
        let gridArea = 0;

        for (const x in pCells) {
            for (const y in pCells[x]) {
                gridArea += pCellArea;
            }
        }

        return gridArea;
    }

    #getCellPoints(pX: number, pY: number, pWidth: number, pHeight: number) {
        const points = [];

        const x = pX * pWidth + this.#min.x;
        const y = pY * pHeight + this.#min.y;

        points.push(new Vector2(x, y));
        points.push(new Vector2(x + pWidth, y));
        points.push(new Vector2(x + pWidth, y + pHeight));
        points.push(new Vector2(x, y + pHeight));

        return points;
    }

    #isCellInsidePoly(pX: number, pY: number, pWidth: number, pHeight: number, pPoints: Vector2[]) {
        const cellPoints = this.#getCellPoints(pX, pY, pWidth, pHeight);

        let isInsidePoly = false;

        for (const point of cellPoints) {
            const windingNumber2 = Utils.windingNumber(point, pPoints);

            if (windingNumber2 !== 0) {
                isInsidePoly = true;
                break;
            }
        }

        if (!isInsidePoly) return false;

        for (let i = 0; i < cellPoints.length; i++) {
            const p0 = cellPoints[i];
            const p1 = cellPoints[(i + 1) % cellPoints.length];

            for (let j = 0; j < pPoints.length; j++) {
                const p2 = pPoints[j];
                const p3 = pPoints[(j + 1) % pPoints.length];
                if (this.#isIntersecting(p0, p1, p2, p3)) return false;
            }
        }

        return true;
    }

    #isIntersecting(pA: Vector2, pB: Vector2, pC: Vector2, pD: Vector2) {
        const denominator = (pB.x - pA.x) * (pD.y - pC.y) - (pB.y - pA.y) * (pD.x - pC.x);
        const numerator1 = (pA.y - pC.y) * (pD.x - pC.x) - (pA.x - pC.x) * (pD.y - pC.y);
        const numerator2 = (pA.y - pC.y) * (pB.x - pA.x) - (pA.x - pC.x) * (pB.y - pA.y);

        if (denominator === 0) return numerator1 === 0 && numerator2 === 0;

        const r = numerator1 / denominator;
        const s = numerator2 / denominator;

        return r >= 0 && r <= 1 && s >= 0 && s <= 1;
    }

    get cells() {
        return this.#cells;
    }

    get cellSize() {
        return this.#cellSize;
    }

    get cellWidth() {
        return this.#cellWidth;
    }

    get cellHeight() {
        return this.#cellHeight;
    }

    get gridArea() {
        return this.#gridArea;
    }

    get gridCoverage() {
        return this.#gridArea / this.#area * 100;
    }

    isPointInsideGrid(pPoint: Vector2) {
        const posX = pPoint.x - this.#min.x;
        const posY = pPoint.y - this.#min.y;

        const cellX = Math.floor(posX * this.#cellSize / this.#size.x);
        const cellY = Math.floor(posY * this.#cellSize / this.#size.y);

        let isInside = this.#cells?.[cellX]?.[cellY] ?? undefined;

        if (!isInside && this.#lazy) {
            isInside = this.#isCellInsidePoly(cellX, cellY, this.#cellWidth, this.#cellHeight, this.#points);

            this.cells[cellX][cellY] = isInside;

            if (!isInside) return false;

            this.#gridArea = this.#gridArea + this.#cellArea;
        }

        return isInside != null ? isInside : false;
    }
};