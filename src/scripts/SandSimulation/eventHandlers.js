import * as functions from "./functions.js";

export default function addEventListeners(globals) {
  let isHolding = false;
  window.addEventListener("resize", functions.resizeCanvas);

  const btn = document.getElementById("btn-toggle-scrollbars");
  btn.addEventListener("click", functions.toggleScrollbars);

  const btnStep = document.getElementById("btn-toggle-scrollbars");
  btnStep.addEventListener("click", functions.animate);

  globals.canvas.addEventListener("mousedown", function (evt) {
    isHolding = true;
    putParticle(evt);
  });
  globals.canvas.addEventListener("mouseup", function (evt) {
    isHolding = false;
  });
  globals.canvas.addEventListener("mousemove", function (evt) {
    if (isHolding) {
      functions.putParticle(evt);
    }
  });
}
