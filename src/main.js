import HeaderComponent from "./view/header-component.js";
import FormAddTaskComponent from "./view/form-add-task-component.js";
import TasksBoardPresenter from "./presenter/tasks-board-presenter.js";
import { render, RenderPosition } from "./framework/render.js";
import TasksModel from "./model/task-model.js";
import TasksApiService from "./tasks-api-service.js";

const END_POINT = "https://69023636b208b24affe57a17.mockapi.io";
const bodyContainer = document.querySelector(".board-app");
const formContainer = document.querySelector(".add-task");
const tasksBoardContainer = document.querySelector(".taskboard");

const tasksModel = new TasksModel({
  tasksApiService: new TasksApiService(END_POINT),
});
const tasksBoardPresenter = new TasksBoardPresenter({
  boardContainer: tasksBoardContainer,
  tasksModel,
});

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);

const addButton = document.querySelector(".add-button");
const taskInput = document.querySelector(".task-input");
const clearButton = document.querySelector(".clear-button");

addButton.addEventListener("click", () => {
  const title = taskInput.value.trim();
  if (title) {
    tasksBoardPresenter.addTask(title);
    taskInput.value = "";
  }
});

clearButton.addEventListener("click", () => {
  tasksBoardPresenter.clearTrash();
});

tasksBoardPresenter.init();
