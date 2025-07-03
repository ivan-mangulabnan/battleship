import { Player } from "./player.js";
import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";

describe ('Player class instantiation', () => {
  let player;

  beforeEach(() => {
    player = new Player();
  })

  test ('ships property should be instances of Ship class', () => {
    player.ships.forEach(ship => expect(ship).toBeInstanceOf(Ship));
  })

  test ('board property should be instance of Gameboard class', () => {
    expect(player.board).toBeInstanceOf(Gameboard);
  })

    test ('should already have 3 ships', () => {
    expect(player.ships.length).toBe(3);
  })
})

describe ('createShips method', () => {
  let player;

  beforeEach(() => {
    player = new Player();
  })

  test ('instantly creates 3 ships when player class is instantiated', () => {
    expect(player.ships.length).toBe(3);
  })
})