/**
 * @type {Phaser.Types.Scenes.SettingsConfig}
 */
export const towerstage1 = {
  preload: preload, // 素材の読み込み時の関数
  create: create, // 画面が作られた時の関数
  update: update, // 連続実行される関数
  key: "towerstage1",
  active: false,
};

function preload() {
  // this.load.image("", "/img/tower/tower.png");タワーの画像（ボツ）
  this.load.image("tower", "/img/tower/tower2.png");
  this.load.image("inner-tower", "/img/tower/towerWall2.png");
  this.load.image("yozora", "/img/tower/towerBack10-6.jpg");
  //hはhealの略、bはbuffの略、dはdebuffの略
  this.load.image("item-h-black", "/img/tower/BlackItem.png");
  this.load.image("item-h-white", "/img/tower/WhiteItem.png");
  this.load.image("item-b-gun", "/img/tower/gun.png");
  this.load.image("item-b-stick", "/img/tower/stick.png");
  this.load.image("item-b-sword", "/img/tower/sword.png");
  this.load.image("item-d-poison", "/img/tower/poison.png");
  this.load.image("enemy-dragon", "/img/tower/dragon.png");
  this.load.image("enemy-golem", "/img/tower/golem.png");
  this.load.image("enemy-sline", "/img/tower/slime.png");

  this.load.spritesheet("human", "/img/tower/human.png", {
    frameWidth: 146, // 1フレームの幅
    frameHeight: 286, // 1フレームの高さ
  });
}

function create() {
  const background = this.add.image(500, 300, "yozora");
  background.setDisplaySize(1000, 600);

  let humanPoint = 10; //人間の攻撃力
  let blackItemPoint = 100; //プラス
  let whiteItemPoint = 200; //プラス
  let gunItemPoint = 2; //かける
  let stickItemPoint = 3; //かける
  let swordItemPoint = 4; //かける
  let poisonItemPoint = 100; //マイナス
  let slimeEnemyPoint = 100; //敵の攻撃力
  let golemEnemyPoint = 5000; //敵の攻撃力
  let dragonEnemyPoint = 10000; //敵の攻撃力

  let human;
  let blackItem;
  let whiteItem;
  let gunItem;
  let stickItem;
  let swordItem;
  let poisonItem;
  let slime;
  let golem;
  let dragon;

  humanPoint = humanPoint - 10;
  console.log(humanPoint);

  //アイテムと人間があたったときの処理
  this.physics.add.collider(human, blackItem, function () {
    humanPoint = humanPoint + blackItemPoint;
    blackItem.destroy();
  });
  this.physics.add.collider(human, whiteItem, function () {
    humanPoint = humanPoint + whiteItemPoint;
    whiteItem.destroy();
  });
  this.physics.add.collider(human, gunItem, function () {
    humanPoint = humanPoint * gunItemPoint;
    gunItem.destroy();
  });
  this.physics.add.collider(human, stickItem, function () {
    humanPoint = humanPoint * stickItemPoint;
    stickItem.destroy();
  });
  this.physics.add.collider(human, swordItem, function () {
    humanPoint = humanPoint * swordItemPoint;
    swordItem.destroy();
  });
  this.physics.add.collider(human, poisonItem, function () {
    humanPoint = humanPoint - poisonItemPoint;
    poisonItem.destroy();
  });
  this.physics.add.collider(human, slime, function () {
    humanPoint = humanPoint - slimeEnemyPoint;
    slime.destroy();
  });
  this.physics.add.collider(human, golem, function () {
    humanPoint = humanPoint - golemEnemyPoint;
    golem.destroy();
  });
  this.physics.add.collider(human, dragon, function () {
    humanPoint = humanPoint - dragonEnemyPoint;
    dragon.destroy();
  });

  //ゲームオーバーの処理
  let graphics = this.add.graphics(); //暗転用のグラフィックス
  let gameoverText;
  let gameclearText;
  let restartText;
  let returnMenuText;


  // 画面全体に配置
  graphics.fillStyle(0x000000, 0.6); // 色と透明度を指定
  graphics.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);
  graphics.setDepth(-1); //通常時は背面に置く
  if (humanPoint <= 0) {
    this.scene.start("start-menu");
    gameoverText = this.add.text(230, 70, "GAME OVER"); //ゲームオーバーの表示
    gameoverText.setDepth(1);
    restartText = this.add.text(390, 200, "リトライ");
    returnMenuText = this.add.text(420, 300, "ホーム");
    restartText.setInteractive(); // テキストをクリック可能にする
    returnMenuText.setInteractive();
    restartText.on("pointerdown", () => {
      this.scene.restart(); // ゲームの初期状態に戻す処理
    });
    returnMenuText.on("pointerdown", () => {
      this.scene.start("start-menu"); // ゲームのホーム画面に移動する処理
    });
    restartText.setDepth(1);
    graphics.setDepth(1); // 暗転用のグラフィックスを前面に表示
    returnMenuText.setDepth(1);
    console.log(gameoverText);
  }

  //ゲームクリアの処理
  if (humanPoint >= 10000) {
    this.scene.start("start-menu");
    gameclearText = this.add.text(230, 70, "GAME CLESR"); //ゲームクリアの表示
    gameclearText.setDepth(1);
    restartText = this.add.text(390, 200, "リトライ");
    returnMenuText = this.add.text(420, 300, "ホーム");
    restartText.setInteractive(); // テキストをクリック可能にする
    returnMenuText.setInteractive();
    restartText.on("pointerdown", () => {
      this.scene.restart(); // ゲームの初期状態に戻す処理
    });
    returnMenuText.on("pointerdown", () => {
      this.scene.start("start-menu"); // ゲームのホーム画面に移動する処理
    });
    restartText.setDepth(1);
    graphics.setDepth(1); // 暗転用のグラフィックスを前面に表示
    returnMenuText.setDepth(1);
  }

  let escapeKey;
  let spaceKey;
  //escキーを押すとホームに戻る処理
  const input = this.input;
  escapeKey = input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
  escapeKey.on("down", () => {
    this.scene.start("start-menu");
  });
  //spaceキーを押すとやり直しができる処理
  spaceKey = input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  spaceKey.on("down", () => {
    this.scene.restart();
  });
}

function update() {}
