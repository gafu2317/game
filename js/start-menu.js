/**
 * @type  {Phaser.Types.Scenes.SettingsConfig}
 */
export const startMenu = {
  preload: preload,
  create: create,
  key: "start-menu",
  active: false,
};

function preload() {
  this.load.image("title", "/img/title.png");
  this.load.image("background-menu", "/img/background_menu.jpg");
  this.load.image("pingame", "/img/pingame.png");
  this.load.image("question", "/img/question.png");
  this.load.image("towergame", "/img/towergame.png");
}

function create() {
  const sougenImage = this.add.image(500, 300, "background-menu");
  sougenImage.setDisplaySize(1000, 600);

  const titleImage = this.add.image(500, 145, "title");

  //ピンゲームスタートボタン
  const PinGameStart = this.add
    .image(300, 400, "pingame")
    .setDisplaySize(300, 300);
  PinGameStart.setInteractive();
  PinGameStart.on("pointerdown", () => {
    this.scene.start("pinstage1");
  });

  const pintext = this.add
    .text(160, 300, "ピンゲームスタート")
    .setFontSize(30)
    .setColor("#ff0")
    .setFontStyle("bold"); // テキストの太さを設定
  pintext.setInteractive();
  pintext.on("pointerdown", () => {
    this.scene.start("pinstage1");
  });

  // タワーゲームスタートボタン
  const TowerGameStart = this.add
    .image(650, 400, "towergame")
    .setDisplaySize(300, 300);
  TowerGameStart.setInteractive();
  TowerGameStart.on("pointerdown", () => {
    this.scene.start("towerstage1");
  });

  const towertext = this.add
    .text(500, 300, "タワーゲームスタート")
    .setFontSize(30)
    .setColor("#ff0")
    .setFontStyle("bold"); // テキストの太さを設定
  towertext.setInteractive();
  towertext.on("pointerdown", () => {
    this.scene.start("towerstage1");
  });

  const question = this.add.image(910, 40, "question").setInteractive();
  // ボタンがクリックされたときの処理
  question.on(
    "pointerdown",
    function () {
      const popupgraphics = this.add.graphics();
      popupgraphics.fillStyle(0x87ceeb, 1).fillRect(200, 100, 600, 350);
      const popuptitle = this.add
        .text(210, 130, "ハイパーカジュアルゲームとは？")
        .setFontSize(35);
      const popupmain = this.add
        .text(
          210,
          210,
          "  ユーザーの性別や年齢、国籍を問わず\n誰でも遊べるゲームのことです。\n\n\n\nENJOY THESE GAMES!!!"
        )
        .setFontSize(25);
      const closeButton = this.add
        .text(780, 100, "X")
        .setFontSize(30)
        .setColor(0xffffff, 1);
      closeButton.setInteractive();
      closeButton.on("pointerdown", function () {
        // 閉じるボタンがクリックされたときの処理
        popuptitle.destroy(); // ポップアップを破棄して閉じる
        popupmain.destroy();
        popupgraphics.destroy();
        closeButton.destroy();
      });
    },
    this
  );
}
