import { Sound } from "@pixi/sound";
import { Container, Graphics, Text } from "pixi.js";

export default class Button extends Container {
  constructor(text, options = {}) {
    super();

    this.interactive = true;
    this.pressed = false;
    this.sound = Sound.from("assets/sounds/button_click.mp3");

    this.defaultOptions = {
      backgroundColor: 0x3498db,
      hoverColor: 0x2980b9,
      textColor: 0xffffff,
      fontSize: 24,
      radius: 10,
      padding: 20,
      onClick: () => {},
      ...options,
    };

    this.createButton(text);
    this.setupInteractivity();
  }

  createButton(text) {
    this.children = [];

    this.buttonText = new Text({
      text,
      style: {
        fontFamily: "Helvetica",
        fontSize: this.defaultOptions.fontSize,
        fill: this.defaultOptions.textColor,
      },
    });
    this.buttonText.anchor.set(0.5);
    this.buttonText.x = 0;
    this.buttonText.y = 0;
    this.pivot.x = 0;
    this.pivot.y = 0;

    const graphics = new Graphics();
    graphics.roundRect(
      0,
      0,
      this.buttonText.width + this.defaultOptions.padding * 1.5,
      this.buttonText.height + this.defaultOptions.padding,
      this.defaultOptions.radius
    );
    graphics.pivot.x =
      this.buttonText.width / 2 + (this.defaultOptions.padding * 1.5) / 2;
    graphics.pivot.y =
      this.buttonText.height / 2 + this.defaultOptions.padding / 2;
    graphics.fill(this.defaultOptions.backgroundColor);
    this.background = graphics;

    this.addChild(this.background);
    this.addChild(this.buttonText);
  }

  setupInteractivity() {
    this.on("pointerdown", () => {
      if (!this.pressed) this.y += 4;
      this.pressed = true;
      this.sound.play();
    });

    this.on("pointerup", () => {
      if (this.pressed) this.y -= 4;
      this.pressed = false;
      this.defaultOptions.onClick();
    });

    this.on("pointerover", () => {
      this.background.tint = this.defaultOptions.hoverColor;
      this.cursor = "pointer";
    });

    this.on("pointerout", () => {
      if (this.pressed) this.y -= 4;
      this.pressed = false;
      this.background.tint = null;
    });
  }
}
