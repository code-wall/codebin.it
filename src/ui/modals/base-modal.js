"use strict";

/**
 * Modal base class
 */
export default class Modal {

  constructor(_modalId) {
    this.modal = $(_modalId);
    this.displayed = false;
  }

  show() {
    if (this.displayed) {
      this.modal.closeModal();
      this.displayed = false;
    } else {
      this.modal.openModal();
      this.displayed = true;
    }
  }

}