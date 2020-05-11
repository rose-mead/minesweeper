document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {}

function startGame () {
  board = generateBoard(3, 3)
  // Don't remove this function call: it makes the game work!
  for (var i=0; i<board.cells.length; i++){
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }
  lib.initBoard()
  addEventListeners()
}

function addEventListeners() {
  document.addEventListener('click', checkForWin)
  document.addEventListener('contextmenu', checkForWin)
  document.getElementById('reset-button').addEventListener('click', resetBoard)
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

//define countSurroundingMines
//get surrounding cells in array
//loop through array
//count number of times cell.isMine is true
//return the number of cells around current cell that are mines


function countSurroundingMines (cell) {
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
  return cells
}


//when generateBoard is called 
//a board object is generated
//board object contains array of objects
//objects have properties
//values of properties comes from...
//add x number of cell objects to board array
//return the array
    
// Generate board with x rows and x columns
function generateBoard(row, col) {
  var board = {}
  board.cells = generateMultipleCells(row, col)
  return board
}



// STRETCH 2 - reset the board
// make button for reset
// on click call resetBoard function
// reset classes
// count surrounding mines

// re-initialise global board object
// mines should be shuffled
// no extra cells added

function resetBoard() {
    document.getElementsByClassName('board')[0].innerHTML = ""
    startGame()
  }



  //Different ways to select the cells
  // console.log(document.getElementsByClassName('board')[0].children)
  // resetClasses(document.getElementsByClassName('row-1'))
  // console.log(document.querySelectorAll('.board > div'))





// Reset class function - no longer need to use this 
// resetClasses(document.getElementsByClassName('board')[0].children)

// function resetClasses(arr) {
//   for (var i = 0; i < arr.length; i++) {
//     arr[i].classList.add('hidden')
//     arr[i].classList.remove('marked')
//     arr[i].innerHTML = ''
//     arr[i].addEventListener('click', showCell)
//     arr[i].addEventListener('contextmenu', markCell)

//   }
// }