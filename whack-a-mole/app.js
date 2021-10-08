let squares = document.querySelectorAll(".square");
let score = document.getElementById("score");
let molePos = 0;
let scoreNum = 0;
let gameActive = true;

function placeMole() {
  squares.forEach((s) => s.classList.remove("mole")); // remove the mole
  molePos = Math.floor(Math.random() * 9);
  squares[molePos].classList.add("mole");
}

squares.forEach((sq) => {
  sq.addEventListener("click", (event) => {
    if (!gameActive) return;
    if (sq.id - 1 === molePos) {
      placeMole();
      scoreNum++;
      score.textContent = scoreNum;
    }
  });
});

function countDown() {
  const cur = document.getElementById("timeleft");
  cur.textContent = +cur.textContent - 1;
  if (cur.textContent == 0) {
    clearInterval(timer);
    alert("Game Over! Your final score is: " + scoreNum);
    gameActive = false;
  }
}
let timer = setInterval(countDown, 1000);
