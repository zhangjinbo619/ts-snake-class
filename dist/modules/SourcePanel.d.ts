/**
 * 积分牌、等级对象
 */
declare class SourcePanel {
    score: number;
    level: number;
    socreElement: HTMLElement;
    levelElement: HTMLElement;
    maxLevel: number;
    private upScore;
    constructor(socreID: string, levelID: string, maxLevel?: number, upScore?: number);
    addScore(this: SourcePanel): void;
    levelUp(this: SourcePanel): void;
}
export default SourcePanel;
