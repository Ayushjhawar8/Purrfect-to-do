import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import {
  addBtnEl,
  todoInputEl,
  todoListEl,
  switchModeEl,
  addToDo,
  handleClick,
  loadTodos,
  createChart,
  updateChartData,
  disableCompletedAndExpiredTodosOnLoad,
} from "./modules";

// Execute functions when DOM is fully loaded
window.addEventListener("DOMContentLoaded", function () {
  disableCompletedAndExpiredTodosOnLoad();
  createChart(); // Set up the chart
  loadTodos(); // Load existing todos and refresh the chart
  todoInputEl.focus(); // Set focus on the input field
  initializeListeners(); // Set up event listeners for actions
  
  // Easter egg: Click title 10 times quickly
  let clickCount = 0;
  let lastClickTime = 0;
  let hintShown = false;
  const title = document.querySelector('h1');
  
  title.addEventListener('click', () => {
    const currentTime = new Date().getTime();
    if (currentTime - lastClickTime > 2000) { // Reset after 2 seconds
      clickCount = 0;
      hintShown = false;
    }
    
    clickCount++;
    lastClickTime = currentTime;

    // Show hint on first click
    if (clickCount === 1 && !hintShown) {
      hintShown = true;
      const hintText = document.createElement('div');
      hintText.style.cssText = `
        position: absolute;
        top: -25px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 12px;
        color: var(--edit-color);
        opacity: 0;
        transition: opacity 0.3s ease;
      `;
      hintText.textContent = "Psst... I wonder what happens if you keep clicking? 🐱";
      title.parentElement.style.position = 'relative';
      title.parentElement.appendChild(hintText);

      // Fade in the hint
      setTimeout(() => {
        hintText.style.opacity = '1';
      }, 100);

      // Remove hint after 3 seconds
      setTimeout(() => {
        hintText.style.opacity = '0';
        setTimeout(() => hintText.remove(), 300);
      }, 3000);
    }
    
    if (clickCount === 10) {
      clickCount = 0;
      // Create spinning cat overlay
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
      `;
      
      const cat = document.createElement('video');
      cat.src = './stylesheets/CatVid/oo ee a e a Cat Green Screen.mp4';
      cat.autoplay = true;
      cat.loop = true;
      cat.muted = false;
      cat.style.cssText = `
        width: 300px;
        height: 300px;
        border: none;
        border-radius: 50%;
        animation: spin 4s linear infinite;
      `;
      
      const style = document.createElement('style');
      style.textContent = `
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `;
      
      document.head.appendChild(style);
      overlay.appendChild(cat);
      document.body.appendChild(overlay);
      
      // Remove overlay after 5 seconds
      setTimeout(() => {
        overlay.remove();
      }, 5000);
    }
  });
});

// Set up event listeners for adding todos and handling interactions
function initializeListeners() {
  addBtnEl.addEventListener("click", addToDo);
  todoListEl.addEventListener("click", handleClick);
}

// Toggle Dark Mode
switchModeEl.addEventListener("click", toggleDarkMode);

function toggleDarkMode() {
  document.body.classList.toggle("light");
  updateChartData();
}

// Initialize the date picker with Flatpickr
const datePicker = flatpickr("#todoDeadline", {
  enableTime: true,
  dateFormat: "Y-m-dTH:i",
  minDate: "today",
  disableMobile: "true",
});

// Set up event to open the date picker when the calendar icon is clicked
document
  .querySelector("#calendarIcon")
  .addEventListener("click", openDatePicker);

// Open the date picker programmatically
function openDatePicker() {
  datePicker.open();
}
