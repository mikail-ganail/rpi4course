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
  return `<div class="task-column ${columnClass}" data-status="${title}">
          <div class="column-header">${header}</div>
          <div class="tasks-list">
          </div>
        </div>`;
}

export default class TaskListComponent {
  #handleTaskDrop = null;

  constructor(title) {
    this.title = title;
  }

  getTemplate() {
    return createTaskListComponentTemplate(this.title);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      this.#setDropHandlers();
    }

    return this.element;
  }

  #setDropHandlers() {
    const tasksList = this.element.querySelector('.tasks-list');

    tasksList.addEventListener('dragover', (evt) => {
      evt.preventDefault();
      evt.dataTransfer.dropEffect = 'move';
    });

    tasksList.addEventListener('drop', (evt) => {
      evt.preventDefault();
      const taskId = evt.dataTransfer.getData('text/plain');
      const newStatus = this.title;

      if (this.#handleTaskDrop) {
        this.#handleTaskDrop(taskId, newStatus);
      }
    });
  }

  setTaskDropHandler(handler) {
    this.#handleTaskDrop = handler;
  }

  removeElement() {
    this.element = null;
  }
}
