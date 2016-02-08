"use strict";

import {KEYBOARD_KEY} from "./config";

/**
 * TODO -  this is a temp solution until work is done to
 * break ui out into components
 */
export default class Shortcuts {

  static save(handlerFunc) {
    this.handleCmdLetterKeyDown(KEYBOARD_KEY.S, handlerFunc);
  }

  static languageSelect(handlerFunc) {
    this.handleCmdLetterKeyDown(KEYBOARD_KEY.L, handlerFunc);
  }

  static displayShortcuts(handlerFunc) {
    this.handleCmdLetterKeyDown(KEYBOARD_KEY.QUESTION_MARK, handlerFunc);
  }

  static handleCmdLetterKeyDown(letterKey, handlerFunc) {
    $(document).on('keydown', e => {
      if (e.keyCode == letterKey && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handlerFunc();
      }
    });
  }
}