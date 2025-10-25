import { tasks } from "../mock/task.js";

export default class TasksModel {
  #boardTasks = tasks;

  get boardTasks() {
    return this.#boardTasks;
  }

  addTask(task) {
    this.#boardTasks.push(task);
  }

  clearTrash() {
    this.#boardTasks = this.#boardTasks.filter(task => task.status !== 'trash');
  }
}
