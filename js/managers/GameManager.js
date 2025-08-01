"use strict";

import { Warrior, Mage } from "../models/Character.js";
import { BattleManager } from "./BattleManager.js";
import { SaveManager } from "./SaveManager.js";
import { PlainsMap, ForestMap, SwampMap } from "../models/Map.js";
export class GameManager {
  /**
   * @param {UIManager} uiManager UIを管理するマネージャー
   * @param {SceneManager} sceneManager シーンを管理するマネージャー
   */
  constructor(uiManager, sceneManager) {
    this.uiManager = uiManager;
    this.sceneManager = sceneManager;
    this.saveManager = new SaveManager();
    this.player = null; // プレイヤー情報を保持
    this.gameState = null; // ゲームの状態（'field', 'battle'など）
    this.currentEnemy = null; // 現在の敵
    this.currentMap = null; // 現在のマップ
    this.battleManager = null; // 戦闘を管理するマネージャー
    this.enemyCount = 0; // 敵の出現回数をカウントするための変数
    this.enemyHistory = []; // 敵の出現履歴を保持する配列
    this.aveWalkEncounterRate = 0; // 平均エンカウント率を計算するための変数
    this.messageLog = []; // メッセージを保持する配列
  }

  /**
   * ゲームの初期化と開始
   */
  startGame() {
    // UIManagerにコンティニューボタンの有効/無効を設定する機能があれば呼び出す
    if (this.uiManager.setContinueButtonEnabled) {
      this.uiManager.setContinueButtonEnabled(this.saveManager.hasSaveData());
    }
    // savedataがあればスタートボタンを表示しない
    if (this.saveManager.hasSaveData()) {
      this.uiManager.setStartButtonVisible(false);
    }

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

    // コンティニューボタンが押されたときの処理
    this.uiManager.onContinueButtonClick = () => {
      this.handleLoadGame();
    };

    // キャラクターが選択されたときの処理を、UIManagerに登録する
    this.uiManager.onCharacterSelect = (characterType) => {
      this.handleCharacterSelect(characterType);
    };

    // キャラ選択及びネーム入力バリデーション
    this.uiManager.onInputNameValidation = () => {
      this.handleInputNameValidation();
    };

    // 十字キーが押されたときの処理を、UIManagerに登録する
    this.uiManager.onWalk = () => {
      this.walk();
    };
    // 攻撃
    this.uiManager.onAttack = () => {
      if (this.battleManager) this.battleManager.attack();
    };
    // 逃げる
    this.uiManager.onEscape = () => {
      if (this.battleManager) this.battleManager.escape();
    };

    // セーブボタンが押されたときの処理
    this.uiManager.onSave = () => {
      this.handleSaveGame();
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
    // 新規ゲーム開始時にゲームの状態をリセット
    this.enemyCount = 0;
    this.enemyHistory = []; // 配列として初期化
    this.aveWalkEncounterRate = 0;

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
    this.gameState = "field"; // ゲームの状態をフィールドに設定

    // UIの更新
    this.uiManager.setPlayerImage(this.player.image);
    this.uiManager.setFieldBackground(this.currentMap.backgroundImage);
    this.uiManager.hideEnemy();
    // ★ステータス表示を初期化 (リセットされたGameManagerのプロパティを使用)
    this.uiManager.updateStatusDisplay(
      this.player.walkCount,
      this.player.enemyKillCount,
      this.aveWalkEncounterRate, // GameManagerのプロパティ
      this.enemyHistory // GameManagerのプロパティ
    );
    this.addMessage("十字キーで移動してください");
  }
  /**
   * 名前入力時のバリデーション
   */
  handleInputNameValidation() {
    // 名前の入力チェック
    if (
      !this.uiManager.selectedCharacterType ||
      !this.uiManager.characterNameInput.value
    ) {
      this.uiManager.confirmCharacterButton.classList.add("hidden");
      return;
    } else {
      this.uiManager.confirmCharacterButton.classList.remove("hidden");
    }
  }
  /**
   * フィールドを歩く処理
   * エンカウント判定を行う
   */
  walk() {
    // 戦闘中など、フィールド移動が許可されていない状態では何もしない
    if (this.gameState !== "field") {
      return;
    }
    console.log("プレイヤーは歩いている...");
    console.log(`${this.messageLog.join("\n")}`);
    this.addMessage("プレイヤーは歩いている...");

    // 歩数カウント
    this.player.walkCount++;

    // 歩数によってマップ変える
    const forest = new ForestMap();
    const swamp = new SwampMap();
    let mapChanged = false;
    if (this.player.walkCount === forest.walkLimit) {
      this.currentMap = forest;
      mapChanged = true;
      console.log("森のマップに移動しました。");
      this.addMessage("森のマップに移動しました。");
    } else if (this.player.walkCount === swamp.walkLimit) {
      this.currentMap = swamp;
      mapChanged = true;
      console.log("沼のマップに移動しました。");
      this.addMessage("沼のマップに移動しました。");
    }

    if (mapChanged) {
      this.uiManager.setFieldBackground(this.currentMap.backgroundImage);
    }
    // エンカウント判定
    if (Math.random() < this.currentMap.encounterRate) {
      this.handleEncounter();
    }
    // ステータス表示を更新
    this.uiManager.updateStatusDisplay(
      this.player.walkCount,
      this.player.enemyKillCount,
      this.aveWalkEncounterRate,
      this.enemyHistory
    );
  }

  /**
   * メッセージをログに追加して表示する
   * @param {string} msg 表示するメッセージ
   */
  addMessage(msg) {
    const maxLog = 5;
    this.messageLog.push(msg);
    if (this.messageLog.length > maxLog) {
      this.messageLog.shift();
    }
    this.uiManager.showMessage(...this.messageLog);
  }
  /**
   * 敵とのエンカウント処理
   */
  handleEncounter() {
    // 現在のマップから敵を生成する
    const enemy = this.currentMap.createEnemy();
    // 2. ゲームマネージャーに「今戦っているのはこいつだ」と記憶させる
    this.currentEnemy = enemy;
    this.enemyCount++;
    this.enemyHistory.push(`${this.enemyCount}: ${enemy.name}`); // 敵の名前を履歴に追加
    this.aveWalkEncounterRate = (this.enemyCount / this.player.walkCount) * 100; // 平均エンカウント率を計算

    // 3. ゲームの状態を「戦闘中」に変える
    this.gameState = "battle";

    this.addMessage(
      `${this.currentEnemy.name}(レベル${this.currentEnemy.level})があらわれた！`
    );

    // UIに敵を表示
    this.uiManager.showEnemy(this.currentEnemy.image);

    // BattleManagerを生成して戦闘開始
    this.battleManager = new BattleManager(
      this.player,
      this.currentEnemy,
      (result) => this.handleBattleEnd(result), // 戦闘終了時のコールバックを渡す
      this.addMessage.bind(this) //コールバックのときはbind()しないとバグる
    );

    // UIManagerに通知して、戦闘用のUI（たたかう・にげるボタン）を表示させる
    // this.uiManager.showBattleCommands();
  }

  /**
   * BattleManagerからの戦闘結果を処理する
   * @param {object} result 戦闘結果
   */
  handleBattleEnd(result) {
    this.battleManager = null; // バトルマネージャーをクリア

    switch (result.result) {
      case "win":
        this.handleBattleWin(result);
        break;
      case "lose":
        this.handleBattleLose();
        break;
      case "escape":
        this.endBattle(); // フィールドに戻るだけ
        break;
    }
  }

  /**
   * 戦闘勝利時の処理
   * @param {object} result BattleManagerからの戦闘結果
   */
  handleBattleWin(result) {
    this.addMessage(`${result.defeatedEnemyName}を倒した！`);
    this.uiManager.setEnemyAsDefeated();
    // プレイヤーの討伐数を更新
    this.player.enemyKillCount++;
    // 経験値をプレイヤーに与える
    this.addMessage(
      `${this.player.name}は ${result.expGiven} の経験値を獲得した！`
    );
    const leveledUp = this.player.gainExp(result.expGiven);

    if (leveledUp) {
      this.addMessage(
        `${this.player.name}はレベル ${this.player.level} に上がった！`
      );
    }

    // 少し待ってから戦闘終了処理
    setTimeout(() => {
      this.endBattle();
    }, 1500); // 1.5秒待つ
  }

  /**
   * 戦闘敗北時の処理
   */
  handleBattleLose() {
    this.addMessage("勇者は死んでしまった");
    this.addMessage("ゲームオーバー");

    this.uiManager.showOverlay("GAME OVER");

    setTimeout(() => {
      this.uiManager.hideOverlay();
      this.resetGame();
      this.sceneManager.show("title");
    }, 3000); // 3秒後に実行
  }

  /**
   * 戦闘を終了し、フィールド状態に戻す
   */
  endBattle() {
    this.currentEnemy = null;
    this.gameState = "field";
    this.addMessage("歩く方向を押してください");
    this.uiManager.hideEnemy();
  }

  /**
   * ゲームの状態をリセットする
   */
  resetGame() {
    this.player = null; // プレイヤー情報を保持
    this.gameState = null; // ゲームの状態（'field', 'battle'など）
    this.currentEnemy = null; // 現在の敵
    this.currentMap = null; // 現在のマップ
    this.battleManager = null; // 戦闘を管理するマネージャー
    this.enemyCount = 0; // 敵の出現回数をカウントするための変数
    this.enemyHistory = []; // 敵の出現履歴を保持する配列
    this.aveWalkEncounterRate = 0; // 平均エンカウント率を計算するための変数
    console.log("ゲームオーバーオブジェクトリセット後タイトルに戻る。");
  }

  /**
   * ゲームの状態をセーブする
   */
  handleSaveGame() {
    if (this.gameState !== "field") {
      alert("フィールドにいるときのみセーブできます。");
      return;
    }
    if (!this.player) {
      console.error("プレイヤーデータがないためセーブできません。");
      return;
    }

    const saveData = {
      player: this.player,
      mapName: this.currentMap.name,
      enemyHistory: this.enemyHistory,
      aveWalkEncounterRate: this.aveWalkEncounterRate,
    };

    if (this.saveManager.save(saveData)) {
      alert("ゲームをセーブしました。");
    } else {
      alert("セーブに失敗しました。");
    }
  }

  /**
   * ゲームの状態をロードする
   */
  handleLoadGame() {
    const saveData = this.saveManager.load();
    if (!saveData) {
      alert("セーブデータが見つかりませんでした。");
      return;
    }
    // --- プレイヤーデータの復元 ---
    // JSONから復元したデータはただのオブジェクトなので、
    // 正しいクラス(Warrior/Mage)のインスタンスとして再生成する
    const playerData = saveData.player;

    switch (playerData.jobName) {
      case "戦士":
        this.player = new Warrior(playerData.name);
        break;
      case "魔法使い":
        this.player = new Mage(playerData.name);
        break;
      default:
        alert("セーブデータの読み込みに失敗しました。");
        return;
    }
    // レベルや経験値など、保存されていたプロパティをすべてコピーする
    Object.assign(this.player, playerData);

    // --- マップの復元 ---
    switch (saveData.mapName) {
      case "平地":
        this.currentMap = new PlainsMap();
        break;
      case "森":
        this.currentMap = new ForestMap();
        break;
      case "沼":
        this.currentMap = new SwampMap();
        break;
      // 他のマップも同様に追加
      default:
        this.currentMap = new PlainsMap(); // 不明な場合はデフォルトマップ
        break;
    }

    // --- 討伐履歴やエンカウント率を復元 ---
    this.enemyHistory = saveData.enemyHistory || [];
    this.aveWalkEncounterRate = saveData.aveWalkEncounterRate || 0;

    console.log("ゲームをロードしました:", this.player);
    this.gameState = "field";
    this.sceneManager.show("field");

    // UIの更新
    this.uiManager.setPlayerImage(this.player.image);
    this.uiManager.setFieldBackground(this.currentMap.backgroundImage);
    this.uiManager.hideEnemy();
    this.uiManager.updateStatusDisplay(
      this.player.walkCount,
      this.player.enemyKillCount,
      this.aveWalkEncounterRate,
      this.enemyHistory
    );
  }
}
