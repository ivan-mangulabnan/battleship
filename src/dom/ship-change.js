export function moveShip (dummy) {
  const locationArr = getInputs();
  const targetShip = getTargetShip(dummy);
  const isShipSame = compareCurrentLocation(dummy, targetShip, locationArr);

  let errorMessage;
  if (!isShipSame) {
    errorMessage = dummy.relocateShip(targetShip, locationArr);
    errorMessage = transformErrMessage(errorMessage);
  }

  return errorMessage;
}

function getInputs () {
  const rowColPairs = 3;

  const coordinates = [];
  for (let i = 1; i <= rowColPairs; i++) {
    const rowInput = document.querySelector(`#row${i}`);
    const colInput = document.querySelector(`#col${i}`);

    const pair = [Number(rowInput.value) - 1, Number(colInput.value) - 1];
    coordinates.push(pair);
  }

  const row = coordinates[0][0];

  const isRowSame = coordinates.every(coord => coord[0] === row);

  let sortedCoords;
  if (isRowSame) {
    sortedCoords = coordinates.sort((a, b) => a[1] - b[1]);
  } else {
    sortedCoords = coordinates.sort((a, b) => a[0] - b[0]);
  }

  return sortedCoords.map(coord => coord.join(''));
}

function getTargetShip (dummy) {
  const shipKeys = dummy.board.shipToCoords.keys();
  const ships = [...shipKeys];

  const select = document.querySelector('#shipSelect');
  const currentShipValue = select.value;
  const options = [...select.options].map(opt => opt.textContent);

  const mapObj = {};
  for (let i = 0; i < ships.length; i++) {
    mapObj[options[i]] = ships[i];
  }

  return mapObj[currentShipValue];
}

function compareCurrentLocation (dummy, targetShip, locationArr) {
  const locationSet = dummy.board.shipToCoords.get(targetShip);
  return locationArr.every(loc => locationSet.has(loc));
}

function transformErrMessage (errorMessage) {
  let newErrorMessage;

  switch (errorMessage) {
    case 'invalid position':
      newErrorMessage = "Ship parts must connect straight, never diagonally";
      break;
    case 'invalid coordinates':
      newErrorMessage = "Ships can't be beside or diagonally next to another";
      break;
    default:
      newErrorMessage = 'Why would you do this, man?';
      break;
  }

  return newErrorMessage;
}