import Button from "../../../common/ui/Button";
import GameScreen from "./GameScreen";

export default class MenuScreen {
  constructor(app, screenManager) {
    this.app = app;
    this.screenManager = screenManager;

    this.handleStartGame = this.handleStartGame.bind(this);

    this.setup();
  }

  async setup() {
    const startGameBtn = new Button("Start Game", {
      onClick: this.handleStartGame,
    });

    startGameBtn.x = this.app.screen.width / 2;
    startGameBtn.y = this.app.screen.height / 2;

    this.app.stage.addChild(startGameBtn);
  }

  handleStartGame() {
    this.screenManager.changeScreen(GameScreen);
  }
}
