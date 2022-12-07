const fillByOne = b => {
  let raw = []
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (b[y][x] === null) {
        for (let i = 1; i <= 9; i++) {
          let clone = [...b]
          let r = [...clone[y]]
          r[x] = i
          clone[y] = r
          raw.push(clone)
        }
        raw = raw.filter(b => validateBoard(b))
        return raw
      }
    }
  }
  return raw
}

const validateLine = (b, prop) => {
  for (let y = 0; y < 9; y++) {
    let blocks = []
    for (let x = 0; x < 9; x++) {
      prop === 'row' ?
      blocks.push(b[y][x]) :
      blocks.push(b[x][y])
    }
    blocks = blocks.filter((rowItem, index) => rowItem === null || blocks.indexOf(rowItem) === index)
    if(blocks.length !== 9) {
      return 0
    }
  }
  return 1;
}

const validateSquare = b => {
  for (let i = 0; i < 9; i+=3) {
    for (let j = 0; j < 9; j+=3) {
      let blocks = []
      for (let y = i; y < i + 3; y++) {
        for (let x = j; x < j + 3; x++) {
          blocks.push(b[y][x])
        }
      }
      blocks = blocks.filter((blockItem, index) => blockItem === null || blocks.indexOf(blockItem) === index)
      if(blocks.length !== 9) {
        return 0
      }
    }
  }
  return 1;
}

const validateBoard = b => {
  return validateLine(b, 'row') && validateLine(b, 'col') && validateSquare(b)
}

const solvedBoard = b => {
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (b[y][x] === null) {
        return 0
      }
    }
  }
  return 1
}

const solveBoard = board => {
  if (solvedBoard(board)) {
    return board
  } else {
    let boards = fillByOne(board);
    return solveBoards(boards);
  }
}

const solveBoards = boards => {
  if (!boards.length) {
    return 0;
  } else {
    var firstBoard = boards.shift()
    const res = solveBoard(firstBoard)
    if (res.length){
        return res
    } else {
      return solveBoards(boards)
    }
  }
}

module.exports = { solveBoard, validateBoard }

// console.table(solveBoard(require('./generatePuzzle').generate()));
