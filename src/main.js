import HeaderComponent from "./view/header-component.js";
import FormAddTaskComponent from "./view/form-add-task-component.js";
import BoardComponent from "./view/board-component.js";
import TaskListComponent from "./view/task-list-component.js";
import TaskComponent from "./view/task-component.js";
import { render, RenderPosition } from "./framework/render.js";

const bodyContainer = document.querySelector(".board-app");
const formContainer = document.querySelector(".add-task");
const taskboardContainer = document.querySelector(".taskboard");

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new FormAddTaskComponent(), formContainer);

const boardComponent = new BoardComponent();
render(boardComponent, taskboardContainer);

const boardElement = boardComponent.getElement();
const tasksContainer = boardElement.querySelector(".tasks-container");

// Создаем 4 списка задач
const taskListTitles = ["Бэклог", "В процессе", "Готово", "Корзина"];
const categories = ["backlog", "in-progress", "done", "trash"];

const tasksData = [
  ["Выучить JS", "Выучить React", "Сделать домашку", "Прочитать книгу"],
  ["Выпить смузи", "Попить воды", "Сделать зарядку", "Ответить на email"],
  ["Позвонить маме", "Погладить кота", "Приготовить обед", "Вынести мусор"],
  [
    "Сходить погулять",
    "Прочитать Войну и Мир",
    "Посмотреть фильм",
    "Выучить английский",
  ],
];

for (let i = 0; i < 4; i++) {
  const taskListComponent = new TaskListComponent(taskListTitles[i]);
  render(taskListComponent, tasksContainer);

  // В каждом списке создаем задачи
  const taskListElement = taskListComponent.getElement();
  const tasksListContainer = taskListElement.querySelector(".tasks-list");

  for (let j = 0; j < 4; j++) {
    const taskComponent = new TaskComponent(tasksData[i][j], categories[i]);
    render(taskComponent, tasksListContainer);
  }

  // Для корзины добавить кнопку очистки
  if (taskListTitles[i] === "Корзина") {
    const clearButton = document.createElement("button");
    clearButton.className = "clear-button";
    clearButton.textContent = "× Очистить";
    tasksListContainer.appendChild(clearButton);
  }
}
