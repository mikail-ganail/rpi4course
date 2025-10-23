import AbstractComponent from "../framework/view/abstract-component.js";

function createTaskComponentTemplate(task) {
  return `<div class="task-card ${task.status}-task">
          ${task.title}
        </div>`;
}

export default class TaskComponent extends AbstractComponent {
  #task = null;

  constructor(task) {
    super();
    this.#task = task;
  }

  get template() {
    return createTaskComponentTemplate(this.#task);
  }
}
