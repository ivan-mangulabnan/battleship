export class Ship {
  constructor () {
    this.length = 3;
    this.damage = 0;
  }

  hit () {
    this.damage++;
  }

  isSunk () {
    return this.damage === this.length;
  }
}