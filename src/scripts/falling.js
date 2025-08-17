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

console.log("Matrix:");
console.log(matrix.length);
console.log(matrix[5].length);

let res = "";
showMatrix();

const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

function start() {
  let toWaitMs = 16.666;

  if (canvas.getContext) {
    drawTable();

    window.addEventListener("resize", resizeCanvas);

    const btn = document.getElementById("btn-toggle-scrollbars");

    btn.addEventListener("click", toggleScrollbars);

    drawTable();

    canvas.addEventListener("click", function (evt) {
      placeSandcorn(evt);
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

function placeSandcorn(evt) {
  var rect = canvas.getBoundingClientRect();
  var pos = {
    col: Math.floor((evt.clientX - rect.left) / sqrSize),
    row: Math.floor((evt.clientY - rect.top) / sqrSize),
  };
  if (matrix[pos.row][pos.col] == 0) {
    leftPx = pos.col * sqrSize;
    topPx = pos.row * sqrSize;
    ctx.fillRect(leftPx, topPx, sqrSize, sqrSize);
    matrix[pos.row][pos.col] = 1;
    showMatrix();
    fallCheck(pos.row, pos.col);
  }
}

function fallCheck(row, col) {
  if (matrix[row - 1][col] == 0) {
    matrix[row][col] = 0;
    matrix[row - 1][col] = 1;
  }
}
