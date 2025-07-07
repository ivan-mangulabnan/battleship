import { Gameboard } from "./gameboard.js";
import { Ship } from './ship.js';

export class Player {
  constructor (randomFn = () => Math.floor(Math.random() * 10) + 1) {
    this.board = new Gameboard();
    this.ships = this.#createShips();
    this.#placeShipsRandomly(randomFn);
  }

  #createShips () {
    const shipLimit = 3;

    const shipsArr = [];
    for (let i = 0; i < shipLimit; i++) {
      shipsArr.push(new Ship());
    }

    return shipsArr;
  }

  #placeShipsRandomly (randomFn) {
    const random = randomFn();

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
          this.board.placeShip(this.ships[0], `4${i}`);
          this.board.placeShip(this.ships[1], `${6 + i}6`);
          this.board.placeShip(this.ships[2], `2${4 + i}`);
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

  relocateShip (ship, locationArr) {
    const isValid = this.isValid(ship, locationArr);

    if (isValid !== 'ok') throw new Error('Invalid Coordinates');
    else this.board.moveShip(ship, locationArr);
  }

  isValid(ship, locationArr) {
    const isArray = this.isArray(locationArr);
    if (!isArray) return 'not array';

    if (locationArr.length === 0) return 'empty array';

    const isValidArrLength = this.isValidArrLength(locationArr);
    if (!isValidArrLength) return 'invalid array length';

    const isValidCoordsLength = this.isValidCoordsLength(locationArr);
    if (!isValidCoordsLength) return 'invalid coords length';

    const rowColArr = locationArr.map(coords => [...coords].map(coord => Number(coord)));

    const isNaNContent = this.isNaNContent(rowColArr);
    const isInRange = this.isInRange(rowColArr);
    const isPositionValid = this.isPositionValid(rowColArr);
    const shipExist = this.board.isShipExists(ship);
    const coordsValid = this.board.isCoordsValid(ship, locationArr);

    if (isNaNContent) return 'NaN content';
    if (!isInRange) return 'invalid range';
    if (!isPositionValid) return 'invalid position';
    if (!shipExist) return "ship do not exist";
    if (!coordsValid) return 'invalid coordinates';

    return 'ok';
  }

  isArray (locationArr) {
    return Array.isArray(locationArr);
  }

  isNaNContent (rowColArr) {
    return rowColArr.flat().some(num => Number.isNaN(num));
  }

  isValidCoordsLength (locationArr) {
    return locationArr.every(coords => coords.length === 2);
  }

  isValidArrLength (locationArr) {
    return locationArr.length === 3;
  }

  isInRange (rowColArr) {
    return rowColArr.flat().every(num => num >= 0 && num <= 9);
  }

  isPositionValid (rowColArr) {
    const rowSet = new Set(rowColArr.map(([row, _]) => row));
    const colSet = new Set(rowColArr.map(([_, col]) => col));

    const rowSize = rowSet.size;
    const colSize = colSet.size;
    const pointCount = rowColArr.length;

    const isHorizontal = rowSize === 1 && colSize === pointCount;
    const isVertical = colSize === 1 && rowSize === pointCount;

    if (!(isHorizontal || isVertical)) return false;

    const numbers = isHorizontal
      ? [...colSet].sort((a, b) => a - b)
      : [...rowSet].sort((a, b) => a - b);

    for (let i = 1; i < numbers.length; i++) {
      if (numbers[i] !== numbers[i - 1] + 1) {
        return false;
      }
    }

    return true;
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