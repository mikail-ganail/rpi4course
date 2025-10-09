import { tasks } from "../mock/task.js";

export default class TaskModel {
  #boardTasks = tasks;

  get boardTasks() {
    return this.#boardTasks;
  }
}
