"use strict";

/**
 * 戦闘シーンのロジックを管理するクラス
 */
export class BattleManager {
  /**
   * @param {Character} player プレイヤーオブジェクト
   * @param {Enemy} enemy 敵オブジェクト
   * @param {function} onEndCallback 戦闘終了時に呼び出されるコールバック関数
   */
  constructor(player, enemy, onEndCallback) {
    this.player = player;
    this.enemy = enemy;
    this.onEndCallback = onEndCallback; // 戦闘終了をGameManagerに通知するための関数
  }

  /**
   * プレイヤーの攻撃処理
   */
  attack() {
    console.log("たたかう！");

    // 仮の勝利判定。将来的にはダメージ計算などのロジックが入る
    if (Math.random() < this.player.winProbability) {
      this.handleWin();
    } else {
      // 攻撃に失敗した場合（将来的には敵のターンになる）
      console.log(`${this.player.name}の攻撃は外れた！`);
      // TODO: 敵の攻撃処理を呼び出す
      this.handleLose(); // 仮で敗北処理を呼んでおく
    }
  }

  /**
   * 逃げる処理
   */
  escape() {
    console.log("逃げる！");

    // 逃走判定
    if (Math.random() < this.player.escapeRate) {
      this.handleEscapeSuccess();
    } else {
      this.handleEscapeFailure();
    }
  }

  handleWin() {
    // GameManagerに結果を通知する
    this.onEndCallback({
      result: "win",
      expGiven: this.enemy.expGiven,
      defeatedEnemyName: this.enemy.name,
    });
  }

  handleLose() {
    // GameManagerに結果を通知する
    this.onEndCallback({ result: "lose" });
  }

  handleEscapeSuccess() {
    console.log("うまく逃げ切れた！");
    // GameManagerに結果を通知する
    this.onEndCallback({ result: "escape" });
  }

  handleEscapeFailure() {
    console.log("しかし、回り込まれてしまった！");
    console.log("敵の攻撃！");
    // 「再度、確率に基づいた勝敗判定が行われる」に基づき判定
    if (Math.random() < this.player.winProbability) {
      console.log("しかし、攻撃をうまくかわした！");
      // 再度プレイヤーのターン（UI側でコマンド再選択）
    } else {
      console.log("致命的な一撃を受けてしまった！");
      this.handleLose();
    }
  }
}
