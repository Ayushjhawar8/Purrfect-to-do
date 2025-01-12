import { getTodoFromLocalStorage } from "./getTodoFromLocalStorage";

export function disableCompletedAndExpiredTodosOnLoad() {
  // Get the list of todos from the local storage
  const todos = getTodoFromLocalStorage();

  // Get all the todo elements from the DOM
  const todoElements = document.querySelectorAll(".todo");

  if (todoElements) {
    //Loop through all the todos and their corresponding elements
    todos.forEach((todo) => {
      const todoElement = todoElements[todo.id];

      if (!todoElement) return;

      //Get the checkbox and edit button elements
      const checkbox = todoElement.querySelector(".todo-checkbox");
      const editButton = todoElement.querySelector(".edit-todo");

      // If the todo is completed, disable the edit button and checkbox
      if (todo.completed) {
        editButton.classList.add("disabled");
        checkbox.classList.add("disabled");
      }

      //If the todo is expired, disable the edit button and checkbox
      if (todo.expired) {
        editButton.classList.add("disabled");
        checkbox.classList.add("disabled");
      }
    });
  }
}
