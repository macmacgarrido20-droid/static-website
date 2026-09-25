// ============================================
// FEATURE 1: LIVE TIME COUNTER
// Updates every second to show the current time.
// ============================================
function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', { hour12: true });
  document.getElementById('live-clock').textContent = `Current Time: ${timeString}`;
}
updateClock();
setInterval(updateClock, 1000);


// ============================================
// FEATURE 2: COUNTDOWN TIMER
// Counts down to January 1 of next year (New Year).
// Change the target date below for a different event.
// ============================================
function getNextNewYear() {
  const now = new Date();
  return new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0);
}

function updateCountdown() {
  const target = getNextNewYear();
  const now = new Date();
  let diff = target - now;

  if (diff < 0) diff = 0;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const pad = (num) => String(num).padStart(2, '0');

  document.getElementById('countdown').textContent =
    `${days} Days | ${pad(hours)} Hours | ${pad(minutes)} Minutes | ${pad(seconds)} Seconds`;
}
updateCountdown();
setInterval(updateCountdown, 1000);


// ============================================
// FEATURE 3: INTERACTIVE BUTTON
// Shows a random quote each time the button is clicked.
// ============================================
const quotes = [
  "Believe you can and you're halfway there.",
  "Code is like humor. When you have to explain it, it's bad.",
  "The best way to predict the future is to create it.",
  "Simplicity is the soul of efficiency.",
  "First, solve the problem. Then, write the code.",
  "Success is the sum of small efforts repeated daily."
];

const quoteBtn = document.getElementById('quote-btn');
const quoteDisplay = document.getElementById('quote-display');

quoteBtn.addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteDisplay.textContent = quotes[randomIndex];
});


// ============================================
// BONUS FEATURE: DARK / LIGHT MODE TOGGLE
// ============================================
const themeBtn = document.getElementById('theme-btn');

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});