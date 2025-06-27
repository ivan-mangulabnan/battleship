export class Gameboard {
  constructor () {
    this.shipNodes = [];
  }

  createShipNode (ship) {
    return new ShipNode(ship);
  }
}

export class ShipNode {
  constructor (ship) {
    this.ship = ship;
    this.locations = [];
  }
}