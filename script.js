const levels = {
  beginner: 40,
  intermediate: 36,
  hard: 32,
  expert: 28,
};
const boardSize = 9;
let board = [];
let hintsUsed = 0;
let score = 0;
let startTime;
let timerId;
let level = "beginner";
let minute = 0;
let second = 0;
let hour = 0;

const timeline = document.getElementById("timeline");
timeline.innerText = "00:00:00";

const scoreBoard = document.getElementById("scoreboard");
scoreBoard.innerText = `Score:${score}`;

const hint = document.getElementById("hint-button");
hint.innerText = `Ipucu Al   ${hintsUsed}`;

const selectedLevel = document.getElementById("lvl");

selectedLevel.addEventListener("change", (e) => {
  level = e.target.value;
  score = 0;
  hintsUsed = 0;
  scoreBoard.innerText = `Score:${score}`;
  hint.innerText = `Ipucu Al   ${hintsUsed}`;

  createBoard();
});

function createBoard() {
  if (timerId) {
    second = 0;
    minute = 0;
    hour = 0;
  }
  board = Array(9)
    .fill()
    .map(() => Array(9).fill(0));
  console.log(levels[level]);

  for (let index = 0; index < levels[level]; index++) {
    const row = Math.floor(Math.random() * boardSize);
    const col = Math.floor(Math.random() * boardSize);
    const num = Math.floor(Math.random() * 9) + 1;

    if (isValid(row, col, num)) {
      board[row][col] = num;
    }
  }
  renderBoard();
}

function isValid(row, col, num) {
  for (let index = 0; index < boardSize; index++) {
    if (board[row][index] === num) {
      return false;
    }
  }

  for (let index = 0; index < boardSize; index++) {
    if (board[index][col] === num) {
      return false;
    }
  }

  const boxRowStart = Math.floor(row / 3) * 3;
  const boxColStart = Math.floor(col / 3) * 3;
  for (let i = boxRowStart; i < boxRowStart + 3; i++) {
    for (let j = boxColStart; j < boxColStart + 3; j++) {
      if (board[i][j] === num) {
        return false;
      }
    }
  }

  return true;
}

function renderBoard() {
  const boardDiv = document.getElementById("sudoku-board");
  boardDiv.innerHTML = "";
  const table = document.createElement("table");
  for (let row = 0; row < boardSize; row++) {
    const tr = document.createElement("tr");
    for (let col = 0; col < boardSize; col++) {
      const td = document.createElement("td");
      td.contentEditable = board[row][col] == 0;
      if (board[row][col] !== 0) {
        td.style.backgroundColor = "gray";
      }
      td.innerText = board[row][col] || "";
      td.addEventListener("input", (e) => handleInput(e, row, col));
      tr.appendChild(td);
      if (col == 2 || col == 5) {
        td.classList.add("board-edge-right");
      }
      if (row == 2 || row == 5) {
        td.classList.add("board-edge-bottom");
      }
    }
    table.appendChild(tr);
  }
  boardDiv.appendChild(table);
}

function handleInput(event, row, col) {
  const value = parseInt(event.target.innerText);
  if (isNaN(value) || value < 1 || value > 9) {
    event.target.classList.add("error");
    score -= 1;
    scoreBoard.innerText = `Score:${score}`;
  } else {
    event.target.classList.remove("error");
    if (isValid(row, col, value)) {
      board[row][col] = value;
      score += 5;
      scoreBoard.innerText = `Score:${score}`;
    } else {
      event.target.classList.add("error");
      score -= 1;
      scoreBoard.innerText = `Score:${score}`;
    }
  }
  checkCompletion();
}
function checkCompletion() {
  const isComplete = board.every((row) => row.every((cell) => cell !== 0));
  if (isComplete) {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    score += 500 - elapsedTime;
    scoreBoard.innerText = `Score:${score}`;
    if (timerId) {
      clearInterval(timerId);
    }
    alert(`Oyun Tamamlandı! Toplam Puan: ${score}`);
  }
}

document.getElementById("hint-button").addEventListener("click", () => {
  if (hintsUsed < 10) {
    hintsUsed++;
    hint.innerText = `Ipucu Al   ${hintsUsed}`;
    score = score - (3 + hintsUsed - 1);
    scoreBoard.innerText = `Score:${score}`;
    giveHint();
  } else {
    alert("Maksimum ipucu sayısına ulaştınız!");
  }
});

function startGame() {
  startTime = Date.now();
  createBoard();
  timeLiner();
}

startGame();

function timeLiner() {
  timerId = setInterval(() => {
    second++;

    if (second === 60) {
      second = 0;
      minute++;
    }

    if (minute === 60) {
      minute = 0;
      hour++;
    }

    let formattedTime = `${hour < 10 ? "0" + hour : hour}:${
      minute < 10 ? "0" + minute : minute
    }:${second < 10 ? "0" + second : second}`;

    timeline.innerText = formattedTime;
  }, 1000);
}

function giveHint() {
  const emptyCells = [];

  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      if (board[row][col] === 0) {
        emptyCells.push({ row, col });
      }
    }
  }

  if (emptyCells.length > 0) {
    const randomCell =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const { row, col } = randomCell;

    const correctValue = findCorrectValue(row, col);
    const boardDiv = document.getElementById("sudoku-board");
    const cell = boardDiv.getElementsByTagName("td")[row * 9 + col];

    cell.innerText = correctValue;
    board[row][col] = correctValue;

    cell.style.backgroundColor = "#ffff99";
  }
  console.log(emptyCells);
}

function findCorrectValue(row, col) {
  for (let num = 1; num <= 9; num++) {
    if (isValid(row, col, num)) {
      return num;
    }
  }
  return 0;
}
