// Event Listeners
const addBtnEl = document.querySelector("#add-todo");
const todoInputEl = document.querySelector("#todo-input");
const todoListEl = document.querySelector(".todos-list");
const expiredTodoListEl = document.querySelector(
  ".container-expiredTodos .todos-list"
);
const expiredTodoEl = document.querySelector(".container-expiredTodos");
const switchModeEl = document.querySelector(".switch-mode");
const emptyTaskMsgEl = document.querySelector(".empty-task-msg");
const todoDeadlineInputEl = document.querySelector("#todoDeadline");

export {
  addBtnEl,
  todoInputEl,
  todoListEl,
  switchModeEl,
  emptyTaskMsgEl,
  todoDeadlineInputEl,
  expiredTodoListEl,
  expiredTodoEl
};
