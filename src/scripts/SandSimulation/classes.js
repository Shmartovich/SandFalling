const maxVSpeed = 4;
const maxHSpeed = 2;

class Particle {
  constructor(row, col, vSpeed = 1, hSpeed = 0) {
    this.row = row;
    this.col = col;
    this.vSpeed = Math.min(vSpeed, maxVSpeed);
    this.hSpeed = Math.min(hSpeed, maxHSpeed); // only changes by Abprall
  }
}
