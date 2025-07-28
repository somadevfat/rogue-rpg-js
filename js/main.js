"use strict";
import { SceneManager } from "./managers/SceneManager.js";

// ===== 画面遷移 =====

const sceneManager = new SceneManager();

// 最初の画面を表示
sceneManager.movePage(0);

// 最低限の画面遷移
sceneManager.startButtonSetEvent();
sceneManager.selectCharacterBtnSetEvent();
