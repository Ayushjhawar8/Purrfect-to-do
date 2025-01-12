export function setTodoInLocalStorage(updatedTodos) {
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
}
