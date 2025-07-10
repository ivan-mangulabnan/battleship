export function relocateSection () {
  const util = document.querySelector('#utils');
  util.innerHTML = '';
  
  const form = document.createElement('form');
  form.classList.add('relocate-form');

  const selectSection = selectShip();
  const inputSection = shipInputs();
  const btnSection = createBtn();

  form.append(selectSection, inputSection, btnSection);
  util.appendChild(form);
}

// Row Col Inputs Section below.

function shipInputs () {  
  const shipWrapper = document.createElement('div');
  shipWrapper.classList.add('ship-inputs-wrapper');

  const shipParts = [];
  for (let i = 1; i <= 3; i++) {
    shipParts.push(createRowColInput(`${i}`));
  }

  for (const shipPart of shipParts) {
    shipWrapper.appendChild(shipPart);
  }

  return shipWrapper;
}

function createRowColInput (num) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('row-col-wrapper');

  const rowWrapper = document.createElement('div');
  rowWrapper.classList.add('row-wrapper', 'inner-wrapper');

  const colWrapper = document.createElement('div');
  colWrapper.classList.add('col-wrapper', 'inner-wrapper');

  const rowInput = document.createElement('input');
  rowInput.id = `row${num}`;
  const colInput = document.createElement('input');
  colInput.id = `col${num}`;

  const rowLabel = document.createElement('label');
  rowLabel.htmlFor = rowInput.id;
  rowLabel.textContent = 'row';

  const colLabel = document.createElement('label');
  colLabel.htmlFor = colInput.id;
  colLabel.textContent = 'col';

  setRestrictions([rowInput, colInput]);

  rowWrapper.append(rowLabel, rowInput);
  colWrapper.append(colLabel, colInput);
  wrapper.append(rowWrapper, colWrapper);
  return wrapper;
}

function setRestrictions (inputArr) {
  for (const input of inputArr) {
    input.type = 'text';
    input.minLength = 1;
    input.maxLength = 1;
    input.pattern = '[0-9]';
  }
}

// Select Ship Section below.

function selectShip () {
  const wrapper = document.createElement('div');
  wrapper.classList.add('ship-wrapper');

  const shipSelect = document.createElement('select');
  shipSelect.id = 'shipSelect';

  const label = document.createElement('label');
  label.htmlFor = shipSelect.id;
  label.textContent = 'Select ship to move';

  const optionArr = createOptions(generateOption);
  setOptions(shipSelect, optionArr);

  wrapper.append(label, shipSelect);
  return wrapper;
}

function setOptions (select, optionArr) {
  for (const option of optionArr) {
    select.appendChild(option);
  }
}

function createOptions (callback) {
  const SHIP_COUNT = 3;
  const options = [];
  for (let i = 1; i <= SHIP_COUNT; i++) {
    options.push(callback(`ship${i}`));
  }

  return options;
}

function generateOption (value) {
  const option = document.createElement('option');
  option.value = `${value}`;
  option.textContent = `${value}`;

  return option;
}

// Buttons below.

function createBtn () {
  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('btn-wrapper');

  const disardBtn = document.createElement('button');
  disardBtn.type = 'button';
  disardBtn.textContent = 'DISCARD';

  const applyBtn = document.createElement('button');
  applyBtn.type = 'submit';
  applyBtn.textContent = 'APPLY';

  btnWrapper.append(disardBtn, applyBtn);
  return btnWrapper;
}