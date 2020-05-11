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
function generateCell() {
  var cell = {}
  // cell.row = row
  // cell.col = 1
  cell.isMine = true
  cell.isMarked = false
  cell.hidden = true
  // console.log(cell)
  return cell
}

//generate x number of cells
function generateMultipleCells(num) {
  var cells = []
  for(i=0; i<num; i++) {
    cells[i] = generateCell()
  }
  board.cells = cells
  return cells
}



var newcells = generateMultipleCells(3) 
console.log(newcells)


//when generateBoard is called 
    //a board object is generated
    //board object contains array of objects
    //objects have properties
    //values of properties comes from...
    //add x number of cell objects to board array



// function generateBoard(num) {
//   var board = {}
 
// }



// take number of cells required
// generate multiple cells using generateCell()
// add each to an array
// return the array




//OLD WORKINGS
// function generateMultipleCells(num) {
//   for(i=0; i<num; i++) {
//     var newCellArray = []
//   var newCell = generateCell()
//   newCellArray.push(newCell)
//   }
//   console.log(newCell)
//   console.log(newCellArray)
//   return(newCell)
// }

// generateMultipleCells(3)

// console.log("NewBoard " + newBoard + typeof newBoard)

//add three cells to board array
//every fourth(numOfRows) cell.row property should increase by one
// board = [ {cell.row = 0}, {cell.row = 1}]

// var newCell = generateCell()
// console.log(newCell)

// generateMultipleCells(generateCell, 3)


// function generateMultipleCells(func, times) {
//   func();
//   times && --times && generateMultipleCells(func, times)
// }

//