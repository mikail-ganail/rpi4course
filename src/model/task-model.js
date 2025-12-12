import Observable from '../framework/observable.js';
import { generateId } from '../utils.js';
import { UserAction, UpdateType } from '../const.js';
import { Status } from '../const.js';

export default class TasksModel extends Observable {
  #tasksApiService = null;
  #boardtasks = [];

  constructor({tasksApiService}) {
    super();
    this.#tasksApiService = tasksApiService;
  }

  get tasks() {
    return this.#boardtasks;
  }

  async init() {
    try {
      const tasks = await this.#tasksApiService.tasks;
      this.#boardtasks = tasks;
    } catch(err) {
      this.#boardtasks = [];
    }
    this._notify(UpdateType.INIT);
  }
  
  async addTask(title) {
    const newTask = {
      title,
      status: 'backlog',
      id: generateId(),
    };
    
    this.#boardtasks.push(newTask);
    this._notify(UserAction.ADD_TASK, newTask);
    
    try {
      const createdTask = await this.#tasksApiService.addTask(newTask);
      const taskIndex = this.#boardtasks.findIndex(t => t.id === newTask.id);
      if (taskIndex > -1) {
        this.#boardtasks[taskIndex] = createdTask;
      } else {
        this.#boardtasks.push(createdTask);
      }
      return createdTask;
    } catch (err) {
      const taskIndex = this.#boardtasks.findIndex(t => t.id === newTask.id);
      if (taskIndex > -1) {
        this.#boardtasks.splice(taskIndex, 1);
      }
      throw err;
    }
  }

  async updateTaskStatusAndOrder(taskId, newStatus, beforeTaskId) {
    const task = this.#boardtasks.find(t => t.id === taskId);
    if (!task) {
      return;
    }
  
    const oldStatus = task.status;
    const taskCopy = { ...task };
    taskCopy.status = newStatus;
    
    const otherTasks = this.#boardtasks.filter(t => t.id !== taskId);
    
    const targetStatusTasks = otherTasks.filter(t => t.status === newStatus);
    let insertIndex = targetStatusTasks.length;
    
    if (beforeTaskId) {
      const beforeIndex = targetStatusTasks.findIndex(t => t.id === beforeTaskId);
      if (beforeIndex > -1) {
        insertIndex = beforeIndex;
      }
    }
    
    targetStatusTasks.splice(insertIndex, 0, taskCopy);
    
    this.#boardtasks = [...otherTasks.filter(t => t.status !== newStatus), ...targetStatusTasks];
  
    this._notify(UserAction.UPDATE_TASK, taskCopy);
    
    try {
      await this.#tasksApiService.updateTask(taskCopy);
    } catch (err) {
      taskCopy.status = oldStatus;
      const otherTasksRestore = this.#boardtasks.filter(t => t.id !== taskId);
      const oldStatusTasks = otherTasksRestore.filter(t => t.status === oldStatus);
      oldStatusTasks.push(taskCopy);
      this.#boardtasks = [...otherTasksRestore.filter(t => t.status !== oldStatus), ...oldStatusTasks];
      throw err;
    }
  }
  
  async clearBasket() {
    const basketTasks = this.#boardtasks.filter(task => task.status === Status.BASKET);
    
    if (basketTasks.length === 0) {
      return;
    }
    
    this.#boardtasks = this.#boardtasks.filter(task => task.status !== Status.BASKET);
    this._notify(UpdateType.MINOR);
    
    try {
      await Promise.all(basketTasks.map(task => this.#tasksApiService.deleteTask(task.id)));
    } catch (err) {
      this.#boardtasks = [...this.#boardtasks, ...basketTasks];
      throw err;
    }
  }
}