const boardSize = 4;
const board = [];

function initBoard() {
  for (let row = 0; row < boardSize; row++) {
    board[row] = [];

    for(let col = 0; col < boardSize; col++) {
      board[row][col] = null;
    }
  }
}

function spawnRandomTile() {
  const emptyTiles = [];
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      if (board[row][col] === null) {
        emptyTiles.push({ row, col });
      }
    }
  }

  if (emptyTiles.lenth === 0) return;

  const randomIndex = Math.floor(Math.random() * emptyTiles.length);
  const { row, col } = emptyTiles[randomIndex];
  const tile = createTile(2, row, col);

  board[row][col] = tile;
}

function setInitTile(count) {
  for (let i = 0; i < count; i++) {
    spawnRandomTile();
  }
}