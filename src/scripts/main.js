function start() {
  let k = 12;
  const canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var toWaitMs = 5000;
    for (let i = 0, j = 0; i < 100; i += 1, j++) {
      setTimeout(() => drawRoseCurves(i), j * toWaitMs);
    }
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawRoseCurves(k);
    });
  }
}
start();

// k - how many curves
function drawRoseCurves(k) {
  let step = 0.01;
  let size = 150;

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const ctx = canvas.getContext("2d");

  ctx.beginPath();
  for (let angle = 0; angle < 2 * Math.PI; angle += step) {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    ctx.strokeStyle = `rgb(${r},${g},${b})`;

    let x = Math.cos(k * angle) * Math.cos(angle) * size;
    let y = Math.cos(k * angle) * Math.sin(angle) * size;
    if (angle === 0) {
      ctx.moveTo(centerX + x, centerY + y);
    } else {
      ctx.lineTo(centerX + x, centerY + y);
    }
    ctx.stroke();
  }
  console.log("rose curve is drawn");
}

function drawOnLoad() {
  const canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "red";
    ctx.fillRect(10, 10, 50, 50);
    ctx.clearRect(10, 10, 25, 25);

    ctx.fillStyle = "rgb(0 0 200 / 50%)";
    ctx.fillRect(30, 30, 50, 50);
    ctx.strokeRect(30, 30, 50, 50);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 1080);
    ctx.lineTo(1920, 1080);
    ctx.lineTo(1920, 0);
    ctx.fill();
  }
}
//window.addEventListener("load", draw); //  setTimeout(), setInterval(),
