const { solveBoard, validateBoard } = require('./solvePuzzle')

const X = null;

const b = [
  [X,X,X,X,X,X,X,X,X],
  [X,X,X,X,X,X,X,X,X],
  [X,X,X,X,X,X,X,X,X],
  [X,X,X,X,X,X,X,X,X],
  [X,X,X,X,X,X,X,X,X],
  [X,X,X,X,X,X,X,X,X],
  [X,X,X,X,X,X,X,X,X],
  [X,X,X,X,X,X,X,X,X],
  [X,X,X,X,X,X,X,X,X],
]
const levels = {
  easy: 15,
  medium: 15,
  hard: 10,
}
let l = 'medium';

const generate = () => {
  let num = fillNum(l)
  let board = fillBoard(num);
  if (validateBoard(board)) {
    return board
  } else {
    return generate()
  }
}

const fillBoard = num => {
  const clone = [...b]
  const validateSquare = () => {
    let y = Math.floor(Math.random() * 8), x = Math.floor(Math.random() * 8);
    let r = [...clone[y]]
    if (r[x] === null) {
      r[x] = Math.floor(Math.random() * 8);
      return clone[y] = r;
    } else {
      return validateSquare()
    }
  }
  for (let i = 0; i <= num; i++) {
    validateSquare()
  }
  return clone;
}

const fillNum = level => {
  let num = Math.floor(Math.random() * (levels[l] + 5));
  if (num >= levels[l]) {
    return num;
  } else {
    return fillNum(l)
  }
}

module.exports = { generate }