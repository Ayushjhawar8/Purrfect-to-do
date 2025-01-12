export function getTodoFromLocalStorage() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}
