import Phaser from "phaser";
import { create, preload, update } from "./picture-group";


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

  scene: {
    preload:preload, // 素材の読み込み時の関数
    create:create, // 画面が作られた時の関数
    update:update, // 連続実行される関数
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
