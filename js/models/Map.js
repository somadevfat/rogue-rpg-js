"use strict";

import { PurpleSlime, Slime } from "./Enemy.js";

/**
 * マップの基底クラス
 * new Map() のように直接インスタンス化して使うことは想定していない
 */
class Map {
  constructor(
    name,
    backgroundImage,
    encounterRate,
    mapLevel,
    enemies,
    walkLimit = 0
  ) {
    // new.targetは、newキーワードで呼び出されたコンストラクタを指す
    // これがMap自身だった場合、基底クラスを直接newしようとしたと判断できる
    if (new.target === Map) {
      throw new Error(
        "基底クラスMapは直接インスタンス化できません。継承して使用してください。"
      );
    }
    this.name = name;
    this.backgroundImage = backgroundImage;
    this.encounterRate = encounterRate;
    this.mapLevel = mapLevel;
    this.enemies = enemies;
    this.walkLimit = walkLimit;
  }
  /**
   * このマップに出現する敵をランダムに1体生成する
   * @returns {Enemy} 生成された敵のインスタンス
   */
  createEnemy() {
    // 自分の持つ敵リスト(this.enemies)からランダムに1つクラスを選ぶ
    const enemyClass =
      this.enemies[Math.floor(Math.random() * this.enemies.length)];
    // 自分のレベル(this.level)を使って、敵インスタンスを生成して返す
    return new enemyClass(this.mapLevel);
  }
}

/**
 * 平地のマップ
 */
export class PlainsMap extends Map {
  constructor() {
    // super()で親クラス(Map)のコンストラクタを呼び出す
    super("平地", "images/maptile_sogen_01.png", 0.1, 1, [Slime]); // エンカウント率10%
  }
}

/**
 * 森のマップ
 */
export class ForestMap extends Map {
  constructor() {
    super("森", "images/maptile_wood_02.png", 0.3, 2, [Slime, PurpleSlime], 20); // エンカウント率30%
  }
}

/**
 * 沼のマップ
 */
export class SwampMap extends Map {
  constructor() {
    super("沼", "images/maptile_koya.png", 0.5, 3, [Slime, PurpleSlime], 40); // エンカウント率50%
  }
}
