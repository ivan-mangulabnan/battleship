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

describe ('getShipLocations method', () => {
  let player;
  let ship1;
  let ship2;
  let ship3;
  let location1;
  let location2;
  let location3;

  beforeEach(() => {
    player = new Player();
    ship1 = player.ships[0];
    ship2 = player.ships[1];
    ship3 = player.ships[2];
    location1 = ['00', '01', '02'];
    location2 = ['20', '21', '22'];
    location3 = ['40', '41', '42'];
    player.board.moveShip(ship1, location1);
    player.board.moveShip(ship2, location2);
    player.board.moveShip(ship3, location3);
  })

  test ('getShipLocations returns array of arrays', () => {
    const shipLocs = player.getShipLocations();
    expect(Array.isArray(shipLocs)).toBeTruthy();

    for (const locArr of shipLocs) {
      expect(Array.isArray(locArr)).toBeTruthy();
    }
  })

  test ('getShipLocations returns an array with length of exactly 3', () => {
    const shipLocs = player.getShipLocations();
    expect(shipLocs.length).toBe(3);
  })

  test ('each array inside array have length of exactly 3', () => {
    const shipLocs = player.getShipLocations();
    for (const arr of shipLocs) {
      expect(arr.length).toBe(3);
    }
  })

  test ('each array inside array have strings with the exact length of 2', () => {
    const shipLocs = player.getShipLocations();
    for (const arr of shipLocs) {
      for (const loc of arr) {
        expect(typeof loc).toBe('string');
        expect(loc.length).toBe(2);

        for (const char of loc) {
          expect(typeof Number(char)).toBe('number');
        }
      }
    }
  })

  test ('getShipLocations returns values in order', () => {
    const shipLocs = player.getShipLocations();
    expect(shipLocs[0]).toEqual(location1);
    expect(shipLocs[1]).toEqual(location2);
    expect(shipLocs[2]).toEqual(location3);
  })
})