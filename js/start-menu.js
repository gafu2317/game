/**git
 * @type  {Phaser.Types.Scenes.SettingsConfig}
 */
export const startMenu = {
  preload: preload,
  create: create,
  key: "start-menu",
  active: false,
};

function preload() {
  this.load.image("sougen", "/img/grassland.png");
}

function create() {
  const sougenImage = this.add.image(500, 300, "sougen");
  sougenImage.setDisplaySize(1000, 600);

  let pintext = this.add
    .text(100, 100, "ピンゲームスタート")
    .setFontSize(45)
    .setColor("#ff0")
    .setFontStyle("bold") // テキストの太さを設定
    .setBackgroundColor("#00ffff") // 背景の色を白に設定
    .setPadding(10, 5) // 背景の余白を調整
  pintext.setInteractive();
  pintext.on("pointerdown", () => {
    this.scene.start("pinstage1");
  });

  let towertext = this.add
    .text(100, 220, "タワーゲームスタート")
    .setFontSize(45)
    .setColor("#ff0")
    .setFontStyle("bold") // テキストの太さを設定
    .setBackgroundColor("#00ffff") // 背景の色を白に設定
    .setPadding(10, 5) // 背景の余白を調整
  towertext.setInteractive();
  towertext.on("pointerdown", () => {
    this.scene.start("towerstage1");
  });
}
