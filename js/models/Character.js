export class Character {
  constructor(
    name = "",
    jobName = "",
    level = 1,
    levelUpThreshold = 3,
    encounterRate = 0.5,
    winProbability = 0.5,
    escapeRate = 0.5
  ) {
    if (new.target === Character) {
      throw new Error(
        "基底クラスCaracterは直接インスタンス化できません。継承して使用してください。"
      );
    }
    this.name = name;
    this.level = level;
    this.levelUpThreshold = levelUpThreshold;
    this.encounterRate = encounterRate;
    this.winProbability = winProbability;
    this.escapeRate = escapeRate;
    this.jobName = jobName;
  }
}

export class Warrior extends Character {
  constructor(name) {
    super(name, "戦士", 1, 3, 0.5, 0.7, 0.3);
  }
}

export class Mage extends Character {
  constructor(name) {
    super(name, "魔法使い", 1, 3, 0.5, 0.6, 0.4);
  }
}
