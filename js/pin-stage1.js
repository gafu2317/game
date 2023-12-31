/**
 * @type {Phaser.Types.Scenes.SettingsConfig}
 */
export const pinstage1 = {
  preload: preload, // 素材の読み込み時の関数
  create: create, // 画面が作られた時の関数
  update: update, // 連続実行される関数
  key: "pinstage1",
  active: false,
};

function preload() {
  this.load.image("sabaku", "/img/pin/sabaku.png");
  this.load.image("treasure", "/img/pin/treasurechest.png");
  this.load.image("wallX2", "/img/pin/wallX2.png");
  this.load.image("wallY2", "/img/pin/wallY2.png");
  this.load.image("rock", "/img/pin/rock.png");
  this.load.image("background", "/img/pin/wall3.png"); // 建物内の背景
  this.load.image("pin", "./img/pin/pin.png");

  this.load.audio("pinBGM", "./public/sounds/pinBGM.MP3");
  this.load.audio("barkDog", "./public/sounds/barkingDog.MP3");
  this.load.audio("pullPin", "./public/sounds/pullingPin.MP3");
  this.load.audio("breakRock", "./public/sounds/rockSound.MP3");
  this.load.audio("humanDeath", "./public/sounds/humanDeath.MP3");
  this.load.audio("treasureGet", "./public/sounds/treasureGet.MP3");
  this.load.image("question", "/img/question.png");

  this.load.spritesheet("wolf", "/img/pin/transparentWolf.png", {
    frameWidth: 427, // 1フレームの幅
    frameHeight: 204, // 1フレームの高さ
  });

  this.load.spritesheet("human", "/img/pin/human.png", {
    frameWidth: 146, // 1フレームの幅
    frameHeight: 286, // 1フレームの高さ
  });
}

var walls;
var rocks;
var wolfImage;
var pins;

function create() {
  const sabakuImage = this.add.image(500, 300, "sabaku");
  sabakuImage.setDisplaySize(1000, 600);

  const BGM = this.sound.add("pinBGM");
  BGM.play();
  BGM.setVolume(0.1); // 音量を0.5に設定
  BGM.setLoop(true); // ループ再生を有効にする

  for (var i = 3.2; i < 10; i++) {
    for (var j = 3; j < 10; j++) {
      var image = this.add.image(i * 80, j * 60, "background"); //背景
      image.setScale(0.09);
    }
  }

  //静的グループの作成
  walls = this.physics.add.staticGroup();

  for (var j = 3; j < 10; j++) {
    walls.create(850, j * 60, "wallX2"); // 壁右
    walls.create(150, j * 60, "wallX2"); // 壁左
  }
  for (var i = 2; i < 9; i++) {
    walls.create(i * 100, 600, "wallY2"); //床
    walls.create(i * 100, 132, "wallY2"); //天井
  }
  for (var i = 2; i < 4; i++) {
    walls.create(i * 100 + 4, 321, "wallY2"); //足場左
    walls.create(i * 100 + 490, 321, "wallY2"); //足場右
  }

  // 動的グループの作成
  pins = this.physics.add.group();

  const halfRotationDegree = Math.PI + 0.04;

  // ピンの追加
  /**
   * @type {Phaser.Physics.Arcade.Image}
   */
  const pin1 = pins.create(640, 465, "pin");
  pin1.setDisplaySize(50, 300);
  // 他の物体と衝突しても動かないようにした
  pin1.setImmovable(true);
  pin1.setInteractive();
  pin1.setRotation(halfRotationDegree);
  /*
  ? 重力加速度と速さをリセットしてもなぜか効果がなく
  ? 重力の干渉を受けないようにするために setAllowGravity を false にするしかなかった
   */
  // pin1.setGravityY(0);
  // pin1.setVelocity(0);
  pin1.body.setAllowGravity(false);

  /**
   * @type {Phaser.Physics.Arcade.Image}
   */
  const pin2 = pins.create(360, 465, "pin"); //左のピン
  pin2.setDisplaySize(50, 300);
  pin2.setInteractive(); // 画像をクリック可能にする
  pin2.setImmovable(true);
  pin2.body.setAllowGravity(false);
  pin2.setRotation(halfRotationDegree);

  /**
   * @type {Phaser.Physics.Arcade.Image}
   */
  const pin3 = pins.create(500, 310, "pin");
  /*
    pin3 を擬似的に 90 度回転
    setRotation は bouding box の位置は不変なため、setSize によって bounding box の位置調整をする必要あり
   */
  pin3.setSize(pin3.height, pin3.width * 0.2);
  pin3.setRotation((1 / 2) * halfRotationDegree + 0.015);

  pin3.setDisplaySize(50, 310);
  // 画像をクリック可能にする
  pin3.setInteractive();
  pin3.setImmovable(true);
  pin3.body.setAllowGravity(false);

  const treasure = this.physics.add.image(720, 520, "treasure");
  treasure.setDisplaySize(150, 150);
  treasure.setCollideWorldBounds(true);
  treasure.setSize(treasure.width * 0.7, treasure.height * 0.7);

  rocks = this.physics.add.image(500, 200, "rock");
  rocks.setSize(rocks.width * 0.9, rocks.height * 0.9);
  rocks.setDisplaySize(150, 150);
  rocks.setCollideWorldBounds(true);

  wolfImage = this.physics.add.sprite(500, 523, "wolf");
  wolfImage.setDisplaySize(213, 102);
  wolfImage.setCollideWorldBounds(true);
  wolfImage.setSize(wolfImage.width, wolfImage.height);

  const humanImage = this.physics.add.sprite(250, 523, "human");
  humanImage.setDisplaySize(70, 135);
  humanImage.setCollideWorldBounds(true);
  humanImage.setSize(humanImage.width * 0.8, humanImage.height * 0.7);

  this.physics.add.collider(wolfImage, rocks, hitrocks, null, this);
  this.physics.add.collider(wolfImage, walls);
  this.physics.add.collider(rocks, pins);
  this.physics.add.collider(rocks, walls);
  this.physics.add.collider(humanImage, wolfImage, hithuman, null, this);
  this.physics.add.collider(humanImage, walls);
  this.physics.add.collider(treasure, walls);
  this.physics.add.collider(treasure, humanImage, hittreasure, null, this);

  let wolf = 1; //狼がいるかどうか
  //岩と狼がぶつかったときの処理
  function hitrocks(wolfImage, rocks) {
    wolfImage.destroy();
    rocks.destroy();
    wolf = 0;
    const breakRock = this.sound.add("breakRock");
    breakRock.play();
    breakRock.setVolume(0.5); // 音量を0.5に設定
  }
  let escapeKey;
  let spaceKey;
  //escキーを押すとホームに戻る処理
  const input = this.input;
  escapeKey = input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
  escapeKey.on("down", () => {
    this.scene.start("start-menu");
    BGM.stop();
  });
  //spaceキーを押すとやり直しができる処理
  spaceKey = input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  spaceKey.on("down", () => {
    this.scene.restart();
    BGM.stop();
  });
  var redtext = {
    fontSize: "100px", // フォントサイズ
    fill: "#FF0000", // テキストの色
    fontStyle: "bold", // 太文字のスタイル
  };
  let yellowtext = {
    fontSize: "100px", // フォントサイズ
    fill: "#FFFF00", // テキストの色
    fontStyle: "bold", // 太文字のスタイル
  };
  var whiteText = {
    fontSize: "60px", // フォントサイズ
    fill: "#FFFFFF", // テキストの色
    fontStyle: "bold", // 太文字のスタイル
  };

  var graphics = this.add.graphics(); //暗転用のグラフィックス
  var gameoverText;
  var gameclearText;
  var nextText;
  var restartText;
  var returnMenuText;
  // 画面全体に配置
  graphics.fillStyle(0x000000, 0.6); // 色と透明度を指定
  graphics.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);
  graphics.setDepth(-1); //通常時は背面に置く

  //狼と人間がぶつかったときの処理
  function hithuman() {
    humanImage.destroy();
    const humanDeath = this.sound.add("humanDeath");
    humanDeath.play();
    gameoverText = this.add.text(500, 70, "GAME OVER", redtext); //ゲームオーバーの表示
    gameoverText.setOrigin(0.5);
    gameoverText.setDepth(1);
    restartText = this.add.text(500, 200, "リトライ", whiteText);
    restartText.setPadding(0, 4, 0, 0);
    restartText.setOrigin(0.5);
    returnMenuText = this.add.text(500, 300, "ホーム", whiteText);
    returnMenuText.setPadding(0, 4, 0, 0);
    returnMenuText.setOrigin(0.5);
    restartText.setInteractive(); // テキストをクリック可能にする
    returnMenuText.setInteractive();
    restartText.on("pointerdown", () => {
      this.scene.restart(); // ゲームの初期状態に戻す処理
      BGM.stop();
    });
    returnMenuText.on("pointerdown", () => {
      this.scene.start("start-menu"); // ゲームのホーム画面に移動する処理
      BGM.stop();
    });
    restartText.setDepth(1);
    graphics.setDepth(1); // 暗転用のグラフィックスを前面に表示
    returnMenuText.setDepth(1);
  }
  //人間と宝がぶつかったときの処理
  function hittreasure() {
    treasure.destroy();
    const treasureGet = this.sound.add("treasureGet");
    treasureGet.play();
    treasureGet.setVolume(0.5); // 音量を0.5に設定
    gameclearText = this.add.text(500, 70, "GAME CLEAR", yellowtext); //ゲームクリアの表示
    gameclearText.setOrigin(0.5);
    gameclearText.setDepth(1);
    nextText = this.add.text(500, 200, "次へ", whiteText);
    nextText.setPadding(0, 4, 0, 0);
    nextText.setOrigin(0.5);
    nextText.setInteractive();
    returnMenuText = this.add.text(500, 300, "ホーム", whiteText);
    returnMenuText.setPadding(0, 4, 0, 0);
    returnMenuText.setOrigin(0.5);
    returnMenuText.setInteractive();
    returnMenuText.on("pointerdown", () => {
      this.scene.start("start-menu");
      BGM.stop();
    });
    nextText.on("pointerdown", () => {
      this.scene.start("pinstage2"); //次のステージへ移動する処理
      BGM.stop();
    });
    returnMenuText.on("pointrdown", () => {
      this.scene.start("start-menu"); //ホーム画面に移動する処理
    });
    nextText.setDepth(1);
    graphics.setDepth(1); // 暗転用のグラフィックスを前面に表示
    returnMenuText.setDepth(1);
  }

  let pinsClicked = 0; //クリックされた画像の数（pin1とpin2のみ）
  // クリック可能な状態かどうかを示すフラグ
  let canClick = true;

  const pullPin = this.sound.add("pullPin");
  pullPin.setVolume(0.5);
  // pin1がクリックされたときの処理
  pin1.on("pointerdown", () => {
    if (canClick) {
      canClick = false; // クリック不可に設定
      pinsClicked++; //カウンターを増やす
      pullPin.play();
      // 画像を下にアニメーションで動かす
      this.tweens.add({
        targets: pin1,
        y: 800, // 移動先のy座標
        duration: 1000, // アニメーションの時間（ミリ秒）
        onComplete: () => {
          // アニメーションが完了したら画像を消す
          pin1.destroy();
          if (pinsClicked === 2 && wolf === 0) {
            //pin1とpin2が両方消えたら人間を右に移動
            this.tweens.add({
              targets: humanImage,
              x: 700, // 移動先のx座標
              duration: 2000, // アニメーションの時間（ミリ秒）
            });
          }
          canClick = true; // クリック可能に設定
        },
      });
    }
  });

  console.log(pinsClicked);

  //pin2がクリックされたときの処理
  pin2.on("pointerdown", () => {
    if (canClick) {
      canClick = false; // クリック不可に設定
      pinsClicked++; //カウンターを増やす
      pullPin.play();
      //画像を下にアニメーションで動かす
      this.tweens.add({
        targets: pin2,
        y: 800, //移動先のy座標
        duration: 1000, //アニメーションの時間（ミリ秒）
        onComplete: () => {
          //アニメーションが完了したら画像を消す
          pin2.destroy();
          //狼を左にアニメーションで動かす
          this.tweens.add({
            targets: wolfImage,
            x: 300, //移動先のx座標
            duration: 1000, //アニメーションの時間（ミリ秒）
            delay: 500, // 500ミリ秒（0.5秒）の待ち時間
          });
          if (wolf == 1) {
            const barkDog = this.sound.add("barkDog");
            barkDog.play();
          }
          if (pinsClicked === 2 && wolf === 0) {
            // pin1とpin2が両方消えたら人間を右に移動
            this.tweens.add({
              targets: humanImage,
              x: 700, // 移動先のx座標
              duration: 2000, // アニメーションの時間（ミリ秒）
            });
          }
          canClick = true; // クリック可能に設定
        },
      });
    }
  });

  //pin3がクリックされたときの処理
  pin3.on("pointerdown", () => {
    if (canClick) {
      canClick = false; // クリック不可に設定
      pullPin.play();
      //画像を右にアニメーションで動かす
      this.tweens.add({
        targets: pin3,
        x: 1200, //移動先のx座標
        duration: 1000, //アニメーションの時間（ミリ秒）
        onComplete: function () {
          //アニメーションが完了したら画像を消す
          pin3.destroy();
          canClick = true; // クリック可能に設定
        },
      });
    }
  });

  // アニメーションを設定
  this.anims.create({
    key: "wolfAnimation", // アニメーションの名前
    frames: this.anims.generateFrameNumbers("wolf", { start: 0, end: 1 }), // フレームの範囲
    frameRate: 3, // アニメーションの速度（フレーム/秒）
    repeat: -1, // -1に設定すると無限ループ
  });
  wolfImage.play("wolfAnimation"); // アニメーションを再生

  this.anims.create({
    key: "humanAnimation", // アニメーションの名前
    frames: this.anims.generateFrameNumbers("human", { start: 0, end: 7 }), // フレームの範囲
    frameRate: 8, // アニメーションの速度（フレーム/秒）
    repeat: -1, // -1に設定すると無限ループ
  });
  humanImage.play("humanAnimation"); // アニメーションを再生

  // ゲーム説明ボタン;
  // const graphics = this.add.graphics();
  // graphics.fillStyle(0xffffff, 1); // 白い色
  // graphics.fillCircle(58, 40, 20); // 円の中心座標と半径
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
          "  宝箱を獲得するとゲームクリア\n  狼に食われるとゲームオーバーです。\n  ピンをクリックするとピンが抜けます。\n  ピンを正しい順で抜くと、宝箱が取れます。\n  ただし、ピンが抜けて無くなるまで\n  次のピンを動かせません。"
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

function update() {}
