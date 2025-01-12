import { emptyTaskMsgEl, getTodoFromLocalStorage } from "./index";

/**
 * Checks if there are no todos and toggles visibility of the empty message
 */
export function toggleEmptyTodoMsg() {
  const todos = getTodoFromLocalStorage();
  const todosLength = todos.length;

  // If there are no todos, show the empty message
  if (!todosLength) {
    emptyTaskMsgEl.classList.add("show");
    emptyTaskMsgEl.classList.remove("hidden");
    emptyTaskMsgEl.innerHTML = '<p>No Task for Today</p>';
  } else {
    // Otherwise hide the empty message
    emptyTaskMsgEl.classList.remove("show");
    emptyTaskMsgEl.classList.add("hidden");
    emptyTaskMsgEl.innerHTML = '<p>No Task for Today</p>';
  }
}
