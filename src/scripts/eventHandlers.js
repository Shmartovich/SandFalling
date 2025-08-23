function addEventListeners() {
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
}
