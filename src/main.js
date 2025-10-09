import HeaderComponent from "./view/header-component.js";
import FormAddTaskComponent from "./view/form-add-task-component.js";
import BoardComponent from "./view/board-component.js";
import TaskModel from "./model/task-model.js";
import TasksBoardPresenter from "./presenter/tasks-board-presenter.js";
import { render, RenderPosition } from "./framework/render.js";

const bodyContainer = document.querySelector(".board-app");
const formContainer = document.querySelector(".add-task");
const taskboardContainer = document.querySelector(".taskboard");

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new FormAddTaskComponent(), formContainer);

const boardComponent = new BoardComponent();
render(boardComponent, taskboardContainer);

const taskModel = new TaskModel();
const tasksBoardPresenter = new TasksBoardPresenter(
  taskboardContainer,
  taskModel,
  boardComponent
);
tasksBoardPresenter.init();
