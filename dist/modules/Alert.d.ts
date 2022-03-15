declare type FuncitonOk = (result: TYPE_RESULT) => void;
declare class Alert {
    private static el;
    private static btn;
    private static desc;
    static handleOK(cb?: FuncitonOk): (e: Event) => void;
    static show(msg: string | undefined, cb: FuncitonOk): void;
    static hide(): void;
}
export default Alert;
