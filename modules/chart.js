import { Chart, registerables } from "chart.js";

// Register necessary components
Chart.register(...registerables);

// Get the canvas context
const ctx = document.getElementById("myDoughnutChart").getContext("2d");

let myDoughnutChart; // Global chart instance

// Create Chart
/**
 * This function creates a Doughnut chart using the Chart.js library.
 * The chart is created with a fixed width and height, and is responsive.
 * The chart displays the total number of todos, the number of completed todos,
 * and the number of expired todos as a percentage of the total.
 * The chart also displays a label with the completed todos count
 * and the total todos count in the center of the chart.
 *
 * @param {object} ctx - The canvas context to render the chart on
 */
export function createChart() {
  const initialData = {
    labels: ["Complete", "Incomplete", "Expired"],
    datasets: [
      {
        label: "To do Chart",
        // The initial data is set to 0 for all categories
        data: [0, 0, 0],
        backgroundColor: ["#28a745", "#B4B4B3", "#FFB200"],
        borderWidth: 1,
      },
    ],
    hoverOffset: 4,
  };

  const centerTextPlugin = {
    id: "centerText",
    /**
     * This function is called before the chart is drawn.
     * It renders a label with the completed todos count and the total todos count
     * in the center of the chart.
     *
     * @param {object} chart - The chart object
     */
    beforeDraw: (chart) => {
      const { ctx, width, height } = chart;
      const centerX = width / 2;
      const centerY = height / 2;
      const textColor = document.body.classList.contains("light") ? "#262626" : "#f4f4f4";

      ctx.save();
      ctx.font = "bold 16px Nunito";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = textColor;

      const { totalTodos, completedTodos } = chart.options.plugins.centerTextPlugin;

      // Render the completed todos count and the total todos count
      ctx.fillText(
        `${completedTodos} / ${totalTodos}`,
        centerX,
        centerY - 24 / 2
      );

      // Render the label "Task done"
      ctx.fillText("Task done", centerX, centerY + 24 / 2);

      ctx.restore();
    },
  };

  // Create and configure the Doughnut chart
  myDoughnutChart = new Chart(ctx, {
    type: "doughnut",
    data: initialData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem) => {
              const total = tooltipItem.dataset.data.reduce((acc, val) => acc + val, 0);
              const percentage = ((tooltipItem.raw / total) * 100).toFixed(2);
              // Format the tooltip label to display the percentage
              return `${tooltipItem.label}: ${percentage}%`;
            },
            title: () => "",
          },
        },
        centerTextPlugin,
      },
    },
    plugins: [centerTextPlugin],
  });
}

// Update Chart
/**
 * This function takes in the total number of todos, the number of incomplete
 * todos, the number of completed todos, and the number of expired todos as
 * parameters. It then calculates the percentage of each type of todo and
 * updates the chart with the new data.
 *
 * @param {number} totalTodos - The total number of todos
 * @param {number} incompleteTodos - The number of incomplete todos
 * @param {number} completedTodos - The number of completed todos
 * @param {number} expiredTodos - The number of expired todos
 */
export function updateChart(
  totalTodos,
  incompleteTodos,
  completedTodos,
  expiredTodos
) {
  if (!myDoughnutChart) return; // Ensure chart is initialized

  // Calculate the percentage of each type of todo
  const incompletePercentage = (incompleteTodos / totalTodos) * 100;
  const completedPercentage = (completedTodos / totalTodos) * 100;
  const expiredPercentage = (expiredTodos / totalTodos) * 100;

  // Create a new dataset with the updated percentages
  const newData = {
    labels: ["Complete", "Incomplete", "Expired"],
    datasets: [
      {
        label: "To do Chart",
        data: [completedPercentage, incompletePercentage, expiredPercentage],
        backgroundColor: ["#28a745", "#B4B4B3", "#FFB200"],
        borderWidth: 1,
      },
    ],
    hoverOffset: 4,
  };

  // Update the chart with the new dataset
  myDoughnutChart.data = newData;

  // Update the plugin data
  myDoughnutChart.options.plugins.centerTextPlugin.totalTodos = totalTodos;
  myDoughnutChart.options.plugins.centerTextPlugin.completedTodos = completedTodos;

  // Update the chart
  myDoughnutChart.update(); // Call update to refresh the chart
}

// Update Chart Data
/**
 * This function updates the chart data by fetching the current state of the
 * todos from local storage, and then calculating the number of completed and
 * incomplete todos. It then calls the updateChart function to update the chart
 * with the new data.
 */
export function updateChartData() {
  // Get the current state of the todos from local storage
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const todoCount = todos.length;

  // Calculate the number of incomplete todos
  const incompleteTodos = todos.filter(
    (todo) => !todo.completed && !todo.expired
  ).length;

  // Calculate the number of completed todos
  const completedTodos = todos.filter((todo) => todo.completed).length;

  // Calculate the number of expired todos
  const expiredTodos = todos.filter((todo) => todo.expired).length;

  // Call the updateChart function to update the chart with the new data
  updateChart(
    todoCount,
    incompleteTodos,
    completedTodos,
    expiredTodos
  );

  // Easter egg: Celebrate 100% completion (but not during deletion)
  const isDeletingTodo = new URLSearchParams(window.location.search).get('deleting') === 'true';
  if (todoCount > 0 && completedTodos === todoCount && !isDeletingTodo) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, #4CAF50, #2196F3);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.5s ease;
    `;
    
    const message = document.createElement('h2');
    message.style.cssText = `
      color: white;
      font-size: 24px;
      margin-bottom: 20px;
      text-align: center;
    `;
    message.innerHTML = `
      🎉 Purrfect Job! 🎉<br>
      You've completed all your tasks!<br>
      Time for a cat dance party!
    `;
    
    const cat = document.createElement('video');
    cat.src = '/assets/spinning-cat.mp4';
    cat.autoplay = true;
    cat.loop = true;
    cat.muted = false;
    cat.style.cssText = `
      width: 300px;
      height: 300px;
      border: none;
      border-radius: 50%;
      box-shadow: 0 0 20px rgba(255,255,255,0.5);
      animation: bounce 2s infinite;
      object-fit: cover;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
      }
    `;
    
    document.head.appendChild(style);
    overlay.appendChild(message);
    overlay.appendChild(cat);
    document.body.appendChild(overlay);
    
    // Fade in
    setTimeout(() => {
      overlay.style.opacity = '1';
    }, 100);
    
    // Remove celebration after 6 seconds
    setTimeout(() => {
      overlay.style.opacity = '0';
      setTimeout(() => overlay.remove(), 500);
    }, 6000);
  }
}
