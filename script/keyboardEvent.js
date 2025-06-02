function keyDownHandler(e) {
  let moved = false;
  switch(e.key) {
    case "ArrowLeft":
      moved = moveLeft();
      break;
    case "ArrowRight":
      moved = moveRight();
      break;
    case "ArrowUp":
      moved = moveUp();
      break;
    case "ArrowDown":
      moved = moveDown();
      break;
    default:
      return;
  }
  if (moved) spawnRandomTile();
}

function mergeTiles(line) {
  const newLine = [];
  let lastTile = null;

  for (let i = 0; i < line.length; i++) {
    // 좌,우 가로줄 / 상,하 세로줄
    const currentTile = line[i];
    if (!currentTile) continue;

    const currentTileValue = Number(currentTile.textContent);

    if (lastTile && Number(lastTile.textContent) === currentTileValue) {
      lastTile.textContent = currentTileValue * 2;
      currentTile.remove();
      newLine.push(null);
      lastTile = null;
    } else {
      newLine.push(currentTile);
      lastTile = currentTile;
    }
  }

  while (newLine.length < boardSize) {
    newLine.push(null);
  }

  return newLine;
}

function moveLeft() {
  let moved = false;

  for (let row = 0; row < boardSize; row++) {
    const oldLine = board[row];
    const newLine = mergeTiles(oldLine);

    for (let col = 0; col < boardSize; col++) {
      const currentTile = newLine[col];

      if (board[row][col] !== currentTile) {
        moved = true;
      }

      if (currentTile) moveTile(currentTile, row, col);
      board[row][col] = currentTile;
    }
  }
  return moved;
}

function moveRight() {
  for (let row = 0; row < boardSize; row++) {
    const oldLine = [...board[row]].reverse();
    const newLine = mergeTiles(oldLine).reverse();

    for (let col = 0; col < boardSize; col++) {
      const currentTile = newLine[col];

      if (board[row][col] !== currentTile) {
        moved = true;
      }

      if (currentTile) moveTile(currentTile, row, col);
      board[row][col] = currentTile;
    }
  }
  return moved;
}


function moveUp() {
  for (let col = 0; col < boardSize; col++) {
    const oldLine = board.map(row => row[col]);
    const newLine = mergeTiles(oldLine);

    for (let row = 0; row < boardSize; row++) {
      const currentTile = newLine[row];

      if (board[row][col] !== currentTile) {
        moved = true;
      }

      if (currentTile) moveTile(currentTile, row, col);
      board[row][col] = currentTile;
    }
  }
  return moved;
}

function moveDown() {
  for (let col = 0; col < boardSize; col++) {
    const oldLine = board.map(row => row[col]).reverse();
    const newLine = mergeTiles(oldLine).reverse();

    for (let row = boardSize - 1; row >= 0; row--) {
      const currentTile = newLine[row];

      if (board[row][col] !== currentTile) {
        moved = true;
      }

      if (currentTile) moveTile(currentTile, row, col);
      board[row][col] = currentTile;
    }
  }
  return moved;
}

function handleKeyDown(e) {
  keyDownHandler(e);
}

document.addEventListener("keydown", handleKeyDown);