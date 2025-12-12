import AbstractComponent from '../framework/view/abstract-component.js';
import {createElement} from '../framework/render.js';
import { StatusLabel } from '../const.js';

function createTaskListComponentTemplate(status, label) {
  return (
    `<div class="task-list">
      <h2 class="task-list__title task-list__title--${status}">${label}</h2>
      <div class="task-list__items"></div>
    </div>`
  );
}

export default class TaskListComponent extends AbstractComponent {
  constructor({status, label, onTaskDrop}) {
    super();
    this.status = status;
    this.label = label;
    this.#setDropHandler(onTaskDrop);
  }

  get template() {
    return createTaskListComponentTemplate(this.status, this.label);
  }

  #setDropHandler(onTaskDrop) {
    const container = this.element;
    container.addEventListener('dragover', (event) => {
      event.preventDefault();
      container.classList.add('drag-over');
    });
    container.addEventListener('dragleave', (event) => {
      if (!container.contains(event.relatedTarget)) {
        container.classList.remove('drag-over');
      }
    });
    container.addEventListener('drop', (event) => {
      event.preventDefault();
      container.classList.remove('drag-over');
      const taskId = event.dataTransfer.getData('text/plain');
      const beforeTaskElement = event.target.closest('.task-item');
      const beforeTaskId = beforeTaskElement ? beforeTaskElement.id : null;
      onTaskDrop(taskId, this.status, beforeTaskId);
    });
  }
}
