export class Gameboard {
  constructor () {
    this.shipNodes = [];
  }

  createShipNode (ship) {
    return new ShipNode(ship);
  }

  addShipNode (shipNode) {
    this.shipNodes.push(shipNode);
  }
}

export class ShipNode {
  constructor (ship) {
    this.ship = ship;
    this.locations = [];
  }
}