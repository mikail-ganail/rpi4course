import { createElement } from "../framework/render.js";

function createTaskComponentTemplate(taskTitle, category) {
  return `<div class="task-card ${category}-task">
          ${taskTitle}
        </div>`;
}

export default class TaskComponent {
  constructor(taskTitle, category) {
    this.taskTitle = taskTitle;
    this.category = category;
  }

  getTemplate() {
    return createTaskComponentTemplate(this.taskTitle, this.category);
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
