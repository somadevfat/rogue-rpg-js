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
    this.fieldBackground = document.getElementById("enemy-field-background");
    this.playerImage = document.getElementById("player-character-image");
    this.enemyImage = document.getElementById("enemy-image");
    this.attackButton = document.getElementById("attack-button");
    this.escapeButton = document.getElementById("escape-button");
    this.saveButton = document.getElementById("save-button");
    this.dPadButtons = document.querySelectorAll(".dpad-button");

    // オーバーレイ
    this.overlay = document.getElementById("overlay");
    this.overlayMessage = document.getElementById("overlay-message");

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

  /**
   * オーバーレイを表示する
   * @param {string} message 表示するメッセージ
   */
  showOverlay(message) {
    this.overlayMessage.textContent = message;
    this.overlay.classList.remove("hidden");
  }

  /**
   * オーバーレイを非表示にする
   */
  hideOverlay() {
    this.overlay.classList.add("hidden");
  }

  /**
   * フィールドの背景画像を設定する
   * @param {string} imageUrl
   */
  setFieldBackground(imageUrl) {
    this.fieldBackground.style.backgroundImage = `url(${imageUrl})`;
  }

  /**
   * プレイヤーの画像を設定する
   * @param {string} imageUrl
   */
  setPlayerImage(imageUrl) {
    this.playerImage.src = imageUrl;
    this.playerImage.classList.remove("hidden");
  }

  /**
   * 敵の画像を設定し、表示する
   * @param {string} imageUrl
   */
  showEnemy(imageUrl) {
    this.enemyImage.src = imageUrl;
    this.enemyImage.classList.remove("hidden", "dead");
  }

  /**
   * 敵の画像を非表示にする
   */
  hideEnemy() {
    this.enemyImage.classList.add("hidden");
  }

  /**
   * 敵が倒された時の表示にする
   */
  setEnemyAsDefeated() {
    this.enemyImage.classList.add("dead");
  }

  /**
   * ステータス表示を更新する
   * @param {number} walkCount 総歩数
   * @param {number} enemyKillCount 敵の討伐数
   * @param {number} aveWalkEncounterRate 敵出現平均歩数
   * @param {string[]} enemyHistory 敵出現ログ（履歴）
   */
  updateStatusDisplay(
    walkCount,
    enemyKillCount,
    aveWalkEncounterRate,
    enemyHistory
  ) {
    const statusDisplayArea = document.getElementById("status-display-area");
    statusDisplayArea.innerHTML = `
      <p>総歩数: ${walkCount}</p>
      <p>敵の討伐数: ${enemyKillCount}</p>
      <p>敵出現平均歩数: ${Number(aveWalkEncounterRate.toFixed(2))}%</p>
      <p>敵出現ログ: ${enemyHistory.join(", ")}</p>
    `;
  }
}
