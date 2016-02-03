"use strict";

/**
 * TODO -  this is a temp solution until work is done to
 * break ui out int components
 */
export default class Shortcuts {

  static save(handlerFunc) {
    $(document).on('keydown', e => {
      if (e.keyCode == 83 && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handlerFunc();
      }
    });
  }

}





