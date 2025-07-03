import { Gameboard } from "./gameboard.js";
import { Ship } from './ship.js';

class Player {
  constructor () {
    this.board = new Gameboard();
    this.ships = this.createShips();
    this.placeShipsRandomly();
  }

  createShips () {
    const shipLimit = 3;

    const shipsArr = [];
    for (let i = 0; i < shipLimit; i++) {
      shipsArr.push(new Ship());
    }

    return shipsArr;
  }

  placeShipsRandomly () { // set for now. will make it random in cleanUp.
    for (let i = 0; i < 3; i++) {
      this.board.placeShip(this.ships[0], `${9 - i}0`); // 90,80,70
      this.board.placeShip(this.ships[1], `8${5 - i}`); // 85,84,83
      this.board.placeShip(this.ships[2], `${5 - i}8`); // 58,48,38
    }
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