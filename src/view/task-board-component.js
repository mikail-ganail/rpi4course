import AbstractComponent from '../framework/view/abstract-component.js';
import {createElement} from '../framework/render.js';

function createTaskBoardComponentTemplate() {
  return (
    `<div class="taskboard__inner"></div>`
  );
}

export default class TaskBoardComponent extends AbstractComponent {
  get template() {
    return createTaskBoardComponentTemplate();
  }

}