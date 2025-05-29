function keyDownHandler(e) {
  switch(e.key) {
    case "ArrowLeft":
      moveLeft();
      spawnRandomTile();
      break;
    case "ArrowRight":
      moveRight();
      spawnRandomTile();
      break;
    case "ArrowUp":
      moveUp();
      spawnRandomTile();
      break;
    case "ArrowDown":
      moveDown();
      spawnRandomTile();
      break;
    default:
      return;
  }
}

function moveLeft() {
  for (let row = 0; row < boardSize; row++) {
    const currentRow = board[row];

    const newRow = []; // 왼쪽으로 밀린 타일 배열
    let lastTile = null; // 마지막으로 들어간 타일

    for (let col = 0; col < boardSize; col++) {
      const currentTile = currentRow[col];
      if(!currentTile) continue;

      const currentTileValue = Number(currentTile.textContent);

      // 합칩니다~
      if(lastTile && Number(lastTile.textContent) === currentTileValue) {
        lastTile.textContent = currentTileValue * 2; // lastTile에 합쳐진 값 저장
        currentTile.remove(); // 현재 타일은 DOM에서 삭제

        board[row][col] = null; // 보드에서 현재 위치 비움
        lastTile = null; // 합쳐졌으므로 비교할 타일 초기화

      // 옮깁니다~
      } else {
        const targetCol = newRow.length;
        moveTile(currentTile, row, targetCol); // newRow의 바로 옆으로 붙여넣기

        board[row][col] = null; // 보드에서 기존 위치 지움
        board[row][targetCol] = currentTile; // board에 현재 타일 삽입

        newRow.push(currentTile); //
        lastTile = currentTile; // 이후 for문에 비교할 기준으로 할당
      }
    }
  }
}

function moveRight() {
  for (let row = 0; row < boardSize; row++) {
    const currentRow = board[row]

    const newRow = [];
    let lastTile = null;
    for (let col = boardSize - 1; col >= 0; col--) {
      if (!currentRow[col]) continue;

      const currentTile = currentRow[col];
      const currentTileValue = Number(currentTile.textContent)

      if (lastTile && Number(lastTile.textContent) === currentTileValue) {
        lastTile.textContent = currentTileValue * 2;
        currentTile.remove();

        board[row][col] = null;
        lastTile = null;
      } else {
        const targetCol = (boardSize - 1) - newRow.length;
        moveTile(currentTile, row, targetCol);

        board[row][col] = null;
        board[row][targetCol] = currentTile;

        newRow.push(currentTile);
        lastTile = currentTile;
      }
    }
  }
}

function moveUp() {
  for (let col = 0; col < boardSize; col++) {
    const newCol = [];
    let lastTile = null;

    for (let row = 0; row < boardSize; row++) {
      const currentTile = board[row][col];
      if (!currentTile) continue;

      const currentTileVale = Number(currentTile.textContent);

      if (lastTile && Number(lastTile.textContent) === currentTileVale) {
        lastTile.textContent = currentTileVale * 2;
        currentTile.remove();

        board[row][col] = null;
        lastTile = null;
      } else {
        const targetRow = newCol.length;
        moveTile(currentTile, targetRow, col);

        board[row][col] = null;
        board[targetRow][col] = currentTile;

        newCol.push(currentTile);
        lastTile = currentTile;
      }
    }
  }
}

function moveDown() {
  for (let col = 0; col < boardSize; col++) {
    const newCol = [];
    let lastTile = null;

    for (let row = boardSize - 1; row >= 0; row--) {
      const currentTile = board[row][col];
      if (!currentTile) continue;

      const currentTileValue = Number(currentTile.textContent);

      if (lastTile && Number(lastTile.textContent) === currentTileValue) {
        lastTile.textContent = currentTileValue * 2;
        currentTile.remove();

        board[row][col] = null;
        lastTile = null;
      } else {
        const targetRow = (boardSize - 1) - newCol.length;
        moveTile(currentTile, targetRow, col);

        board[row][col] = null;
        board[targetRow][col] = currentTile;

        newCol.push(currentTile);
        lastTile = currentTile;
      }
    }
  }
}

function handleKeyDown(e) {
  keyDownHandler(e);
}

document.addEventListener("keydown", handleKeyDown);