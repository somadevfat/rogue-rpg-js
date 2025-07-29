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
