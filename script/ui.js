const boardElement = document.getElementById("game-board");
const tileSize = 100;

function createTile(value, row, col) {
  const tile = document.createElement("div");
  tile.textContent = value;
  tile.classList.add("tile");
  updateTileStyle(tile, value)

  tile.style.transform = `translate(${col * tileSize + 5}px, ${row * tileSize + 5}px)`

  tile.dataset.row = row;
  tile.dataset.col = col;

  boardElement.appendChild(tile);

  return tile;
}

function moveTile(tile, toRow, toCol) {
  tile.style.transform = `translate(${toCol * tileSize + 5}px, ${toRow * tileSize + 5}px)`

  tile.dataset.row = toRow
  tile.dataset.col = toCol
}

function updateTileStyle(tile, value) {
  for (const className of tile.classList) {
    if (className.startsWith("tile-") && className !== "tile") {
      tile.classList.remove(className);
    }
  }

  tile.classList.add(`tile-${value}`)
  tile.textContent = value;
}