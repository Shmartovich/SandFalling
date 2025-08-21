class Particle {
  constructor(row, col, vSpeed = 1) {
    this.row = row;
    this.col = col;
    this.vSpeed = Math.min(vSpeed, 6);
  }
}

let scrollbarsHidden = false;

const tableLineWidth = 1;
const sqrSize = 10;

let particles = 0;

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
    let isHolding = false;
    window.addEventListener("resize", resizeCanvas);

    const btn = document.getElementById("btn-toggle-scrollbars");
    btn.addEventListener("click", toggleScrollbars);

    const btnStep = document.getElementById("btn-toggle-scrollbars");
    btnStep.addEventListener("click", animate);

    canvas.addEventListener("mousedown", function (evt) {
      isHolding = true;
      putParticle(evt);
    });
    canvas.addEventListener("mouseup", function (evt) {
      isHolding = false;
    });
    canvas.addEventListener("mousemove", function (evt) {
      if (isHolding) {
        putParticle(evt);
      }
    });
    drawInit();
    animate();
  } else {
    throw new Error("no context => canvas is not available in this browser");
  }
}

start();
