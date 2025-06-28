export class Gameboard {
  constructor () {
    this.shipNodes = [];
    this.missedShots = [];
    this.hitShots = [];
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

  getHitShip (coordinates) {
    let targetShip;

    for (const shipNode of this.shipNodes) {
      for (const location of shipNode.locations) {
        if (JSON.stringify(location) === JSON.stringify(coordinates)) {
          targetShip = shipNode;
          break;
        }
      }
    }

    return targetShip ? targetShip : null;
  }

  updateHitShots (shipNode, coordinates) {
    const ship = shipNode.ship;
    this.hitShots.push(coordinates);
    ship.hit();
  }

  updateMissedShots (coordinates) {
    this.missedShots.push(coordinates);
  }
}

export class ShipNode {
  constructor (ship) {
    this.ship = ship;
    this.locations = [];
  }
}