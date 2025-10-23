import AbstractComponent from "../framework/view/abstract-component.js";

function createClearButtonTemplate() {
  return `<button class="clear-button">× Очистить</button>`;
}

export default class ClearBasketComponent extends AbstractComponent {
  #clearCallback = null;
  #handleClearClick = null;
  #eventAdded = false;

  constructor() {
    super();
    this.#handleClearClick = this.#handleClearClick.bind(this);
  }

  get template() {
    return createClearButtonTemplate();
  }

  get element() {
    const element = super.element;
    if (!this.#eventAdded) {
      element.addEventListener("click", this.#handleClearClick);
      this.#eventAdded = true;
    }
    return element;
  }

  #handleClearClick() {
    if (this.#clearCallback) {
      this.#clearCallback();
    }
  }

  setClearCallback(callback) {
    this.#clearCallback = callback;
  }

  removeElement() {
    super.removeElement();
    this.#eventAdded = false;
  }
}
