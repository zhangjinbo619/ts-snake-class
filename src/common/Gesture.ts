//手势管理
type callbackFn = (direction: string) => void
enum DIRECTION {
    Right = 'Right',
    Left = 'Left',
    Up = 'Up',
    Down = 'Down'
}
class Gesture {
    element: HTMLElement
    startX: number = 0
    startY: number = 0
    callback: callbackFn
    constructor(id: string, cb: callbackFn) {
        const el = document.getElementById(id);
        if (!el) throw Error('element not found');
        this.element = el;
        this.addEventListener();
        this.callback = cb
    }
    addEventListener() {
        this.element.addEventListener('touchstart', this.touchStart, { passive: false })
        this.element.addEventListener('touchmove', this.touchMove, { passive: false })
    }
    touchStart = (e: TouchEvent) => {
        e.preventDefault();
        this.startX = e.touches[0].pageX;
        this.startY = e.touches[0].pageY;
    }

    touchMove = (e: TouchEvent) => {
        let moveEndX: number, moveEndY: number, X: number, Y: number;
        e.preventDefault();
        moveEndX = e.changedTouches[0].pageX;
        moveEndY = e.changedTouches[0].pageY;
        X = moveEndX - this.startX;
        Y = moveEndY - this.startY;
        if (Math.abs(X) > Math.abs(Y) && X > 0) {// right
            this.callback(DIRECTION.Right)
        }
        else if (Math.abs(X) > Math.abs(Y) && X < 0) {// left
            this.callback(DIRECTION.Left)
        }
        else if (Math.abs(Y) > Math.abs(X) && Y > 0) {// down
            this.callback(DIRECTION.Down)
        }
        else if (Math.abs(Y) > Math.abs(X) && Y < 0) {// up
            this.callback(DIRECTION.Up)
        }
    }
}

export default Gesture;