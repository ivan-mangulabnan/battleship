import './index.css';
import { changeDisplayCoords, dummyPlayer, initialize, randomize, showShipCoords, discardRepositioning, applyShipChange } from './dom/dom.js';

document.addEventListener('DOMContentLoaded', () => {
  initialize(dummyPlayer);
});

document.addEventListener('click', (event) => {
  if (event.target.matches('#randomBtn')) {
    randomize();
  }

  if (event.target.matches('#moveShipBtn')) {
    showShipCoords(dummyPlayer);
  }

  if (event.target.matches('#discardBtn')) {
    discardRepositioning();
  }
})

document.addEventListener('change', (event) => {
  if (event.target.matches('#shipSelect')) {
    changeDisplayCoords(dummyPlayer);
  }
})

document.addEventListener('submit', (event) => {
  if (event.target.matches('.relocate-form')) {
    applyShipChange(dummyPlayer, event);
  }
})