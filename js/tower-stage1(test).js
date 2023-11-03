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
  
  this.load.spritesheet("human", "/img/tower/human.png", {
    frameWidth: 146, // 1フレームの幅
    frameHeight: 286, // 1フレームの高さ
  });
}

function create() {

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
  let blackItemPoint = 100; //プラス
  let whiteItemPoint = 200; //プラス
  let gunItemPoint = 2; //かける
  let stickItemPoint = 3; //かける
  let swordItem1Point = 4; //かける
  let swordItem2Point = 4; //かける
  let poisonItemPoint = 100; //マイナス
  let slime1Point = 100; //敵の攻撃力
  let slime2Point = 100; //敵の攻撃力
  let slime3Point = 100; //敵の攻撃力
  let golem1Point = 5000; //敵の攻撃力
  let golem2Point = 5000; //敵の攻撃力
  let golem3Point = 5000; //敵の攻撃力
  let dragonPoint = 10000; //敵の攻撃力


  const background = this.add.image(500, 300, "yozora");
  background.setDisplaySize(1000, 600);

  // 同じ画像を何回も配置する
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < i; j++) {
      const x = 120 + 200*(i-1); // X座標
      const y = 540 + j * -108; // Y座標
      const innnerTower = this.add.image(x, y, "inner-tower"); //背景
      innnerTower.setScale(0.03, 0.0265);
      const tower = this.add.image(x, y, "tower"); 
      tower.setScale(0.03);
    }
  }
  //タワーに画像を配置する
  //タワーに配置する画像の配列
  const imagekey = [
    ["human"],//一段
    ["enemy-slime", "item-h-white"],//二段
    ["item-d-poison", "enemy-slime", "enemy-slime"],//三段
    ["enemy-golem", ],//四段
    [],//五段
  ];
  human = this.physics.add.sprite(120, 555, "human");
  human.setScale(0.35);
  human.body.setAllowGravity(false);
  const humantext = this.add.text(120, 555-human.width/3.5, humanPoint,{fontSize: "20px", fill: "#000000", });
  humantext.setOrigin(0.5, 0.5);
  
  slime1.on("pointerdown", () => {
    // 画像を下にアニメーションで動かす
    this.tweens.add({
      targets: human,
      x: 320 + 200*0,
      y: 555 - 108*0, // 移動先のy座標
      duration: 0, // アニメーションの時間（ミリ秒）
    })
  })
  whiteItem.on("pointerdown", () => {
    // 画像を下にアニメーションで動かす
    this.tweens.add({
      targets: human,
      x: 320 + 200*0,
      y: 555 - 108*1, // 移動先のy座標
      duration: 0, // アニメーションの時間（ミリ秒）
    })
  })
  poisonItem.on("pointerdown", () => {
    // 画像を下にアニメーションで動かす
    this.tweens.add({
      targets: human,
      x: 320 + 200*1,
      y: 555 - 108*0, // 移動先のy座標
      duration: 0, // アニメーションの時間（ミリ秒）
    })
  })
  slime2.on("pointerdown", () => {
    // 画像を下にアニメーションで動かす
    this.tweens.add({
      targets: human,
      x: 320 + 200*1,
      y: 555 - 108*1, // 移動先のy座標
      duration: 0, // アニメーションの時間（ミリ秒）
    })
  })
  swordItem1.on("pointerdown", () => {
    // 画像を下にアニメーションで動かす
    this.tweens.add({
      targets: human,
      x: 320 + 200*1,
      y: 555 - 108*2, // 移動先のy座標
      duration: 0, // アニメーションの時間（ミリ秒）
    })
  })
  golem1.on("pointerdown", () => {
    // 画像を下にアニメーションで動かす
    this.tweens.add({
      targets: human,
      x: 320 + 200*2,
      y: 555 - 108*0, // 移動先のy座標
      duration: 0, // アニメーションの時間（ミリ秒）
    })
  })
  golem2.on("pointerdown", () => {
    // 画像を下にアニメーションで動かす
    this.tweens.add({
      targets: human,
      x: 320 + 200*2,
      y: 555 - 108*1, // 移動先のy座標
      duration: 0, // アニメーションの時間（ミリ秒）
    })
  })
  gunItem.on("pointerdown", () => {
    // 画像を下にアニメーションで動かす
    this.tweens.add({
      targets: human,
      x: 320 + 200*2,
      y: 555 - 108*2, // 移動先のy座標
      duration: 0, // アニメーションの時間（ミリ秒）
    })
  })
  slime3.on("pointerdown", () => {
    // 画像を下にアニメーションで動かす
    this.tweens.add({
      targets: human,
      x: 320 + 200*2,
      y: 555 - 108*3, // 移動先のy座標
      duration: 0, // アニメーションの時間（ミリ秒）
    })
  })
  blackItem.on("pointerdown", () => {
    // 画像を下にアニメーションで動かす
    this.tweens.add({
      targets: human,
      x: 320 + 200*3,
      y: 555 - 108*0, // 移動先のy座標
      duration: 0, // アニメーションの時間（ミリ秒）
    })
  })
  swordItem2.on("pointerdown", () => {
    // 画像を下にアニメーションで動かす
    this.tweens.add({
      targets: human,
      x: 320 + 200*3,
      y: 555 - 108*1, // 移動先のy座標
      duration: 0, // アニメーションの時間（ミリ秒）
    })
  })
  golem3.on("pointerdown", () => {
    // 画像を下にアニメーションで動かす
    this.tweens.add({
      targets: human,
      x: 320 + 200*3,
      y: 555 - 108*2, // 移動先のy座標
      duration: 0, // アニメーションの時間（ミリ秒）
    })
  })
  stickItem.on("pointerdown", () => {
    // 画像を下にアニメーションで動かす
    this.tweens.add({
      targets: human,
      x: 320 + 200*3,
      y: 555 - 108*3, // 移動先のy座標
      duration: 0, // アニメーションの時間（ミリ秒）
    })
  })
  dragon.on("pointerdown", () => {
    // 画像を下にアニメーションで動かす
    this.tweens.add({
      targets: human,
      x: 320 + 200*3,
      y: 555 - 108*4, // 移動先のy座標
      duration: 0, // アニメーションの時間（ミリ秒）
    })
  })

  
  //アイテムと人間があたったときの処理
  this.physics.add.collider(human, blackItem, function () {
    humanPoint = humanPoint + blackItemPoint;
    blackItem.destroy();
    blackItemtext.destroy();
  });
  this.physics.add.collider(human, whiteItem, function () {
    humanPoint = humanPoint + whiteItemPoint;
    whiteItem.destroy();
    whiteItemtext.destroy();
  });
  this.physics.add.collider(human, gunItem, function () {
    humanPoint = humanPoint * gunItemPoint;
    gunItem.destroy();
    gunItemtext.destroy();
  });
  this.physics.add.collider(human, stickItem, function () {
    humanPoint = humanPoint * stickItemPoint;
    stickItem.destroy();
    stickItemtext.destroy();
  });
  this.physics.add.collider(human, swordItem1, function () {
    humanPoint = humanPoint * swordItem1Point;
    swordItem1.destroy();
    swordItem1text.destroy();
  });
  this.physics.add.collider(human, swordItem2, function () {
    humanPoint = humanPoint * swordItem2Point;
    swordItem2.destroy();
    swordItem2text.destroy();
  });
  this.physics.add.collider(human, poisonItem, function () {
    humanPoint = humanPoint - poisonItemPoint;
    poisonItem.destroy();
    poisonItemtext.destroy();
  });
  this.physics.add.collider(human, slime1, function () {
    humanPoint = humanPoint - slime1Point;
    slime1.destroy();
    slime1text.destroy();
  });
  this.physics.add.collider(human, slime2, function () {
    humanPoint = humanPoint - slime2Point;
    slime2.destroy();
    slime2text.destroy();
  });
  this.physics.add.collider(human, slime3, function () {
    humanPoint = humanPoint - slime3Point;
    slime3.destroy();
    slime3text.destroy();
  });
  this.physics.add.collider(human, golem1, function () {
    humanPoint = humanPoint - golem1Point;
    golem1.destroy();
    golem1text.destroy();
  });
  this.physics.add.collider(human, golem2, function () {
    humanPoint = humanPoint - golem2Point;
    golem2.destroy();
    golem2text.destroy();
  });
  this.physics.add.collider(human, golem3, function () {
    humanPoint = humanPoint - golem3Point;
    golem3.destroy();
    golem3text.destroy();
  });
  this.physics.add.collider(human, dragon, function () {
    humanPoint = humanPoint - dragonPoint;
    dragon.destroy();
    dragontext.destroy();
  });

  let redtext = {
    fontSize: "100px", // フォントサイズ
    fill: "#FF0000", // テキストの色
    fontStyle: "bold", // 太文字のスタイル
  };
  let  whiteText = {
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
    gameoverText = this.add.text(230, 70, "GAME OVER",redtext); //ゲームオーバーの表示
    gameoverText.setDepth(1);
    restartText = this.add.text(390, 200, "リトライ",whiteText);
    returnMenuText = this.add.text(420, 300, "ホーム",whiteText);
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




  humanPoint = humanPoint - 0;//テスト用
  console.log(humanPoint);
}

function update() {}
