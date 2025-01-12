import { getTodoFromLocalStorage, setTodoInLocalStorage } from "./index";
import Swal from "sweetalert2";

export function handleEdit(edit) {
  const todoItem = edit.closest(".todo"); // Get the closest todo item element
  const todoId = parseInt(todoItem.id, 10); // Extract the todo ID from the element's ID
  const textSpan = todoItem.querySelector(".todo-text"); // Span element displaying the todo text
  const editInput = todoItem.querySelector(".edit-input"); // Input element for editing the todo text
  const editBtn = todoItem.querySelector(".edit-todo");

  let todos = getTodoFromLocalStorage(); // Fetch the list of todos from localStorage

  // Find the todo item to be edited
  const todoToEdit = todos.find((todo) => todo.id === todoId);

  // Check if the todo item is completed
  if (editBtn.getAttribute("class").includes("disabled")) {
    Swal.fire({
      icon: "info",
      title: "Paws Off! 🐾",
      html: `
        <p>This todo is taking a cat nap - it's completed or expired!</p>
        <p>Even spinning cats know not to disturb a sleeping todo...</p>
        <p style="margin-top: 15px;">
          <a href="https://www.youtube.com/watch?v=C43p8h99Cs0" target="_blank" style="color: #4CAF50;">
            Watch me spin in protest! 😸
          </a>
        </p>
      `,
    });
    return; // Exit the function
  }

  // Toggle between view and edit mode
  if (editInput.style.display === "none") {
    // Switch to edit mode
    textSpan.style.display = "none"; // Hide the text span
    editInput.style.display = "inline"; // Show the edit input
    editInput.focus(); // Focus on the edit input

    // Move cursor to the end of the text in the input
    editInput.setSelectionRange(editInput.value.length, editInput.value.length);
  } else {
    // Save the changes and switch back to view mode
    const newText = editInput.value.trim(); // Get the trimmed new text
    if (newText) {
      // If there is new text
      textSpan.textContent = newText; // Update the text span with the new text
      textSpan.style.display = "inline"; // Show the updated text span
      editInput.style.display = "none"; // Hide the edit input
      todos = todos.map(
        (todo) => (todo.id === todoId ? { ...todo, text: newText } : todo) // Update the todo with the new text
      );
      // Save the updated todos back to localStorage
      setTodoInLocalStorage(todos);
    }
  }
}
