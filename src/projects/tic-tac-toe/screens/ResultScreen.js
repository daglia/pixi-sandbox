import { Text } from "pixi.js";
import Button from "../../../common/ui/Button";
import GameScreen from "./GameScreen";

export default class ResultScreen {
  constructor(app, screenManager, message) {
    this.app = app;
    this.screenManager = screenManager;
    this.message = message;

    this.handleRestartGame = this.handleRestartGame.bind(this);

    this.setup();
  }

  async setup() {
    const messageText = new Text({ text: this.message });
    messageText.x = this.app.screen.width / 2;
    messageText.y = this.app.screen.height / 2;
    messageText.anchor.set(0.5);

    this.app.stage.addChild(messageText);

    const restartGameBtn = new Button("Restart Game", {
      onClick: this.handleRestartGame,
    });

    restartGameBtn.x = this.app.screen.width / 2;
    restartGameBtn.y = this.app.screen.height / 2 + 60;

    this.app.stage.addChild(restartGameBtn);
  }

  handleRestartGame() {
    this.screenManager.changeScreen(GameScreen);
  }
}
