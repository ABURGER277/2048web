const boardElement = document.getElementById("game-board");
const tileSize = 100;

function createTile(value, row, col) {
  const tile = document.createElement("div");
  tile.classList.add("tile");
  tile.textContent = value;

  tile.style.transform = `translate(${col * tileSize}px, ${row * tileSize}px)`

  tile.dataset.row = row;
  tile.dataset.col = col;

  boardElement.appendChild(tile);

  return tile;
}

function moveTile(tile, toRow, toCol) {
  tile.style.transform = `translate(${toCol * tileSize}px, ${toRow * tileSize}px)`

  tile.dataset.row = toRow
  tile.dataset.col = toCol
}
