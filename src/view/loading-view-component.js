import AbstractComponent from '../framework/view/abstract-component.js';

function createLoadingTemplate() {
  return `<p class="loading">Загрузка...</p>`;
}

export default class LoadingViewComponent extends AbstractComponent {
  get template() {
    return createLoadingTemplate();
  }
}


