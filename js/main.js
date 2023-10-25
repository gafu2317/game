import Phaser from "phaser";
import { scene1 } from "./scene1";
import { scene2 } from "./scene2";
import { scene3 } from"./scene1-2";
import { startMenu } from "./start-menu";

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
  scene: [startMenu, scene1, scene2,scene3],

  fps: {
    target: 24, // フレームレート
    forceSetTimeOut: true,
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
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
