"use strict";

export class UIManager {
  constructor() {
    // --- DOM要素の取得 ---
    // タイトル画面
    this.startButton = document.getElementById("start-button");

    // キャラクター選択画面
    this.characterCards = document.querySelectorAll(".character-card"); // querySelectorAllを使用
    this.playerNameInput = document.getElementById("player-name");
    this.confirmButton = document.getElementById("confirm-button");

    // --- コールバック関数を保持するプロパティ ---
    this.onStartButtonClick = null;
    this.onCharacterSelect = null;
  }

  /**
   * ゲーム開始に必要なイベントリスナーをセットアップする
   */
  setupEventListeners() {
    // スタートボタンのクリックイベント
    if (this.startButton) {
      this.startButton.addEventListener("click", () => {
        // 登録されたコールバック関数があれば実行する
        if (this.onStartButtonClick) {
          this.onStartButtonClick();
        }
      });
    }

    // キャラクター選択カードのクリックイベント
    this.characterCards.forEach((card) => {
      card.addEventListener("click", () => {
        const characterType = card.dataset.character; // e.g., data-character="warrior"
        // 登録されたコールバック関数があれば実行する
        if (this.onCharacterSelect) {
          this.onCharacterSelect(characterType);
        }
      });
    });
  }
}
