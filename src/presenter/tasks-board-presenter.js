import TaskListComponent from "../view/task-list-component.js";
import TaskComponent from "../view/task-component.js";
import ClearBasketComponent from "../view/clear-basket-component.js";
import NoTasksComponent from "../view/no-tasks-component.js";
import { render, RenderPosition } from "../framework/render.js";
import { STATUS_NAMES, STATUSES } from "../const.js";

export default class TasksBoardPresenter {
  #boardContainer = null;
  #taskModel = null;
  #boardComponent = null;

  constructor(boardContainer, taskModel, boardComponent) {
    this.#boardContainer = boardContainer;
    this.#taskModel = taskModel;
    this.#boardComponent = boardComponent;
  }

  init() {
    this.#renderBoard();
  }

  #renderBoard() {
    const boardElement = this.#boardComponent.getElement();
    const tasksContainer = boardElement.querySelector(".tasks-container");

    const statuses = Object.keys(STATUS_NAMES);

    statuses.forEach((status) => {
      const statusName = STATUS_NAMES[status];
      const taskListComponent = new TaskListComponent(statusName);
      render(taskListComponent, tasksContainer);

      const taskListElement = taskListComponent.getElement();
      const tasksListContainer = taskListElement.querySelector(".tasks-list");

      const tasksForStatus = this.#taskModel.boardTasks.filter(
        (task) => task.status === status
      );

      this.#renderTasksList(tasksForStatus, tasksListContainer);
      this.#renderClearButton(status, tasksListContainer);
    });
  }

  #renderTask(task, container) {
    const taskComponent = new TaskComponent(task);
    render(taskComponent, container);
  }

  #renderStub(container) {
    const noTasksComponent = new NoTasksComponent();
    render(noTasksComponent, container);
  }

  #renderTasksList(tasksForStatus, container) {
    if (tasksForStatus.length > 0) {
      tasksForStatus.forEach((task) => this.#renderTask(task, container));
    } else {
      this.#renderStub(container);
    }
  }

  #renderClearButton(status, container) {
    if (status === STATUSES.TRASH) {
      const clearBasketComponent = new ClearBasketComponent();
      render(clearBasketComponent, container);
    }
  }
}
