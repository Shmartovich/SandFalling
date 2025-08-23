let scrollbarsHidden = false;
let particlesCounter = 0;
const tableLineWidth = 1;
const sqrSize = 10;

const canvasSection = document.querySelector(".canvas-section");
const rows = Math.floor(canvasSection.offsetHeight / sqrSize);
const cols = Math.floor(canvasSection.offsetWidth / sqrSize);
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

const canvasBG = document.getElementById("canvasBackground");
const ctxBG = canvasBG.getContext("2d");

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
