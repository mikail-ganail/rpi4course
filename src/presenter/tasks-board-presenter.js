import TaskListComponent from "../view/task-list-component.js";
import TaskComponent from "../view/task-component.js";
import BoardComponent from "../view/board-component.js";
import { render } from "../framework/render.js";
import { UserAction } from "../const.js";

export default class TasksBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;

  tasksBoardComponent = new BoardComponent();
  taskListComponent = new TaskListComponent();

  #boardTasks = [];

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;

    this.#tasksModel.addObserver(this.#handleModelEvent);
  }

  async init() {
    await this.#tasksModel.init();
    this.#boardTasks = [...this.#tasksModel.boardTasks];
    render(this.tasksBoardComponent, this.#boardContainer);
    this.#renderBoard();
  }

  async createTask() {
    const taskTitle = document.querySelector("#add-task").value.trim();
    if (!taskTitle) {
      return;
    }
    try {
      await this.#tasksModel.addTask(taskTitle);
      document.querySelector("#add-task").value = "";
    } catch (err) {
      console.error("Ошибка при создании задачи:", err);
    }
  }

  #renderBoard() {
    const statusColumns = ["backlog", "in-progress", "done", "trash"];

    statusColumns.forEach((status) => {
      const tasksForStatus = this.#boardTasks.filter(
        (task) => task.status === status
      );
      const taskListComponent = new TaskListComponent(status);

      // Устанавливаем обработчик для drop
      taskListComponent.setTaskDropHandler((taskId, newStatus) => {
        this.#handleTaskDrop(taskId, newStatus);
      });

      render(taskListComponent, this.tasksBoardComponent.getElement());

      tasksForStatus.forEach((task) => {
        const taskComponent = new TaskComponent(task);
        render(
          taskComponent,
          taskListComponent.getElement().querySelector(".tasks-list")
        );
      });
    });
  }

  // init() {
  //   this.#boardTasks = [...this.#tasksModel.boardTasks];

  //   render(this.tasksBoardComponent, this.#boardContainer);

  //   const statusColumns = ['backlog', 'in-progress', 'done', 'trash'];

  //   statusColumns.forEach(status => {
  //     const tasksForStatus = this.#boardTasks.filter(task => task.status === status);
  //     const taskListComponent = new TaskListComponent(status);
  //     render(taskListComponent, this.tasksBoardComponent.getElement());

  //     tasksForStatus.forEach(task => {
  //       const taskComponent = new TaskComponent(task);
  //       render(taskComponent, taskListComponent.getElement());
  //     });
  //   });
  // }

  async #handleTaskDrop(taskId, newStatus) {
    try {
      await this.#tasksModel.updateTaskStatus(taskId, newStatus);
    } catch (err) {
      console.error("Ошибка при обновлении статуса задачи:", err);
    }
  }

  async addTask(title) {
    try {
      await this.#tasksModel.addTask(title);
    } catch (err) {
      console.error("Ошибка при добавлении задачи:", err);
    }
  }

  // updateBoard() {
  //   this.tasksBoardComponent.getElement().innerHTML = '';
  //   const statusColumns = ['backlog', 'in-progress', 'done', 'trash'];

  //   statusColumns.forEach(status => {
  //     const tasksForStatus = this.#boardTasks.filter(task => task.status === status);
  //     const taskListComponent = new TaskListComponent(status);
  //     render(taskListComponent, this.tasksBoardComponent.getElement());

  //     tasksForStatus.forEach(task => {
  //       const taskComponent = new TaskComponent(task);
  //       render(taskComponent, taskListComponent.getElement());
  //     });
  //   });
  // }

  updateBoard() {
    this.tasksBoardComponent.getElement().innerHTML = "";
    this.#renderBoard();
  }

  async clearTrash() {
    await this.#tasksModel.clearBasketTasks();
    this.#boardTasks = [...this.#tasksModel.boardTasks];
    this.updateBoard();
  }

  #handleModelEvent = (event, payload) => {
    switch (event) {
      case UserAction.ADD_TASK:
      case UserAction.UPDATE_TASK:
      case UserAction.DELETE_TASK:
        this.#boardTasks = [...this.#tasksModel.boardTasks];
        this.updateBoard();
        break;
    }
  };

  async #handleClearBasketClick() {
    try {
      await this.#tasksModel.clearBasketTasks();
    } catch (err) {
      console.error("Ошибка при очистке корзины:", err);
    }
  }
}
