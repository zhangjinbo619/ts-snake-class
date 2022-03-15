/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./common/Enum.ts":
/*!************************!*\
  !*** ./common/Enum.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RESULT": function() { return /* binding */ RESULT; }
/* harmony export */ });
var RESULT;

(function (RESULT) {
  RESULT["SUCCESS"] = "SUCCESS";
  RESULT["FAIL"] = "FAIL";
})(RESULT || (RESULT = {}));

/***/ }),

/***/ "./common/Gesture.ts":
/*!***************************!*\
  !*** ./common/Gesture.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var DIRECTION;

(function (DIRECTION) {
  DIRECTION["Right"] = "Right";
  DIRECTION["Left"] = "Left";
  DIRECTION["Up"] = "Up";
  DIRECTION["Down"] = "Down";
})(DIRECTION || (DIRECTION = {}));

class Gesture {
  constructor(id, cb) {
    this.prevX = 0;
    this.prevY = 0;
    this.touchOffset = 3; //触摸多少距离有效

    this.touchStart = e => {
      e.preventDefault();
      this.prevX = e.touches[0].pageX;
      this.prevY = e.touches[0].pageY;
    };

    this.touchMove = e => {
      let moveEndX, moveEndY, X, Y;
      e.preventDefault();
      moveEndX = e.changedTouches[0].pageX;
      moveEndY = e.changedTouches[0].pageY;
      X = moveEndX - this.prevX;
      Y = moveEndY - this.prevY;
      this.prevX = moveEndX;
      this.prevY = moveEndY;
      if (Math.abs(X) < this.touchOffset && Math.abs(Y) < this.touchOffset) return;
      console.log(Math.abs(X), Math.abs(Y));

      if (Math.abs(X) > Math.abs(Y) && X > 0) {
        // right
        this.callback(DIRECTION.Right);
      } else if (Math.abs(X) > Math.abs(Y) && X < 0) {
        // left
        this.callback(DIRECTION.Left);
      } else if (Math.abs(Y) > Math.abs(X) && Y > 0) {
        // down
        this.callback(DIRECTION.Down);
      } else if (Math.abs(Y) > Math.abs(X) && Y < 0) {
        // up
        this.callback(DIRECTION.Up);
      }
    };

    const el = document.getElementById(id);
    if (!el) throw Error('element not found');
    this.element = el;
    this.addEventListener();
    this.callback = cb;
  }

  addEventListener() {
    this.element.addEventListener('touchstart', this.touchStart, {
      passive: false
    });
    this.element.addEventListener('touchmove', this.touchMove, {
      passive: false
    });
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Gesture);

/***/ }),

/***/ "./common/Utils.ts":
/*!*************************!*\
  !*** ./common/Utils.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* 防抖函数 */
function debounce(fn, num = 500) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, num);
  };
}
/* 节流 */


function throttle(fn, num = 500) {
  let canRun = true;
  return function (...args) {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      fn.apply(this, args);
      canRun = true;
    }, num);
  };
}

/* harmony default export */ __webpack_exports__["default"] = ({
  debounce,
  throttle
});

/***/ }),

/***/ "./modules/Alert.ts":
/*!**************************!*\
  !*** ./modules/Alert.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_Enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/Enum */ "./common/Enum.ts");
var _a, _b;



class Alert {
  static handleOK(cb) {
    return e => {
      e.preventDefault();
      cb && cb(_common_Enum__WEBPACK_IMPORTED_MODULE_0__.RESULT.SUCCESS);
    };
  }

  static show(msg = "Game Over", cb) {
    this.desc.innerHTML = msg;
    this.el.style.visibility = 'visible';
    this.btn.addEventListener('click', this.handleOK(cb));
    this.btn.addEventListener('touchstart', this.handleOK(cb));
  }

  static hide() {
    this.el.style.visibility = 'hidden';
    this.btn.removeEventListener('click', this.handleOK());
    this.btn.removeEventListener('touchstart', this.handleOK());
  }

}

Alert.el = document.getElementById('alert');
Alert.btn = (_a = Alert.el) === null || _a === void 0 ? void 0 : _a.querySelector('.ok');
Alert.desc = (_b = Alert.el) === null || _b === void 0 ? void 0 : _b.querySelector('.desc');
/* harmony default export */ __webpack_exports__["default"] = (Alert);

/***/ }),

/***/ "./modules/Food.ts":
/*!*************************!*\
  !*** ./modules/Food.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/**
 * 界面随机食物类
 */
class Food {
  constructor(id) {
    this.id = id;
    const el = document.getElementById(id);
    if (!el) throw Error("element not found");
    this.element = el;
  } //定义获取食物X轴的方法


  get X() {
    return this.element.offsetLeft;
  } //定义获取食物Y轴的方法


  get Y() {
    return this.element.offsetTop;
  }

  change() {
    //食物的位置最小是0px，最大是容器宽度-食物宽度 290px
    //蛇移动一次就是1格 10px
    //食物的坐标必须是0~290 10的倍数。
    const left = Math.round(Math.random() * 29) * 10;
    const top = Math.round(Math.random() * 29) * 10;
    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Food);

/***/ }),

/***/ "./modules/GameControl.ts":
/*!********************************!*\
  !*** ./modules/GameControl.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Snake__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Snake */ "./modules/Snake.ts");
/* harmony import */ var _Food__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Food */ "./modules/Food.ts");
/* harmony import */ var _SourcePanel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SourcePanel */ "./modules/SourcePanel.ts");
/* harmony import */ var _common_Gesture__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/Gesture */ "./common/Gesture.ts");
/* harmony import */ var _common_Utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/Utils */ "./common/Utils.ts");
/* harmony import */ var _common_Enum__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/Enum */ "./common/Enum.ts");
/* harmony import */ var _Alert__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Alert */ "./modules/Alert.ts");







var DIRECTION;

(function (DIRECTION) {
  DIRECTION["ArrowUp"] = "ArrowUp";
  DIRECTION["Up"] = "Up";
  DIRECTION["ArrowDown"] = "ArrowDown";
  DIRECTION["Down"] = "Down";
  DIRECTION["ArrowLeft"] = "ArrowLeft";
  DIRECTION["Left"] = "Left";
  DIRECTION["ArrowRight"] = "ArrowRight";
  DIRECTION["Right"] = "Right";
})(DIRECTION || (DIRECTION = {})); //游戏控制器


class GameControl {
  constructor() {
    this._direction = DIRECTION.Right;
    this.isLive = true;

    this.touchHandler = dire => {
      console.log(dire);
      this.direction = dire;
    };

    this.keydownHandler = event => {
      const {
        key
      } = event;
      this.direction = key;
    }; //蛇移动方法


    this.run = () => {
      /**
       * 根据 this.direction 方向决定蛇的位置
       * 【ArrowUp Up】       top值减少
       * 【ArrowDown Down】   top值增加
       * 【ArrowLeft Left】   left值减少
       * 【ArrowRight Right】 left值增加
       */
      let X = this.snake.X;
      let Y = this.snake.Y; //TODO wasd 上下左右

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
          _Alert__WEBPACK_IMPORTED_MODULE_6__["default"].show(error.message, result => {
            result === _common_Enum__WEBPACK_IMPORTED_MODULE_5__.RESULT.SUCCESS && this.reStart();
          }); // alert(error.message);
        }

        this.isLive = false;
      } //递归定时器调用


      this.isLive && setTimeout(this.run, 300 - (this.scorcePanel.level - 1) * 30);
    };

    this.snake = new _Snake__WEBPACK_IMPORTED_MODULE_0__["default"]("snake", 0, 290, 0, 290);
    this.food = new _Food__WEBPACK_IMPORTED_MODULE_1__["default"]("food");
    this.scorcePanel = new _SourcePanel__WEBPACK_IMPORTED_MODULE_2__["default"]("score", "level");
    this.init();
  }

  set direction(val) {
    if (this.checkDirection(val)) {
      this._direction = val;
    }
  }

  get direction() {
    return this._direction;
  } //验证方向合法性


  checkDirection(next) {
    const hasDirection = (next in DIRECTION); //只响应枚举里包含的按键key

    const prev = this.direction; //不允许方向掉头，

    const up2down = (prev === DIRECTION.ArrowUp || prev === DIRECTION.Up) && (next === DIRECTION.ArrowDown || next === DIRECTION.Down);
    const down2up = (next === DIRECTION.ArrowUp || next === DIRECTION.Up) && (prev === DIRECTION.ArrowDown || prev === DIRECTION.Down);
    const left2right = (prev === DIRECTION.ArrowLeft || prev === DIRECTION.Left) && (next === DIRECTION.ArrowRight || next === DIRECTION.Right);
    const right2left = (next === DIRECTION.ArrowLeft || next === DIRECTION.Left) && (prev === DIRECTION.ArrowRight || prev === DIRECTION.Right);
    return hasDirection && !up2down && !down2up && !left2right && !right2left;
  }

  init() {
    //监听上下左右事件
    document.addEventListener("keydown", this.keydownHandler); //移动端监听事件

    new _common_Gesture__WEBPACK_IMPORTED_MODULE_3__["default"]('main-body', _common_Utils__WEBPACK_IMPORTED_MODULE_4__["default"].throttle(this.touchHandler, 16));
  } //游戏重新开始


  reStart() {
    window.location.href = window.location.href;
  } //检测蛇是否吃到食物


  checkEat(X, Y) {
    if (X === this.food.X && Y === this.food.Y) {
      this.scorcePanel.addScore();
      this.food.change();
      this.snake.addBody();
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (GameControl);

/***/ }),

/***/ "./modules/Snake.ts":
/*!**************************!*\
  !*** ./modules/Snake.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
class Snake {
  constructor(id, minX = 0, maxX = 100, minY = 0, maxY = 100) {
    var _a;

    this.id = id;
    const el = document.getElementById(id);
    const head = document.querySelector(`#${id} > div`);
    const body = (_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.getElementsByTagName("div");
    if (!el) throw Error("snake element not found");
    if (!head) throw Error("snake head element not found");
    if (!body) throw Error("snake body element not found");
    this.element = el;
    this.head = head;
    this.body = body;
    this.MIN_X = minX;
    this.MAX_X = maxX;
    this.MIN_Y = minY;
    this.MAX_Y = maxY;
  }

  set X(val) {
    //值未改变不执行
    if (this.X === val) return; //判断 左右移动超出范围抛异常

    if (val < this.MIN_X || val > this.MAX_X) {
      this.throwGameOver();
    }

    if (!this.vaildHeadPosition(val, this.Y)) this.throwGameOver();
    this.moveBody();
    this.head.style.left = val + "px";
  }

  throwGameOver() {
    throw new Error("Game Over,Snake is Dead");
  } //获取蛇X轴坐标 (其实就是蛇头的坐标)


  get X() {
    return this.head.offsetLeft;
  }

  set Y(val) {
    //值未改变不执行
    if (this.Y === val) return; //判断 上下移动超出范围抛异常

    if (val < this.MIN_Y || val > this.MAX_Y) {
      this.throwGameOver();
    }

    if (!this.vaildHeadPosition(this.X, val)) this.throwGameOver();
    this.moveBody();
    this.head.style.top = val + "px";
  } //获取蛇Y轴坐标 (其实就是蛇头的坐标)


  get Y() {
    return this.head.offsetTop;
  } //新增身体


  addBody() {
    this.element.insertAdjacentHTML("beforeend", "<div></div>");
  } //移动身体


  moveBody() {
    /**将后面身体的位置等于前一个身体的位置 */
    const len = this.body.length - 1;

    for (let i = len; i > 0; i--) {
      const item = this.body.item(i);
      const prev_item = this.body.item(i - 1);
      item.style.left = prev_item.offsetLeft + "px";
      item.style.top = prev_item.offsetTop + "px";
    }
  } //检测是否碰到身体


  vaildHeadPosition(X, Y) {
    const len = this.body.length - 1;

    for (let i = 1; i <= len; i++) {
      const item = this.body.item(i);

      if (item.offsetLeft === X && item.offsetTop === Y) {
        return false;
      }
    }

    return true;
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Snake);

/***/ }),

/***/ "./modules/SourcePanel.ts":
/*!********************************!*\
  !*** ./modules/SourcePanel.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/**
 * 积分牌、等级对象
 */
class SourcePanel {
  constructor(socreID, levelID, maxLevel = 10, upScore = 10) {
    //分数
    this.score = 0; //等级

    this.level = 1;
    const socreElement = document.getElementById(socreID);
    const levelElement = document.getElementById(levelID);
    if (!socreElement) throw Error("score element not found");
    if (!levelElement) throw Error("level element not found");
    this.levelElement = levelElement;
    this.socreElement = socreElement;
    this.maxLevel = maxLevel;
    this.upScore = upScore;
  }

  addScore() {
    this.socreElement.innerHTML = String(++this.score);

    if (this.score % this.upScore === 0) {
      this.levelUp();
    }
  }

  levelUp() {
    let {
      level,
      levelElement,
      maxLevel
    } = this;

    if (level < maxLevel) {
      this.level++;
      levelElement.innerHTML = String(this.level);
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (SourcePanel);

/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js!../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!../node_modules/less-loader/dist/cjs.js!./style/index.less":
/*!********************************************************************************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!../node_modules/less-loader/dist/cjs.js!./style/index.less ***!
  \********************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  margin: 0;\n  padding: 0;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\nhtml,\nbody {\n  height: 100%;\n}\nbody {\n  font: bold 20px \"Courier\";\n  overflow: hidden;\n}\nbutton {\n  -webkit-appearance: none;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n#main {\n  width: 360px;\n  height: 420px;\n  background-color: #b7d4a8;\n  margin: 100px auto;\n  border: 10px solid black;\n  border-radius: 40px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n}\n#main #stage {\n  width: 304px;\n  height: 304px;\n  border: 2px solid black;\n  position: relative;\n}\n#main #stage #snake > div {\n  width: 10px;\n  height: 10px;\n  background-color: #000000;\n  border: 1px solid #b7d4a8;\n  position: absolute;\n}\n#main #stage > #food {\n  left: 40px;\n  top: 100px;\n  width: 10px;\n  height: 10px;\n  position: absolute;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -ms-flex-line-pack: justify;\n      align-content: space-between;\n}\n#main #stage > #food > div {\n  width: 4px;\n  height: 4px;\n  background-color: #000000;\n  -webkit-transform: rotate(45deg);\n          transform: rotate(45deg);\n}\n#main #score-panel {\n  width: 300px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n#alert {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  position: absolute;\n  font-size: 18px;\n  width: 280px;\n  height: 80px;\n  visibility: hidden;\n  background-color: #cacfc5;\n  border: 2px solid black;\n  border-radius: 5px;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: space-evenly;\n      -ms-flex-pack: space-evenly;\n          justify-content: space-evenly;\n  padding: 5px 5px;\n}\n#alert .buttons .ok {\n  color: #000;\n  width: 90px;\n  border-radius: 6px;\n  font: bold 18px \"Courier\";\n}\n", "",{"version":3,"sources":["webpack://./style/index.less"],"names":[],"mappings":"AAIA;EACE,SAAA;EACA,UAAA;EAEA,8BAAA;UAAA,sBAAA;AAJF;AAOA;;EAEE,YAAA;AALF;AAOA;EACE,yBAAA;EACA,gBAAA;AALF;AAOA;EACE,wBAAA;EACA,6CAAA;AALF;AAQA;EACE,YAAA;EACA,aAAA;EACA,yBAAA;EACA,kBAAA;EACA,wBAAA;EACA,mBAAA;EACA,oBAAA;EAAA,oBAAA;EAAA,aAAA;EACA,4BAAA;EAAA,6BAAA;MAAA,0BAAA;UAAA,sBAAA;EACA,yBAAA;MAAA,sBAAA;UAAA,mBAAA;EACA,yBAAA;MAAA,6BAAA;AANF;AAJA;EAaI,YAAA;EACA,aAAA;EACA,uBAAA;EACA,kBAAA;AANJ;AASM;EACE,WAAA;EACA,YAAA;EACA,yBAAA;EACA,yBAAA;EAEA,kBAAA;AARR;AAWI;EACE,UAAA;EACA,UAAA;EACA,WAAA;EACA,YAAA;EAEA,kBAAA;EACA,oBAAA;EAAA,oBAAA;EAAA,aAAA;EACA,8BAAA;EAAA,6BAAA;MAAA,uBAAA;UAAA,mBAAA;EACA,mBAAA;MAAA,eAAA;EACA,yBAAA;MAAA,sBAAA;UAAA,8BAAA;EACA,2BAAA;MAAA,4BAAA;AAVN;AAWM;EACE,UAAA;EACA,WAAA;EACA,yBAAA;EAEA,gCAAA;UAAA,wBAAA;AAVR;AAnCA;EAmDI,YAAA;EACA,oBAAA;EAAA,oBAAA;EAAA,aAAA;EACA,yBAAA;MAAA,sBAAA;UAAA,8BAAA;AAbJ;AAkBA;EACE,oBAAA;EAAA,oBAAA;EAAA,aAAA;EACA,kBAAA;EACA,eAAA;EACA,YAAA;EACA,YAAA;EACA,kBAAA;EACA,yBAAA;EACA,uBAAA;EACA,kBAAA;EACA,4BAAA;EAAA,6BAAA;MAAA,0BAAA;UAAA,sBAAA;EACA,yBAAA;MAAA,sBAAA;UAAA,mBAAA;EACA,8BAAA;MAAA,2BAAA;UAAA,6BAAA;EACA,gBAAA;AAhBF;AAGA;EAgBM,WAAA;EACA,WAAA;EACA,kBAAA;EACA,yBAAA;AAhBN","sourcesContent":["//设置变量\n@bg-color: #b7d4a8;\n\n//清除默认样式\n* {\n  margin: 0;\n  padding: 0;\n  //改变盒子模型的计算方式\n  box-sizing: border-box;\n}\n\nhtml,\nbody {\n  height: 100%;\n}\nbody {\n  font: bold 20px \"Courier\";\n  overflow: hidden;\n}\nbutton {\n  -webkit-appearance: none;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n//主窗口的样式\n#main {\n  width: 360px;\n  height: 420px;\n  background-color: @bg-color;\n  margin: 100px auto;\n  border: 10px solid black;\n  border-radius: 40px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-around;\n  //设置游戏的舞台\n  #stage {\n    width: 304px;\n    height: 304px;\n    border: 2px solid black;\n    position: relative;\n    //设置蛇的样式\n    #snake {\n      & > div {\n        width: 10px;\n        height: 10px;\n        background-color: #000000;\n        border: 1px solid @bg-color;\n        //开启绝对定位\n        position: absolute;\n      }\n    }\n    & > #food {\n      left: 40px;\n      top: 100px;\n      width: 10px;\n      height: 10px;\n      //开启绝对定位\n      position: absolute;\n      display: flex;\n      flex-direction: row;\n      flex-wrap: wrap;\n      justify-content: space-between;\n      align-content: space-between;\n      & > div {\n        width: 4px;\n        height: 4px;\n        background-color: #000000;\n        //4个div旋转45°\n        transform: rotate(45deg);\n      }\n    }\n  }\n  //记分牌\n  #score-panel {\n    width: 300px;\n    display: flex;\n    justify-content: space-between;\n  }\n  //提示框\n}\n\n#alert {\n  display: flex;\n  position: absolute;\n  font-size: 18px;\n  width: 280px;\n  height: 80px;\n  visibility: hidden;\n  background-color: rgb(202, 207, 197);\n  border: 2px solid black;\n  border-radius: 5px;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-evenly;\n  padding: 5px 5px;\n  .buttons {\n    .ok {\n      color: #000;\n      width: 90px;\n      border-radius: 6px;\n      font: bold 18px \"Courier\";\n    }\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../node_modules/css-loader/dist/runtime/api.js":
/*!******************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/api.js ***!
  \******************************************************/
/***/ (function(module) {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "../node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!*************************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \*************************************************************/
/***/ (function(module) {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./style/index.less":
/*!**************************!*\
  !*** ./style/index.less ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "../node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_node_modules_less_loader_dist_cjs_js_index_less__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!../../node_modules/less-loader/dist/cjs.js!./index.less */ "../node_modules/css-loader/dist/cjs.js!../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!../node_modules/less-loader/dist/cjs.js!./style/index.less");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_node_modules_less_loader_dist_cjs_js_index_less__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_node_modules_less_loader_dist_cjs_js_index_less__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_node_modules_less_loader_dist_cjs_js_index_less__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_node_modules_less_loader_dist_cjs_js_index_less__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \*****************************************************************************/
/***/ (function(module) {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!*********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \*********************************************************************/
/***/ (function(module) {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!***********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \***********************************************************************/
/***/ (function(module) {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!***********************************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \***********************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!****************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \****************************************************************/
/***/ (function(module) {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!**********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \**********************************************************************/
/***/ (function(module) {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_index_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style/index.less */ "./style/index.less");
/* harmony import */ var _modules_GameControl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/GameControl */ "./modules/GameControl.ts");


const game = new _modules_GameControl__WEBPACK_IMPORTED_MODULE_1__["default"]();
game.run(); // setInterval(()=>console.log(game.direction),1000);
}();
/******/ })()
;
//# sourceMappingURL=main.bundle.js.map