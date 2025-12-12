import AbstractComponent from '../framework/view/abstract-component.js';
import {createElement} from '../framework/render.js';

function createClearBasketComponentTemplate() {
  return `<button class="clear-basket" type="button">Очистить<span>Х</span></button>`;
}

export default class ClearBasketComponent extends AbstractComponent {
  get template() {
    return createClearBasketComponentTemplate();
  }

}