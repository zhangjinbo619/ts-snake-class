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
    prevX: number = 0
    prevY: number = 0
    callback: callbackFn
    touchOffset:number = 3 //触摸多少距离有效
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
        this.prevX = e.touches[0].pageX;
        this.prevY = e.touches[0].pageY;
    }

    touchMove = (e: TouchEvent) => {
        let moveEndX: number, moveEndY: number, X: number, Y: number;
        e.preventDefault();
        moveEndX = e.changedTouches[0].pageX;
        moveEndY = e.changedTouches[0].pageY;
        X = moveEndX - this.prevX;
        Y = moveEndY - this.prevY;
        this.prevX = moveEndX;
        this.prevY = moveEndY;
        if (Math.abs(X) < this.touchOffset && Math.abs(Y) < this.touchOffset) return;
        console.log(Math.abs(X),Math.abs(Y))

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