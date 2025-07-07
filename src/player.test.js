import { Player, RealPlayer } from "./player.js";
import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";

describe ('Player class instantiation', () => {
  let player;

  beforeEach(() => {
    const fixedRandom = () => 3;
    player = new Player(fixedRandom);
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
    const fixedRandom = () => 2;
    player = new Player(fixedRandom);
  })

  test ('instantly creates 3 ships when player class is instantiated', () => {
    expect(player.ships.length).toBe(3);
  })
})

describe ('placeShipsRandomly method', () => {
  let player;

  beforeEach(() => {
    const fixedRandom = () => 2;
    player = new Player(fixedRandom);
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
    const fixedRandom = () => 1;
    player = new Player(fixedRandom);
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
    const fixedRandom = () => 1;
    player = new Player(fixedRandom);
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

  test ('isValidCoordsLength method', () => {
    locationArr = ['21', '22', '23'];
    const isValidLength = player.isValidCoordsLength(locationArr);
    expect(isValidLength).toBeTruthy();

    locationArr = ['-21', '22', '24'];
    const isValidLength2 = player.isValidCoordsLength(locationArr);
    expect(isValidLength2).toBeFalsy();

    locationArr = ['2', '22', '23'];
    const isValidLength3 = player.isValidCoordsLength(locationArr);
    expect(isValidLength3).toBeFalsy();
  })

  test ('isValidArrLength method', () => {
    locationArr = ['21', '22', '23'];
    const isValidLength = player.isValidArrLength(locationArr);
    expect(isValidLength).toBeTruthy();

    locationArr = ['-21', '22', '24', '25'];
    const isValidLength2 = player.isValidArrLength(locationArr);
    expect(isValidLength2).toBeFalsy();

    locationArr = ['2', '22'];
    const isValidLength3 = player.isValidArrLength(locationArr);
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
    const validLocation = [[6,0], [6,2], [6,1]];

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

describe ('isValid method', () => {
  let player, targetShip;

  beforeEach(() => {
    const fixedRandom = () => 1;
    player = new Player(fixedRandom);
    targetShip = player.ships[0];
    player.relocateShip(targetShip, ['00', '01', '02']); // sets predictable locations
    player.relocateShip(player.ships[1], ['20', '21', '22']);
    player.relocateShip(player.ships[2], ['40', '41', '42']);
  })

  test ('fails if argument is an empty array', () => {
    const anArray = [];
    expect(player.isValid(targetShip, anArray)).toBe('empty array');
  })

  test ('fails if argument is not an array', () => {
    const notAnArray = null;
    const anArray = [];
    expect(player.isValid(targetShip, notAnArray)).toBe('not array');
    expect(player.isValid(targetShip, anArray)).not.toBe('not array');
  })

  test ("fails if the coordinates length is not equal to 2", () => {
    const overLength = ['333', '33', '3'];
    const underLength = ['1', '11', '111'];
    const passing = ['22', '22', '22'];
    expect(player.isValid(targetShip, overLength)).toBe('invalid coords length');
    expect(player.isValid(targetShip, underLength)).toBe('invalid coords length');
    expect(player.isValid(targetShip, passing)).not.toBe('invalid coords length');
  })

  test ("fails if the array length is not equal to 3", () => {
    const overLength = ['33', '33', '33', '33'];
    const underLength = ['1'];
    const passing = ['66', '66', '66'];
    expect(player.isValid(targetShip, overLength)).toBe('invalid array length');
    expect(player.isValid(targetShip, underLength)).toBe('invalid array length');
    expect(player.isValid(targetShip, passing)).not.toBe('invalid array length');
  })

  test ("fails if there's a NaN", () => {
    const Nan = ['33', 'e3', '33'];
    const Nan2 = ['12', '11', 'c1'];
    const notNan = ['66', '66', '66'];
    expect(player.isValid(targetShip, Nan)).toBe('NaN content');
    expect(player.isValid(targetShip, Nan2)).toBe('NaN content');
    expect(player.isValid(targetShip, notNan)).not.toBe('NaN content');
  })

  test ("fails if some coords is <= 0 and >= 9", () => {
    const fail = ['33', '32', '-1'];
    const fail2 = ['45', '44', '-4'];
    const pass = ['66', '65', '64'];
    expect(player.isValid(targetShip, fail)).not.toBe('ok');
    expect(player.isValid(targetShip, fail2)).not.toBe('ok');
    expect(player.isValid(targetShip, pass)).toBe('ok');
  })

  test ("fails if some coords is diagonal on board or have gaps between locations", () => {
    const fail = ['56', '47', '48'];
    const fail2 = ['90', '91', '93'];
    const pass = ['90', '91', '92'];
    expect(player.isValid(targetShip, fail)).toBe('invalid position');
    expect(player.isValid(targetShip, fail2)).toBe('invalid position');
    expect(player.isValid(targetShip, pass)).not.toBe('invalid position');
  })

  test ("fails if ship does not exist", () => {
    const newShip = new Ship();
    const pass = ['90', '91', '92'];
    expect(player.isValid(newShip, pass)).toBe('ship do not exist');
    expect(player.isValid(targetShip, pass)).not.toBe('ship do not exist');
  })

  test ("fails if invalid spaces is targeted", () => {
    const fail = ['33', '34', '35'];
    const fail2 = ['53', '54', '55'];
    const pass = ['04', '05', '06'];
    expect(player.isValid(targetShip, fail)).toBe('invalid coordinates');
    expect(player.isValid(targetShip, fail2)).toBe('invalid coordinates');
    expect(player.isValid(targetShip, pass)).toBe('ok');
  })
})

describe ('relocateShip method', () => {
  let player;
  let targetShip;

  beforeEach(() => {
    const fixedRandom = () => 1;
    player = new Player(fixedRandom);
    targetShip = player.ships[0];
    player.relocateShip(targetShip, ['00', '01', '02']); // sets predictable locations
    player.relocateShip(player.ships[1], ['20', '21', '22']);
    player.relocateShip(player.ships[2], ['40', '41', '42']);
  })

  test ('throws Error when invalid coordinates.', () => {
    const invalidLocation = ['53', '54', '55'];
    expect(() => player.relocateShip(targetShip, invalidLocation)).toThrow('Invalid Coordinates');
  })

  test ("relocates ship if valid coordinates", () => {
    targetShip = player.ships[1];
    const validLocation = ['21', '22', '23'];
    expect(() => player.relocateShip(targetShip, validLocation)).not.toThrow('Invalid Coordinates');
  });
})

// Real Player Class below.

describe ("RealPlayer class initialization", () => {

  test ('realPlayer class copies the dummy locations', () => {
    const fixedRandom = () => 1;
    const player = new Player(fixedRandom);
    const shipLocations = player.getShipLocations();
    const realPlayer = new RealPlayer(shipLocations);

    const locationsArr = realPlayer.getShipLocations();
    expect(locationsArr).toEqual(shipLocations);


    const fixedRandom2 = () => 2;
    const player2 = new Player(fixedRandom2);
    const shipLocations2 = player2.getShipLocations();
    const realPlayer2 = new RealPlayer(shipLocations2);

    const locationsArr2 = realPlayer2.getShipLocations();
    expect(locationsArr2).toEqual(shipLocations2);
  })

  test ("realPlayer copies respect locations", () => {
    const fixedRandom = () => 1;
    const player = new Player(fixedRandom);
    player.relocateShip(player.ships[0], ['09', '08', '07']);
    player.relocateShip(player.ships[2], ['57', '47', '37']);
    player.relocateShip(player.ships[1], ['82', '83', '84']);
    const shipLocations = player.getShipLocations();
    const realPlayer = new RealPlayer(shipLocations);

    const locations = realPlayer.getShipLocations();
    expect(locations[0]).toEqual(['09', '08', '07']);
    expect(locations[1]).toEqual(['82', '83', '84']);
    expect(locations[2]).toEqual(['57', '47', '37']);
  })

  test ("realPlayer coordsToShip keys is exactly 9", () => {
    const fixedRandom = () => 1;
    const player = new Player(fixedRandom);
    const shipLocations = player.getShipLocations();
    const realPlayer = new RealPlayer(shipLocations);

    expect(realPlayer.board.coordsToShip.size).toBe(9);
  })

  test ("realPlayer shipToCoords keys is exactly 3", () => {
    const fixedRandom = () => 1;
    const player = new Player(fixedRandom);
    const shipLocations = player.getShipLocations();
    const realPlayer = new RealPlayer(shipLocations);

    expect(realPlayer.board.shipToCoords.size).toBe(3);
  })
})