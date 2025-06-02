let currentScore = 0;

function addScore(score) {
  currentScore += score
  document.getElementById("score").textContent = currentScore;
}