console.log("Starting app...");
let gameOver = false;

function placeToken(id, color) {
  let sq = document.getElementById(id);
  sq.classList.add(color);
}

function placeTokenInColumn(col, color) {
  let startingPos = 35 + col;
  let candidate = document.getElementById(startingPos);
  while (
    startingPos >= 0 &&
    (candidate.classList.contains("blue") ||
      candidate.classList.contains("red"))
  ) {
    startingPos -= 7;
    candidate = document.getElementById(startingPos);
  }
  if (startingPos < 0) return -1; // column is full
  placeToken(startingPos, color);
  return startingPos; // id of square placed
}

// check if all square ids in arr have the same color
function getElementsWin(arr, color) {
  return arr
    .map((x) => {
      const el = document.getElementById(x);
      if (!el) return false;
      return el.classList.contains(color);
    })
    .every(Boolean);
}

function onWin(color) {
  gameOver = true;
  alert(color.toUpperCase() + " WINS!!!");
}

function checkWin(id, color) {
  const row = Math.floor(id / 7);
  const col = id % 7;

  // horizontal
  if (
    (col >= 0 &&
      col <= 3 &&
      getElementsWin([id, id + 1, id + 2, id + 3], color)) ||
    (col >= 1 &&
      col <= 4 &&
      getElementsWin([id - 1, id, id + 1, id + 2], color)) ||
    (col >= 2 &&
      col <= 5 &&
      getElementsWin([id - 2, id - 1, id, id + 1], color)) ||
    (col >= 3 &&
      col <= 6 &&
      getElementsWin([id - 3, id - 2, id - 1, id], color))
  ) {
    onWin(color);
    return;
  }

  // vertical
  if (getElementsWin([id, id + 7, id + 14, id + 21], color)) {
    onWin(color);
    return;
  }

  // diagonal right
  if (
    (row >= 3 &&
      row <= 6 &&
      col >= 0 &&
      col <= 3 &&
      getElementsWin([id, id + 1 - 7, id + 2 - 14, id + 3 - 21], color)) ||
    (row >= 2 &&
      row <= 5 &&
      col >= 1 &&
      col <= 4 &&
      getElementsWin([id - 1 + 7, id, id + 1 - 7, id + 2 - 14], color)) ||
    (row >= 1 &&
      row <= 4 &&
      col >= 2 &&
      col <= 5 &&
      getElementsWin([id - 2 + 14, id - 1 + 7, id, id + 1 - 7], color)) ||
    (row >= 0 &&
      row <= 3 &&
      col >= 3 &&
      col <= 6 &&
      getElementsWin([id - 3 + 21, id - 2 + 14, id - 1 + 7, id], color))
  ) {
    onWin(color);
    return;
  }

  // diagonal left
  if (
    (row >= 3 &&
      row <= 6 &&
      col >= 3 &&
      col <= 6 &&
      getElementsWin([id, id - 1 - 7, id - 2 - 14, id - 3 - 21], color)) ||
    (row >= 2 &&
      row <= 5 &&
      col >= 2 &&
      col <= 5 &&
      getElementsWin([id + 1 + 7, id, id - 1 - 7, id - 2 - 14], color)) ||
    (row >= 1 &&
      row <= 4 &&
      col >= 1 &&
      col <= 4 &&
      getElementsWin([id + 2 + 14, id + 1 + 7, id, id - 1 - 7], color)) ||
    (row >= 0 &&
      row <= 3 &&
      col >= 0 &&
      col <= 3 &&
      getElementsWin([id + 3 + 21, id + 2 + 14, id + 1 + 7, id], color))
  ) {
    onWin(color);
    return;
  }
}

function selectColAndCheck(event) {
  if (gameOver) return;
  let srcId = event.srcElement.id;
  // player move
  let sqId = placeTokenInColumn(srcId % 7, "blue");
  if (sqId === -1) return;
  checkWin(sqId, "blue");
  if (gameOver) return;
  // enemy move
  while (true) {
    const randCol = Math.floor(Math.random() * 7);
    sqId = placeTokenInColumn(randCol, "red");
    if (sqId !== -1) break;
  }
  checkWin(sqId, "red");
}

let grid = document.getElementById("gridid");
// 7 cols, 6 rows
for (let i = 0; i < 42; i++) {
  let sq = document.createElement("div");
  sq.setAttribute("id", i);
  sq.setAttribute("class", "square");
  if (i > 34) sq.classList.add("bottom");
  if (i % 7 === 0) sq.classList.add("left");
  if (i % 7 === 6) sq.classList.add("right");
  sq.addEventListener("mouseup", selectColAndCheck);
  grid.appendChild(sq);
}
