/**
 * @type {Phaser.Types.Core.GameConfig}
 */
export const startMenu = {
  create: create,
  key: "start-menu",
  active: false,
};

function create() {
  let pintext = this.add
    .text(100, 100, "ピンゲームスタート")
    .setFontSize(32)
    .setColor("#ff0");
  pintext.setInteractive();
  pintext.on("pointerdown", () => {
    this.scene.start("scene1");
  });
  let towertext = this.add
    .text(100, 200, "タワーゲームスタート")
    .setFontSize(32)
    .setColor("#ff0");
  towertext.setInteractive();
  towertext.on("pointerdown", () => {
    this.scene.start("scene2");
  });
}
