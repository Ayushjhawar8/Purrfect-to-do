import {
  getTodoFromLocalStorage,
  setTodoInLocalStorage,
  updateChartData,
  disableTodo,
} from "./index";
import { intervalToDuration } from "date-fns";

/**
 * Updates the deadline time for each todo and
 * updates the chart if necessary.
 */
export function updateDeadlineTime(
  todos = getTodoFromLocalStorage(),
  interval = 1000
) {
  let timerId; // store timer ID against unexpired todos IDs

  // Cache DOM elements
  const timeElements = {};

  /**
   * Updates the deadline times for the todos.
   * This function is called recursively using setInterval() to update the deadline times in real-time.
   * It loops through all the todos and checks if their deadline has expired.
   * If the deadline has expired, it marks the todo as expired and moves it to the expired list.
   * It also updates the chart with the new data.
   */
  function updateTodoTimes() {
    // Re-fetch todos from localStorage to reflect any updates
    todos = getTodoFromLocalStorage();

    // If there are no todos, clear the interval and exit the function
    if (!todos.length) {
      clearInterval(timerId);
      return;
    }

    // Loop through all the todos and check if their deadline has expired
    todos.forEach((todo) => {
      // Skip have a elapsedTime or expired todos
      if (todo.elapsedTime || todo.expired) return;

      // Get the DOM element for the deadline text
      let timeElement = getElement(todo.id);

      if (!timeElement) return;

      const newTime = getTimeLeft(todo.deadline);

      if (timeElement.textContent !== newTime) {
        timeElement.textContent = newTime;

        // If the deadline has expired, mark it as expired and move it to the expired list
        if (newTime === "Expire" || todo.deadline - Date.now() <= 1000) {
          if (newTime === "Expire") {
            timeElement.textContent = newTime;
          }
          // mark todo as expired and set timer for delete
          todo.expired = true;
          // Update the localStorage with the new data
          setTodoInLocalStorage(todos);
          updateChartData();
          disableTodo(todo.id);
        }
      }
    });
  }
  // Get the DOM element for the deadline text
  // This function is used to cache the elements so we don't have to query the DOM every time
  function getElement(todoId) {
    const timeElement = timeElements[todoId]; // Check if the element is already cached
    if (!timeElement) {
      // If it's not cached, query the DOM and cache it
      const newTimeElement = document.querySelector(`#todo-deadline-${todoId}`);
      timeElements[todoId] = newTimeElement;
      return newTimeElement;
    }
    return timeElement; // Return the cached element
  }

  // Get Remaining time for todo
  function getTimeLeft(deadline) {
    const now = Date.now();

    const duration = intervalToDuration({
      start: now,
      end: deadline,
    });

    if (duration.years > 0) {
      return `${duration.years}y ${duration.months ?? 0}m`;
    } else if (duration.months > 0) {
      return `${duration.months}m ${duration.days ?? 0}d`;
    } else if (duration.days > 0) {
      return `${duration.days}d ${duration.hours ?? 0}h`;
    } else if (duration.hours > 0) {
      return `${duration.hours}h ${duration.minutes ?? 0}min`;
    } else if (duration.minutes > 0) {
      return `${duration.minutes}min ${duration.seconds ?? 0}s`;
    } else if (duration.seconds > 0) {
      return `${duration.seconds}s`;
    } else {
      return "Expire";
    }
  }

  if (todos.length) {
    if (timerId) clearInterval(timerId);
    timerId = setInterval(updateTodoTimes, interval);
  }
}
