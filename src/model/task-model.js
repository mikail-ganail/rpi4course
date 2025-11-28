import Observable from "../framework/observable.js";
import { UserAction } from "../const.js";

const generateId = (tasks) => {
  const maxId =
    tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) : 0;
  return maxId + 1;
};

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
      id: generateId(this.#boardTasks),
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
    const task = this.#boardTasks.find((task) => task.id == taskId);
    if (task) {
      const previousStatus = task.status;
      task.status = newStatus;

      try {
        const updatedTask = await this.#tasksApiService.updateTask(task);
        Object.assign(task, updatedTask);
        this._notify(UserAction.UPDATE_TASK, task);
      } catch (err) {
        console.error("Ошибка при обновлении статуса задачи на сервер:", err);
        if (err.message.includes("404")) {
          console.error(
            `Задача с ID ${taskId} не найдена на сервере. Возможно, задача была добавлена локально, но не сохранена на сервере.`
          );
        }
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

  deleteTask(taskId) {
    this.#boardTasks = this.#boardTasks.filter((task) => task.id !== taskId);
    this._notify(UserAction.DELETE_TASK, { id: taskId });
  }

  async clearBasketTasks() {
    const basketTasks = this.#boardTasks.filter(
      (task) => task.status === "trash"
    );
    if (basketTasks.length === 0) return;

    console.log("Tasks to delete from API:", basketTasks);

    try {
      const results = await Promise.allSettled(
        basketTasks.map((task) => {
          console.log("Deleting task ID:", task.id);
          return this.#tasksApiService.deleteTask(task.id);
        })
      );

      // Удаляем ТОЛЬКО успешно удалённые по API
      const deletedIds = basketTasks
        .map((task, index) =>
          results[index].status === "fulfilled" ? task.id : null
        )
        .filter(Boolean);

      this.#boardTasks = this.#boardTasks.filter(
        (task) => !deletedIds.includes(task.id)
      );
      this._notify(UserAction.DELETE_TASK, { ids: deletedIds });
    } catch (err) {
      console.error("Ошибка при удалении задач из корзины на сервере:", err);
      throw err;
    }
  }

  hasBasketTasks() {
    return this.#boardTasks.some((task) => task.status === "trash");
  }
}
