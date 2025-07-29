"use strict";

export class GameManager {
  /**
   * @param {UIManager} uiManager UIを管理するマネージャー
   * @param {SceneManager} sceneManager シーンを管理するマネージャー
   */
  constructor(uiManager, sceneManager) {
    this.uiManager = uiManager;
    this.sceneManager = sceneManager;
    this.player = null; // プレイヤー情報を保持
  }

  /**
   * ゲームの初期化と開始
   */
  startGame() {
    this.setupCallbacks();
    this.sceneManager.show("title");
  }

  /**
   * UIManagerからのコールバックを設定する
   */
  setupCallbacks() {
    // スタートボタンが押されたときの処理を、UIManagerに登録する
    this.uiManager.onStartButtonClick = () => {
      this.handleStartGame();
    };

    // キャラクターが選択されたときの処理を、UIManagerに登録する
    this.uiManager.onCharacterSelect = (characterType) => {
      this.handleCharacterSelect(characterType);
    };
  }

  /**
   * ゲーム開始のハンドル
   */
  handleStartGame() {
    console.log("ゲームスタート！");
    this.sceneManager.show("characterSelect");
  }

  /**
   * キャラクター選択のハンドル
   * @param {string} characterType 選択されたキャラクターのタイプ
   */
  handleCharacterSelect(characterType) {
    console.log(`キャラクター「${characterType}」が選択されました。`);
    // ここでPlayerインスタンスを作成するなどの処理が入る
    // this.player = new Player(characterType);
    this.sceneManager.show("field");
  }
}
