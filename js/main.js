import Phaser from "phaser";
import Scene1 from "./picture-group";
// import { create, preload, update } from "./picture-group";

const D_WIDTH = 1000;
const D_HEIGHT = 600;
// 1, Phaser3の設定データ
/**
 * @type {Phaser.Types.Core.GameConfig}
 */
export const config = {
  type: Phaser.AUTO,
  width: D_WIDTH, // ゲーム画面の横幅
  height: D_HEIGHT, // ゲーム画面の高さ
  antialias: false, // アンチエイリアスを無効にするらしい（分ってない）
  scene: Scene1,

  scene: {
    preload: preload, // 素材の読み込み時の関数
    create: create, // 画面が作られた時の関数
    update: update, // 連続実行される関数
  },

  fps: {
    target: 24, // フレームレート
    forceSetTimeOut: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false, // スプライトに緑の枠を表示しない
      gravity: { y: 300 }, // 重力の方向とその強さ
    },
  },
};

new Phaser.Game(config);

function preload() {
  this.load.image("pin", "./img/pin.png");
}
function create() {
  // 背景色を設定
  this.cameras.main.setBackgroundColor("#50ffa2"); // 任意の色を指定
  // ボタンの作成
  const button1 = this.add
    .image(100, 500, "pin")
    .setInteractive()
    .setScale(0.3);
  const button2 = this.add.image(300, 500, "button2Texture").setInteractive();
  const button3 = this.add.image(500, 500, "button3Texture").setInteractive();

  // ボタンのクリックイベント
  button1.on("pointerdown", () => {
    this.scene.start("Scene1");
  });

  button2.on("pointerdown", () => {
    this.scene.start("Scene2");
  });

  button3.on("pointerdown", () => {
    this.scene.start("Scene3");
  });
}
function update() {}
