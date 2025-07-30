"use strict";
export class SaveManager {
  /**
   * @param {string} storageKey localStorageに保存するときのキー
   */
  constructor(storageKey = "jsQuestSaveData") {
    this.storageKey = storageKey;
  }

  /**
   * ゲームデータをlocalStorageに保存する
   * @param {object} data 保存するゲームデータ
   * @returns {boolean} セーブに成功したかどうか
   */
  save(data) {
    try {
      const json = JSON.stringify(data);
      localStorage.setItem(this.storageKey, json);
      console.log("ゲームデータを保存しました。");
      return true;
    } catch (error) {
      console.error("セーブに失敗しました:", error);
      return false;
    }
  }

  /**
   * localStorageからゲームデータを読み込む
   * @returns {object | null} 読み込んだゲームデータ。データがない場合はnull
   */
  load() {
    const json = localStorage.getItem(this.storageKey);
    if (!json) {
      return null;
    }
    try {
      const data = JSON.parse(json);
      console.log("ゲームデータを読み込みました。");
      return data;
    } catch (error) {
      console.error("セーブデータの読み込みに失敗しました:", error);
      return null;
    }
  }

  hasSaveData() {
    return localStorage.getItem(this.storageKey) !== null;
  }
}
