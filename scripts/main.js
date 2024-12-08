const table = document.querySelector(".sudoku-table");
const tdList = document.querySelectorAll(".sudoku-table td");
let score = document.querySelector(".score");
let scoreValue = 101;
const timerDisplay = document.getElementById("timer");
const levelEnum = {
  BEGINNER: "Easy",
  INTERMEDIATE: "Intermediate",
  HARD: "Hard",
  EXPERT: "Expert",
};

let availableNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let topCell;

function easyMode() {
  let sudokuGrid = Array(9)
    .fill()
    .map(() => Array(9).fill(0));
  document.querySelector(
    ".level-display"
  ).textContent = `Level: ${levelEnum.BEGINNER}`;
  function isSafe(row, col, num) {
    for (let i = 0; i < 9; i++) {
      if (sudokuGrid[row][i] === num) {
        return false;
      }
    }

    for (let i = 0; i < 9; i++) {
      if (sudokuGrid[i][col] === num) {
        return false;
      }
    }

    let startRow = Math.floor(row / 3) * 3;
    let startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (sudokuGrid[i][j] === num) {
          return false;
        }
      }
    }

    return true;
  }

  function fillGrid() {
    let count = 0;
    TopCellInterval(32, 36);
    console.log(topCell);

    while (count < topCell) {
      let row = Math.floor(Math.random() * 9);
      let col = Math.floor(Math.random() * 9);

      if (sudokuGrid[row][col] === 0) {
        let validNumbers = [];

        for (let num = 1; num <= 9; num++) {
          if (isSafe(row, col, num)) {
            validNumbers.push(num);
          }
        }

        if (validNumbers.length > 0) {
          let num =
            validNumbers[Math.floor(Math.random() * validNumbers.length)];

          sudokuGrid[row][col] = num;
          tdList[row * 9 + col].textContent = num;

          count++;
        }
      }
    }
  }

  function requiredValuesforEmptyCells(selectedNum = null) {
    let possibleNumbers = [];

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (sudokuGrid[row][col] === 0) {
          let validNumbers = [];

          for (let num = 1; num <= 9; num++) {
            if (isSafe(row, col, num)) {
              validNumbers.push(num);
            }
          }

          if (selectedNum && validNumbers.includes(selectedNum)) {
            validNumbers = validNumbers.filter(
              (value) => value !== selectedNum
            );
          }

          if (validNumbers.length > 0) {
            possibleNumbers.push({
              row: row,
              col: col,
              possibleValues: validNumbers,
            });
          }
        }
      }
    }

    return possibleNumbers;
  }

  function displayPossibleNumbers() {
    let possibleNumbers = requiredValuesforEmptyCells();

    possibleNumbers.forEach((cell) => {
      console.log(
        `Hücre (${cell.row}, ${
          cell.col
        }) için geçerli sayılar: ${cell.possibleValues.join(", ")}`
      );
    });
  }
  fillGrid();
  displayPossibleNumbers();
  tdList.forEach((td, index) => {
    td.addEventListener("click", () => {
      let row = Math.floor(index / 9);
      let col = index % 9;

      if (sudokuGrid[row][col] === 0) {
        let validNumbers = [];

        for (let num = 1; num <= 9; num++) {
          if (isSafe(row, col, num)) {
            validNumbers.push(num);
          }
        }

        if (validNumbers.length === 1) {
          sudokuGrid[row][col] = validNumbers[0];
          td.textContent = validNumbers[0];
        } else {
          let userInput = prompt("Lütfen 1 ile 9 arasında bir sayı girin.");

          userInput = parseInt(userInput);

          if (validNumbers.includes(userInput)) {
            sudokuGrid[row][col] = userInput;
            td.textContent = userInput;
            score.innerHTML = `Skor: ${scoreValue + 5}`;
            td.style.backgroundColor = "green";
            setTimeout(() => {
              td.style.backgroundColor = "";
            }, 1000);
          } else {
            score.innerHTML = `Skor: ${scoreValue - 1}`;

            td.style.backgroundColor = "red";
            setTimeout(() => {
              td.style.backgroundColor = "";
            }, 1000);
          }
        }
      }
    });
  });

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      tdList[i * 9 + j].textContent =
        sudokuGrid[i][j] !== 0 ? sudokuGrid[i][j] : "";
    }
  }
}
function intermediateMode() {
  let sudokuGrid = Array(9)
    .fill()
    .map(() => Array(9).fill(0));
  document.querySelector(
    ".level-display"
  ).textContent = `Level: ${levelEnum.INTERMEDIATE}`;
  function isSafe(row, col, num) {
    for (let i = 0; i < 9; i++) {
      if (sudokuGrid[row][i] === num) {
        return false;
      }
    }

    for (let i = 0; i < 9; i++) {
      if (sudokuGrid[i][col] === num) {
        return false;
      }
    }

    let startRow = Math.floor(row / 3) * 3;
    let startCol = Math.floor(col / 3) * 3;

    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (sudokuGrid[i][j] === num) {
          return false;
        }
      }
    }

    return true;
  }

  function fillGrid() {
    let count = 0;
    TopCellInterval(32, 36);
    console.log(topCell);

    while (count < topCell) {
      let row = Math.floor(Math.random() * 9);
      let col = Math.floor(Math.random() * 9);
      let num = Math.floor(Math.random() * 9) + 1;

      if (sudokuGrid[row][col] === 0 && isSafe(row, col, num)) {
        sudokuGrid[row][col] = num;
        count++;
      }
    }
  }
  fillGrid();

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      tdList[i * 9 + j].textContent =
        sudokuGrid[i][j] !== 0 ? sudokuGrid[i][j] : "";
    }
  }
}
function hardMode() {
  let sudokuGrid = Array(9)
    .fill()
    .map(() => Array(9).fill(0));
  document.querySelector(
    ".level-display"
  ).textContent = `Level: ${levelEnum.HARD}`;

  function isSafe(row, col, num) {
    for (let x = 0; x < 9; x++) {
      if (sudokuGrid[row][x] === num || sudokuGrid[x][col] === num) {
        return false;
      }
    }

    let startRow = row - (row % 3);
    let startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (sudokuGrid[i + startRow][j + startCol] === num) {
          return false;
        }
      }
    }

    return true;
  }
  function fillGrid() {
    let count = 0;
    TopCellInterval(28, 32);
    console.log(topCell);

    while (count < topCell) {
      let row = Math.floor(Math.random() * 9);
      let col = Math.floor(Math.random() * 9);
      let num = Math.floor(Math.random() * 9) + 1;

      if (sudokuGrid[row][col] === 0 && isSafe(row, col, num)) {
        sudokuGrid[row][col] = num;
        count++;
      }
    }
  }
  fillGrid();

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      tdList[i * 9 + j].textContent =
        sudokuGrid[i][j] !== 0 ? sudokuGrid[i][j] : "";
    }
  }
}
function expertMode() {
  let sudokuGrid = Array(9)
    .fill()
    .map(() => Array(9).fill(0));
  document.querySelector(
    ".level-display"
  ).textContent = `Level: ${levelEnum.EXPERT}`;

  function isSafe(row, col, num) {
    for (let x = 0; x < 9; x++) {
      if (sudokuGrid[row][x] === num || sudokuGrid[x][col] === num) {
        return false;
      }
    }

    let startRow = row - (row % 3);
    let startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (sudokuGrid[i + startRow][j + startCol] === num) {
          return false;
        }
      }
    }

    return true;
  }
  function fillGrid() {
    let count = 0;
    TopCellInterval(24, 28);
    console.log(topCell);

    while (count < topCell) {
      let row = Math.floor(Math.random() * 9);
      let col = Math.floor(Math.random() * 9);
      let num = Math.floor(Math.random() * 9) + 1;

      if (sudokuGrid[row][col] === 0 && isSafe(row, col, num)) {
        sudokuGrid[row][col] = num;
        count++;
      }
    }
  }
  fillGrid();

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      tdList[i * 9 + j].textContent =
        sudokuGrid[i][j] !== 0 ? sudokuGrid[i][j] : "";
    }
  }
}

function TopCellInterval(top1, top2) {
  let index = Math.floor(Math.random() * 2);
  if (index == 0) {
    return (topCell = top1);
  } else {
    return (topCell = top2);
  }
}
