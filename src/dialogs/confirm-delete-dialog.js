import {DialogController} from 'aurelia-dialog';

export class ConfirmDeleteDialog {
  static inject = [DialogController];

  model = {};

  constructor(controller) {
    this.controller = controller;
  }
  activate(model) {
    this.model = model;
  }
}
