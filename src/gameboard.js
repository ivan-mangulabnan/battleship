export class Gameboard {
  constructor () {
    this.coordsToShip = new Map();
    this.shipToCoords = new Map();
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
}