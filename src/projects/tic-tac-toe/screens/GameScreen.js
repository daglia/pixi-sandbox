import { Sound } from "@pixi/sound";
import { Assets, Container, Graphics, Sprite, Text } from "pixi.js";
import ResultScreen from "./ResultScreen";

const HUD_MARGIN = 100;

export default class GameScreen {
  constructor(app, screenManager) {
    this.app = app;
    this.screenManager = screenManager;
    this.container = null;
    this.sound = Sound.from("assets/sounds/button_click.mp3");
    this.currentPlayer = "X";
    this.textureX = null;
    this.textureO = null;
    this.grid = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    this.movesMade = 0; // Added to track moves for draw condition

    this.setup();
  }

  async setup() {
    this.createHUD();
    await this.createBoard();
    await this.loadAssets();
  }

  createHUD() {
    this.container = new Container();

    const title = new Text("Tic-Tac-Toe", { fontSize: 36, fill: 0x000000 });
    title.anchor.set(0.5);
    this.container.addChild(title);

    this.container.x = this.app.screen.width / 2;
    this.container.y = HUD_MARGIN / 2;

    this.app.stage.addChild(this.container);
  }

  async createBoard() {
    this.container = new Container();

    const texture = await Assets.load("assets/images/tic-tac-toe/board.png");
    const board = new Sprite(texture);

    this.container.addChild(board);

    this.container.x = this.app.screen.width / 2;
    this.container.y = (this.app.screen.height + HUD_MARGIN) / 2;

    this.container.pivot.x = this.container.width / 2;
    this.container.pivot.y = this.container.height / 2;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const clickArea = new Graphics();
        clickArea.rect(
          i * (this.container.width / 3),
          j * (this.container.height / 3),
          this.container.width / 3,
          this.container.height / 3
        );
        clickArea.fill({ alpha: 0 });

        clickArea.interactive = true;
        clickArea.cursor = "pointer";

        clickArea.on("pointerdown", () => {
          this.makeMove(clickArea, i, j);
          this.sound.play();
        });

        this.container.addChild(clickArea);
      }
    }

    const containerScale =
      Math.min(this.app.screen.width, this.app.screen.height - HUD_MARGIN) /
      this.container.height;

    this.container.scale = containerScale;

    this.app.stage.addChild(this.container);
  }

  async loadAssets() {
    this.textureX = await Assets.load("assets/images/tic-tac-toe/x.png");
    this.textureO = await Assets.load("assets/images/tic-tac-toe/o.png");
  }

  makeMove(tile, row, col) {
    if (this.grid[row][col] !== "") return; // Check if the tile is already taken
    tile.interactive = false;

    this.grid[row][col] = this.currentPlayer;
    this.movesMade++;

    let sprite = new Sprite(this[`texture${this.currentPlayer}`]);

    const tileSizeX = this.container.width / this.container.scale.x / 3;
    const tileSizeY = this.container.height / this.container.scale.y / 3;

    sprite.x = (row + 0.5) * tileSizeX;
    sprite.y = (col + 0.5) * tileSizeY;
    sprite.anchor.set(0.5);

    this.container.addChild(sprite);

    if (this.checkWin(row, col)) {
      this.showResult(`${this.currentPlayer} wins!`);
    } else if (this.movesMade === 9) {
      this.showResult("It's a draw!");
    } else {
      this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
    }
  }

  checkWin(row, col) {
    const player = this.currentPlayer;

    // Check row
    if (this.grid[row].every((cell) => cell === player)) return true;

    // Check column
    if (this.grid.every((row) => row[col] === player)) return true;

    // Check diagonal
    if (row === col && this.grid.every((row, index) => row[index] === player))
      return true;

    // Check anti-diagonal
    if (
      row + col === 2 &&
      this.grid.every((row, index) => row[2 - index] === player)
    )
      return true;

    return false;
  }

  showResult(message) {
    this.screenManager.changeScreen(ResultScreen, message);
  }
}
