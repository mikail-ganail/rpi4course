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

  async updateTaskStatus(taskId, newStatus) {
    const task = this.#boardTasks.find((t) => t.id == taskId);
    if (task) {
      const previousStatus = task.status;
      task.status = newStatus;

      try {
        const updatedTask = await this.#tasksApiService.updateTask(task);
        Object.assign(task, updatedTask);
        this._notify(UserAction.UPDATE_TASK, task);
      } catch (err) {
        console.error("Ошибка при обновлении статуса задачи на сервер:", err);
        task.status = previousStatus;
        throw err;
      }
    }
  }

  clearTrash() {
    this.#boardTasks = this.#boardTasks.filter(
      (task) => task.status !== "trash"
    );
  }
}
