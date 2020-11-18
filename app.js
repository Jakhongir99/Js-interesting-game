const startGameBtn = document.querySelector(".start-game");
let timeId = document.querySelector("#time");
const gameScreen = document.querySelector(".game-screen");
const addTimeInput = document.querySelector(".addTimeInput");
const result = document.querySelector("#result");
const resultText = document.querySelector(".result-text");
const timeText = document.querySelector(".time-text");
let score = 0;
let isGameStarted = false;
const colors = [
  "#feac5e",
  "#c779d0",
  "#4bc0c8",
  "#6441a5",
  "#43cea2",
  "#a83279",
  "#fdfc47",
  "#24fe41",
];
startGameBtn.addEventListener("click", startGame);
gameScreen.addEventListener("click", boxFind);
addTimeInput.addEventListener("input", setGameTime);

function startGame() {
  score = 0;
  setGameTime();
  addTimeInput.setAttribute("disabled", "true");

  isGameStarted = true;
  gameScreen.classList.add("start");
  randomBoxes();
  var interval = setInterval(() => {
    let time = parseFloat(timeId.textContent);
    if (time <= 0) {
      clearInterval(interval);
      endGame();
    } else {
      timeId.textContent = (time - 0.1).toFixed(1);
    }
  }, 100);
}

function setGameTime() {
  let time = +addTimeInput.value;
  timeId.textContent = time.toFixed(1);
  timeText.classList.remove("hide");
  resultText.classList.add("hide");
}

function endGame() {
  isGameStarted = false;
  gameScreen.classList.remove("start");
  gameScreen.innerHTML = "";
  gameScreen.appendChild(startGameBtn);
  timeText.classList.add("hide");
  resultText.classList.remove("hide");
  result.textContent = score.toString();
  addTimeInput.removeAttribute("disabled");
}
function boxFind(e) {
  const getAttr = e.target.dataset.box;

  if (!isGameStarted) {
    return;
  }
  if (getAttr) {
    score++;
    randomBoxes();
  }
}
function randomBoxes() {
  gameScreen.innerHTML = "";
  const newBox = document.createElement("div");
  var boxSize = getRandom(30, 100);

  const maxTop = gameScreen.getBoundingClientRect().height - boxSize;
  const maxLeft = gameScreen.getBoundingClientRect().width - boxSize;

  newBox.style.width = newBox.style.height = boxSize + "px";
  newBox.style.position = "absolute";
  newBox.style.cursor = "pointer";
  newBox.style.backgroundColor =
    colors[Math.floor(Math.random() * colors.length)];
  newBox.style.top = getRandom(0, maxTop) + "px";
  newBox.style.left = getRandom(maxLeft, 0) + "px";
  newBox.setAttribute("data-box", "true");
  gameScreen.insertAdjacentElement("afterbegin", newBox);
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
