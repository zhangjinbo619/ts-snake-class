import { RESULT } from '../common/Enum'
type FuncitonOk = (result: TYPE_RESULT) => void;
class Alert {
    private static el: HTMLElement = document.getElementById('alert')!;
    private static btn: HTMLElement = Alert.el?.querySelector('.ok')! as HTMLElement;
    private static desc: HTMLElement = Alert.el?.querySelector('.desc')! as HTMLElement;
    static handleOK(cb?: FuncitonOk) {
        return (e: Event) => {
            e.preventDefault();
            cb && cb(RESULT.SUCCESS)
        }
    }
    static show(msg: string = "Game Over", cb: FuncitonOk): void {
        this.desc.innerHTML = msg;
        this.el.style.visibility = 'visible';
        this.btn.addEventListener('click', this.handleOK(cb))
        this.btn.addEventListener('touchstart', this.handleOK(cb))
    }
    static hide(): void {
        this.el.style.visibility = 'hidden';
        this.btn.removeEventListener('click', this.handleOK())
        this.btn.removeEventListener('touchstart', this.handleOK())
    }
}

export default Alert;