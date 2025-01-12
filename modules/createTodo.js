export function createTodoElement(
  todoId,
  todoTextContent,
  isCompleted,
  elapsedTimeValue,
  isExpired
) {
  const todoElement = document.createElement("li"); // Create a new list item element
  const checkboxElement = document.createElement("input"); // Create a new input element for the checkbox
  const textElement = document.createElement("span"); // Create a new span element for the todo text
  const editInputElement = document.createElement("input"); // Create a new input element for the edit input
  const deadlineElement = document.createElement("span"); // Create a new span element for the deadline
  const editButtonElement = document.createElement("button"); // Create a new button element for the edit button
  const deleteButtonElement = document.createElement("button"); // Create a new button element for the delete button
  const isChecked = isCompleted ? "true" : "false";
  todoElement.className = "todo"; // Set the class name to "todo"
  todoElement.id = todoId; // Set the ID of the element to the todo ID

  checkboxElement.type = "checkbox"; // Set the input type to "checkbox"
  checkboxElement.className = "todo-checkbox"; // Set the class name to "todo-checkbox"
  checkboxElement.setAttribute("data-check", `${isChecked}`); // Set the data-checked attribute to "true" or "false" based on the isCompleted parameter

  textElement.className = "todo-text"; // Set the class name to "todo-text"
  textElement.textContent = todoTextContent; // Set the text content of the element to the todo text content

  editInputElement.type = "text"; // Set the input type to "text"
  editInputElement.className = "edit-input"; // Set the class name to "edit-input"
  editInputElement.value = todoTextContent; // Set the value of the input to the todo text content
  editInputElement.style.display = "none"; // Hide the edit input by default

  deadlineElement.className = "todo-deadline"; // Set the class name to "todo-deadline"
  deadlineElement.id = `todo-deadline-${todoId}`; // Set the ID of the element to the todo ID with "-deadline" appended

  deadlineElement.textContent = isExpired
    ? "Expire"
    : elapsedTimeValue
    ? `in ${elapsedTimeValue}`
    : ""; // Set the text content of the element to the elapsed time value or "Expire" if the todo is expired

  editButtonElement.className = "edit-todo"; // Set the class name to "edit-todo"
  editButtonElement.innerHTML = `<i class="ri-pencil-line"></i>`; // Set the inner HTML of the button to a pencil icon

  deleteButtonElement.className = "delete-todo"; // Set the class name to "delete-todo"
  deleteButtonElement.innerHTML = `<i class="ri-delete-bin-line"></i>`; // Set the inner HTML of the button to a delete icon

  todoElement.appendChild(checkboxElement); // Append the checkbox element to the todo element
  todoElement.appendChild(textElement); // Append the text element to the todo element
  todoElement.appendChild(editInputElement); // Append the edit input element to the todo element
  todoElement.appendChild(deadlineElement); // Append the deadline element to the todo element
  todoElement.appendChild(editButtonElement); // Append the edit button element to the todo element
  todoElement.appendChild(deleteButtonElement); // Append the delete button element to the todo element

  return todoElement; // Return the newly created todo element
}
