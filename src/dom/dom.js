import './dom.css';
import { Player } from '../player.js';
import { showBoard } from './board/create-board.js';
import { relocateSection } from './relocation/repositioning.js';

export let dummyPlayer;

(function () {
  dummyPlayer = new Player();
})();

export function randomize () {
  removeShipsDisplay();
  dummyPlayer = new Player();
  showPlayerShips();
}

export function initialize () {
  showBoard();
  showPlayerShips();
  showPositionBtn();
}

// sub functions below.

export function showPositionBtn () {
  const utilDiv = document.querySelector('#utils');
  utilDiv.innerHTML = '';

  const btnDiv = document.createElement('div');
  btnDiv.classList.add('reposition-btn-wrapper');

  const btnRepo = document.createElement('button');
  btnRepo.textContent = 'Reposition Ship';
  btnRepo.id = 'moveShipBtn';
  btnRepo.classList.add('moveShipBtn');
  btnRepo.type = 'button';

  const btnRandom = document.createElement('button');
  btnRandom.textContent = 'Randomize';
  btnRandom.id = 'randomBtn';
  btnRandom.classList.add('randomBtn');
  btnRandom.type = 'button';

  btnDiv.append(btnRepo, btnRandom);
  utilDiv.appendChild(btnDiv);
}

export function showAnnouncements () {
  const utils = document.querySelector('#utils');
  utils.innerHTML = '';

  const announcementDiv = document.createElement('div');
  announcementDiv.classList.add('announcements');

  utils.appendChild(announcementDiv);
}

export function showPlayerShips () {
  const shipsLocations = dummyPlayer.getShipLocations();

  const shipNum = ['one', 'two', 'three'];
  for (const location of shipsLocations) {
    let num = shipNum.shift();
    for (const coord of location) {
      const targetCell = document.querySelector(`[data-row-col="${coord}"]`);
      targetCell.classList.add('ship', `ship-${num}`);
    }
  }
}

export function removeShipsDisplay () {
  const shipCells = document.querySelectorAll('.ship');
  for (const cell of shipCells) {
    cell.className = 'cell';
  }
}