import "./style/index.less";
import GameControl from "./modules/GameControl";

const game = new GameControl();
game.run();

// setInterval(()=>console.log(game.direction),1000);
