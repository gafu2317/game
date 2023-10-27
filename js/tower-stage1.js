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

function preload(){
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
  })

}

function create(){
  const background = this.add.image(500, 300, "yozora");
  background.setDisplaySize(1000, 600);

  const towers = this.physics.add.staticGroup();
  
  // 同じ画像を何回も配置する
  for (let i = 0; i < 1; i++) {
    const x = 120; // X座標
    const y = 540 + i * -108; // Y座標
    var image = this.add.image(x, y, "inner-tower"); //背景
    image.setScale(0.03, 0.0265);
  }
  for (let i = 0; i < 1; i++) {
    const x = 120; // X座標
    const y = 540; // Y座標
    const image = towers.create(x, y, "tower"); 
    image.setScale(0.03);
  }//一段タワー

  for (let i = 0; i < 2; i++) {
    const x = 320; // X座標
    const y = 540 + i * -108; // Y座標
    var image = this.add.image(x, y, "inner-tower"); //背景
    image.setScale(0.03, 0.0265);
  }
  for (let i = 0; i < 2; i++) {
    const x = 320; // X座標
    const y = 540 + i * -108; // Y座標
    const image = towers.create(x, y, "tower"); 
    image.setScale(0.03);
  }//二段タワー

  for (let i = 0; i < 3; i++) {
    const x = 520; // X座標
    const y = 540 + i * -108; // Y座標
    var image = this.add.image(x, y, "inner-tower"); //背景
    image.setScale(0.03, 0.0265);
  }
  for (let i = 0; i < 3; i++) {
    const x = 520; // X座標
    const y = 540 + i * -108; // Y座標
    const image = towers.create(x, y, "tower"); 
    image.setScale(0.03);
  }//三段タワー

  for (let i = 0; i < 4; i++) {
    const x = 720; // X座標
    const y = 540 + i * -108; // Y座標
    var image = this.add.image(x, y, "inner-tower"); //背景
    image.setScale(0.03, 0.0265);
  }
  for (let i = 0; i < 4; i++) {
    const x = 720; // X座標
    const y = 540 + i * -108; // Y座標
    const image = towers.create(x, y, "tower"); 
    image.setScale(0.03);
  }//四段タワー

  for (let i = 0; i < 5; i++) {
    const x = 920; // X座標
    const y = 540 + i * -108; // Y座標
    var image = this.add.image(x, y, "inner-tower"); //背景
    image.setScale(0.03, 0.0265);
  }
  for (let i = 0; i < 5; i++) {
    const x = 920; // X座標
    const y = 540 + i * -108; // Y座標
    const image = towers.create(x, y, "tower");
    image.setScale(0.03);
  }//五段タワー

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

  //一段タワー(下から)
  human = this.add.image(120, 555, "human");
  human.setScale(0.4);
  //二段タワー
  slime1 = this.add.image(320, 570,"enemy-slime");
  slime1.setScale(0.1);
  whiteItem = this.add.image(320, 445,"item-h-white");
  whiteItem.setScale(0.07);
  //三段タワー
  poisonItem = this.add.image(520, 550,"item-d-poison");
  poisonItem.setScale(0.07);
  slime2 = this.add.image(520, 463,"enemy-slime");
  slime2.setScale(0.1);
  swordItem1 = this.add.image(520, 337,"item-b-sword");
  swordItem1.setScale(0.07)
  swordItem1.setRotation(Math.PI * 11/9);
  //四段タワー
  golem1 = this.add.image(720,551,"enemy-golem");
  golem1.setScale(0.55);
  golem2 = this.add.image(720,444,"enemy-golem");
  golem2.setScale(0.55);
  gunItem =this.add.image(720,340,"item-b-gun");
  gunItem.setScale(0.048);
  slime3 = this.add.image(720, 246,"enemy-slime");
  slime3.setScale(0.1);
  //五段タワー
  blackItem = this.add.image(920,550,"item-h-black");
  blackItem.setScale(0.07);
  swordItem2 = this.add.image(920, 445,"item-b-sword");
  swordItem2.setScale(0.07);
  swordItem2.setRotation(Math.PI * 11/9);
  golem3 = this.add.image(920,335,"enemy-golem");
  golem3.setScale(0.55);
  stickItem = this.add.image(920, 230,"item-b-stick");
  stickItem.setScale(0.05);
  stickItem.setRotation(Math.PI * 3/10);
  dragon = this.add.image(920, 125, "enemy-dragon"); 
  dragon.setScale(0.1);

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
  })
}

function update(){

} 
