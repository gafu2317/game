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

  this.load.audio("stageStart", "./public/sounds/stageStart.MP3");
  this.load.audio("menuBGM", "./public/sounds/menuBGM.MP3");
}

function create() {
  const sougenImage = this.add.image(500, 300, "background-menu");
  sougenImage.setDisplaySize(1000, 600);

  const menuBGM = this.sound.add("menuBGM");
  menuBGM.play();
  menuBGM.setVolume(0.3); // 音量を0.5に設定
  menuBGM.setLoop(true); // ループ再生を有効にする

  const titleImage = this.add.image(500, 145, "title");
  const stageStart = this.sound.add("stageStart");
  //ピンゲームスタートボタン
  const PinGameStart = this.add
    .image(300, 400, "pingame")
    .setDisplaySize(300, 300);
  PinGameStart.setInteractive();
  PinGameStart.on("pointerdown", () => {
    this.scene.start("pinstage1");
    stageStart.play();
    menuBGM.stop();
  });

  const pintext = this.add
    .text(160, 300, "ピンゲームスタート")
    .setFontSize(30)
    .setColor("#ff0")
    .setFontStyle("bold"); // テキストの太さを設定
  pintext.setInteractive();
  pintext.setPadding(0, 4, 0, 0);
  pintext.on("pointerdown", () => {
    this.scene.start("pinstage1");
    stageStart.play();
    menuBGM.stop();
  });

  // タワーゲームスタートボタン
  const TowerGameStart = this.add
    .image(650, 400, "towergame")
    .setDisplaySize(300, 300);
  TowerGameStart.setInteractive();
  TowerGameStart.on("pointerdown", () => {
    this.scene.start("towerstage1");
    stageStart.play();
    menuBGM.stop();
  });

  const towertext = this.add
    .text(500, 300, "タワーゲームスタート")
    .setFontSize(30)
    .setColor("#ff0")
    .setFontStyle("bold"); // テキストの太さを設定
  towertext.setInteractive();
  towertext.setPadding(0, 4, 0, 0);
  towertext.on("pointerdown", () => {
    this.scene.start("towerstage1");
    stageStart.play();
    menuBGM.stop();
  });

  // 白い円を描画
  const graphics = this.add.graphics();
  graphics.fillStyle(0xffffff, 1); // 白い色
  graphics.fillCircle(908, 40, 20); // 円の中心座標と半径
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
      popuptitle.setPadding(0, 4, 0, 0);
      const popupmain = this.add
        .text(
          210,
          210,
          "  ユーザーの性別や年齢、国籍を問わず\n誰でも遊べるゲームのことです。\n\n\n\nENJOY THESE GAMES!!!"
        )
        .setFontSize(25);
      popupmain.setPadding(0, 4, 0, 0);
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
