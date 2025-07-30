"use strict";

import { Warrior, Mage } from "../models/Character.js";
import { Slime, Goblin } from "../models/Enemy.js";
import { PlainsMap, ForestMap, SwampMap } from "../models/Map.js";
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

    // 十字キーが押されたときの処理を、UIManagerに登録する
    this.uiManager.onWalk = () => {
      this.walk();
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
    // ここでPlayerインスタンスを作成するなどの処理が入る
    const playerName = this.uiManager.characterNameInput.value;
    // 名前の入力チェック
    if (!playerName) {
      alert("プレイヤー名を入力してください。");
      return; // 処理を中断
    }

    console.log(`キャラクター「${characterType}」が選択されました。`);
    switch (characterType) {
      case "warrior":
        this.player = new Warrior(playerName);
        break;
      case "mage":
        this.player = new Mage(playerName);
        break;
      default:
        console.error(`無効なキャラクタータイプです ${characterType}`);
        return;
    }
    console.log(`プレイヤーを作成しました:`, this.player);
    // this.player = new Player(characterType);
    this.sceneManager.show("field");

    // マップの初期化
    this.currentMap = new PlainsMap(); // 最初のマップは平原
  }
  /**
   * フィールドを歩く処理
   * エンカウント判定を行う
   */
  walk() {
    console.log("プレイヤーは歩いている...");

    // エンカウント判定
    if (Math.random() < this.currentMap.encounterRate) {
      this.handleEncounter();
    }
  }

  /**
   * 敵とのエンカウント処理
   */
  handleEncounter() {
    // 現在のマップから敵を生成する
    const enemy = this.currentMap.createEnemy();
    console.log(`${enemy.name}(レベル${enemy.level})があらわれた！`);

    // TODO: ここで戦闘シーンへの切り替えなどを行う
    // this.sceneManager.show("battle");
  }
}
