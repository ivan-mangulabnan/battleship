export function showPositionForm () {
  const utils = document.querySelector('#utils');
  utils.innerHTML = '';

  const form = document.createElement('form');
  form.classList.add('reposition-form');

  const selectDiv = document.createElement('div');
  selectDiv.classList.add('ship-wrapper');
  const shipList = document.createElement('select');
  shipList.id = 'shipSelect';
  const shipLabel = document.createElement('label');
  shipLabel.htmlFor = 'shipSelect';
  shipLabel.textContent = 'Select a ship to move';

  const createOptions = (value) => {
    const option = document.createElement('option');
    option.value = `${value}`;
    option.text = `${value}`;

    return option;
  }

  const ship1 = createOptions('ship1');
  const ship2 = createOptions('ship2');
  const ship3 = createOptions('ship3');

  shipList.append(ship1, ship2, ship3);
  selectDiv.append(shipLabel, shipList);

  const createShipPart = () => {
    const div = document.createElement('div');
    div.classList.add('ship-part');

    const row = document.createElement('input');
    row.classList.add('row');
    const col = document.createElement('input');
    col.classList.add('col');

    const setRestrictions = (input) => {
      input.type = 'text';
      input.minLength = 1;
      input.maxLength = 1;
      input.pattern = '[0-9]';
    }

    setRestrictions(row);
    setRestrictions(col);

    div.append(row,col);
    return div;
  }
  
  const inputsWrapper = document.createElement('div');
  inputsWrapper.classList.add('ship-part-wrapper');
  
  const shipPart1 = createShipPart();
  const shipPart2 = createShipPart();
  const shipPart3 = createShipPart();

  inputsWrapper.append(shipPart1, shipPart2, shipPart3);

  const btnDiv = document.createElement('div');

  const createBtn = (text) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = `${text}`;

    return btn;
  }

  const discardBtn = createBtn('Discard');
  const applyBtn = createBtn('Apply');

  btnDiv.append(discardBtn, applyBtn);

  form.append(selectDiv, inputsWrapper, btnDiv);
  utils.appendChild(form);
}