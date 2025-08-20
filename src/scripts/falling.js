let scrollbarsHidden = false;

const tableLineWidth = 1;
const sqrSize = 10;
const rows = Math.floor(window.innerHeight / sqrSize);
const cols = Math.floor(window.innerWidth / sqrSize);
let matrix = new Array(rows);
for (let i = 0; i < rows; i++) {
  let array = new Array(cols).fill(0);
  matrix[i] = array;
}
let newMatrix = new Array(rows);
for (let i = 0; i < rows; i++) {
  let array = new Array(cols).fill(0);
  newMatrix[i] = array;
}
let particles = 0;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const canvasBG = document.getElementById("canvasBackground");
const ctxBG = canvasBG.getContext("2d");
canvasBG.width = window.innerWidth;
canvasBG.height = window.innerHeight;

const infoBox = document.getElementById("info-box");
const infoParticlesNum = document.getElementById("info-particles-num");

function start() {
  if (canvas.getContext) {
    var isHolding = false;
    window.addEventListener("resize", resizeCanvas);
    const btn = document.getElementById("btn-toggle-scrollbars");
    btn.addEventListener("click", toggleScrollbars);
    canvas.addEventListener("mousedown", function (evt) {
      isHolding = true;
      putSandcornInMatrix(evt);
    });
    canvas.addEventListener("mouseup", function (evt) {
      isHolding = false;
    });
    canvas.addEventListener("mousemove", function (evt) {
      if (isHolding) {
        putSandcornInMatrix(evt);
      }
    });
    drawInit();
    animate();
  } else {
    throw new Error("no context => canvas is not available in this browser");
  }
}

start();

function drawInit() {
  drawTable();
  drawEverySandcorn();
}

function showMatrix() {
  let textMatrix = document.getElementById("matrix-info");
  let res = "";
  res += "-".repeat(cols);
  res += "<br>";
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      res += matrix[row][col];
    }
    res += "<br>";
  }
  res += "-".repeat(cols);
  res += "<br>";

  textMatrix.innerHTML = res;
}

function drawTable() {
  canvasBG.width = window.innerWidth;
  canvasBG.height = window.innerHeight;
  // todo resize
  ctxBG.lineWidth = tableLineWidth;
  ctxBG.strokeStyle = "black";

  for (let row = 0; row <= rows; row++) {
    ctxBG.beginPath();
    ctxBG.moveTo(0, row * sqrSize);
    ctxBG.lineTo(cols * sqrSize, row * sqrSize);
    ctxBG.stroke();
  }

  for (let col = 0; col <= cols; col++) {
    ctxBG.beginPath();
    ctxBG.moveTo(col * sqrSize, 0);
    ctxBG.lineTo(col * sqrSize, rows * sqrSize);
    ctxBG.stroke();
  }
}

function resizeCanvas() {
  if (scrollbarsHidden) {
    canvas.width = window.outerWidth;
    canvas.height = window.outerHeight;
  } else {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  drawInit();
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
  particles++;
  infoParticlesNum.innerHTML = particles;

  var rect = canvas.getBoundingClientRect();
  var pos = {
    col: Math.floor((evt.clientX - rect.left) / sqrSize),
    row: Math.floor((evt.clientY - rect.top) / sqrSize),
  };
  if (matrix[pos.row][pos.col] == 0) {
    matrix[pos.row][pos.col] = 1;
  }
}

function drawSandcorn(row, col) {
  leftPx = col * sqrSize;
  topPx = row * sqrSize;
  ctx.fillRect(leftPx, topPx, sqrSize, sqrSize);
}

function updatePhysics() {
  // bottom -> top
  for (let row = rows - 2; row >= 0; row--) {
    for (let col = 0; col < cols; col++) {
      if (matrix[row][col] == 1) {
        updateParticle(row, col);
      }
    }
  }
  showMatrix();
  matrix = newMatrix;
}

function updateParticle(row, col) {
  // vertical

  let colLeft = col - 1;
  let colRight = col + 1;
  let rowUnder = row + 1;
  if (matrix[rowUnder][col] == 0) {
    newMatrix[row][col] = 0;
    newMatrix[rowUnder][col] = 1;
    return;
  }
  let colDirections = Math.random > 0.5 ? [-1, 1] : [1, -1];
  for (let colDir of colDirections) {
    let newCol = col + colDir;
    if (
      checkInBounds(rowUnder, newCol) &&
      checkEmptyDiagonal(rowUnder, newCol)
    ) {
      newMatrix[row][col] = 0;
      newMatrix[rowUnder][newCol] = 1;
      return;
    }
  }
  function checkInBounds(rowUnder, newCol) {
    if (rowUnder < rows && newCol > 0 && newCol < cols) {
      return true;
    } else {
      return false;
    }
  }
  function checkEmptyDiagonal(rowUnder, newCol) {
    if (matrix[rowUnder][newCol] == 0) {
      return true;
    } else {
      return false;
    }
  }
  if (matrix[rowUnder][colLeft] == 0 && matrix[rowUnder][colRight] == 0) {
    // randomupdateParticle(row, colLeft);
  } else if (matrix[rowUnder][colLeft] == 0) {
    updateParticle(row, colLeft);
  }
}

function drawEverySandcorn() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (newMatrix[i][j] == 1) {
        drawSandcorn(i, j);
      }
    }
  }
}

function animate() {
  updatePhysics();
  drawEverySandcorn();
  requestAnimationFrame(() => this.animate());
}
