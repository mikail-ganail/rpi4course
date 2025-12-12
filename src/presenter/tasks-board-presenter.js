import TaskListComponent from '../view/task-list-component.js'
import TaskItemComponent from '../view/task-item-component.js'
import TaskBoardComponent from '../view/task-board-component.js'
import { render } from '../framework/render.js'
import TasksModel from '../model/task-model.js';
import { Status, StatusLabel, UpdateType, UserAction } from '../const.js'
import ClearBasketComponent from '../view/clear-basket-component.js';
import TaskListEmptyComponent from '../view/task-list-empty-component.js';
import LoadingViewComponent from '../view/loading-view-component.js';

function getTasksByStatus(tasks, status) {
  return tasks.filter(task => task.status === status);
}

export default class TaskBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #tasksBoardComponent = new TaskBoardComponent();
  #boardTasks = [];

  constructor({boardContainer, tasksModel}) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
    
    this.#tasksModel.addObserver(this.#handleModelEvent);
  }

  get tasks() {
    return this.#tasksModel.tasks;
  }

  async init() {
    render(this.#tasksBoardComponent, this.#boardContainer);
    const loading = new LoadingViewComponent();
    render(loading, this.#tasksBoardComponent.element);
    await this.#tasksModel.init();
  }

  async createTask() {
    const taskTitle = document.querySelector('#add-task').value.trim();
    if (!taskTitle) {
      return;
    }
    try {
      await this.#tasksModel.addTask(taskTitle);
      document.querySelector('#add-task').value = '';
    } catch (err) {
      throw err;
    }
  }

  async clearBasket() {
    try {
      await this.#tasksModel.clearBasket();
    } catch (err) {
      throw err;
    }
  }

  #clearBoard() {
    this.#tasksBoardComponent.element.innerHTML = '';
  }

  #renderBoard() {
    Object.values(Status).forEach((status) => {
      this.#renderTasksList(status);
    });
  }

  #renderTasksList(status) {
    const tasksListComponent = new TaskListComponent({
      status,
      label: StatusLabel[status],
      onTaskDrop: this.#handleTaskDrop.bind(this)
    });
    render(tasksListComponent, this.#tasksBoardComponent.element);
   
    if (status === Status.BASKET) {
      this.#renderClearBasketButton(tasksListComponent.element);
    }
   
    const tasksForStatus = getTasksByStatus(this.tasks, status);
    const container = tasksListComponent.element.querySelector('.task-list__items');
   
    if (tasksForStatus.length === 0) {
      this.#renderEmptyList(container);
    } else {
      tasksForStatus.forEach((task) => {
        this.#renderTask(task, container);
      });
    }
  }   
  
  async #handleTaskDrop(taskId, newStatus, beforeTaskId) {
    try {
      await this.#tasksModel.updateTaskStatusAndOrder(taskId, newStatus, beforeTaskId);
    } catch (err) {
      throw err;
    }
  }

  #renderTask(task, container) {
    const taskComponent = new TaskItemComponent({task});
    render(taskComponent, container);
  }

  #renderClearBasketButton(container) {
    const clearButton = new ClearBasketComponent();
    render(clearButton, container);
    const buttonElement = clearButton.element;
    buttonElement.addEventListener('click', () => this.clearBasket());
    const basketTasks = this.tasks.filter(task => task.status === Status.BASKET);
    if (basketTasks.length === 0) {
      buttonElement.disabled = true;
    }
  }

  #renderEmptyList(container) {
    const emptyComponent = new TaskListEmptyComponent();
    render(emptyComponent, container);
  }

  #handleModelEvent = (event, payload) => {
    switch (event) {
      case UpdateType.INIT:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MINOR:
      case UserAction.ADD_TASK:
      case UserAction.UPDATE_TASK:
      case UserAction.DELETE_TASK:
        this.#clearBoard();
        this.#renderBoard();
        break;
    }
  };
}