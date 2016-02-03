"use strict";

import {KEYBOARD_LETTERS} from "./config";

/**
 * TODO -  this is a temp solution until work is done to
 * break ui out into components
 */
export default class Shortcuts {

  static save(handlerFunc) {
    $(document).on('keydown', e => {
      if (e.keyCode == KEYBOARD_LETTERS.S && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handlerFunc();
      }
    });
  }

}