import { Gameboard } from './gameboard.js';
import { Ship } from './ship.js';

describe ("Gameboard methods", () => {
  let game;
  let ship1;
  let ship2;
  let ship3;

  beforeEach(() => {
    game = new Gameboard();
    ship1 = new Ship();
    ship2 = new Ship();
    ship3 = new Ship();
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