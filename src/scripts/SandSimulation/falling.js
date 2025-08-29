import addEventListeners from "./eventHandlers.js";
import * as functions from "./functions.js";

const sqrSize = 10;
const canvasSection = document.querySelector(".canvas-section");
const rows = Math.floor(canvasSection.offsetHeight / sqrSize);
const cols = Math.floor(canvasSection.offsetWidth / sqrSize);
const canvasBG = document.getElementById("canvasBackground");

let animationStep = 0;

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
  const globals = {
    canvas,
    ctx,
    canvasBG,
    canvasSection,
    matrix,
    newMatrix,
    rows,
    cols,
    sqrSize,
    scrollbarsHidden,
    particlesCounter,
    tableLineWidth,
    infoParticlesNum,
  };
  functions.initGlobals(globals);

  if (canvas.getContext) {
    addEventListeners();
    functions.drawInit(
      canvasBG,
      canvasSection.offsetWidth,
      canvasSection.offsetHeight,
      tableLineWidth,
      "black",
      rows,
      cols,
      sqrSize
    );
    functions.animate(ctx);
  } else {
    throw new Error("no context => canvas is not available in this browser");
  }
}

start();
