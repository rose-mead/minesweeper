document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!

var board = generateBoard(3, 3)

// var board = {
//   cells: [
//     {
//       row: 1,
//       col: 1, 
//       isMine: true, 
//       hidden: true
//     }, 
//     {
//       row: 1,
//       col: 2, 
//       isMine: true, 
//       hidden: true
//     }, 
//     {
//       row: 1,
//       col: 3, 
//       isMine: false, 
//       hidden: true
//     }, 
//     {
//       row: 2,
//       col: 1, 
//       isMine: true, 
//       hidden: true
//     }, 
//     {
//       row: 2,
//       col: 2, 
//       isMine: false, 
//       hidden: true
//     }, 
//     {
//       row: 2,
//       col: 3, 
//       isMine: false, 
//       hidden: true
//     }, 
//     {
//       row: 3,
//       col: 1, 
//       isMine: false, 
//       hidden: true
//     }, 
//     {
//       row: 3,
//       col: 2, 
//       isMine: false, 
//       hidden: true
//     }, 
//     {
//       row: 3,
//       col: 3, 
//       isMine: false, 
//       hidden: true
//     }, 
//   ]
// }


function startGame () {
  // Don't remove this function call: it makes the game work!
  for (var i=0; i<board.cells.length; i++){
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }
  lib.initBoard()
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
  // board.cells = cells
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







//STRETCH 2 - reset the board
//make button for reset
//on click call resetBoard function

//reset classes
//re-initialise global board object
//mines should be shuffled
//no extra cells added

function resetBoard() {
  console.log("reset the board")
  resetClasses(document.getElementsByClassName('board')[0].children)
  board = generateBoard(3,3)
  for (var i=0; i<board.cells.length; i++){
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }
  // lib.initBoard()

  // document.addEventListener('click', checkForWin)
  // document.addEventListener('contextmenu', checkForWin)
  
  
  // board.cells.sort(cellCompare)
  // location.reload()               will refresh the page
  
  //Try to reinitialise the board
  //reinitialise global board object???
  //on button click 
  // document.getElementsByClassName('board')[0].children.remove()
  // drawBoard(boardNode)
  // addListeners(boardNode)

  // for (var i=0; i<board.cells.length; i++){
  //   board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  // }
  
  // function deleteBoard (boardNode) {
  //   boardNode.style.width = Math.sqrt(board.cells.length) * 85 + 'px'
  //   board.cells.reduce(cellsToNodes, boardNode)
  // }

  // var boardNode = document.getElementsByClassName('board')[0]

  // lib.initBoard()
  // newBoard = generateBoard(3, 3)
  
  //Trying to reset classes to default
  // .classList.add('hidden')
  // .classList.remove('marked')
  
  //Different ways to select the cells
  // console.log(document.getElementsByClassName('board')[0].children)
  // resetClasses(document.getElementsByClassName('row-1'))
  // console.log(document.querySelectorAll('.board > div'))
}

function resetClasses(arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].classList.add('hidden')
    arr[i].classList.remove('marked')
    arr[i].innerHTML = ''
    arr[i].addEventListener('click', showCell)
    arr[i].addEventListener('contextmenu', markCell)

  }
}