export function preload() {
  this.load.image("sabaku", "/img/sabaku.png");
  this.load.image("treasure", "/img/treasurechest.png");
  this.load.image("wallX", "/img/wallX.png");
  this.load.image("wallY", "/img/wallY.png");
  this.load.image("rock", "/img/rock.png");
  this.load.image("background", "/img/wall3.png"); // 建物内の背景
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

var walls;

export function create() {
  const sabakuImage = this.add.image(500, 300, "sabaku");
  sabakuImage.setDisplaySize(1000, 600);

  for (var i = 3.2; i < 10; i++) {
    for (var j = 3; j < 10; j++) {
      var image = this.add.image(i * 80, j * 60, "background"); //背景
      image.setScale(0.09);
    }
  }
  const treasure = this.add.image(720, 520, "treasure");
  treasure.setDisplaySize(150, 150);

  walls = this.physics.add.staticGroup();
  
  for (var j = 3; j < 10; j++) {
    walls.create(850, j * 60, 'wallX').setScale(0.04);//壁右
    walls.create(150, j * 60, 'wallX').setScale(0.04);//壁左
  }
  for (var i = 2; i < 9; i++) {
    walls.create(i * 100, 600, "wallY").setScale(0.04);//床
    walls.create(i * 100, 132, "wallY").setScale(0.04);//天井
  }
  for (var i = 2; i < 4; i++) {
    walls.create(i * 100 + 4, 321, "wallY").setScale(0.04);//足場左
    walls.create(i * 100 + 490, 321, "wallY").setScale(0.04);//足場右
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

  const rock = this.add.image(500, 240, "rock");
  rock.setDisplaySize(150, 150);

  const wolfImage = this.add.sprite(500, 523, "wolf");
  wolfImage.setDisplaySize(213, 102);

  const humanImage = this.add.sprite(250, 523, "human");
  humanImage.setDisplaySize(70, 135);

  // pin1がクリックされたときの処理
  pin1.on("pointerdown", () => {
    // 画像を下にアニメーションで動かす
    this.tweens.add({
      targets: pin1,
      y: 800, // 移動先のy座標
      duration: 1000, // アニメーションの時間（ミリ秒）
      onComplete: function () {
        // アニメーションが完了したら画像を消す
        pin1.destroy();
      },
    });
  });

  //pin2がクリックされたときの処理
  pin2.on("pointerdown" , () => {
    //画像を下にアニメーションで動かす
    this.tweens.add({
      targets: pin2,
      y: 800, //移動先のy座標
      duration: 1000, //アニメーションの時間（ミリ秒）
      onComplete: function () {
        //アニメーションが完了したら画像を消す
        pin2.destroy();
      },
    });
  });

  //pin3がクリックされたときの処理
  pin3.on("pointerdown" , () => {
    //画像を右にアニメーションで動かす
    this.tweens.add({
      targets:pin3,
      x: 1200, //移動先のx座標
      duration: 1500, //アニメーションの時間（ミリ秒）
      onComplete: function () {
        //アニメーションが完了したら画像を消す
        pin3.destroy();
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
