/* ============================================================
   Discover Philippines — script.js
   Features:
     1. Live Digital Clock (Philippine Time, updates every second)
     2. Countdown Timer   (counts down to Philippine Independence Day)
     3. Philippines Fact Button (random fun facts, interactive)
     4. Dark / Light Mode Toggle (bonus — saves with localStorage)
     5. Mobile Navigation Toggle (bonus — with aria support)
     6. Active Nav Highlight on Scroll (bonus)
   ============================================================ */

'use strict';

/* ============================================================
   FEATURE 1 — LIVE DIGITAL CLOCK
   Shows the current time updating every second.
   ============================================================ */
function updateClock() {
  const clockEl = document.getElementById('liveClock');
  if (!clockEl) return;

  const now   = new Date();
  let hours   = now.getHours();
  const mins  = String(now.getMinutes()).padStart(2, '0');
  const secs  = String(now.getSeconds()).padStart(2, '0');
  const ampm  = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const hh = String(hours).padStart(2, '0');

  clockEl.textContent = `${hh}:${mins}:${secs} ${ampm}`;
}

updateClock();
setInterval(updateClock, 1000);


/* ============================================================
   FEATURE 2 — COUNTDOWN TIMER
   Counts down to Philippine Independence Day, June 12, 2027.
   ============================================================ */
const TARGET_DATE = new Date('2027-06-12T08:00:00');

function updateCountdown() {
  const daysEl  = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl  = document.getElementById('cd-minutes');
  const secsEl  = document.getElementById('cd-seconds');
  if (!daysEl) return;

  const diff = TARGET_DATE - new Date();

  if (diff <= 0) {
    ['cd-days','cd-hours','cd-minutes','cd-seconds'].forEach(function(id) {
      document.getElementById(id).textContent = '00';
    });
    const label = document.getElementById('cd-event-label');
    if (label) label.textContent = '🇵🇭 Maligayang Araw ng Kalayaan! Happy Independence Day!';
    return;
  }

  const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs  = Math.floor((diff % (1000 * 60)) / 1000);

  daysEl.textContent  = String(days).padStart(2, '0');
  hoursEl.textContent = String(hours).padStart(2, '0');
  minsEl.textContent  = String(mins).padStart(2, '0');
  secsEl.textContent  = String(secs).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);


/* ============================================================
   FEATURE 3 — INTERACTIVE PHILIPPINES FACT BUTTON
   Shows a random fact about the Philippines on each click.
   ============================================================ */
const phFacts = [
  '🌊 The Philippines is home to the Puerto Princesa Subterranean River in Palawan — a UNESCO World Heritage Site and one of the New Seven Wonders of Nature.',
  '🏝️ The Philippines has 7,641 islands, making it the second-largest archipelago nation in the world. Only about 2,000 of those islands are inhabited.',
  '🐋 Tubbataha Reef Natural Park in the Sulu Sea is a UNESCO World Heritage Site and one of the best dive spots in the world, home to over 600 fish species.',
  '🌋 The Philippines sits on the Pacific Ring of Fire and has 24 active volcanoes — including Mayon Volcano, known for its perfect cone shape.',
  '🦅 The Philippine Eagle (Pithecophaga jefferyi) is one of the largest and most powerful eagles in the world — and it is found only in the Philippines.',
  '🏄 Siargao Island hosts the famous Cloud 9 surf break, considered one of the best hollow waves in Asia. The Siargao Surfing Cup is held there every year.',
  '🌾 The Banaue Rice Terraces in Ifugao were carved by the Ifugao people over 2,000 years ago. They are sometimes called the "Eighth Wonder of the World."',
  '🌺 The Sampaguita (Jasminum sambac) is the national flower of the Philippines. Its sweet scent is a symbol of purity, fidelity, and hope.',
  '🐠 The Philippines is part of the Coral Triangle — the global center of marine biodiversity. Tubbataha and Apo Reef are world-class marine sanctuaries.',
  '🎉 The Sinulog Festival in Cebu City every January is one of the grandest festivals in Asia, attracting hundreds of thousands of visitors from around the world.',
  '🗣️ The Philippines has over 170 languages and dialects spoken across its islands, though Filipino (Tagalog) and English are the two official languages.',
  '🍦 Halo-halo is one of the most beloved Filipino desserts — a colorful mix of shaved ice, evaporated milk, sweetened beans, fruits, jelly, leche flan, and ube ice cream.',
  '🌅 El Nido in Palawan has consistently been ranked as one of the best islands in the world by travel magazines including Condé Nast Traveler and Travel + Leisure.',
  '🦎 The Philippines is home to the Philippine Crocodile (Crocodylus mindorensis), one of the rarest and most endangered crocodile species in the world.',
  '⛪ San Agustin Church in Manila, built in 1607, is the oldest stone church in the Philippines and a UNESCO World Heritage Site — it survived multiple earthquakes and even World War II.',
];

let lastFactIndex = -1;

const factBtn = document.getElementById('factBtn');
const factBox = document.getElementById('factBox');

if (factBtn && factBox) {
  factBtn.addEventListener('click', function () {
    let index;
    do {
      index = Math.floor(Math.random() * phFacts.length);
    } while (index === lastFactIndex);
    lastFactIndex = index;

    factBox.classList.remove('visible');
    factBox.textContent = '';

    setTimeout(function () {
      factBox.textContent = phFacts[index];
      factBox.classList.add('visible');
    }, 50);

    factBtn.textContent = '🔄 Show Another Fact';
  });
}


/* ============================================================
   FEATURE 4 — DARK / LIGHT MODE TOGGLE
   Toggles .light-mode on <body>. Saves preference.
   ============================================================ */
const themeBtn = document.getElementById('themeToggleBtn');

if (themeBtn) {
  if (localStorage.getItem('ph-theme') === 'light') {
    document.body.classList.add('light-mode');
    themeBtn.textContent = '🌙 Switch to Dark Mode';
  } else {
    themeBtn.textContent = '☀️ Switch to Light Mode';
  }

  themeBtn.addEventListener('click', function () {
    const isLight = document.body.classList.toggle('light-mode');
    if (isLight) {
      themeBtn.textContent = '🌙 Switch to Dark Mode';
      localStorage.setItem('ph-theme', 'light');
    } else {
      themeBtn.textContent = '☀️ Switch to Light Mode';
      localStorage.setItem('ph-theme', 'dark');
    }
  });
}


/* ============================================================
   FEATURE 5 — MOBILE NAVIGATION TOGGLE
   ============================================================ */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', function () {
    navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded',
      String(navLinks.classList.contains('open')));
  });

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}


/* ============================================================
   FEATURE 6 — ACTIVE NAV HIGHLIGHT ON SCROLL
   ============================================================ */
const sections = document.querySelectorAll('section[id], header[id]');
const navItems = document.querySelectorAll('.nav-links a');

function highlightNav() {
  let currentId = '';
  const scrollY = window.pageYOffset;

  sections.forEach(function (section) {
    if (scrollY >= section.offsetTop - 90) {
      currentId = section.getAttribute('id');
    }
  });

  navItems.forEach(function (link) {
    link.style.color = '';
    link.style.backgroundColor = '';
    if (link.getAttribute('href') === '#' + currentId) {
      link.style.color = '#00b4d8';
      link.style.backgroundColor = 'rgba(0, 180, 216, 0.1)';
    }
  });
}

window.addEventListener('scroll', highlightNav, { passive: true });
highlightNav();
