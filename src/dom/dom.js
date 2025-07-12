import './dom.css';
import { Player } from '../player.js';
import { showBoard } from './board/create-board.js';
import { relocateSection } from './relocation/repositioning.js';
import { moveShip } from './ship-change.js';

export let dummyPlayer;

(function () {
  dummyPlayer = new Player();
})();

export function randomize () {
  removeShipsDisplay();
  dummyPlayer = new Player();
  showPlayerShips(dummyPlayer);
}

export function initialize (dummy) {
  showBoard();
  showPlayerShips(dummy);
  showPositionBtn();
}

export function showShipCoords (dummy) {
  relocateSection();
  changeDisplayCoords(dummy);
}

export function discardRepositioning () {
  removeHightlight();
  showPositionBtn();
}

export function applyShipChange (dummy, event) { 
  event.preventDefault();

  const isError = moveShip(dummy);

  if (isError) {
    alert(isError);
    changeDisplayCoords(dummy);
    return;
  }

  removeShipsDisplay();
  showPlayerShips(dummy);
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

export function showPlayerShips (dummy) {
  const shipsLocations = dummy.getShipLocations();

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

export function changeDisplayCoords (dummy) {
  const locations = dummy.getShipLocations();
  const select = document.querySelector('#shipSelect');
  const options = [...select.options].map(opt => opt.textContent);

  const map = {};

  for (let i = 0; i < locations.length; i++) {
    map[options[i]] = locations[i];
  }

  const selected = select.value;
  const target = map[selected];

  const rowcols = target.map(cord => [...cord]);

  for (let i = 1; i <= rowcols.length; i++) {
    const row = document.querySelector(`#row${i}`);
    const col = document.querySelector(`#col${i}`);

    row.value = Number(rowcols[i - 1][0]) + 1;
    col.value = Number(rowcols[i - 1][1]) + 1;
  }

  addHighLight(target);
}

export function removeHightlight () {
  const formerHighlighted = document.querySelectorAll('.selected') || null;
  if (formerHighlighted) {
    for (const each of formerHighlighted) {
      each.classList.remove('selected');
    }
  }
}

export function addHighLight (target) {
  removeHightlight();
  
  for (const coord of target) {
    const targetCell = document.querySelector(`[data-row-col="${coord}"]`);
    targetCell.classList.add('selected');
  }
}