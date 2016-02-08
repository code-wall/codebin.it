"use strict";

/**
 * Modal base class
 */
export default class Modal {

  constructor(_modalId) {
    this.modal = $(_modalId);
    this.displayed = false;
    // The close handler will handle when the modal is closed by clicking
    // off outside of the modal view
    this.closeHandler = function() {this.displayed = false;}.bind(this);
  }

  show() {
    if (this.displayed) {
      this.modal.closeModal();
      this.displayed = false;
    } else {
      this.modal.openModal({complete: this.closeHandler});
      this.displayed = true;
    }
  }

}