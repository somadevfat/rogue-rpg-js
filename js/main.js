"use strict";

import { SceneManager } from "./managers/SceneManager.js";
import { UIManager } from "./managers/UIManager.js";
import { GameManager } from "./managers/GameManager.js";

// DOMが完全に読み込まれてからゲームを開始する
window.addEventListener("DOMContentLoaded", () => {
  // 1. 各マネージャーをインスタンス化する
  const sceneManager = new SceneManager();
  const uiManager = new UIManager();

  // GameManagerには、他のマネージャーを渡してあげる（依存性の注入）
  const gameManager = new GameManager(uiManager, sceneManager);

  // 2. UIのイベントリスナーをセットアップする
  uiManager.setupEventListeners();

  // 3. ゲームを開始する
  gameManager.startGame();
});

// F5キーによるリロードとブラウザの「戻る」を無効化
document.addEventListener("keydown", function (e) {
  // F5 をブロック
  if (e.key === "F5") {
    e.preventDefault();
    alert("F5によるリロードは禁止されています");
  }

  // Ctrl + R をブロック
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "r") {
    e.preventDefault();
    alert("Ctrl + R によるリロードは禁止されています");
  }
});

// 履歴を操作して「戻る」を無効化
// 最初にダミーの履歴を追加
history.pushState(null, null, location.href);

// 戻る操作時にまた pushState して実質戻れなくする
window.addEventListener("popstate", function () {
  history.pushState(null, null, location.href);
  alert("戻る操作は無効化されています");
});
