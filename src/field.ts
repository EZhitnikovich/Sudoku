var numberOfSolutions = 1;
const puzzleSize = 9;
export function generateField(): number[][] {
  let N = 9;
  let field = Array.from(
    {
      length: N,
    },
    () =>
      Array.from(
        {
          length: N,
        },
        () => 0
      )
  );
  fillDiagonal(field);
  fillSudoku(field);

  return field;
}

export function generatePlayableField(grid: number[][], difficulty: number = 7): number[][] {
  let playableField: number[][] = copyField(grid);
  let attempt = difficulty;
  while (attempt > 0) {
    let row = generateRandom(puzzleSize);
    let col = generateRandom(puzzleSize);
    if (playableField[row][col] !== 0) {
      let backup = playableField[row][col];
      playableField[row][col] = 0;
      numberOfSolutions = 0;
      solveSudoku(playableField);
      if (numberOfSolutions !== 1) {
        playableField[row][col] = backup;
        attempt--;
      }
    }
  }

  return playableField;
}

export function generateMask(playableField: number[][]): number[][] {
  let mask: number[][] = copyField(playableField);

  for (let i = 0; i < puzzleSize; i++) {
    for (let j = 0; j < puzzleSize; j++) {
      if (playableField[i][j] === 0) {
        mask[i][j] = 0;
      } else {
        mask[i][j] = 1;
      }
    }
  }

  return mask;
}

function copyField(field: number[][]): number[][] {
  return field.map(function (arr) {
    return arr.slice();
  });
}

function fillDiagonal(field: number[][]) {
  let SRN = Math.floor(Math.sqrt(puzzleSize));
  for (let i = 0; i < puzzleSize; i += SRN) {
    fillBox(field, i, i);
  }
}

function fillBox(field: number[][], row: number, col: number) {
  let SRN = Math.floor(Math.sqrt(puzzleSize));
  let num = 0;
  for (let i = 0; i < SRN; i++) {
    for (let j = 0; j < SRN; j++) {
      while (true) {
        num = generateRandom(puzzleSize) + 1;
        if (isValid(field, row, col, num)) {
          break;
        }
      }
      field[row + i][col + j] = num;
    }
  }
}

function generateRandom(max: number): number {
  return Math.floor(Math.random() * max);
}

function isValid(field: number[][], row: number, col: number, value: number): boolean {
  for (let i = 0; i < puzzleSize; i++) {
    if (field[row][i] === value || field[i][col] === value) return false;
  }

  let boxSize = Math.floor(puzzleSize / 3);
  let rStart = row - (row % boxSize);
  let cStart = col - (col % boxSize);

  for (let row = rStart; row < rStart + boxSize; row++) {
    for (let col = cStart; col < cStart + boxSize; col++) {
      if (field[row][col] === value) return false;
    }
  }

  return true;
}

function fillSudoku(grid: number[][], row: number = 0, col: number = 0): boolean {
  if (row === 9) {
    return true;
  } else if (col === 9) {
    return fillSudoku(grid, row + 1, 0);
  } else if (grid[row][col] !== 0) {
    return fillSudoku(grid, row, col + 1);
  } else {
    for (let k = 1; k <= puzzleSize; k++) {
      if (isValid(grid, row, col, k)) {
        grid[row][col] = k;
        if (fillSudoku(grid, row, col + 1)) {
          return true;
        }
        grid[row][col] = 0;
      }
    }
    return false;
  }
}

function solveSudoku(grid: number[][]): boolean {
  let row: number = -1,
    col: number = -1;
  for (let i = 0; i < puzzleSize * puzzleSize; i++) {
    row = Math.floor(i / puzzleSize);
    col = i % puzzleSize;
    if (grid[row][col] === 0) {
      for (let value = 1; value <= puzzleSize; value++) {
        if (isValid(grid, row, col, value)) {
          grid[row][col] = value;
          if (!hasEmptyCell(grid)) {
            numberOfSolutions++;
            break;
          } else if (solveSudoku(grid)) {
            return true;
          }
        }
      }
      break;
    }
  }
  if (row !== -1 && col !== -1) {
    grid[row][col] = 0;
  }
  return false;
}

function hasEmptyCell(grid: number[][]): boolean {
  for (let row = 0; row < puzzleSize; row++) {
    for (let col = 0; col < puzzleSize; col++) {
      if (grid[row][col] === 0) {
        return true;
      }
    }
  }

  return false;
}