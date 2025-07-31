export class Character {
  constructor(
    name = "",
    jobName = "",
    level = 1,
    levelUpThreshold = 3,
    encounterRate = 0.5,
    winProbability = 0.5,
    escapeRate = 0.5,
    expGainMultiplierOnLevelUp = 1.0,
    walkCount = 0,
    image = ""
  ) {
    if (new.target === Character) {
      throw new Error(
        "基底クラスCaracterは直接インスタンス化できません。継承して使用してください。"
      );
    }
    this.name = name;
    this.image = image;
    this.level = level;
    this.exp = 0;
    this.levelUpThreshold = levelUpThreshold;
    this.encounterRate = encounterRate;
    this.winProbability = winProbability;
    this.escapeRate = escapeRate;
    this.jobName = jobName;
    this.expGainMultiplierOnLevelUp = expGainMultiplierOnLevelUp;
    this.walkCount = walkCount;
    this.baseWinProbability = winProbability; // 初期勝率を保存
  }

  /**
   * 経験値を獲得し、レベルアップ判定を行う
   * @param {number} amount 獲得する経験値の量
   * @returns {boolean} レベルアップしたかどうか
   */
  gainExp(amount) {
    this.exp += amount;
    let leveledUp = false;

    // 経験値が次のレベルの閾値に達しているか、ループでチェック
    while (this.exp >= this.levelUpThreshold) {
      this.level++;
      this.exp -= this.levelUpThreshold;
      // 次のレベルアップに必要な経験値を更新（小数点以下は切り捨て）
      this.levelUpThreshold = Math.floor(
        this.levelUpThreshold * this.expGainMultiplierOnLevelUp
      );
      // 勝率をレベルに比例して再計算（レベルごとに2%上昇、上限95%）
      this.winProbability = Math.min(
        this.baseWinProbability + (this.level - 1) * 0.02,
        0.95
      );
      console.log(
        `レベルアップ！ 勝率が ${this.winProbability.toFixed(3)} になった！`
      );
      leveledUp = true;
    }
    return leveledUp;
  }
}

export class Warrior extends Character {
  constructor(name) {
    super(
      name,
      "戦士",
      1,
      3,
      0.5,
      0.7,
      0.7,
      1.2,
      0,
      "images/character_senshi_red.png"
    );
  }
}

export class Mage extends Character {
  constructor(name) {
    super(
      name,
      "魔法使い",
      1,
      3,
      0.5,
      0.6,
      0.6,
      1.1,
      0,
      "images/character_mahotsukai_01_green.png"
    );
  }
}
