import { Gameboard } from "./gameboard.js";

class Player {
  constructor () {
    this.board = new Gameboard();
  }
}

export class RealPlayer extends Player {
  constructor (name) {
    super();
    this.name = name;
  }
}

export class ComputerPlayer extends Player {
  constructor () {
    super();
    this.name = "Computer";
  }
}