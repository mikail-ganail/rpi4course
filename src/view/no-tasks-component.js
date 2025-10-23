import AbstractComponent from "../framework/view/abstract-component.js";

function createNoTasksTemplate() {
  return `<div class="no-tasks">No tasks yet</div>`;
}

export default class NoTasksComponent extends AbstractComponent {
  get template() {
    return createNoTasksTemplate();
  }
}
