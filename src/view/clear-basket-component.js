import { createElement } from "../framework/render.js";

function createClearButtonTemplate() {
  return `<button class="clear-button">× Очистить</button>`;
}

export default class ClearBasketComponent {
  constructor() {
    this.handleClearClick = this.handleClearClick.bind(this);
    this.clearCallback = null;
  }

  getTemplate() {
    return createClearButtonTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      this.element.addEventListener("click", this.handleClearClick);
    }

    return this.element;
  }

  handleClearClick() {
    if (this.clearCallback) {
      this.clearCallback();
    }
  }

  setClearCallback(callback) {
    this.clearCallback = callback;
  }

  removeElement() {
    this.element = null;
  }
}
