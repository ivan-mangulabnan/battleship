import { Ship } from "./ship.js";

describe("hit function", () => {
  test("hit increments", () => {
    const ship = new Ship();
    ship.hit();
    ship.hit();
    expect(ship.damage).toBe(2);
  });
})

describe("isSunk function", () => {
  test("isSunk when hit count matches the ship length", () => {
    const ship = new Ship();
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk).toBeTruthy();
  });
})