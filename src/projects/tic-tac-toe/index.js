import { Application } from "pixi.js";
import MenuScreen from "./screens/MenuScreen";
import ScreenManager from "../../common/managers/ScreenManager";

export default class TicTacToe {
  constructor() {
    this.app = null;
    this.screenManager = null;

    this.start = this.start.bind(this);

    this.start();
  }

  async start() {
    this.app = new Application();

    await this.app.init({ background: 0xffffff, resizeTo: window });

    this.screenManager = new ScreenManager(this.app);

    document.body.appendChild(this.app.canvas);

    this.screenManager.changeScreen(MenuScreen);
  }
}
