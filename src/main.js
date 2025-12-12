import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TasksBoardPresenter from '../src/presenter/tasks-board-presenter.js';
import {render, RenderPosition} from './framework/render.js';
import TasksModel from './model/task-model.js';
import TasksApiService from './tasks-api-service.js';

const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.add-task');
const tasksBoardContainer = document.querySelector('.taskboard');

const tasksModel = new TasksModel({
  tasksApiService: new TasksApiService('https://69023636b208b24affe57a17.mockapi.io')
});
const tasksBoardPresenter = new TasksBoardPresenter({boardContainer: tasksBoardContainer,
  tasksModel,
});

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);

const formAddTaskComponent = new FormAddTaskComponent({
  onClick: handleNewTaskButtonClick
});
render(formAddTaskComponent, formContainer);

function handleNewTaskButtonClick() {
  tasksBoardPresenter.createTask();
}

tasksBoardPresenter.init();


