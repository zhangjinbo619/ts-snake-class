import Snake from "./Snake";
import Food from "./Food";
import SourcePanel from "./SourcePanel";
declare class GameControl {
    snake: Snake;
    food: Food;
    scorcePanel: SourcePanel;
    _direction: string;
    isLive: boolean;
    constructor();
    set direction(val: string);
    get direction(): string;
    checkDirection(next: string): boolean;
    init(): void;
    keydownHandler: (event: KeyboardEvent) => void;
    run: () => void;
    checkEat(X: number, Y: number): void;
}
export default GameControl;
