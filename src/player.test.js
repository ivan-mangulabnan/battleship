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

  test ('all ships positioned on the board', () => {
    expect(player.board.coordsToShip.size).toBe(9);
    expect(player.board.shipToCoords.size).toBe(3);
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

describe ('placeShipsRandomly method', () => {
  let player;

  beforeEach(() => {
    player = new Player();
  })

  test ('places all 3 ships of Player instance', () => {
    const ships = player.board.shipToCoords.keys();

    for (const ship of ships) {
      expect(player.ships.includes(ship)).toBeTruthy();
    }
  })

  test ('all 3 ships have exactly 3 locations each', () => {
    const ships = player.board.shipToCoords.keys();

    for (const ship of ships) {
      const shipLocations = player.board.shipToCoords.get(ship);
      expect(shipLocations.size).toBe(3);
    }
  })

  test ('board coordinates of ships have exactly 9 coordinates', () => {
    const coordinates = player.board.coordsToShip;
    expect(coordinates.size).toBe(9);
  })
})