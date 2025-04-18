const hearts = document.querySelectorAll('.heart');

hearts.forEach(heart => {

heart.addEventListener('click', function() {
  heart.classList.toggle('unliked');
  heart.classList.toggle('filled');
  if (heart.classList.contains('filled')) {
    heart.textContent = '❤️'; // Filled heart
  } else {
    heart.textContent = '♡'; // Unfilled heart (grey with opacity)
  }
});
});