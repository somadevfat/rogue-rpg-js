"use strict";

/**
 * UIの管理を担当するクラス
 * DOM要素の取得、イベントリスナーの設定、UIの更新などを行う
 */
export class UIManager {
  constructor() {
    // ---- DOM要素の取得 ----
    // タイトル画面
    this.startButton = document.getElementById("start-button");
    this.continueButton = document.getElementById("continue-button");

    // キャラクター選択画面
    this.characterCards = document.querySelectorAll(".character-card");
    this.characterNameInput = document.getElementById("character-name");
    this.confirmCharacterButton = document.getElementById(
      "confirm-character-button"
    );

    // フィールド画面
    this.attackButton = document.getElementById("attack-button");
    this.escapeButton = document.getElementById("escape-button");
    this.saveButton = document.getElementById("save-button");
    this.dPadButtons = document.querySelectorAll(".dpad-button");

    // ---- コールバックプロパティの初期化 ----
    // GameManagerから設定される
    this.onStartButtonClick = null;
    this.onContinueButtonClick = null;
    this.onCharacterSelect = null;
    this.onWalk = null;
    this.onAttack = null;
    this.onEscape = null;
    this.onSave = null;

    // ---- 内部状態 ----
    this.selectedCharacterType = null; // 選択されたキャラクタータイプを保持
  }

  /**
   * 各DOM要素にイベントリスナーを設定する
   */
  setupEventListeners() {
    // スタートボタン
    this.startButton.addEventListener("click", () => {
      // onStartButtonClickコールバックが設定されていれば実行
      if (this.onStartButtonClick) {
        this.onStartButtonClick();
      }
    });

    // コンティニューボタン
    this.continueButton.addEventListener("click", () => {
      if (this.onContinueButtonClick) {
        this.onContinueButtonClick();
      }
    });

    // キャラクター選択カード
    this.characterCards.forEach((card) => {
      card.addEventListener("click", () => {
        // 選択されたキャラクターのタイプを保持
        this.selectedCharacterType = card.dataset.character;

        // 選択状態を視覚的に示す（例：ボーダーの色を変更）
        this.characterCards.forEach((c) => (c.style.border = "1px solid #fff"));
        card.style.border = "2px solid yellow";
      });
    });

    // キャラクター決定ボタン
    this.confirmCharacterButton.addEventListener("click", () => {
      if (this.onCharacterSelect) {
        if (this.selectedCharacterType) {
          // 選択されたキャラクタータイプを引数にコールバックを実行
          this.onCharacterSelect(this.selectedCharacterType);
        } else {
          alert("キャラクターを選択してください。");
        }
      }
    });

    // 十字キー（どのボタンが押されても onWalk を呼ぶ）
    this.dPadButtons.forEach((button) => {
      button.addEventListener("click", () => {
        if (this.onWalk) {
          this.onWalk();
        }
      });
    });

    // たたかうボタン
    this.attackButton.addEventListener("click", () => {
      if (this.onAttack) {
        this.onAttack();
      }
    });

    // にげるボタン
    this.escapeButton.addEventListener("click", () => {
      if (this.onEscape) {
        this.onEscape();
      }
    });

    // セーブボタン
    this.saveButton.addEventListener("click", () => {
      if (this.onSave) {
        this.onSave();
      }
    });
  }

  /**
   * コンティニューボタンの有効/無効を切り替える
   * @param {boolean} enabled 有効にする場合はtrue
   */
  setContinueButtonEnabled(enabled) {
    this.continueButton.disabled = !enabled;
    this.continueButton.style.opacity = enabled ? "1" : "0.5";
    this.continueButton.style.cursor = enabled ? "pointer" : "not-allowed";
  }
}
