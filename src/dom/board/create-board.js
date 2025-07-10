function createBoard (parentEle) {
  const row = 10;
  const col = 10;

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.rowCol = `${i}${j}`;
      parentEle.appendChild(cell);
    }
  }
}

export function showBoard () {
  const pOneBoard = document.querySelector('#pOneBoard');
  const pTwoBoard = document.querySelector('#pTwoBoard');

  createBoard(pOneBoard);
  createBoard(pTwoBoard);
}