let scrollbarsHidden = false;
let particlesCounter = 0;
const tableLineWidth = 1;

let matrix = new Array(rows);
for (let i = 0; i < rows; i++) {
  let array = new Array(cols).fill(null);
  matrix[i] = array;
}
let newMatrix = new Array(rows);
for (let i = 0; i < rows; i++) {
  let array = new Array(cols).fill(null);
  newMatrix[i] = array;
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = canvasSection.offsetWidth;
canvas.height = canvasSection.offsetHeight;

const infoBox = document.getElementById("info-box");
const infoParticlesNum = document.getElementById("info-particles-num");

function start() {
  if (canvas.getContext) {
    addEventListeners();
    drawInit();
    animate();
  } else {
    throw new Error("no context => canvas is not available in this browser");
  }
}

start();
