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
