declare function debounce(fn: Function, num?: number): (this: any, ...args: any) => void;
declare function throttle(fn: Function, num?: number): (this: any, ...args: any) => void;
declare const _default: {
    debounce: typeof debounce;
    throttle: typeof throttle;
};
export default _default;
