export class Gameboard {
  constructor () {
    this.coordsToShip = new Map();
    this.shipToCoords = new Map();
  }

  placeShip (ship, coordinates) {
    this.updateShipLocations(ship, coordinates);
    this.updateCoordinates(ship, coordinates);
  }

  updateShipLocations (ship, coords) {
    const locations = this.shipToCoords.get(ship) || new Set();
    locations.add(coords);

    this.shipToCoords.set(ship, locations);
  }

  updateCoordinates (ship, coords) {
    this.coordsToShip.set(coords, ship);
  }
}