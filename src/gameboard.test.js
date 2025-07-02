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

  test ("updateShipLocations saves ship to shipToCoords property", () => {
    game.updateShipLocations(ship1, `00`);
    expect(game.shipToCoords.has(ship1)).toBeTruthy();
  })

  test ("updateShipLocations saves location with the ship as key", () => {
    game.updateShipLocations(ship1, `00`);
    game.updateShipLocations(ship1, `01`);

    const locations = game.shipToCoords.get(ship1);
    expect(locations.has(`00`)).toBeTruthy();
    expect(locations.has(`01`)).toBeTruthy();
    expect(locations.has(`02`)).toBeFalsy();
  })

})