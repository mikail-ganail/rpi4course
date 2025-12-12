import AbstractComponent from '../framework/view/abstract-component.js';
import {createElement} from '../framework/render.js';
import { StatusLabel } from '../const.js';

function createTaskItemComponentTemplate(task) {

  const {title, status} = task;
    return (
      `
      <div class="task-item task-item--${status}" id="${task.id}" draggable="true">
        <p class="task-item__title">${title}</p>
      </div>
      `
    );
}

// `<div class="task-item task task--${status}"
// <div class="task-item-body">
// <p class="task-item__title">${title}</p>
// <input type="text" class="task--input" />
// </div>
// <button aria-label="Изменить" class="task-item__edit" type="button"></button>
// </div>`

export default class TaskItemComponent extends AbstractComponent {
  constructor({task}) {
    super();
    this.task = task;
    this.#afterCreateElement();
  }

  get template() {
    return createTaskItemComponentTemplate(this.task);
  }

  #afterCreateElement() {
    this.#makeTaskDraggable();
  }

  #makeTaskDraggable() {
    this.element.setAttribute('draggable', true);
    this.element.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', this.task.id);
    });
  }
}