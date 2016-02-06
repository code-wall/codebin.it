"use strict";

import Modal from "./base-modal";
import Shortcuts from "../../shortcuts";

/**
 * Modal to show shortcuts/help
 */
export default class HelpModal extends Modal {

  constructor() {
    super("#help-modal");
    Shortcuts.displayShortcuts(this.show.bind(this));
  }

}