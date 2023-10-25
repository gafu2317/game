/**
 * @type {Phaser.Types.Scenes.SettingsConfig}
 */
export const scene1 = {
  preload: preload, // 素材の読み込み時の関数
  create: create, // 画面が作られた時の関数
  update: update, // 連続実行される関数
  key: "scene2",
  active: false,
};

function preload(){
  this.load.image("", "/img/tower/tower.png");
  this.load.image("", "/img/tower/tower2.png");
  this.load.image("", "/img/tower/towerBack.png");
  this.load.image("", "/img/tower/towerWall2.png");
  this.load.image("", "/img/tower/BlackItem.png");
  this.load.image("", "/img/tower/WhiteItem.png");
  this.load.image("", "/img/tower/gun.png");
  this.load.image("", "/img/tower/stick.png");
  this.load.image("", "/img/tower/sword.png");
  this.load.image("", "/img/tower/poison.png");
  this.load.image("", "/img/tower/dragon.png");
  this.load.image("", "/img/tower/golem.png");
  this.load.image("", "/img/tower/slime.png");

}

function create(){

}

function update(){

} 
