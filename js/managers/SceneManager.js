"use strict";
export class SceneManager {
  constructor() {
    // 各シーンの要素を保持するオブジェクト
    this.scenes = {
      title: document.getElementById("title-screen"),
      characterSelect: document.getElementById("character-selection-screen"),
      field: document.getElementById("field-screen"),
    };
  }

  /**
   * 指定された名前のシーンを表示し、他を非表示にする
   * @param {string} sceneName 表示するシーンの名前 ('title', 'characterSelect', 'field')
   */
  show(sceneName) {
    // 全てのシーンを一旦非表示にする
    for (const key in this.scenes) {
      this.scenes[key].classList.remove("visible");
      this.scenes[key].classList.add("hidden");
    }

    // 指定されたシーンのみを表示する
    if (this.scenes[sceneName]) {
      this.scenes[sceneName].classList.remove("hidden");
      this.scenes[sceneName].classList.add("visible");
    } else {
      console.error(`Scene "${sceneName}" not found.`);
    }
  }
}
