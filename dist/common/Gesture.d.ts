declare type callbackFn = (direction: string) => void;
declare class Gesture {
    element: HTMLElement;
    startX: number;
    startY: number;
    callback: callbackFn;
    constructor(id: string, cb: callbackFn);
    addEventListener(): void;
    touchStart: (e: TouchEvent) => void;
    touchMove: (e: TouchEvent) => void;
}
export default Gesture;
