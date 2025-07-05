import { Gameboard } from "./gameboard.js";
import { Ship } from './ship.js';

export class Player {
  constructor () {
    this.board = new Gameboard();
    this.ships = this.#createShips();
    this.#placeShipsRandomly();
  }

  #createShips () {
    const shipLimit = 3;

    const shipsArr = [];
    for (let i = 0; i < shipLimit; i++) {
      shipsArr.push(new Ship());
    }

    return shipsArr;
  }

  #placeShipsRandomly () {
    const random = Math.floor(Math.random() * 10) + 1;

    switch (random) {
      case 1:
        for (let i = 0; i < 3; i++) {
          this.board.placeShip(this.ships[0], `${9 - i}0`);
          this.board.placeShip(this.ships[1], `8${5 - i}`);
          this.board.placeShip(this.ships[2], `${5 - i}8`);
        }
        break;

      case 2:
        for (let i = 0; i < 3; i++) {
          this.board.placeShip(this.ships[0], `${i}0`);
          this.board.placeShip(this.ships[1], `0${2 + i}`);
          this.board.placeShip(this.ships[2], `${2 + i}2`);
        }
        break;

      case 3:
        for (let i = 0; i < 3; i++) {
          this.board.placeShip(this.ships[0], `${4}${i}`);
          this.board.placeShip(this.ships[1], `${6 + i}6`);
          this.board.placeShip(this.ships[2], `${8}${7 - i}`);
        }
        break;

      case 4:
        for (let i = 0; i < 3; i++) {
          this.board.placeShip(this.ships[0], `${1 + i}9`);
          this.board.placeShip(this.ships[1], `7${i}`);
          this.board.placeShip(this.ships[2], `${5 - i}5`);
        }
        break;

      case 5:
        for (let i = 0; i < 3; i++) {
          this.board.placeShip(this.ships[0], `2${7 - i}`);
          this.board.placeShip(this.ships[1], `${6 + i}3`);
          this.board.placeShip(this.ships[2], `0${i}`);
        }
        break;

      case 6:
        for (let i = 0; i < 3; i++) {
          this.board.placeShip(this.ships[0], `${3}${i + 5}`);
          this.board.placeShip(this.ships[1], `${7 - i}7`);
          this.board.placeShip(this.ships[2], `9${2 + i}`);
        }
        break;

      case 7:
        for (let i = 0; i < 3; i++) {
          this.board.placeShip(this.ships[0], `${i + 6}1`);
          this.board.placeShip(this.ships[1], `${2}${i + 3}`);
          this.board.placeShip(this.ships[2], `${5 - i}8`);
        }
        break;

      case 8:
        for (let i = 0; i < 3; i++) {
          this.board.placeShip(this.ships[0], `${i}9`);
          this.board.placeShip(this.ships[1], `${4 + i}0`);
          this.board.placeShip(this.ships[2], `7${7 - i}`);
        }
        break;

      case 9:
        for (let i = 0; i < 3; i++) {
          this.board.placeShip(this.ships[0], `${1 + i}1`);
          this.board.placeShip(this.ships[1], `${8}${i + 4}`);
          this.board.placeShip(this.ships[2], `${5}${5 - i}`);
        }
        break;

      case 10:
        for (let i = 0; i < 3; i++) {
          this.board.placeShip(this.ships[0], `${6}${i + 2}`);
          this.board.placeShip(this.ships[1], `${i + 2}8`);
          this.board.placeShip(this.ships[2], `0${6 - i}`);
        }
        break;
    }
  }

  getShipLocations () {
    const shipMap = this.board.shipToCoords;

    const map = [];
    for (const [_, locations] of shipMap) {
      map.push([...locations]);
    }

    return map;
  }

}

export class RealPlayer extends Player {
  constructor () { // shipLocations parameter
    super();
    this.type = 'player';
    // this.updateLocations(shipLocations);
  }

  // updateLocations (shipLocations) {

  // }
}

export class ComputerPlayer extends Player {
  constructor () {
    super();
    this.type = 'computer';
  }
}