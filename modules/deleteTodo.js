import {
  loadTodos,
  toggleEmptyTodoMsg,
  getTodoFromLocalStorage,
  setTodoInLocalStorage,
  updateDeadlineTime,
} from "./index";

// Handle deleting a todo item
export function handleDelete(todoId, target) {
  // Add URL parameter to indicate we're deleting
  const url = new URL(window.location);
  url.searchParams.set('deleting', 'true');
  window.history.pushState({}, '', url);

  // Remove the parameter after a short delay
  setTimeout(() => {
    url.searchParams.delete('deleting');
    window.history.pushState({}, '', url);
  }, 1000);

  // If todoId is provided, use it to get the todoElement
  let todoElement;
  if (todoId !== null && todoId !== undefined) {
    todoElement = document.getElementById(`${todoId}`);
  } else if (target) {
    // If todoId is not provided, use the target element to get the todoElement
    todoElement = target.closest(".todo");
    todoId = parseInt(todoElement.id, 10);
  }

  // Get the current list of todos from localStorage
  const todos = getTodoFromLocalStorage();

  if (todoElement) {
    // Remove the deleted todo from the DOM
    todoElement.remove();
  }

  // Create a new list of todos without the one being deleted
  const updatedTodos = todos.filter((todo) => todo.id !== todoId);

  // Reassign the IDs of the remaining todos so that they are contiguous
  const updatedTodosWithReassignedIds = updatedTodos.map((todo, index) => ({
    ...todo,
    id: index,
  }));

  // Save the updated todos back to localStorage
  setTodoInLocalStorage(updatedTodosWithReassignedIds);

  // Clear localStorage if there are no todos left
  if (!updatedTodosWithReassignedIds.length || !todos.length) {
    localStorage.clear();
  }

  // Toggle the "No todos" message if there are no todos left
  toggleEmptyTodoMsg();

  // Reload the list of todos
  loadTodos();

  // Update the deadlines of the remaining todos
  updateDeadlineTime();
}
