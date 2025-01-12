import { getTodoFromLocalStorage, setTodoInLocalStorage } from "./index";

export function updateTodoStatus(todoId, isCompleted) {
  // Get the current list of todos from local storage
  const todos = getTodoFromLocalStorage();

  // Create a new list of todos with the updated todo status
  const updatedTodos = todos.map((todo) =>
    // If the todo ID matches the one that needs to be updated, update the status
    // Otherwise, just return the original todo
    todo.id === todoId ? { ...todo, completed: isCompleted } : todo
  );

  // Save the updated list of todos back to local storage
  setTodoInLocalStorage(updatedTodos);
}

