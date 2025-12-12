import AbstractComponent from '../framework/view/abstract-component.js';

function createTaskListEmptyComponentTemplate() {
  return `<p class="empty-task">Перетащите карточку</p>`;
}

export default class TaskListEmptyComponent extends AbstractComponent {
  get template() {
    return createTaskListEmptyComponentTemplate();
  }
}