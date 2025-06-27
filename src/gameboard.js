export class Gameboard {
  constructor () {
    this.shipNodes = [];
  }

  placeShip (ship, coordinates) {
    const isShipPresent = this.isShipPresent(ship);
    
    if (isShipPresent) {
      const targetShip = this.getShipNode(ship);
      targetShip.locations.push(coordinates);
      return;
    }

    const newShipNode = this.createShipNode(ship);
    newShipNode.locations.push(coordinates);
    this.addShipNode(newShipNode);
  }

  createShipNode (ship) {
    return new ShipNode(ship);
  }

  addShipNode (shipNode) {
    this.shipNodes.push(shipNode);
  }

  isShipPresent (ship) {
    return this.shipNodes.some(shipNode => shipNode.ship === ship);
  }

  getShipNode (ship) {
    return this.shipNodes.find(shipNode => shipNode.ship === ship);
  }
}

export class ShipNode {
  constructor (ship) {
    this.ship = ship;
    this.locations = [];
  }
}