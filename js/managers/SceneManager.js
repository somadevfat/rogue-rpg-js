"use strict";
export class SceneManager {
  constructor() {
    this.titleScreen = document.getElementById("title-screen");
    this.characterSerectScreen = document.getElementById(
      "character-selection-screen"
    );
    this.fieldScreen = document.getElementById("field-screen");
  }

  // ===== 画面遷移 =====
  movePage(page) {
    // ページ番号に応じて遷移先を設定
    switch (page) {
      case 0:
        this.titleScreen.className = "visible";
        this.characterSerectScreen.className = "hidden";
        this.fieldScreen.className = "hidden";
        break;
      case 1:
        this.titleScreen.className = "hidden";
        this.characterSerectScreen.className = "visible";
        this.fieldScreen.className = "hidden";
        break;
      case 2:
        this.titleScreen.className = "hidden";
        this.characterSerectScreen.className = "hidden";
        this.fieldScreen.className = "visible";
        break;
      default:
        break;
    }
  }

  startButtonSetEvent() {
    const startButton = document.getElementById("start-button");
    startButton.addEventListener("click", () => {
      this.movePage(1);
    });
  }
  selectCharacterBtnSetEvent() {
    const characterCards = document.getElementsByClassName("character-card");
    Array.from(characterCards).forEach((card) => {
      card.addEventListener("click", () => {
        this.movePage(2);
      });
    });
  }
}
