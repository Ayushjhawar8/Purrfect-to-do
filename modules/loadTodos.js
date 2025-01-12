import {
  getTodoFromLocalStorage,
  createTodoElement,
  updateChartData,
  todoListEl,
  updateDeadlineTime,
  disableCompletedAndExpiredTodosOnLoad,
  toggleEmptyTodoMsg,
} from "./index";

// Load todos from localStorage and display them
export function loadTodos() {
  // Get todos from localStorage
  const todos = getTodoFromLocalStorage();

  // If there are no todos, toggle empty todo message and return
  if (!todos) {
    toggleEmptyTodoMsg();
    return;
  }

  // Clear existing todos
  todoListEl.innerHTML = "";

  // Create a DocumentFragment to optimize DOM manipulation
  const fragmentMain = document.createDocumentFragment();

  // Loop through all todos
  todos.forEach((todo, index) => {
    // Destructure todo object to get its properties
    const { text, completed, elapsedTime, expired } = todo;

    // Create a new todo list item element
    const todoElement = createTodoElement(
      index,
      text,
      completed,
      elapsedTime,
      expired
    );

    fragmentMain.appendChild(todoElement);
  });

  // Append the elements to their respective lists
  todoListEl.appendChild(fragmentMain);

  // Toggle empty todo message, expired section visibility, and update data
  toggleEmptyTodoMsg();
  updateChartData();
  updateDeadlineTime();
  disableCompletedAndExpiredTodosOnLoad();
}
