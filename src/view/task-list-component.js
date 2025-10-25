import { createElement } from "../framework/render.js";

function getColumnClass(status) {
  return status;
}

function getColumnHeader(status) {
  const headers = {
    'backlog': 'Бэклог',
    'in-progress': 'В процессе',
    'done': 'Готово',
    'trash': 'Корзина'
  };
  return headers[status] || status;
}

function createTaskListComponentTemplate(title) {
  const columnClass = getColumnClass(title);
  const header = getColumnHeader(title);
  return `<div class="task-column ${columnClass}">
          <div class="column-header">${header}</div>
          <div class="tasks-list">
          </div>
        </div>`;
}

export default class TaskListComponent {
  constructor(title) {
    this.title = title;
  }

  getTemplate() {
    return createTaskListComponentTemplate(this.title);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
