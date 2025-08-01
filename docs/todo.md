# 残タスク一覧 (要件定義 v2 準拠) - 改訂版

## ロジック実装 (未実装・要修正)

- [-] **レベルアップ時の勝率上昇**
  - [-] `Character.js` のレベルアップ処理に、勝利確率(`winProbability`)を上昇させるロジックを追加する。
- [ ] **ステータス記録・計算**

  - [-] 敵の討伐数を記録する (`Character.js` または `GameManager.js`)
  - [-] 敵出現ログ（履歴）を記録する (`GameManager.js`)
    js/managers/GameManager.js 153 で敵作成
    this.enemyCount++;
    this.enemyHistory.push(enemy.name); // 敵の名前を履歴に追加
    21,22 行目
    this.enemyCount = 0; // 敵の出現回数をカウントするための変数
    this.enemyHistory = []; // 敵の出現履歴を保持する配列

  - [-] 敵出現平均歩数を計算するロジックを実装する (`GameManager.js`)160 行目
    this.aveWalkEncounterRate = 0; // 平均エンカウント率を計算するための変数
    this.aveWalkEncounterRate = this.enemyCount / this.walkCount\*100; // 平均エンカウント率を計算

- [-] **ブラウザ制御**
  - [-] フィールド画面でリロード(F5)を無効化する
  - [-] フィールド画面でブラウザの「戻る」機能を無効化する
- [x] **ゲームフロー**
  - [x] 敗北後、数秒待ってからタイトル画面に遷移させる
    - `GameManager.js` の `handleBattleLose` に `setTimeout` を使用して 3 秒の待機時間を設定。
    - `UIManager.js` にオーバーレイ表示/非表示のメソッドを追加し、待機中に「GAME OVER」を表示するようにした。

## UI 実装 (未実装)

- [ ] **画像アセットの準備**

  - [ ] **タイトル画面**
    - [ ] ゲームタイトル画像
    - [ ] 背景画像`https://images.unsplash.com/photo-1652376172934-95d8d0a8ec47?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
  - [x] **キャラクター選択画面**
    - [x] 戦士の画像
    - [x] 魔法使いの画像
  - [x] **フィールド画面**
    - [x] 背景画像（平地）
    - [x] 背景画像（森）
    - [x] 背景画像（沼）
    - [x] プレイヤーキャラクター画像

- [ ] **フィールド画面**

  - [ ] **ステータス表示エリアの作成と連携**
    - [ ] 総歩数を表示する
    - [ ] 敵の討伐数を表示する
    - [ ] 敵出現平均歩数を表示する
    - [ ] 敵出現ログ（履歴）を表示する
  - [x] **戦闘関連の表示**
    - [x] 敵の画像を「倒された」状態に変更する
      - [x] 敵キャラクターの画像（通常時）を準備する
      - [x] 敵キャラクターの画像（討伐後）を準備する (CSS で対応)
  - [ ] **メッセージ表示** - [ ] 状況に応じてメッセージエリアのテキストを更新する（例：「歩く方向を押してください」）
