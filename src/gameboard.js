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

  isCoordsTaken (coords) {
    return this.coordsToShip.has(coords);
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