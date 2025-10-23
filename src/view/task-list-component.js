import AbstractComponent from "../framework/view/abstract-component.js";

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

export default class TaskListComponent extends AbstractComponent {
  #title = null;

  constructor(title) {
    super();
    this.#title = title;
  }

  get template() {
    return createTaskListComponentTemplate(this.#title);
  }
}
