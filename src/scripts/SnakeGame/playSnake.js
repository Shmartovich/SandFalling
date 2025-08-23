const canvas = document.getElementById("snake-game-canvas");
const canvasBG = document.getElementById("snake-game-BG-canvas");

function drawTable() {
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

drawTable();
