import TaskListComponent from "../view/task-list-component.js";
import TaskComponent from "../view/task-component.js";
import BoardComponent from "../view/board-component.js";
import { render } from "../framework/render.js";

export default class TasksBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;

  tasksBoardComponent = new BoardComponent();
  taskListComponent = new TaskListComponent();

  #boardTasks = [];

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
  }

  init() {
    this.#boardTasks = [...this.#tasksModel.boardTasks];
    render(this.tasksBoardComponent, this.#boardContainer);
    this.#renderBoard();
  }

  #renderBoard() {
    const statusColumns = ['backlog', 'in-progress', 'done', 'trash'];

    statusColumns.forEach(status => {
      const tasksForStatus = this.#boardTasks.filter(task => task.status === status);
      const taskListComponent = new TaskListComponent(status);
      
      // Устанавливаем обработчик для drop
      taskListComponent.setTaskDropHandler((taskId, newStatus) => {
        this.#handleTaskDrop(taskId, newStatus);
      });

      render(taskListComponent, this.tasksBoardComponent.getElement());

      tasksForStatus.forEach(task => {
        const taskComponent = new TaskComponent(task);
        render(taskComponent, taskListComponent.getElement().querySelector('.tasks-list'));
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

  #handleTaskDrop(taskId, newStatus) {
    this.#tasksModel.updateTaskStatus(taskId, newStatus);
    this.#boardTasks = [...this.#tasksModel.boardTasks];
    this.updateBoard();
  }

  addTask(title) {
    const newTask = {
      id: Date.now(),
      title,
      status: 'backlog'
    };
    this.#tasksModel.addTask(newTask);
    this.#boardTasks = [...this.#tasksModel.boardTasks];
    this.updateBoard();
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
    this.tasksBoardComponent.getElement().innerHTML = '';
    this.#renderBoard();
  }

  clearTrash() {
    this.#tasksModel.clearTrash();
    this.#boardTasks = [...this.#tasksModel.boardTasks];
    this.updateBoard();
  }
}
