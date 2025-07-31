export class Enemy {
  constructor(
    name = "",
    level = 1,
    expGiven = 1,
    image = "" /*occurrenceRate = 100*/
  ) {
    if (new.target === Enemy) {
      throw new Error(
        "基底クラスEnemyは直接インスタンス化できません。継承して使用してください。"
      );
    }
    this.name = name;
    this.level = level;
    this.expGiven = expGiven;
    this.image = image;
  }
}

// スライム
export class Slime extends Enemy {
  constructor(level) {
    super("スライム", level, level, "images/character_monster_slime_green.png");
  }
}

// 紫スライム
export class PurpleSlime extends Enemy {
  constructor(level) {
    super(
      "紫スライム",
      level,
      level * 2,
      "images/character_monster_slime_purple.png"
    );
  }
}
