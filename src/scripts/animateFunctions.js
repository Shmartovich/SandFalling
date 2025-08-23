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

function putParticle(evt) {
  var rect = canvas.getBoundingClientRect();
  var pos = {
    col: Math.floor((evt.clientX - rect.left) / sqrSize),
    row: Math.floor((evt.clientY - rect.top) / sqrSize),
  };
  if (checkInBounds(pos.row, pos.col) && !matrix[pos.row][pos.col]) {
    matrix[pos.row][pos.col] = new Particle(pos.row, pos.col);
    particles++;
    infoParticlesNum.innerHTML = particles;
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
  let speed = particle.vSpeed;

  // Find how far the particle can actually fall
  let fallDistance = 1; // At minimum, try to fall 1 space
  for (
    let testRow = row + 1;
    testRow < Math.min(rows, row + 1 + speed);
    testRow++
  ) {
    if (!matrix[testRow][col]) {
      fallDistance = testRow - row;
    } else {
      break; // Hit an obstacle
    }
  }

  let newRow = row + fallDistance;

  // If we can fall, do it
  if (newRow < rows && !matrix[newRow][col]) {
    let newSpeed = fallDistance === speed ? speed + 1 : 1; // Only increase speed if we fell freely
    newMatrix[newRow][col] = new Particle(newRow, col, Math.min(newSpeed, 5));
    return;
  }

  // Try diagonal sliding (left or right)
  let directions = Math.random() > 0.5 ? [-1, 1] : [1, -1];
  for (let dir of directions) {
    let slideCol = col + dir;
    let slideRow = row + 1;

    if (checkInBounds(slideRow, slideCol) && !matrix[slideRow][slideCol]) {
      newMatrix[slideRow][slideCol] = new Particle(slideRow, slideCol, 1);
      return;
    }
  }

  // Can't move anywhere - stay in place with zero speed
  newMatrix[row][col] = new Particle(row, col, 0);
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
    if (!(matrix[row][col] instanceof Particle)) {
      drawSandcorn(row, col, "red");
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
