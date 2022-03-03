/**
 * 界面随机食物类
 */
class Food {
  //定义食物对应的元素
  element: HTMLElement;
  constructor(public id: string) {
    const el = document.getElementById(id);
    if (!el) throw Error("element not found");
    this.element = el;
  }
  //定义获取食物X轴的方法
  get X() {
    return this.element.offsetLeft;
  }
  //定义获取食物Y轴的方法
  get Y() {
    return this.element.offsetTop;
  }
  change(this: Food) {
    //食物的位置最小是0px，最大是容器宽度-食物宽度 290px
    //蛇移动一次就是1格 10px
    //食物的坐标必须是0~290 10的倍数。
    const left = Math.round(Math.random() * 29) * 10;
    const top = Math.round(Math.random() * 29) * 10;
    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;
  }
}

export default Food;
