function randomOrder(n) {
  let v = [];
  for (let i = 0; i < n; i++) {
    v[i] = Math.random();
  }
  return v
  .map((value, index) => [value, index])
  .sort((x, y) => x[0] - y[0])
  .map((x) => x[1]);
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("Starting memory game...");
  document.getElementById("win").style.visibility = "hidden";

  const cardArray = [
    { name: "cheeseburger", img: "images/cheeseburger.png" },
    { name: "fries", img: "images/fries.png" },
    { name: "hotdots", img: "images/hotdog.png" },
    { name: "icecream", img: "images/ice-cream.png" },
    { name: "milkshake", img: "images/milkshake.png" },
    { name: "pizza", img: "images/pizza.png" },
    
    { name: "cheeseburger", img: "images/cheeseburger.png" },
    { name: "fries", img: "images/fries.png" },
    { name: "hotdots", img: "images/hotdog.png" },
    { name: "icecream", img: "images/ice-cream.png" },
    { name: "milkshake", img: "images/milkshake.png" },
    { name: "pizza", img: "images/pizza.png" },
  ];
  
  const grid = document.querySelector(".grid");
  const cardMapping = randomOrder(cardArray.length);
  let openCards = new Set();
  
  function flipcardNum(posId, flipToWhite) {
    const card = document.querySelector(`img[data-id="${posId}"]`);
    const cardId = cardMapping[posId];
    if (card.getAttribute("src") === "images/white.png") return;
    if (flipToWhite) {
      card.setAttribute("src", "images/white.png");
      return;
    }
    // unhide
    if (card.getAttribute("src") === "images/blank.png") {
      card.setAttribute("src", cardArray[cardId].img);
      openCards.add(posId);
      // hide
    } else {
      card.setAttribute("src", "images/blank.png");
      openCards.delete(posId);
    }
  }
  
  function flipcard(event) {
    const posId = event.srcElement.getAttribute("data-id");
    if (openCards.size >= 2) return;
    flipcardNum(posId);
    
    if (openCards.size === 2) {
      const li = [...openCards.keys()];
      const c1 = li[0];
      const c2 = li[1];
      // cards match
      if (cardMapping[c1] % 6 === cardMapping[c2] % 6) {
        document.getElementById("score").innerHTML =
        1 + +document.getElementById("score").innerHTML;
        if (document.getElementById("score").innerHTML == 6) {
          document.getElementById("win").style.visibility = "visible";
        }
        setTimeout(() => {
          flipcardNum(c1, true);
          flipcardNum(c2, true);
          openCards.clear();
        }, 1000);
  
        // cards don't match
      } else {
        setTimeout(() => {
          flipcardNum(c1);
          flipcardNum(c2);
          openCards.clear();
        }, 1000);
      }
    } 
  }
  
  // create board
  for (let i = 0; i < cardArray.length; i++) {
    let card = document.createElement("img");
    card.setAttribute("src", "images/blank.png");
    card.setAttribute("data-id", i);
    card.addEventListener("click", flipcard);
    grid.appendChild(card);
  }
});
