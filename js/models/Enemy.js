export class Enemy {
  constructor(name = "", level = 1, expGiven = 1 /*occurrenceRate = 100*/) {
    if (new.target === Enemy) {
      throw new Error(
        "基底クラスEnemyは直接インスタンス化できません。継承して使用してください。"
      );
    }
    this.name = name;
    this.level = level;
    this.expGiven = expGiven;
  }
}

// スライム
export class Slime extends Enemy {
  constructor(level) {
    super("スライム", level, level);
  }
}

// ゴブリン
export class Goblin extends Enemy {
  constructor(level) {
    super("ゴブリン", level, level * 2);
  }
}
