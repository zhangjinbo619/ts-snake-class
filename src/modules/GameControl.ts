import Snake from "./Snake";
import Food from "./Food";
import SourcePanel from "./SourcePanel";
import Gesture from "../common/Gesture";
import Utils from "../common/Utils";
import { RESULT } from "../common/Enum";
import Alert from "./Alert";
enum DIRECTION {
  ArrowUp = "ArrowUp",
  Up = "Up",
  ArrowDown = "ArrowDown",
  Down = "Down",
  ArrowLeft = "ArrowLeft",
  Left = "Left",
  ArrowRight = "ArrowRight",
  Right = "Right",
}
//游戏控制器
class GameControl {
  snake: Snake;
  food: Food;
  scorcePanel: SourcePanel;
  _direction: string = DIRECTION.Right;
  isLive = true;
  constructor() {
    this.snake = new Snake("snake", 0, 290, 0, 290);
    this.food = new Food("food");
    this.scorcePanel = new SourcePanel("score", "level");
    this.init();
  }
  set direction(val: string) {
    if (this.checkDirection(val)) {
      this._direction = val;
    }
  }
  get direction() {
    return this._direction;
  }
  //验证方向合法性
  checkDirection(next: string) {
    const hasDirection = next in DIRECTION; //只响应枚举里包含的按键key
    const prev = this.direction;
    //不允许方向掉头，
    const up2down =
      (prev === DIRECTION.ArrowUp || prev === DIRECTION.Up) &&
      (next === DIRECTION.ArrowDown || next === DIRECTION.Down);
    const down2up =
      (next === DIRECTION.ArrowUp || next === DIRECTION.Up) &&
      (prev === DIRECTION.ArrowDown || prev === DIRECTION.Down);
    const left2right =
      (prev === DIRECTION.ArrowLeft || prev === DIRECTION.Left) &&
      (next === DIRECTION.ArrowRight || next === DIRECTION.Right);
    const right2left =
      (next === DIRECTION.ArrowLeft || next === DIRECTION.Left) &&
      (prev === DIRECTION.ArrowRight || prev === DIRECTION.Right);
    return hasDirection && !up2down && !down2up && !left2right && !right2left;
  }
  init() {
    //监听上下左右事件
    document.addEventListener("keydown", this.keydownHandler);

    //移动端监听事件
    new Gesture('main-body', Utils.throttle(this.touchHandler, 16))
  }
  touchHandler = (dire: string) => {
    console.log(dire);
    this.direction = dire
  }
  keydownHandler = (event: KeyboardEvent) => {
    const { key } = event;
    this.direction = key;
  };
  //蛇移动方法
  run = () => {
    /**
     * 根据 this.direction 方向决定蛇的位置
     * 【ArrowUp Up】       top值减少
     * 【ArrowDown Down】   top值增加
     * 【ArrowLeft Left】   left值减少
     * 【ArrowRight Right】 left值增加
     */
    let X = this.snake.X;
    let Y = this.snake.Y;
    //TODO wasd 上下左右
    switch (this.direction) {
      case DIRECTION.ArrowUp:
      case DIRECTION.Up:
        Y -= 10;
        break;

      case DIRECTION.ArrowDown:
      case DIRECTION.Down:
        Y += 10;
        break;

      case DIRECTION.ArrowLeft:
      case DIRECTION.Left:
        X -= 10;
        break;

      case DIRECTION.ArrowRight:
      case DIRECTION.Right:
        X += 10;
        break;

      default:
        break;
    }

    this.checkEat(X, Y);
    try {
      //根据计算的值更新snake 位置
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (error) {
      //ts 异常类型收敛处理
      if (error instanceof Error) {
        Alert.show(error.message, (result: TYPE_RESULT) => {
          result === RESULT.SUCCESS && this.reStart();
        })
        // alert(error.message);
      }
      this.isLive = false;
    }

    //递归定时器调用
    this.isLive &&
      setTimeout(this.run, 300 - (this.scorcePanel.level - 1) * 30);
  };
  //游戏重新开始
  reStart() {
    window.location.href = window.location.href;
  }
  //检测蛇是否吃到食物
  checkEat(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      this.scorcePanel.addScore();
      this.food.change();
      this.snake.addBody();
    }
  }
}

export default GameControl;
