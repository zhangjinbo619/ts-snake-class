/**
 * 积分牌、等级对象
 */
class SourcePanel {
  //分数
  score = 0;
  //等级
  level = 1;
  //分数对应元素
  socreElement: HTMLElement;
  //等级对应元素
  levelElement: HTMLElement;

  //最大等级 默认10
  maxLevel: number;

  //多少分升级 默认10
  private upScore: number;
  constructor(socreID: string, levelID: string, maxLevel = 10, upScore = 10) {
    const socreElement = document.getElementById(socreID);
    const levelElement = document.getElementById(levelID);
    if (!socreElement) throw Error("score element not found");
    if (!levelElement) throw Error("level element not found");
    this.levelElement = levelElement;
    this.socreElement = socreElement;
    this.maxLevel = maxLevel;
    this.upScore = upScore;
  }
  addScore(this: SourcePanel) {
    this.socreElement.innerHTML = String(++this.score);
    if (this.score % this.upScore === 0) {
      this.levelUp();
    }
  }
  levelUp(this: SourcePanel) {
    let { level, levelElement, maxLevel } = this;
    if (level < maxLevel) {
      this.level++;
      levelElement.innerHTML = String(this.level);
    }
  }
}

export default SourcePanel;
