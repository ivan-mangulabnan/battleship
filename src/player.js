import { Gameboard } from "./gameboard.js";
import { Ship } from './ship.js';

class Player {
  constructor () {
    this.board = new Gameboard();
    this.ships = this.createShips();
  }

  createShips () {
    const shipLimit = 3;

    const shipsArr = [];
    for (let i = 0; i < shipLimit; i++) {
      shipsArr.push(new Ship());
    }

    return shipsArr;
  }
}

export class RealPlayer extends Player {
  constructor (name) {
    super();
    this.name = name;
  }
}

export class ComputerPlayer extends Player {
  constructor () {
    super();
    this.name = "Computer";
  }
}