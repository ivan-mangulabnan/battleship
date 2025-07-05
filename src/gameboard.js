export class Gameboard {
  constructor () {
    this.coordsToShip = new Map();
    this.shipToCoords = new Map();
    this.missedShots = new Set();
  }

  placeShip (ship, coordinates) {
    this.updateShipLocations(ship, coordinates);
    this.updateCoordinates(ship, coordinates);
  }

  moveShip (ship, newCordsArr) {
    this.removeOldCoordinates(ship);

    for (const coord of newCordsArr) {
      this.placeShip(ship, coord);
    }
  }

  receiveAttack (coords) {
    if (this.coordsToShip.has(coords)) {
      const ship = this.coordsToShip.get(coords);
      ship.hit();
      return;
    }

    this.missedShots.add(coords);
  }

  areAllShipsSunk () {
    const ships = Array.from(this.shipToCoords.keys());
    return ships.every(ship => ship.isSunk());
  }

  updateShipLocations (ship, coords) {
    const locations = this.shipToCoords.get(ship) || new Set();
    locations.add(coords);

    this.shipToCoords.set(ship, locations);
  }

  updateCoordinates (ship, coords) {
    this.coordsToShip.set(coords, ship);
  }

  removeOldCoordinates (ship) {
    const oldLocations = this.shipToCoords.get(ship);

    for (const coords of oldLocations) {
      this.coordsToShip.delete(coords);
    }

    this.shipToCoords.delete(ship);
  }

  isCoordsValid (ship, coords) {
    const locArr = [];
    for (const [keyShip, locSet] of this.shipToCoords) {
      if (ship === keyShip) continue;
      locArr.push([...locSet]);
    }

    const invalidSet = this.setInvalidSpaces(locArr);
    return coords.some(coord => invalidSet.has(coord)) ? false : true;
  }

  setInvalidSpaces (locArr) {
    const coords = this.setToRowCol(locArr);

    const invalidSet = new Set();
    for (const [row, col] of coords) {
      for (let dRow = -1; dRow <= 1; dRow++) {
        for (let dCol = -1; dCol <= 1; dCol++) {
          const newRow = row + dRow;
          const newCol = col + dCol;

          if (newRow >= 0 && newRow <= 9 && newCol >= 0 && newCol <= 9) {
            invalidSet.add(`${newRow}${newCol}`);
          }
        }
      }
    }

    return invalidSet;
  }

  setToRowCol (locArr) {
    return locArr.flat().map(str => [...str].map(coord => Number(coord)));
  }

  isShipExists (ship) {
    return this.shipToCoords.has(ship);
  }

  isLocationFull (ship) {
    const LOCATION_LIMIT = 3;
    const locations = this.shipToCoords.get(ship);
    return locations.size === LOCATION_LIMIT;
  }
}