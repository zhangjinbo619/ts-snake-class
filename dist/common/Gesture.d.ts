declare type callbackFn = (direction: string) => void;
declare class Gesture {
    element: HTMLElement;
    prevX: number;
    prevY: number;
    callback: callbackFn;
    touchOffset: number;
    constructor(id: string, cb: callbackFn);
    addEventListener(): void;
    touchStart: (e: TouchEvent) => void;
    touchMove: (e: TouchEvent) => void;
}
export default Gesture;
