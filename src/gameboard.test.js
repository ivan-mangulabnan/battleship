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