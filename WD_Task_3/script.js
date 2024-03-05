let currentPlayer = 'X';
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

document.addEventListener('DOMContentLoaded', function() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cell = document.getElementById(`cell${i}${j}`);
      cell.addEventListener('click', () => handleClick(i, j));
    }
  }
});

function handleClick(row, col) {
  if (board[row][col] === '') {
    board[row][col] = currentPlayer;
    const cell = document.getElementById(`cell${row}${col}`);
    cell.innerText = currentPlayer;
    cell.classList.add(currentPlayer === 'X' ? 'x' : 'o'); // Add class for X or O
    cell.classList.add('glow'); // Add glow class to the cell
    if (checkWinner(row, col)) {
      if (currentPlayer === 'X') {
        cell.classList.add('x');
      } else {
        cell.classList.add('o');
        cell.classList.add('glow-effect'); // Add glow effect to winning O
      }
      setTimeout(() => {
        alert(`Player ${currentPlayer} wins!`);
        reset();
        document.getElementById('next').innerHTML = "Start the Game";
      }, 500); // Delay alert for 500ms to display winning move
    } else if (checkDraw()) {
      alert("It's a draw!");
      reset();
      document.getElementById('next').innerHTML = "Start the Game";
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      updateNextTurn(); // Update whose turn is next
    }
  }
}

function updateNextTurn() {
  const nextTurnDiv = document.getElementById('next');
  nextTurnDiv.innerText = `Next turn: ${currentPlayer}`;
}

function checkWinner(row, col) {
  return (
    checkLine(0, col, 1, 0) ||  // vertical
    checkLine(row, 0, 0, 1) ||   // horizontal
    (row === col && checkLine(0, 0, 1, 1)) ||  // diagonal
    (row + col === 2 && checkLine(0, 2, 1, -1)) // anti-diagonal
  );
}

function checkLine(startX, startY, dx, dy) {
  const startCell = board[startX][startY];
  if (startCell === '') return false;
  for (let i = 0; i < 3; i++) {
    const row = startX + i * dx;
    const col = startY + i * dy;
    if (board[row][col] !== startCell) return false;
  }
  return true;
}

function checkDraw() {
  for (let row of board) {
    for (let cell of row) {
      if (cell === '') return false;
    }
  }
  return true;
}

function reset() {
  currentPlayer = 'X';
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cell = document.getElementById(`cell${i}${j}`);
      cell.innerText = '';
      cell.classList.remove('x', 'o'); // Remove X and O classes
    }
  }
}
