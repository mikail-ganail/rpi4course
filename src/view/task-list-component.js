import { createElement } from "../framework/render.js";

function getColumnClass(status) {
  return status;
}

function createTaskListComponentTemplate(title) {
  const columnClass = getColumnClass(title);
  return `<div class="task-column ${columnClass}">
          <div class="column-header">${title}</div>
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
