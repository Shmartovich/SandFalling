function drawInit() {
  drawTable();
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

function drawTable() {
  canvasBG.width = canvasSection.offsetWidth;
  canvasBG.height = canvasSection.offsetHeight;
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
  if (checkInBounds(pos.row, pos.col) && !matrix[pos.row][pos.col]) {
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
        console.log(`particle # ${count} updated`);
        count++;
      }
    }
  }
  console.log("after updating all particles");

  copyOnValueMatrix();
  clearBufferMatrix();
  showMatrix();
}

function copyOnValueMatrix() {
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
  if (particle.vSpeed === 0) {
    newMatrix[row][col] = particle;
    return;
  }
  let vSpeed = particle.vSpeed;
  let newRow = row + vSpeed;

  // Free fall
  if (checkInBounds(newRow, col) && checkCollision(newRow, col)) {
    let newVSpeed = vSpeed + 1;
    newMatrix[newRow][col] = new Particle(newRow, col, newVSpeed);
    return;
  }
  // todo
  let lowestEmptyRow = findLowestEmptyRow(col);
  newMatrix[lowestEmptyRow][col] = new Particle(lowestEmptyRow, col, 0);
  return;
  // Diagonal Fall
}

function checkCollision(newRow, newCol) {
  if (matrix[newRow][newCol] == null) {
    return true;
  } else {
    return false;
  }
}

function checkInBounds(newRow, newCol) {
  if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
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

function findLowestEmptyRow(col) {
  for (let row = rows - 1; row >= 0; row--) {
    if (matrix[row][col] == null) {
      return row;
    }
  }
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
  // if (animationStep % 10 === 0) {
  //   // Only update physics every 10 frames
  //   updatePhysics();
  // }
  updatePhysics();
  drawEverySandcorn();
  animationStep++;
  requestAnimationFrame(animate);
}
