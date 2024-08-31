export default class ScreenManager {
  constructor(app) {
    this.app = app;
    this.currentScreen = null;
  }

  changeScreen(newScreenClass, ...args) {
    if (this.currentScreen && this.currentScreen.destroy) {
      this.currentScreen.destroy();
    }

    this.app.stage.removeChildren();

    this.currentScreen = new newScreenClass(this.app, this, ...args);
  }
}
