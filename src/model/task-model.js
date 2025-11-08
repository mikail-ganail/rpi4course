import Observable from "../framework/observable.js";
import { UserAction } from "../const.js";

const generateId = () => Date.now();

export default class TasksModel extends Observable {
  #tasksApiService = null;
  #boardTasks = [];

  constructor({ tasksApiService }) {
    super();
    this.#tasksApiService = tasksApiService;
  }

  async init() {
    try {
      const tasks = await this.#tasksApiService.tasks;
      console.log("Fetched tasks:", tasks);
      this.#boardTasks = tasks;
    } catch (err) {
      console.log("Error fetching tasks:", err);
      this.#boardTasks = [];
    }
    this._notify("INIT");
  }

  get boardTasks() {
    return this.#boardTasks;
  }

  // addTask(task) {
  //   this.#boardTasks.push(task);
  // }
  async addTask(title) {
    const newTask = {
      title,
      status: "backlog",
      id: generateId(),
    };
    try {
      const createdTask = await this.#tasksApiService.addTask(newTask);
      this.#boardTasks.push(createdTask);
      this._notify(UserAction.ADD_TASK, createdTask);
      return createdTask;
    } catch (err) {
      console.error("Ошибка при добавлении задачи на сервер:", err);
      throw err;
    }
  }

  updateTaskStatus(taskId, newStatus) {
    const task = this.#boardTasks.find((t) => t.id === Number(taskId));
    if (task) {
      task.status = newStatus;
    }
  }

  clearTrash() {
    this.#boardTasks = this.#boardTasks.filter(
      (task) => task.status !== "trash"
    );
  }
}
