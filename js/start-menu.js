/**
 * @type {Phaser.Types.Core.GameConfig}
 */
export const startMenu = {
  create: create,
  key: "start-menu",
  active: false,
};

function create() {
  let text = this.add
    .text(100, 100, "ゲームスタート")
    .setFontSize(32)
    .setColor("#ff0");
  text.setInteractive();
  text.on("pointerdown", () => {
    this.scene.start("scene1");
  });
}
