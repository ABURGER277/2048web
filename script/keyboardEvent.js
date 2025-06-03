let isMoving = false;

function keyDownHandler(e) {
  if (isMoving) return;
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
      isMoving = false;
      return;
  }
  if (moved) spawnRandomTile();
  setTimeout(() => {
    if (isGameOver()) {
      alert("게임 오버!");
    }
    isMoving = false;
  }, 400);
}

function mergeTiles(line) {
  const newLine = [];
  let lastTile = null;

  for (let i = 0; i < line.length; i++) {
    const currentTile = line[i];
    if (!currentTile) continue;

    const currentTileValue = Number(currentTile.textContent);

    if (lastTile && Number(lastTile.textContent) === currentTileValue) {
      addScore(currentTileValue * 2);
      updateTileStyle(lastTile, currentTileValue * 2)

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
  let moved = false;
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
  let moved = false;
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
  let moved = false;
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

function isGameOver() {
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      if (!board[row][col]) return false;
    }
  }

  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const current = board[row][col];
      const value = Number(current.textContent);

      if (col < boardSize - 1) {
        const right = board[row][col + 1];
        if (right && Number(right.textContent) === value) return false;
      }

      if (row < boardSize - 1) {
        const down = board[row + 1][col];
        if (down && Number(down.textContent) === value) return false;
      }
    }
  }

  return true;
}

function handleKeyDown(e) {
  keyDownHandler(e);
}

document.addEventListener("keydown", handleKeyDown);