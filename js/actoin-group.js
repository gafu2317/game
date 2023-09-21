export function preloadActoin() {

}

export function createActoin() {

  // pin3がクリックされたときの処理
  pin3.on("pointerdown", () => {
    // 画像を右にアニメーションで動かす
    this.tweens.add({
      targets: pin3,
      x: 800, // 移動先のX座標
      duration: 1000, // アニメーションの時間（ミリ秒）
      onComplete: function () {
        // アニメーションが完了したら画像を消す
        pin3.destroy();
      },
    });
  });

}

export function updateActoin() {}
