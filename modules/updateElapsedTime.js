import { getTodoFromLocalStorage, setTodoInLocalStorage } from "./index";
import { intervalToDuration } from "date-fns";

export function updateElapsedTime() {
  let todos = getTodoFromLocalStorage();
  const checkedTodos = todos.filter((todo) => todo.completed);

  // Calculate the elapsed time between the given date and the current date.
  function getElapsedTime(createdTime) {
    const currentTime = Date.now();

    const duration = intervalToDuration({
      // The start time of the duration
      start: createdTime,
      // The end time of the duration (current time)
      end: currentTime,
    });

    // Destructure the duration object to get the individual units of time
    const { years, months, days, hours, minutes, seconds } = duration;

    // If the duration is more than a year, show the years and months
    if (years > 0) {
      return `${years}y ${months}m`;
    }
    // If the duration is more than a month, show the months and days
    else if (months > 0) {
      return `${months}m ${days}d`;
    }
    // If the duration is more than a day, show the days and hours
    else if (days > 0) {
      return `${days}d ${hours}h`;
    }
    // If the duration is more than an hour, show the hours and minutes
    else if (hours > 0) {
      return `${hours}h ${minutes}min`;
    }
    // If the duration is more than a minute, show the minutes and seconds
    else if (minutes > 0) {
      return `${minutes}min ${seconds}s`;
    }
    // If the duration is less than a minute, show the seconds
    else {
      return `${seconds}s`;
    }
  }

  checkedTodos.forEach((checkedTodo) => {
    if (!checkedTodo.elapsedTime) {
      const todoElement = document.querySelector(`#todo-deadline-${checkedTodo.id}`);
      if (todoElement) {
        const elapsedTime = getElapsedTime(checkedTodo.createdAt);
        todoElement.textContent = `in ${elapsedTime}`;

        todos = todos.map((todo) =>
          todo.id === checkedTodo.id
            ? { ...todo, elapsedTime }
            : todo
        );
      }

      setTodoInLocalStorage(todos);
    }
  });
}

