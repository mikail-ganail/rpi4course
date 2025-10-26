import { tasks } from "../mock/task.js";

export default class TasksModel {
  #boardTasks = tasks;

  get boardTasks() {
    return this.#boardTasks;
  }

  addTask(task) {
    this.#boardTasks.push(task);
  }

  updateTaskStatus(taskId, newStatus) {
    const task = this.#boardTasks.find(t => t.id === Number(taskId));
    if (task) {
      task.status = newStatus;
    }
  }

  clearTrash() {
    this.#boardTasks = this.#boardTasks.filter(task => task.status !== 'trash');
  }
}
