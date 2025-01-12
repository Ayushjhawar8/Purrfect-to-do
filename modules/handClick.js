import { handleCheckboxChange, handleDelete, handleEdit } from "./index";
// Handle click event on todo element
export function handleClick(event) {
  const target = event.target;

  if (target.classList.contains("ri-delete-bin-line")) {
    const todoId = parseInt(target.closest(".todo").id, 10);
    handleDelete(todoId, target);
  } else if (target.classList.contains("todo-checkbox")) {
    handleCheckboxChange(target);
  } else if (target.classList.contains("ri-pencil-line")) {
    handleEdit(target);
  }
}
