import { AbstractComponent } from "../framework/view/abstract-component.js";

function createHelloButtonTemplate() {
  return `<button class="hello-button">Кнопка привет!</button>`;
}

export default class HelloButtonComponent extends AbstractComponent {
  #helloCallback = null;

  constructor(helloCallback) {
    super();
    this.#helloCallback = helloCallback;
    this.handleHelloClick = this.handleHelloClick.bind(this);
  }

  get template() {
    return createHelloButtonTemplate();
  }

  get element() {
    const element = super.element;
    element.addEventListener("click", this.handleHelloClick);
    return element;
  }

  handleHelloClick() {
    if (this.#helloCallback) {
      this.#helloCallback();
    }
  }
}
