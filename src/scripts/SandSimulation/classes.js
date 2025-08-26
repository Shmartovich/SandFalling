const maxVSpeed = 4;
const maxHSpeed = 2;

class Particle {
  constructor(row, col, vSpeed = 0, hSpeed = 0) {
    this.row = row;
    this.col = col;
    this.vSpeed = Math.min(vSpeed, maxVSpeed);
    this.hSpeed = Math.min(hSpeed, maxHSpeed); // only changes by Abprall
  }
}
