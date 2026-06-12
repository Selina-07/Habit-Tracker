/* ===========================================================
   MindfulDay — Digital Wellbeing Tracker
   Vanilla JavaScript — no frameworks, no libraries
   =========================================================== */

/* -----------------------------------------------------------
   1. DATA: a small list of calm, everyday thoughts.
   Feel free to add your own lines to this list!
----------------------------------------------------------- */
var quotes = [
  "Small steps every day add up to big change.",
  "Your mind deserves the same care as your body.",
  "Progress, not perfection.",
  "One mindful breath can change your whole day.",
  "Be gentle with yourself today.",
  "Rest is productive too.",
  "You don't have to do everything at once.",
  "Today is a fresh start.",
];

/* Keep track of the last quote shown, so we don't repeat it twice in a row */
var lastQuoteIndex = -1;

/* -----------------------------------------------------------
   2. FUNCTION: show a random quote in the quote card
----------------------------------------------------------- */
function showRandomQuote() {
  var quoteText = document.getElementById("quote-text");

  var randomIndex = Math.floor(Math.random() * quotes.length);

  // If we picked the same quote as last time, try again once
  if (randomIndex === lastQuoteIndex) {
    randomIndex = Math.floor(Math.random() * quotes.length);
  }

  lastQuoteIndex = randomIndex;
  quoteText.textContent = quotes[randomIndex];
}

/* -----------------------------------------------------------
   3. FUNCTION: recalculate progress and update the page
----------------------------------------------------------- */
function updateProgress() {
  var checkboxes = document.querySelectorAll(".habit-checkbox");
  var total = checkboxes.length;
  var completed = 0;

  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      completed = completed + 1;
    }
  });

  var percent = Math.round((completed / total) * 100);

  // Update the conic-gradient circle by changing the --percent variable
  var circle = document.getElementById("progress-circle");
  circle.style.setProperty("--percent", percent);

  // Update the number shown in the middle of the circle
  var percentLabel = document.getElementById("progress-percent");
  percentLabel.textContent = percent + "%";

  // Update the friendly message under the circle
  var message = document.getElementById("progress-message");

  if (completed === 0) {
    message.textContent = "Let's get started!";
  } else if (completed === total) {
    message.textContent = "All done for today. Well done!";
  } else {
    message.textContent = completed + " of " + total + " habits completed";
  }
}

/* -----------------------------------------------------------
   4. SET EVERYTHING UP ONCE THE PAGE HAS LOADED
----------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  // Show a quote as soon as the page opens
  showRandomQuote();

  // "Show another thought" button
  var newQuoteBtn = document.getElementById("new-quote-btn");
  newQuoteBtn.addEventListener("click", showRandomQuote);

  // Listen for changes on every habit checkbox
  var checkboxes = document.querySelectorAll(".habit-checkbox");

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      // .closest() finds the nearest parent <li class="habit-item">
      var habitItem = checkbox.closest(".habit-item");

      if (checkbox.checked) {
        habitItem.classList.add("completed");
      } else {
        habitItem.classList.remove("completed");
      }

      updateProgress();
    });
  });

  // Set the progress circle to 0% when the page first loads
  updateProgress();
});
