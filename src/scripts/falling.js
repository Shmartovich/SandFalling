let scrollbarsHidden = false;

const sqrSize = 50;
const rows = Math.floor(window.innerHeight / sqrSize);
const cols = Math.floor(window.innerWidth / sqrSize);
const matrix = new Array(rows);
for (let i = 0; i < rows - 1; i++) {
  let array = new Array(cols).fill(0);
  matrix[i] = array;
}
matrix[rows - 1] = new Array(cols).fill(1);

let res = "";
showMatrix();

const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

const toWaitMs = 1216.666;

function start() {
  if (canvas.getContext) {
    drawTable();

    window.addEventListener("resize", resizeCanvas);

    const btn = document.getElementById("btn-toggle-scrollbars");

    btn.addEventListener("click", toggleScrollbars);

    drawTable();

    canvas.addEventListener("click", function (evt) {
      putSandcornInMatrix(evt);
    });
  } else {
    throw new Error("no context => canvas is not available in this browser");
  }
}

start();

function showMatrix() {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      res += matrix[row][col];
    }
    console.log(res);
    res = "";
  }
}

function drawTable() {
  ctx.strokeStyle = "red";
  ctx.beginPath();

  // horizont
  for (let i = 0; i <= canvas.height; i += sqrSize) {
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
  }
  // vertical
  for (let i = 0; i <= canvas.width; i += sqrSize) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
  }
  ctx.stroke();
}

function resizeCanvas() {
  if (scrollbarsHidden) {
    canvas.width = window.outerWidth;
    canvas.height = window.outerHeight;
  } else {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  drawTable(ctx, sqrSize);
  // drawAll table, sandcorns, use matrix
}
function toggleScrollbars() {
  if (!scrollbarsHidden) {
    document.body.style.overflow = "hidden";
    scrollbarsHidden = true;
  } else {
    document.body.style.overflow = "auto";
    scrollbarsHidden = false;
  }
}

function putSandcornInMatrix(evt) {
  var rect = canvas.getBoundingClientRect();
  var pos = {
    col: Math.floor((evt.clientX - rect.left) / sqrSize),
    row: Math.floor((evt.clientY - rect.top) / sqrSize),
  };
  if (matrix[pos.row][pos.col] == 0) {
    matrix[pos.row][pos.col] = 1;
    drawSandcorn(pos.row, pos.col);
    showMatrix();
    fallCheck(pos.row, pos.col);
  }
}

function drawSandcorn(row, col) {
  leftPx = col * sqrSize;
  topPx = row * sqrSize;
  ctx.fillRect(leftPx, topPx, sqrSize, sqrSize);
  showMatrix();
}

function fallCheck(row, col) {
  let newRow = row + 1;
  if (newRow < rows) {
    if (matrix[newRow][col] == 0) {
      matrix[row][col] = 0;
      matrix[newRow][col] = 1;
      setTimeout(() => {
        ctx.clearRect(col * sqrSize, row * sqrSize, sqrSize, sqrSize);
        drawEverySandcorn();
        fallCheck(newRow, col);
      }, toWaitMs);
    }
  }
}

function drawEverySandcorn() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (matrix[i][j] == 1) {
        drawSandcorn(i, j);
      }
    }
  }
}
