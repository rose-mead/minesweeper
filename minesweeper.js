document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells: [
    {
      row: 1,
      col: 1, 
      isMine: true, 
      hidden: true
    }, 
    {
      row: 1,
      col: 2, 
      isMine: true, 
      hidden: true
    }, 
    {
      row: 1,
      col: 3, 
      isMine: false, 
      hidden: true
    }, 
    {
      row: 2,
      col: 1, 
      isMine: true, 
      hidden: true
    }, 
    {
      row: 2,
      col: 2, 
      isMine: false, 
      hidden: true
    }, 
    {
      row: 2,
      col: 3, 
      isMine: false, 
      hidden: true
    }, 
    {
      row: 3,
      col: 1, 
      isMine: false, 
      hidden: true
    }, 
    {
      row: 3,
      col: 2, 
      isMine: false, 
      hidden: true
    }, 
    {
      row: 3,
      col: 3, 
      isMine: false, 
      hidden: true
    }, 
  ]
}


function startGame () {
  // Don't remove this function call: it makes the game work!
  for (var i=0; i<board.cells.length; i++){
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }
  lib.initBoard()
  document.addEventListener('click', checkForWin)
  document.addEventListener('contextmenu', checkForWin)
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  for(i=0; i<board.cells.length; i++) {
    if (board.cells[i].isMine == true && board.cells[i].isMarked == false) {
      return 
    }
    else if (board.cells[i].isMine == false && board.cells[i].hidden == true) {
      return
    }
  }
  lib.displayMessage('You win!')
  
  //go through all of the cells
  //if all of the cells that are mines are marked
  //and there are no hidden cells
  //you have won
  //
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  //define countSurroundingMines
  //get surrounding cells in array
  //loop through array
  //count number of times cell.isMine is true
  //return the number of cells around current cell that are mines

  var surroundingCells = lib.getSurroundingCells(cell.row, cell.col)
  var numberOfMines = 0

  for (i=0; i<surroundingCells.length; i++) {
    if (surroundingCells[i].isMine == true) {
      numberOfMines++
    }
  }
  return numberOfMines
}

//STRETCH 1 - autogenerate board

//generate one cell
function generateCell(row, col) {
  var cell = {}
  cell.row = row
  cell.col = col
  cell.isMine = Math.random() < 0.5
  cell.isMarked = false
  cell.hidden = true
  return cell
}

//generate x number of cells
function generateMultipleCells(row, col) {
  var cells = []
  var total = row * col
  for(i=0; i<total; i++) {
    cells[i] = generateCell(row, col)
    cells[i].row = Math.floor(i/col)+1
    cells[i].col = i%col + 1
  }
  board.cells = cells
  return cells
}


    //when generateBoard is called 
    //a board object is generated
    //board object contains array of objects
    //objects have properties
    //values of properties comes from...
    //add x number of cell objects to board array
    //return the array
    

function generateBoard(row, col) {
  var board = {}
  board.cells = generateMultipleCells(row, col)
  return board
}



var newBoard = generateBoard(3, 3)
console.log(newBoard)



//