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