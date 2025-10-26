import { createElement } from "../framework/render.js";

function createTaskComponentTemplate(task) {
  const {title, status} = task;

  return (
    `<div class="taskboard__item task--${status}" draggable="true" data-task-id="${task.id}">
    <div class="task__body">
      <p class="task--view">${title}</p>
      <input type="text" class="task--input" />
      </div>
      <button aria-label="Изменить" class="task__edit" type="button"></button>
    </div>`
    );
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
      this.#setDragHandlers();
    }

    return this.element;
  }

  #setDragHandlers() {
    this.element.addEventListener('dragstart', (evt) => {
      evt.dataTransfer.effectAllowed = 'move';
      evt.dataTransfer.setData('text/plain', this.task.id);
    });
  }

  removeElement() {
    this.element = null;
  }
}
