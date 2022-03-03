declare class Snake {
    private id;
    head: HTMLElement;
    body: HTMLCollection;
    element: HTMLElement;
    MAX_X: number;
    MIN_X: number;
    MAX_Y: number;
    MIN_Y: number;
    constructor(id: string, minX?: number, maxX?: number, minY?: number, maxY?: number);
    set X(val: number);
    throwGameOver(): never;
    get X(): number;
    set Y(val: number);
    get Y(): number;
    addBody(): void;
    moveBody(): void;
    vaildHeadPosition(X: number, Y: number): boolean;
}
export default Snake;
