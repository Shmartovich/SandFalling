const sqrSize = 10;
const canvasSection = document.querySelector(".canvas-section");
const rows = Math.floor(canvasSection.offsetHeight / sqrSize);
const cols = Math.floor(canvasSection.offsetWidth / sqrSize);
const canvasBG = document.getElementById("canvasBackground");

function drawInit() {
  document.getElementById("info-rows-num").innerHTML = rows;
  document.getElementById("info-cols-num").innerHTML = cols;

  drawTable(
    canvasBG,
    canvasSection.offsetWidth,
    canvasSection.offsetHeight,
    tableLineWidth,
    "black",
    rows,
    cols,
    sqrSize
  );
  drawEverySandcorn();
}

function showMatrix() {
  let textMatrix = document.getElementById("matrix-info");
  let res = "";
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (matrix[row][col]) {
        res += 1;
      } else {
        res += 0;
      }
    }
    res += "<br>";
  }

  textMatrix.innerHTML = res;
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

function putParticle(evt, particlesNum) {
  var rect = canvas.getBoundingClientRect();
  var pos = {
    col: Math.floor((evt.clientX - rect.left) / sqrSize),
    row: Math.floor((evt.clientY - rect.top) / sqrSize),
  };
  if (checkBounds(pos.row, pos.col) && !matrix[pos.row][pos.col]) {
    matrix[pos.row][pos.col] = new Particle(pos.row, pos.col);
    particlesCounter++;
    infoParticlesNum.innerHTML = particlesCounter;
  }
}

function drawSandcorn(row, col, color = "black") {
  leftPx = col * sqrSize;
  topPx = row * sqrSize;
  ctx.fillStyle = color;
  ctx.fillRect(leftPx, topPx, sqrSize, sqrSize);
}

function updatePhysics() {
  // bottom -> top
  let count = 0;
  for (let row = rows - 1; row >= 0; row--) {
    for (let col = 0; col < cols; col++) {
      if (matrix[row][col] instanceof Particle) {
        updateParticle(row, col);
        count++;
      }
    }
  }

  copyBufferMatrix();
  clearBufferMatrix();
  showMatrix();
}

function copyBufferMatrix() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      matrix[i][j] = newMatrix[i][j];
    }
  }
}

function clearBufferMatrix() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      newMatrix[i][j] = null;
    }
  }
}

function updateParticle(row, col) {
  let particle = matrix[row][col];
  let vSpeed = particle.vSpeed;
  let newRow;
  let newSpeed;

  if (vSpeed === 0) {
    if (!checkBounds(row + 1, col)) {
      newMatrix[row][col] = particle;
      return;
    } else if (checkCollision(row + 1, col)) {
      newMatrix[row][col] = particle;
      return;
    } else {
      particle.vSpeed++;
    }
  }

  // Free Fall
  if (checkBounds(newRow, col)) {
    if (!checkCollision(newRow, col)) {
      newMatrix[newRow][col] = new Particle(newRow, col, newSpeed);
      return;
    } else {
      while (newRow >= 0) {
        newRow = newRow - 1;
        if (!checkCollision(newRow, col)) {
          newMatrix[newRow][col] = new Particle(newRow, col, 0);
          return;
        }
      }
    }
  } else {
    // set lowest empty spot if OB
    newRow = rows - 1;
    while (newRow >= 0) {
      if (checkBounds(newRow, col) && !checkCollision(newRow, col)) {
        newMatrix[newRow][col] = new Particle(newRow, col, 0);
        return;
      }
      newRow--;
    }
  }
  // Diagonal Fall
}
function checkCollision(newRow, newCol) {
  if (!checkBounds(newRow, newCol)) {
    return undefined;
  }
  if (matrix[newRow][newCol] === null) {
    return false;
  } else {
    return true;
  }
}

function checkBounds(newRow, newCol) {
  if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
    return true;
  } else {
    return false;
  }
}
function setToLowestEmptyRow(col) {
  let newRow = rows - 1;
  while (newRow >= 0) {
    if (checkCollision(newRow, col)) {
      newRow--;
    } else {
      newMatrix[newRow][col] = new Particle(newRow, col, 0);
      return;
    }
  }
  return false;
}

function drawEverySandcorn() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (matrix[i][j]) {
        drawSandcorn(i, j);
      }
    }
  }
}

let animationStep = 0;
function animate() {
  if (animationStep % 2 === 0) {
    updatePhysics();
  }
  drawEverySandcorn();
  animationStep++;
  requestAnimationFrame(animate);
}
