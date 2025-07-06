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
    player.relocateShip(ship1, location1);
    player.relocateShip(ship2, location2);
    player.relocateShip(ship3, location3);
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

describe ('Validations', () => {
  let player;
  let ship, locationArr, rowColArr;

  beforeEach(() => {
    player = new Player();
    ship = player.ships[0];
    locationArr = null;
    rowColArr = null;
  })

  test ('isArray method', () => {
    locationArr = {}
    const isArray = player.isArray(locationArr);
    expect(isArray).toBeFalsy();

    locationArr = ['20', '21', '20'];
    const isArray2 = player.isArray(locationArr);
    expect(isArray2).toBeTruthy();
  })

  test ('isNaNContent method', () => {
    rowColArr = [[2, 5], [2, 'a'], [2, 3]];
    const isNaNContent = player.isNaNContent(rowColArr);
    expect(isNaNContent).toBeFalsy();

    rowColArr = [[2, ',']];
    const isNaNContent2 = player.isNaNContent(rowColArr);
    expect(isNaNContent2).toBeFalsy();

    rowColArr = [[2,3], [2,4], [2,5]];
    const isNaNContent3 = player.isNaNContent(rowColArr);
    expect(isNaNContent3).toBeFalsy();
  })

  test ('isValidLength method', () => {
    locationArr = ['21', '22', '23'];
    const isValidLength = player.isValidLength(locationArr);
    expect(isValidLength).toBeTruthy();

    locationArr = ['-21', '22', '24'];
    const isValidLength2 = player.isValidLength(locationArr);
    expect(isValidLength2).toBeFalsy();

    locationArr = ['2', '22', '23'];
    const isValidLength3 = player.isValidLength(locationArr);
    expect(isValidLength3).toBeFalsy();
  })

  test ('isInRange method', () => {
    rowColArr = [[2,2], [2,3], [2,4]];
    const isInRange = player.isInRange(rowColArr);
    expect(isInRange).toBeTruthy();

    rowColArr = [[-1, 2], [-1, 3], [-1, 4]];
    const isInRange2 = player.isInRange(rowColArr);
    expect(isInRange2).toBeFalsy();

    rowColArr = [[10, 1], [10, 2], [10, 3]];
    const isInRange3 = player.isInRange(rowColArr);
    expect(isInRange3).toBeFalsy();
  })

  test ('isPositionValid enforces no diagonal ships and gaps between ships', () => {
    // set predictable locations first.
    player.relocateShip(player.ships[0], ['00', '01', '02']);
    player.relocateShip(player.ships[1], ['20', '21', '22']);
    player.relocateShip(player.ships[2], ['40', '41', '42']);

    // now test.

    const invalidLocation1 = [[1,0], [1,2], [1,4]];
    const invalidLocation2 = [[4,0], [4,1], [5,2]];
    const invalidLocation3 = [[0,9], [1,8], [2,7]];
    const validLocation = [[6,0], [6,1], [6,2]];

    const isPositionValid1 = player.isPositionValid(invalidLocation1);
    const isPositionValid2 = player.isPositionValid(invalidLocation2);
    const isPositionValid3 = player.isPositionValid(invalidLocation3);
    const isPositionValid6 = player.isPositionValid(validLocation);

    expect(isPositionValid1).toBeFalsy();
    expect(isPositionValid2).toBeFalsy();
    expect(isPositionValid3).toBeFalsy();
    expect(isPositionValid6).toBeTruthy();
  })
})