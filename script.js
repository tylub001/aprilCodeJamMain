const hearts = document.querySelectorAll(".heart");

hearts.forEach((heart) => {
  heart.addEventListener("click", function () {
    heart.classList.toggle("unliked");
    heart.classList.toggle("filled");
    if (heart.classList.contains("filled")) {
      heart.textContent = "❤️";
    } else {
      heart.textContent = "♡";
    }
  });
});

const quotes = [
  '"Breath is the bridge which connects life to consciousness, which unites your body to your thoughts." – Thich Nhat Hanh',

  '"Deep breathing brings deep thinking, and shallow breathing brings shallow thinking." – Elsie Lincoln Benedict',

  '"When the breath wanders, the mind is unsteady, but when the breath is calmed, the mind too will be still." – Hatha Yoga Pradipika',

  '"Meditation is the secret of all growth in spiritual life and knowledge." – James Allen',

  '"When meditation is mastered, the mind is unwavering like the flame of a candle in a windless place." – Bhagavad Gita',

  '"Meditation is not a way of making your mind quiet. It is a way of entering into the quiet that is already there." – Deepak Chopra',
];

document.querySelector(".quote__button").addEventListener("click", function () {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  document.querySelector(".modal__quote").textContent = randomQuote;
  document.querySelector(".modal").classList.add("show");
});

document
  .querySelector(".modal__close-btn")
  .addEventListener("click", function () {
    document.querySelector(".modal").classList.remove("show");
  });

const circle = document.getElementById("breathingCircle");
const modes = document.querySelectorAll(".guided__mode");

const breathingPatterns = {
  focus: {
    inhale: 4000,
    hold: 4000,
    exhale: 4000,
    messages: ["Breathe In", "Hold", "Breathe Out"],
  },
  balanced: {
    inhale: 5000,
    hold: 5000,
    exhale: 5000,
    messages: ["Breathe In", "Hold", "Breathe Out"],
  },
  relax: {
    inhale: 4000,
    hold: 7000,
    exhale: 8000,
    messages: ["Breathe In", "Hold", "Breathe Out"],
  },
};

let currentMode = "focus";
let currentPhase = 0;
let exerciseTimer;
let animationInterval;
let selectedDuration = 60000;
let activeTimeout = null; 
let isRunning = false; 

document.addEventListener("DOMContentLoaded", function () {
  const circle = document.querySelector(".breathing-circle");
  circle.textContent = "Choose a Mode";
});

function updateBreathing() {
  const circle = document.querySelector(".breathing-circle");
  const pattern = breathingPatterns[currentMode];
  circle.textContent = pattern.messages[currentPhase]; 

  if (currentPhase === 0) {
    
    circle.style.transform = "scale(1.5)"; 
    circle.style.transition = `transform ${pattern.inhale}ms ease-in`;
  } else if (currentPhase === 1) {
    
    circle.style.transform = "scale(1.5)"; 
    circle.style.transition = "none"; 
  } else {
  
    circle.style.transform = "scale(1)"; 
    circle.style.transition = `transform ${pattern.exhale}ms ease-out`;
  }
}

 function startBreathingCycle() {
   isRunning = true;
   currentPhase = 0;
   if (exerciseTimer) {
     clearTimeout(exerciseTimer);
   }

   exerciseTimer = setTimeout(() => {
     stopBreathingCycle();
     const circle = document.querySelector(".breathing-circle");
     circle.textContent = "Session Complete";
   }, selectedDuration * 1000);

   runPhase();
 }

 function runPhase() {
   if (!isRunning) return;

   const pattern = breathingPatterns[currentMode];

   if (currentPhase >= 3) {
     currentPhase = 0;
   }

   updateBreathing();

   const durations = [pattern.inhale, pattern.hold, pattern.exhale];
   const duration = durations[currentPhase];

   activeTimeout = setTimeout(() => {
     currentPhase++;
     runPhase();
   }, duration);
 }

modes.forEach((mode) => {
  mode.addEventListener("click", function () {
    currentMode = this.getAttribute("data-mode");
    modes.forEach((m) => m.classList.remove("active"));
    this.classList.add("active");
    startBreathingCycle();
  });
});

const durationButtons = document.querySelectorAll(".duration-btn");
durationButtons.forEach((button) => {
  button.addEventListener("click", function () {
    selectedDuration = parseInt(this.getAttribute("data-duration"));
    durationButtons.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");
  });
});

function stopBreathingCycle() {
  const circle = document.querySelector(".breathing-circle");

  
  if (exerciseTimer) {
    clearTimeout(exerciseTimer);
  }
  if (activeTimeout) {
    clearTimeout(activeTimeout);
  }

  
  isRunning = false;
  currentPhase = 0;


  circle.classList.remove("blinking");
  circle.classList.remove("inhale");
  circle.classList.remove("exhale");
  circle.classList.remove("hold");

  
  circle.textContent = "Choose a Mode";
}