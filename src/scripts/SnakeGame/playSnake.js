import * as drawFunctions from "../drawFunctions.js";
const canvas = document.getElementById("snake-game-canvas");
const canvasBG = document.getElementById("snake-game-BG-canvas");
const ctx = canvas.getContext("2d");
const rows = 80;
const cols = 1000;
const sqrSize = 100;
const width = 1000;
const height = 1000;
const lineWidth = 1;
const strokeStyle = "red";

drawFunctions.drawTable(
  canvasBG,
  width,
  height,
  lineWidth,
  strokeStyle,
  rows,
  cols,
  sqrSize
);
