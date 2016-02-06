"use strict";

import Modal from "./base-modal";
import Shortcuts from "../../shortcuts";

/**
 * TODO -  this is a temp solution until work is done to
 * break ui out into components
 */
export default class HelpModal extends Modal {

  constructor() {
    super("#help-modal");
    Shortcuts.displayShortcuts(this.show.bind(this));
  }

}