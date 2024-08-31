import { Application, Assets, Sprite, Text } from "pixi.js";

export default class HelloWorld {
  constructor() {
    this.app = null;
    this.ladybug = null;
    this.helloWorldText = null;

    this.setup();
  }

  async setup() {
    this.app = new Application();

    await this.app.init({ background: "#1099bb", resizeTo: window });

    document.body.appendChild(this.app.canvas);

    // Asset yükleme
    const texture = await Assets.load("assets/ladybug.png");
    // Ladybug sprite'ını oluştur
    this.ladybug = new Sprite(texture);
    this.ladybug.anchor.set(0.5);
    this.ladybug.x = this.app.screen.width / 2;
    this.ladybug.y = this.app.screen.height / 2;

    // Text objesini oluştur
    this.helloWorldText = new Text({
      text: "Hello world!",
      style: {
        fontFamily: "Arial",
        fontSize: 24,
        fill: 0xffffff,
        align: "center",
      },
    });
    this.helloWorldText.anchor.set(0.5);
    this.helloWorldText.x = this.app.screen.width / 2;
    this.helloWorldText.y = this.app.screen.height / 2 + 100;

    // Nesneleri sahneye ekle
    this.app.stage.addChild(this.ladybug);
    this.app.stage.addChild(this.helloWorldText);

    // Ticker ile animasyon başlat
    this.app.ticker.add(this.update);
  }

  update = (time) => {
    // Ladybug'u döndür
    this.ladybug.rotation += 0.05 * time.deltaTime;
  };
}
