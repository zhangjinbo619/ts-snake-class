class Snake {
    /* 蛇头元素 */
    head: HTMLElement;
    //蛇的身体（包含蛇头）
    body: HTMLCollection;
    //蛇的容器
    element: HTMLElement;
    MAX_X: number;
    MIN_X: number;
    MAX_Y: number;
    MIN_Y: number;
    constructor(
        private id: string,
        minX: number = 0,
        maxX: number = 100,
        minY: number = 0,
        maxY: number = 100
    ) {
        const el = document.getElementById(id);
        const head = document.querySelector(`#${id} > div`);
        const body = document.getElementById(id)?.getElementsByTagName("div");
        if (!el) throw Error("snake element not found");
        if (!head) throw Error("snake head element not found");
        if (!body) throw Error("snake body element not found");
        this.element = el;
        this.head = head as HTMLElement;
        this.body = body;
        this.MIN_X = minX;
        this.MAX_X = maxX;
        this.MIN_Y = minY;
        this.MAX_Y = maxY;
    }
    set X(val: number) {
        //值未改变不执行
        if (this.X === val) return;
        //判断 左右移动超出范围抛异常
        if (val < this.MIN_X || val > this.MAX_X) {
            this.throwGameOver();
        }
        if (!this.vaildHeadPosition(val, this.Y)) this.throwGameOver();
        this.moveBody();
        this.head.style.left = val + "px";
    }
    throwGameOver(): never {
        throw new Error("Game Over,Snake is Dead");
    }
    //获取蛇X轴坐标 (其实就是蛇头的坐标)
    get X() {
        return this.head.offsetLeft;
    }
    set Y(val: number) {
        //值未改变不执行
        if (this.Y === val) return;
        //判断 上下移动超出范围抛异常
        if (val < this.MIN_Y || val > this.MAX_Y) {
            this.throwGameOver();
        }
        if (!this.vaildHeadPosition(this.X, val)) this.throwGameOver();
        this.moveBody();
        this.head.style.top = val + "px";
    }
    //获取蛇Y轴坐标 (其实就是蛇头的坐标)
    get Y() {
        return this.head.offsetTop;
    }
    //新增身体
    addBody() {
        this.element.insertAdjacentHTML("beforeend", "<div></div>");
    }
    //移动身体
    moveBody() {
        /**将后面身体的位置等于前一个身体的位置 */
        const len = this.body.length - 1;
        for (let i = len; i > 0; i--) {
            const item = this.body.item(i) as HTMLElement;
            const prev_item = this.body.item(i - 1) as HTMLElement;
            item.style.left = prev_item.offsetLeft + "px";
            item.style.top = prev_item.offsetTop + "px";
        }
    }
    //检测是否碰到身体
    vaildHeadPosition(X: number, Y: number): boolean {
        const len = this.body.length - 1;
        for (let i = 1; i <= len; i++) {
            const item = this.body.item(i) as HTMLElement;
            if (item.offsetLeft === X && item.offsetTop === Y) {
                return false;
            }
        }
        return true;
    }
}
export default Snake;
