/**
 * 界面随机食物类
 */
declare class Food {
    id: string;
    element: HTMLElement;
    constructor(id: string);
    get X(): number;
    get Y(): number;
    change(this: Food): void;
}
export default Food;
