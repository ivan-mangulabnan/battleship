import { Gameboard, ShipNode } from "./gameboard.js";
import { Ship } from "./ship.js";

describe ("createShipNode method", () => {
  let game;

  beforeEach(() => {
    game = new Gameboard();
  })

  test ("createShipNode returns an instance of ShipNode", () => {
    const ship1 = new Ship();
    const shipNode = game.createShipNode(ship1);
    expect(shipNode).toBeInstanceOf(ShipNode);
  })

})

describe ("addShipNode method", () => {
  let game;

  beforeEach(() => {
    game = new Gameboard();
  })

  test ("addShipNode pushes ShipNode to Gameboard shipNodes", () => {
    const shipNode = new ShipNode(new Ship());
    game.addShipNode(shipNode);
    expect(game.shipNodes[0]).toBe(shipNode);
  })

})

describe ("isShipPresent method", () => {
  let game;

  beforeEach(() => {
    game = new Gameboard();
  })

  test ("isShipPresent returns the right boolean", () => {
    const ship1 = new Ship();
    const ship2 = new Ship();

    const shipNode1 = new ShipNode(ship1);

    game.shipNodes[0] = shipNode1;

    expect(game.isShipPresent(ship1)).toBeTruthy();
    expect(game.isShipPresent(ship2)).toBeFalsy();
  })

})

describe ("getShipNode method", () => {
  let game;

  beforeEach(() => {
    game = new Gameboard();
  })

  test ("getShipNode returns the right ShipNode", () => {
    const ship1 = new Ship();
    const ship2 = new Ship();
    const notRecordedShip = new Ship();

    const shipNode1 = new ShipNode(ship1);
    const shipNode2 = new ShipNode(ship2);

    game.shipNodes[0] = shipNode1;
    game.shipNodes[1] = shipNode2;

    expect(game.getShipNode(ship1)).toBe(shipNode1);
    expect(game.getShipNode(ship2)).toBe(shipNode2);
    expect(game.getShipNode(ship1)).not.toBe(shipNode2);
    expect(game.getShipNode(notRecordedShip)).toBeUndefined();
  })

})

describe ("placeShip method", () => {
  let game;

  beforeEach(() => {
    game = new Gameboard();
  })

  test ("placeShip places a shipNode", () => {
    const ship = new Ship();
    game.placeShip(ship, [0, 0]);
    expect(game.shipNodes.length).toBe(1);
  })

  test ("placeShip places the correct shipNode", () => {
    const ship = new Ship();
    game.placeShip(ship, [0, 0]);
    expect(game.shipNodes[0]).toBe(game.getShipNode(ship));
  })

  test ("placeShip does not duplicate", () => {
    const ship = new Ship();
    game.placeShip(ship, [0, 0]);
    game.placeShip(ship, [0, 1]);
    expect(game.shipNodes.length).toBe(1);
  })

  test ("placeShip add locations to existing shipNode", () => {
    const ship = new Ship();
    game.placeShip(ship, [0, 0]);
    game.placeShip(ship, [0, 1]);
    const targetShip = game.getShipNode(ship);
    expect(targetShip.locations).toEqual([[0, 0], [0, 1]]);
  })

})

describe ("receiveAttack method", () => {
  let game;
  let ship1;
  let ship2;

  beforeEach(() => {
    game = new Gameboard();
    ship1 = new Ship();
    ship2 = new Ship();

    for (let i = 0; i < 3; i++) {
      game.placeShip(ship1, [0, i]);
      game.placeShip(ship2, [3, i]);
    }
  })

  test ("records missed shots", () => {
    game.receiveAttack([1, 1]);
    expect(game.missedShots[0]).toEqual([1, 1]);
  })

  test ("records hit shots", () => {
    game.receiveAttack([0, 0]);
    expect(game.hitShots[0]).toEqual([0, 0]);
  })

  test ("target ship records hits", () => {
    game.receiveAttack([0, 0]);
    expect(ship1.damage).toBe(1);
  })

  test ("target ship doesn't record miss", () => {
    game.receiveAttack([1, 1]);
    expect(ship1.damage).toBe(0);
  })

  test ("non-target ship doesn't record hits", () => {
    game.receiveAttack([0, 2]);
    expect(ship2.damage).toBe(0);
  })

})

describe ("getHitShip method", () => {
  let game;
  let ship;

  beforeEach(() => {
    game = new Gameboard();
    ship = new Ship();
    game.placeShip(ship, [0, 0]);
  })

  test ("getHitShip returns the ship if it's hit", () => {
    const hitShip = game.getHitShip([0,0]);
    expect(hitShip).toBe(game.shipNodes[0]);
  })

  test ("getHitShip returns null if no ship is hit", () => {
    const hitShip = game.getHitShip([0,1]);
    expect(hitShip).toBeNull();
  })

})

describe ("updateHitShot method", () => {
  let game;
  let ship;

  beforeEach(() => {
    game = new Gameboard();
    ship = new Ship();
    game.placeShip(ship, [0, 0]);
  })

  test ("updates the gameboard's hitShots property", () => {
    const attackCords = [0, 0];
    game.updateHitShots(game.shipNodes[0], attackCords);
    expect(game.hitShots.length).toBe(1);
    expect(game.hitShots).toEqual([[0, 0]]);
  })

  test ("activates the hit method of ship", () => {
    const attackCords = [0, 0];
    game.updateHitShots(game.shipNodes[0], attackCords);
    expect(ship.damage).toBe(1);
  });

})

describe ("updateMissedShots method", () => {
  let game;
  let ship;

  beforeEach(() => {
    game = new Gameboard();
    ship = new Ship();
    game.placeShip(ship, [0, 0]);
  })

  test ("updates the gameboard's missedShots property", () => {
    const attackCords = [0, 1];
    game.updateMissedShots(attackCords);
    expect(game.missedShots.length).toBe(1);
    expect(game.missedShots).toEqual([[0, 1]]);
  })

})

describe ("areAllShipsSunk method", () => {
  let game;
  let ship1;
  let ship2;
  let ship3;

  beforeEach(() => {
    game = new Gameboard();
    ship1 = new Ship();
    ship2 = new Ship();
    ship3 = new Ship();
    for (let i = 0; i < 3; i++) {
      game.placeShip(ship1, [1, i]);
      game.placeShip(ship2, [2, i]);
      game.placeShip(ship3, [3, i]);
    }
  })

  test ("reports if all ships sunk", () => {
    for (let i = 0; i < 3; i++) {
      game.receiveAttack([1, i]);
      game.receiveAttack([2, i]);
      game.receiveAttack([3, i]);
    }

    expect(game.areAllShipsSunk()).toBeTruthy();
  })

  test ("falsy if all ships arent sunk", () => {
    for (let i = 0; i < 3; i++) {
      game.receiveAttack([1, i]);
      game.receiveAttack([2, i]);
    }
    game.receiveAttack([3, 2]);
    
    expect(game.areAllShipsSunk()).toBeFalsy();
  })

})