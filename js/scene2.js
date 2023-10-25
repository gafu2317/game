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
  this.load.image("", "/img/sabaku.png");
}

function create(){

}

function update(){

} 
