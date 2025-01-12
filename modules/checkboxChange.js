import {
  updateChartData,
  updateTodoStatus,
  updateElapsedTime,
  disableTodo,
} from "./index";
import Swal from "sweetalert2";

/**
 * Handles the checkbox change event of a todo item.
 * If the checkbox is checked, this function will update the todo status
 * to completed and update the chart data. If the checkbox is unchecked,
 * this function will update the todo status to uncompleted and update
 * the chart data. If the checkbox is disabled, this function will
 * show a warning message.
 *
 * @param {HTMLElement} checkboxElement The checkbox element that was changed.
 */
export function handleCheckboxChange(checkboxElement) {
  const todoElement = checkboxElement.closest(".todo");
  const todoId = parseInt(todoElement.id, 10);
  const isChecked = checkboxElement.checked;

  // If the checkbox is disabled, show a warning message
  if (checkboxElement.classList.contains("disabled")) {
    Swal.fire({
      icon: "info",
      title: "No Take-Backsies! 🙀",
      html: `
        <p>What's done is done, just like a cat's 9 lives!</p>
        <p>This todo is completed and sealed with a paw print forever.</p>
        <p style="margin-top: 15px;">
          <a href="https://www.youtube.com/watch?v=C43p8h99Cs0" target="_blank" style="color: #4CAF50;">
            Click to see how I feel about your attempt! 😹
          </a>
        </p>
      `,
    });
    return;
  }

  // Update the checkbox attribute to reflect the new state
  checkboxElement.setAttribute("data-check", isChecked ? "true" : "false");

  // Update the todo status to completed or uncompleted
  updateTodoStatus(todoId, isChecked);

  // Update the elapsed time for the todo
  updateElapsedTime();

  // Update the chart data
  updateChartData();

  // Disable the todo
  disableTodo(todoId);
}

