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
  this.load.image("enemy-slime", "/img/tower/slime.png");

  this.load.audio("towerBGM", "./public/sounds/towerBGM.MP3");

  this.load.spritesheet("human", "/img/tower/human.png", {
    frameWidth: 146, // 1フレームの幅
    frameHeight: 286, // 1フレームの高さ
  });
}

let human;
let blackItem;
let whiteItem;
let gunItem;
let stickItem;
let swordItem1;
let swordItem2;
let poisonItem;
let slime1;
let slime2;
let slime3;
let golem1;
let golem2;
let golem3;
let dragon;

let humanPoint = 10; //人間の攻撃力
let whiteItemPoint = 100; //プラス
let blackItemPoint = 1000; //プラス
let gunItemPoint = 2; //かける
let stickItemPoint = 3; //かける
let swordItem1Point = 4; //かける
let swordItem2Point = 4; //かける
let poisonItemPoint = 100; //マイナス
let slime1Point = 100; //敵の攻撃力
let slime2Point = 200; //敵の攻撃力
let slime3Point = 1500; //敵の攻撃力
let golem1Point = 6000; //敵の攻撃力
let golem2Point = 12000; //敵の攻撃力
let golem3Point = 75000; //敵の攻撃力
let dragonPoint = 600000; //敵の攻撃力

//敵やアイテムの存在の判別
let blackItemDestroyed = false;
let whiteItemDestroyed = false;
let gunItemDestroyed = false;
let stickItemDestroyed = false;
let swordItem1Destroyed = false;
let swordItem2Destroyed = false;
let poisonItemDestroyed = false;
let slime1Destroyed = false;
let slime2Destroyed = false;
let slime3Destroyed = false;
let golem1Destroyed = false;
let golem2Destroyed = false;
let golem3Destroyed = false;
let dragonDestroyed = false;

//クリックの許可
let clickEnabled2 = false;
let clickEnabled3 = false;
let clickEnabled4 = false;

//人間の攻撃力
let humantext;
let slime1text;
let whiteItemtext;
let poisonItemtext;
let slime2text;
let swordItem1text;
let golem1text;
let golem2text;
let gunItemtext;
let slime3text;
let blackItemtext;
let swordItem2text;
let golem3text;
let stickItemtext;
let dragontext;

let towerBGM;

function create() {
  const background = this.add.image(500, 300, "yozora");
  background.setDisplaySize(1000, 600);

  towerBGM = this.sound.add("towerBGM");
  towerBGM.play();
  towerBGM.setVolume(0.1); // 音量を0.5に設定
  towerBGM.setLoop(true); // ループ再生を有効にする

  const towers = this.physics.add.staticGroup();

  // 同じ画像を何回も配置する
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < i; j++) {
      const x = 120 + 200 * (i - 1); // X座標
      const y = 540 + j * -108; // Y座標
      const innnerTower = this.add.image(x, y, "inner-tower"); //背景
      innnerTower.setScale(0.03, 0.0265);
      const tower = this.add.image(x, y, "tower");
      tower.setScale(0.03);
    }
  }

  //一段タワー(下から)
  human = this.physics.add.sprite(120, 555, "human");
  human.setScale(0.35);
  human.body.setAllowGravity(false);
  humantext = this.add.text(120, 555 - human.width / 3.5, humanPoint, {
    fontSize: "20px",
    fill: "#000000",
  });
  humantext.setOrigin(0.5, 0.5);
  //二段タワー
  slime1 = this.physics.add.image(320, 570, "enemy-slime");
  slime1.setScale(0.1);
  slime1.setInteractive();
  slime1.body.setAllowGravity(false);
  slime1text = this.add.text(320, 570 - human.width / 3.5, slime1Point, {
    fontSize: "20px",
    fill: "#000000",
  });
  slime1text.setOrigin(0.5, 0.5);
  whiteItem = this.physics.add.image(320, 445, "item-h-white");
  whiteItem.setScale(0.07);
  whiteItem.setInteractive();
  whiteItem.body.setAllowGravity(false);
  whiteItemtext = this.add.text(
    320,
    445 - human.width / 3.5,
    "+" + whiteItemPoint,
    { fontSize: "20px", fill: "#000000" }
  );
  whiteItemtext.setOrigin(0.5, 0.5);
  //三段タワー
  poisonItem = this.physics.add.image(520, 550, "item-d-poison");
  poisonItem.setScale(0.07);
  poisonItem.setInteractive();
  poisonItem.body.setAllowGravity(false);
  poisonItemtext = this.add.text(
    520,
    550 - human.width / 3.5,
    "-" + poisonItemPoint,
    { fontSize: "20px", fill: "#000000" }
  );
  poisonItemtext.setOrigin(0.5, 0.5);
  slime2 = this.physics.add.image(520, 463, "enemy-slime");
  slime2.setScale(0.1);
  slime2.setInteractive();
  slime2.body.setAllowGravity(false);
  slime2text = this.add.text(520, 463 - human.width / 3.5, slime2Point, {
    fontSize: "20px",
    fill: "#000000",
  });
  slime2text.setOrigin(0.5, 0.5);
  swordItem1 = this.physics.add.image(520, 337, "item-b-sword");
  swordItem1.setScale(0.07);
  swordItem1.setRotation((Math.PI * 11) / 9);
  swordItem1.setInteractive();
  swordItem1.body.setAllowGravity(false);
  swordItem1text = this.add.text(
    520,
    337 - human.width / 3.5,
    "×" + swordItem1Point,
    { fontSize: "20px", fill: "#000000" }
  );
  swordItem1text.setOrigin(0.5, 0.5);

  //四段タワー
  golem1 = this.physics.add.image(720, 551, "enemy-golem");
  golem1.setScale(0.55);
  golem1.setInteractive();
  golem1.body.setAllowGravity(false);
  golem1text = this.add.text(720, 551 - human.width / 3.5, golem1Point, {
    fontSize: "20px",
    fill: "#000000",
  });
  golem1text.setOrigin(0.5, 0.5);
  golem2 = this.physics.add.image(720, 444, "enemy-golem");
  golem2.setScale(0.55);
  golem2.setInteractive();
  golem2.body.setAllowGravity(false);
  golem2text = this.add.text(720, 444 - human.width / 3.5, golem2Point, {
    fontSize: "20px",
    fill: "#000000",
  });
  golem2text.setOrigin(0.5, 0.5);
  gunItem = this.physics.add.image(720, 340, "item-b-gun");
  gunItem.setScale(0.048);
  gunItem.setInteractive();
  gunItem.body.setAllowGravity(false);
  gunItemtext = this.add.text(
    720,
    340 - human.width / 3.5,
    "×" + gunItemPoint,
    { fontSize: "20px", fill: "#000000" }
  );
  gunItemtext.setOrigin(0.5, 0.5);
  slime3 = this.physics.add.image(720, 246, "enemy-slime");
  slime3.setScale(0.1);
  slime3.setInteractive();
  slime3.body.setAllowGravity(false);
  slime3text = this.add.text(720, 246 - human.width / 3.5, slime3Point, {
    fontSize: "20px",
    fill: "#000000",
  });
  slime3text.setOrigin(0.5, 0.5);
  //五段タワー
  blackItem = this.physics.add.image(920, 550, "item-h-black");
  blackItem.setScale(0.07);
  blackItem.setInteractive();
  blackItem.body.setAllowGravity(false);
  blackItemtext = this.add.text(
    920,
    550 - human.width / 3.5,
    "+" + blackItemPoint,
    { fontSize: "20px", fill: "#000000" }
  );
  blackItemtext.setOrigin(0.5, 0.5);
  swordItem2 = this.physics.add.image(920, 445, "item-b-sword");
  swordItem2.setScale(0.07);
  swordItem2.setInteractive();
  swordItem2.setRotation((Math.PI * 11) / 9);
  swordItem2.body.setAllowGravity(false);
  swordItem2text = this.add.text(
    920,
    445 - human.width / 3.5,
    "×" + swordItem2Point,
    { fontSize: "20px", fill: "#000000" }
  );
  swordItem2text.setOrigin(0.5, 0.5);
  golem3 = this.physics.add.image(920, 335, "enemy-golem");
  golem3.setScale(0.55);
  golem3.setInteractive();
  golem3.body.setAllowGravity(false);
  golem3text = this.add.text(920, 335 - human.width / 3.5, golem3Point, {
    fontSize: "20px",
    fill: "#000000",
  });
  golem3text.setOrigin(0.5, 0.5);
  stickItem = this.physics.add.image(920, 230, "item-b-stick");
  stickItem.setScale(0.05);
  stickItem.setRotation((Math.PI * 3) / 10);
  stickItem.setInteractive();
  stickItem.body.setAllowGravity(false);
  stickItemtext = this.add.text(
    920,
    230 - human.width / 3.5,
    "×" + stickItemPoint,
    { fontSize: "20px", fill: "#000000" }
  );
  stickItemtext.setOrigin(0.5, 0.5);
  dragon = this.physics.add.image(920, 125, "enemy-dragon");
  dragon.setScale(0.1);
  dragon.setInteractive();
  dragon.body.setAllowGravity(false);
  dragontext = this.add.text(920, 125 - human.width / 3.5, dragonPoint, {
    fontSize: "20px",
    fill: "#000000",
  });
  dragontext.setOrigin(0.5, 0.5);

  function checkET2() {
    //２段目の敵とアイテムが全て消えたかどうかの判定
    if (whiteItemDestroyed && slime1Destroyed) {
      clickEnabled2 = true;
    }
  }
  function checkET3() {
    //３段目の敵とアイテムが全て消えたかどうかの判定
    if (poisonItemDestroyed && slime2Destroyed && swordItem1Destroyed) {
      clickEnabled3 = true;
    }
  }
  function checkET4() {
    //４段目の敵とアイテムが全て消えたかどうかの判定
    if (
      golem1Destroyed &&
      golem2Destroyed &&
      gunItemDestroyed &&
      slime3Destroyed
    ) {
      clickEnabled4 = true;
    }
  }

  const movehuman = (i, j) => {
    this.tweens.add({
      targets: human,
      x: -80 + 200 * i,
      y: 663 - 108 * j,
      duration: 0, // 移動にかかる時間（ミリ秒）
    });
    this.tweens.add({
      targets: humantext,
      x: -80 + 200 * i,
      y: 623 - 108 * j,
      duration: 0, // 移動にかかる時間（ミリ秒）
    });
  };
  slime1.on("pointerdown", () => {
    movehuman(2, 1);
    if (humanPoint > slime1Point) {
      humanPoint = humanPoint + slime1Point;
      slime1.destroy();
      slime1text.destroy();
      slime1Destroyed = true;
      checkET2();
    } else {
      humanPoint = humanPoint - slime1Point;
    }
    console.log("slime1");
  });
  whiteItem.on("pointerdown", () => {
    movehuman(2, 2);
    humanPoint = humanPoint + whiteItemPoint;
    whiteItem.destroy();
    whiteItemtext.destroy();
    whiteItemDestroyed = true;
    checkET2();
  });
  poisonItem.on("pointerdown", () => {
    if (clickEnabled2) {
      movehuman(3, 1);
      humanPoint = humanPoint - poisonItemPoint;
      poisonItem.destroy();
      poisonItemtext.destroy();
      poisonItemDestroyed = true;
      checkET3();
    }
  });
  slime2.on("pointerdown", () => {
    if (clickEnabled2) {
      movehuman(3, 2);
      if (humanPoint > slime2Point) {
        humanPoint = humanPoint + slime2Point;
        slime2.destroy();
        slime2text.destroy();
        slime2Destroyed = true;
        checkET3();
      } else {
        humanPoint = humanPoint - slime2Point;
      }
    }
  });
  swordItem1.on("pointerdown", () => {
    if (clickEnabled2) {
      movehuman(3, 3);
      humanPoint = humanPoint * swordItem1Point;
      swordItem1.destroy();
      swordItem1text.destroy();
      swordItem1Destroyed = true;
      checkET3();
    }
  });
  golem1.on("pointerdown", () => {
    if (clickEnabled3) {
      movehuman(4, 1);
      if (humanPoint > golem1Point) {
        humanPoint = humanPoint + golem1Point;
        golem1.destroy();
        golem1text.destroy();
        golem1Destroyed = true;
        checkET4();
      } else {
        humanPoint = humanPoint - golem1Point;
      }
    }
  });
  golem2.on("pointerdown", () => {
    if (clickEnabled3) {
      movehuman(4, 2);
      if (humanPoint > golem2Point) {
        humanPoint = humanPoint + golem2Point;
        golem2.destroy();
        golem2text.destroy();
        golem2Destroyed = true;
        checkET4();
      } else {
        humanPoint = humanPoint - golem2Point;
      }
    }
  });
  gunItem.on("pointerdown", () => {
    if (clickEnabled3) {
      movehuman(4, 3);
      humanPoint = humanPoint * gunItemPoint;
      gunItem.destroy();
      gunItemtext.destroy();
      gunItemDestroyed = true;
      checkET4();
    }
  });
  slime3.on("pointerdown", () => {
    if (clickEnabled3) {
      movehuman(4, 4);
      if (humanPoint > slime3Point) {
        humanPoint = humanPoint + slime3Point;
        slime3.destroy();
        slime3text.destroy();
        slime3Destroyed = true;
        checkET4();
      } else {
        humanPoint = humanPoint - slime3Point;
      }
    }
  });
  blackItem.on("pointerdown", () => {
    if (clickEnabled4) {
      movehuman(5, 1);
      humanPoint += blackItemPoint;
      blackItem.destroy();
      blackItemtext.destroy();
      blackItemDestroyed = true;
    }
  });
  swordItem2.on("pointerdown", () => {
    if (clickEnabled4) {
      movehuman(5, 2);
      humanPoint = humanPoint * swordItem2Point;
      swordItem2.destroy();
      swordItem2text.destroy();
      swordItem2Destroyed = true;
    }
  });
  golem3.on("pointerdown", () => {
    if (clickEnabled4) {
      movehuman(5, 3);
      if (humanPoint > golem3Point) {
        humanPoint = humanPoint + golem3Point;
        golem3.destroy();
        golem3text.destroy();
        golem3Destroyed = true;
      } else {
        humanPoint = humanPoint - golem3Point;
      }
    }
  });
  stickItem.on("pointerdown", () => {
    if (clickEnabled4) {
      movehuman(5, 4);
      humanPoint = humanPoint * stickItemPoint;
      stickItem.destroy();
      stickItemtext.destroy();
      stickItemDestroyed = true;
    }
  });
  dragon.on("pointerdown", () => {
    if (clickEnabled4) {
      movehuman(5, 5);
      if (humanPoint > dragonPoint) {
        dragon.destroy();
        dragontext.destroy();
        dragonDestroyed = true;
      } else {
        humanPoint = humanPoint - dragonPoint;
      }
    }
  });
  // ゲーム説明ボタン
  const graphics = this.add.graphics();
  graphics.fillStyle(0xffffff, 1); // 白い色
  graphics.fillCircle(58, 40, 20); // 円の中心座標と半径
  const question = this.add.image(60, 40, "question").setInteractive();
  // ボタンがクリックされたときの処理
  question.on(
    "pointerdown",
    function () {
      const popupgraphics = this.add.graphics();
      popupgraphics.fillStyle(0x87ceeb, 1).fillRect(200, 100, 600, 350);
      const popuptitle = this.add
        .text(500, 130, "ゲーム説明")
        .setOrigin(0.5)
        .setFontSize(35);
      popuptitle.setPadding(0, 4, 0, 0);
      const popupmain = this.add
        .text(
          210,
          210,
          "  塔の中にいる敵やアイテムをクリックすると\n  その位置に人間が動きます。\n  塔の敵をすべて倒しアイテムをすべて回収すると\n  次の塔をクリックできるようになります。\n  "
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

//humanを動かす処理。iには左から何番目か、jには下から何段目かを入れる。
function update() {
  humantext.setText(humanPoint);

  let redtext = {
    fontSize: "100px", // フォントサイズ
    fill: "#FF0000", // テキストの色
    fontStyle: "bold", // 太文字のスタイル
  };
  let yellowtext = {
    fontSize: "100px", // フォントサイズ
    fill: "#FFFF00", // テキストの色
    fontStyle: "bold", // 太文字のスタイル
  };
  let whiteText = {
    fontSize: "60px", // フォントサイズ
    fill: "#FFFFFF", // テキストの色
    fontStyle: "bold", // 太文字のスタイル
  };

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
    gameoverText = this.add.text(230, 70, "GAME OVER", redtext); //ゲームオーバーの表示
    gameoverText.setDepth(1);
    restartText = this.add.text(390, 200, "リトライ", whiteText);
    returnMenuText = this.add.text(420, 300, "ホーム", whiteText);
    restartText.setInteractive(); // テキストをクリック可能にする
    returnMenuText.setInteractive();
    restartText.on("pointerdown", () => {
      this.scene.restart(); // ゲームの初期状態に戻す処理
      humanPoint = 10;
      towerBGM.stop();
    });
    returnMenuText.on("pointerdown", () => {
      this.scene.start("start-menu"); // ゲームのホーム画面に移動する処理
      humanPoint = 10;
      towerBGM.stop();
    });
    restartText.setDepth(1);
    graphics.setDepth(1); // 暗転用のグラフィックスを前面に表示
    returnMenuText.setDepth(1);
    console.log(gameoverText);
    humanPoint = 10;
    blackItemDestroyed = false;
    whiteItemDestroyed = false;
    gunItemDestroyed = false;
    stickItemDestroyed = false;
    swordItem1Destroyed = false;
    swordItem2Destroyed = false;
    poisonItemDestroyed = false;
    slime1Destroyed = false;
    slime2Destroyed = false;
    slime3Destroyed = false;
    golem1Destroyed = false;
    golem2Destroyed = false;
    golem3Destroyed = false;
    dragonDestroyed = false;

    clickEnabled2 = false;
    clickEnabled3 = false;
    clickEnabled4 = false;
  }

  //ゲームクリアの処理
  if (dragonDestroyed) {
    gameclearText = this.add.text(230, 70, "GAME CLEAR", yellowtext); //ゲームクリアの表示
    gameclearText.setDepth(1);
    restartText = this.add.text(390, 200, "リトライ", whiteText);
    returnMenuText = this.add.text(420, 300, "ホーム", whiteText);
    restartText.setInteractive(); // テキストをクリック可能にする
    returnMenuText.setInteractive();
    restartText.on("pointerdown", () => {
      this.scene.restart(); // ゲームの初期状態に戻す処理
      towerBGM.stop();
    });
    returnMenuText.on("pointerdown", () => {
      this.scene.start("start-menu"); // ゲームのホーム画面に移動する処理
      towerBGM.stop();
    });
    restartText.setDepth(1);
    graphics.setDepth(1); // 暗転用のグラフィックスを前面に表示
    returnMenuText.setDepth(1);
    console.log(gameoverText);
    humanPoint = 10;

    blackItemDestroyed = false;
    whiteItemDestroyed = false;
    gunItemDestroyed = false;
    stickItemDestroyed = false;
    swordItem1Destroyed = false;
    swordItem2Destroyed = false;
    poisonItemDestroyed = false;
    slime1Destroyed = false;
    slime2Destroyed = false;
    slime3Destroyed = false;
    golem1Destroyed = false;
    golem2Destroyed = false;
    golem3Destroyed = false;
    dragonDestroyed = false;

    clickEnabled2 = false;
    clickEnabled3 = false;
    clickEnabled4 = false;
  }
}


