import { KEYBOARD_KEY } from "../constants/config.js";

export default class Shortcuts {

  static save(handlerFunc) {
    let shortCutFunc = this.createShortCutCommand(KEYBOARD_KEY.S, handlerFunc);
    window.addEventListener("keydown", shortCutFunc)
  }

  static languageSelect(handlerFunc) {
    let shortCutFunc = this.createShortCutCommand(KEYBOARD_KEY.L, handlerFunc);
    window.addEventListener("keydown", shortCutFunc)
  }

  static displayShortcuts(handlerFunc) {
    let shortCutFunc = this.createShortCutCommand(KEYBOARD_KEY.QUESTION_MARK, handlerFunc);
    window.addEventListener("keydown", shortCutFunc)
  }

  static createShortCutCommand(letterKey, handlerFunc) {
    return function (e) {
      if (e.keyCode == letterKey && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handlerFunc();
      }
    }
  }
}
