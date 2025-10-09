import { createElement } from "../framework/render.js";

function createTaskComponentTemplate(task) {
  return `<div class="task-card ${task.status}-task">
          ${task.title}
        </div>`;
}

export default class TaskComponent {
  constructor(task) {
    this.task = task;
  }

  getTemplate() {
    return createTaskComponentTemplate(this.task);
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
