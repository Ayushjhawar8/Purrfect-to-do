export function disableTodo(todoId) {
  // Get the todo element from the DOM
  const todoElement = document.getElementById(`${todoId}`);

  // If the element does not exist, exit the function
  if (!todoElement) return;

  // Get the checkbox and edit button elements
  const todoCheckbox = todoElement.querySelector(".todo-checkbox");
  const editTodoBtn = todoElement.querySelector(".edit-todo");

  // Add the "disabled" class to the edit button and checkbox
  editTodoBtn.classList.add("disabled");
  todoCheckbox.classList.add("disabled");
}
