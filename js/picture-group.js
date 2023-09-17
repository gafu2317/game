import { config } from "./main.js";
export function preload() {
  this.load.image("sabaku", "/img/sabaku.png");
  this.load.image("tresure", "/img/treasurechest.png");
  this.load.image("wallX", "/img/wallX.png");
  this.load.image("wallY", "/img/wallY.png");
  this.load.image("rock", "/img/rock.png");
  this.load.image("background", "/img/wall3.png"); //建物内の背景
  this.load.image("pin", "./img/pin.png");

  this.load.spritesheet("wolf", "/img/transparentWolf.png", {
    frameWidth: 427, // 1フレームの幅
    frameHeight: 204, // 1フレームの高さ
  });

  this.load.spritesheet("human", "/img/human.png", {
    frameWidth: 146, // 1フレームの幅
    frameHeight: 286, // 1フレームの高さ
  });
}

export function create() {
  const sabakuImage = this.add.image(500, 300, "sabaku");
  sabakuImage.setDisplaySize(1000, 600);

  for (var i = 3.2; i < 10; i++) {
    for (var j = 3; j < 10; j++) {
      var image = this.add.image(i * 80, j * 60, "background"); //背景
      image.setScale(0.09);
    }
  }
  const tresure = this.add.image(720, 520, "tresure");
  tresure.setDisplaySize(150, 150);
  for (var j = 3; j < 10; j++) {
    var image = this.add.image(850, j * 60, "wallX"); //壁右
    image.setScale(0.04);
    var image = this.add.image(150, j * 60, "wallX"); //壁左
    image.setScale(0.04);
  }
  for (var i = 2; i < 9; i++) {
    var image = this.add.image(i * 100, 600, "wallY"); //床
    image.setScale(0.04);
    var image = this.add.image(i * 100, 132, "wallY"); //天井
    image.setScale(0.04);
  }
  for (var i = 2; i < 4; i++) {
    var image = this.add.image(i * 100 + 4, 321, "wallY"); //足場左
    image.setScale(0.04);
    var image = this.add.image(i * 100 + 490, 321, "wallY"); //足場右
    image.setScale(0.04);
  }
  const pin1 = this.add.image(640, 465, "pin"); //右のピン
  pin1.setDisplaySize(50, 300);
  pin1.setRotation(Math.PI + 0.04); // ラジアン単位で回転角度を指定
  pin1.setInteractive(); // 画像をクリック可能にする
  const pin2 = this.add.image(360, 465, "pin"); //左のピン
  pin2.setDisplaySize(50, 300);
  pin2.setRotation(Math.PI + 0.04);
  pin2.setInteractive(); // 画像をクリック可能にする
  const pin3 = this.add.image(500, 310, "pin"); //上のピン
  pin3.setDisplaySize(50, 300);
  pin3.setRotation(Math.PI / 2 + 0.04);
  pin3.setInteractive(); // 画像をクリック可能にする

  const rock = this.add.image(500, 240, "rock"); //右のピン
  rock.setDisplaySize(150, 150);

  const wolfImage = this.add.sprite(500, 523, "wolf");
  wolfImage.setDisplaySize(213, 102);

  const humanImage = this.add.sprite(250, 523, "human");
  humanImage.setDisplaySize(70, 135);

  // pin1がクリックされたときの処理
  pin1.on("pointerdown", function () {
    // 画像を右にアニメーションで動かす
    this.tweens.add({
      targets: pin1,
      x: 800, // 移動先のX座標
      duration: 1000, // アニメーションの時間（ミリ秒）
      onComplete: function () {
        // アニメーションが完了したら画像を消す
        pin1.destroy();
      },
    });
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
}

export function update() {}

export function pictureGroup() {
  // 2, Phaser3オブジェクトを作る
  let phaser = new Phaser.Game(config);
}

