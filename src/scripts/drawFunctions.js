export function drawTable(
  canvas,
  width,
  height,
  lineWidth,
  strokeStyle,
  rows,
  cols,
  sqrSize
) {
  canvas.width = width;
  canvas.height = height;
  let ctx = canvas.getContext("2d");
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = strokeStyle;

  for (let row = 0; row <= rows; row++) {
    ctx.beginPath();
    ctx.moveTo(0, row * sqrSize);
    ctx.lineTo(cols * sqrSize, row * sqrSize);
    ctx.stroke();
  }

  for (let col = 0; col <= cols; col++) {
    ctx.beginPath();
    ctx.moveTo(col * sqrSize, 0);
    ctx.lineTo(col * sqrSize, rows * sqrSize);
    ctx.stroke();
  }
}
