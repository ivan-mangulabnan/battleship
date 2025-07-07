import { Gameboard } from './gameboard.js';
import { Ship } from './ship.js';

describe ("placeShip methods", () => {
  let game;
  let ship1;

  beforeEach(() => {
    game = new Gameboard();
    ship1 = new Ship();
  })

  test ("placeShip set ship to shipToCoords and coordsToShip property", () => {
    const coords = `00`
    game.placeShip(ship1, coords);
    expect(game.shipToCoords.has(ship1)).toBeTruthy();
    expect(game.coordsToShip.has(coords)).toBeTruthy();
  })

  test ("updateShipLocations set ship to shipToCoords property", () => {
    game.updateShipLocations(ship1, `00`);
    expect(game.shipToCoords.has(ship1)).toBeTruthy();
  })

  test ("updateShipLocations set location with the ship as key", () => {
    game.updateShipLocations(ship1, `00`);
    game.updateShipLocations(ship1, `01`);

    const locations = game.shipToCoords.get(ship1);
    expect(locations.has(`00`)).toBeTruthy();
    expect(locations.has(`01`)).toBeTruthy();
    expect(locations.has(`02`)).toBeFalsy();
  })

  test ("updateCoordinates set coordinates of ships", () => {
    const coords = '00';
    game.updateCoordinates(ship1, coords);
    expect(game.coordsToShip.has(coords)).toBeTruthy();

    const coords2 = '01';
    game.updateCoordinates(ship1, coords2);
    expect(game.coordsToShip.has(coords2)).toBeTruthy();

    const coords3 = '02';
    expect(game.coordsToShip.has(coords3)).toBeFalsy();
  })

  test ("updateCoordinates set correct ship reference", () => {
    const coords = '00';
    game.updateCoordinates(ship1, coords);
    expect(game.coordsToShip.get(coords)).toBe(ship1);

    const coords2 = '01';
    game.updateCoordinates(ship1, coords2);
    expect(game.coordsToShip.get(coords2)).toBe(ship1);

    const coords3 = '02';
    expect(game.coordsToShip.get(coords3)).toBeFalsy();
  })

})

describe ("moveShip methods", () => {
  let game;
  let ships = [];


  beforeEach(() => {
    game = new Gameboard();

    for (let i = 0; i < 3; i++) {
      ships[i] = new Ship();
      game.placeShip(ships[i], `${i}0`);
      game.placeShip(ships[i], `${i}2`);
      game.placeShip(ships[i], `${i}4`);
    }
  })

  test ("moveShip changes previous coordinates of targetShip", () => {
    const newCoordinates = ['80', '81', '82'];
    const targetShip = ships[0];

    game.moveShip(targetShip, newCoordinates);

    expect(game.coordsToShip.get('81')).toBe(targetShip);
    expect(game.coordsToShip.get('80')).toBe(targetShip);
    expect(game.coordsToShip.get('82')).toBe(targetShip);
    expect(game.coordsToShip.get('00')).toBeFalsy();
    expect(game.coordsToShip.get('02')).toBeFalsy();
    expect(game.coordsToShip.get('04')).toBeFalsy();
    expect(game.shipToCoords.get(targetShip)).toEqual(new Set(newCoordinates));
  })

  test ("moveShip doesn't change non-targeted ships", () => {
    const targetShip = ships[0];
    const notTarget1 = ships[1];
    const notTarget2 = ships[2];

    const nonTargetLocations1 = game.shipToCoords.get(notTarget1);
    const nonTargetLocations2 = game.shipToCoords.get(notTarget2);

    game.moveShip(targetShip, ['80', '81', '82']);

    for (const coords of nonTargetLocations1) {
      expect(game.coordsToShip.get(coords)).toBe(notTarget1);
    }

    for (const coords of nonTargetLocations2) {
      expect(game.coordsToShip.get(coords)).toBe(notTarget2);
    }
    
    expect(game.shipToCoords.get(notTarget1)).toEqual(new Set(['10', '12', '14']));
    expect(game.shipToCoords.get(notTarget2)).toEqual(new Set(['20', '22', '24']));
  })

  test ("moveShip keeps the shipCoordinates property at 9", () => {
    game.moveShip(ships[0], ['80', '81', '82']);

    expect(game.shipToCoords.size).toBe(3);
    expect(game.coordsToShip.size).toBe(9);
  })

  test ("removeOldCoordinates removes past coordinates from coordsToShip Map", () => {
    game.removeOldCoordinates(ships[0]);
    expect(game.shipToCoords.get(ships[0])).toBeNull();
    expect(game.coordsToShip.size).toBe(6);
  })

  test ("removeOldCoordinates doesn't remove the targeted ship", () => {
    game.removeOldCoordinates(ships[0]);
    expect(game.shipToCoords.size).toBe(3);
  })
})

describe ("isCoordsValid method", () => {
  let game;
  let ships;


  beforeEach(() => {
    game = new Gameboard();
    ships = [new Ship(), new Ship(), new Ship()];

    for (let i = 0; i < 3; i++) {
      game.placeShip(ships[0], `${9 - i}0`); // 90, 80, 70
      game.placeShip(ships[1], `8${5 - i}`); // 85, 84, 83
      game.placeShip(ships[2], `${5 - i}8`); // 58, 48, 38
    }
  })

  test ('returns valid results', () => {
    const targetShip = ships[0];
    const result = game.isCoordsValid(targetShip, ['75', '74', '73']);
    expect(result).toBeFalsy();

    const result2 = game.isCoordsValid(targetShip, ['65', '64', '63']);
    expect(result2).toBeTruthy();

    const result3 = game.isCoordsValid(targetShip, ['80', '70', '60']);
    expect(result3).toBeTruthy();

    const result4 = game.isCoordsValid(targetShip, ['47', '37', '57']);
    expect(result4).toBeFalsy();
  })

})

describe ("isShipExists method", () => {
  let game;
  let ships = [];


  beforeEach(() => {
    game = new Gameboard();

    for (let i = 0; i < 3; i++) {
      ships[i] = new Ship();
      game.placeShip(ships[i], `${i}0`);
      game.placeShip(ships[i], `${i}2`);
      game.placeShip(ships[i], `${i}4`);
    }
  })

  test ('isShipExists truthy when ships are placed', () => {
    const notSavedShip = new Ship();
    const shipKeys = game.shipToCoords.keys();
    
    Array.from(shipKeys).forEach(ship => {
      expect(ships.includes(ship)).toBeTruthy();
    })
    
    expect(game.shipToCoords.has(notSavedShip)).toBeFalsy();
  })

})

describe ("isLocationFull method", () => {
  let game;
  let ships = [];


  beforeEach(() => {
    game = new Gameboard();

    for (let i = 0; i < 3; i++) {
      ships[i] = new Ship();
    }
  })

  test ('isLocationFull truthy when ship locations count is exactly 3', () => {
    game.placeShip(ships[0], '00');
    expect(game.isLocationFull(ships[0])).toBeFalsy();

    game.placeShip(ships[0], '01');
    expect(game.isLocationFull(ships[0])).toBeFalsy();

    game.placeShip(ships[0], '02');
    expect(game.isLocationFull(ships[0])).toBeTruthy();

    game.placeShip(ships[0], '03');
    expect(game.isLocationFull(ships[0])).toBeFalsy();
  })

})

describe ("receiveAttack method", () => {
  let game;
  let ships = [];


  beforeEach(() => {
    game = new Gameboard();

    for (let i = 0; i < 3; i++) {
      ships[i] = new Ship();
      game.placeShip(ships[i], `${i}0`);
      game.placeShip(ships[i], `${i}2`);
      game.placeShip(ships[i], `${i}4`);
    }
  })

  test ('receiveAttack hits the ship', () => {
    const targetCoords1 = '00';
    const targetShip = ships[0];
    const notTarget = ships[1];

    game.receiveAttack(targetCoords1);
    expect(targetShip.damage).toBe(1);
    expect(notTarget.damage).toBe(0);
    expect(game.missedShots.has(targetCoords1)).toBeFalsy();
  })

  test ('receiveAttack misses the ship', () => {
    const targetCoords1 = '01';

    game.receiveAttack(targetCoords1);
    expect(game.missedShots.has(targetCoords1)).toBeTruthy();

    ships.forEach(ship => expect(ship.damage).toBe(0));
  })

})

describe ("areAllShipsSunk method", () => {
  let game;
  let ships = [];


  beforeEach(() => {
    game = new Gameboard();

    for (let i = 0; i < 3; i++) {
      ships[i] = new Ship();
      game.placeShip(ships[i], `${i}0`);
      game.placeShip(ships[i], `${i}2`);
      game.placeShip(ships[i], `${i}4`);
    }
  })

  test ('report truthy if all are sunk', () => {
    for (let i = 0; i < 3; i++) {
      game.receiveAttack(`${i}0`);
      game.receiveAttack(`${i}0`);
      game.receiveAttack(`${i}4`);
    }

    expect(game.areAllShipsSunk()).toBeTruthy();
  })

  test ('report falsy if 1 ship sunk', () => {
    for (let i = 0; i < 3; i++) {
      game.receiveAttack(`${i}0`);
    }

    expect(game.areAllShipsSunk()).toBeFalsy();
  })

})

describe ("setInvalidSpaces method", () => {
  let game;

  beforeEach(() => {
    game = new Gameboard();
  })

  test ('setInvalidSpaces returns Set', () => {
    const invalidSet = game.setInvalidSpaces(['00', '01', '02']);
    
    expect(invalidSet).toBeInstanceOf(Set);
  })

  test ('returns correct invalid spaces', () => {
    const invalidSet = game.setInvalidSpaces(['00', '01', '02']);
    const invalidSpaces = ['00', '01', '02', '03', '10', '11', '12', '13' ];
    const result = invalidSpaces.every(cords => invalidSet.has(cords));

    expect(result).toBeTruthy();

    const invalidSet2 = game.setInvalidSpaces([['00', '01', '02'], ['04', '14', '24']]);
    const invalidSpaces2 = ['00', '01', '02', '04', '14', '24', '03', '10', '11', '12', '13', '23', '33', '34', '35', '05', '15', '25'];
    const result2 = invalidSpaces2.every(cords => invalidSet2.has(cords));

    expect(result2).toBeTruthy();
  })

  test ('setToRowCol returns array of real row col', () => {
    const rowCol = game.setToRowCol([['00', '01', '02'], ['20', '21']]);
    
    expect(rowCol).toEqual([[0,0], [0,1], [0,2], [2,0], [2,1]]);
  })

})