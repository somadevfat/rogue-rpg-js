"use strict";

/**
 * マップの基底クラス
 * new Map() のように直接インスタンス化して使うことは想定していない
 */
class Map {
  constructor(name, backgroundImage, encounterRate) {
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
  }
}

/**
 * 平地のマップ
 */
export class PlainsMap extends Map {
  constructor() {
    // super()で親クラス(Map)のコンストラクタを呼び出す
    super("平地", "images/backgrounds/plains.png", 0.1); // エンカウント率10%
  }
}

/**
 * 森のマップ
 */
export class ForestMap extends Map {
  constructor() {
    super("森", "images/backgrounds/forest.png", 0.3); // エンカウント率30%
  }
}

/**
 * 沼のマップ
 */
export class SwampMap extends Map {
  constructor() {
    super("沼", "images/backgrounds/swamp.png", 0.5); // エンカウント率50%
  }
}
