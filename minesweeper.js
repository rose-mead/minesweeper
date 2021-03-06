document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {}
board = generateBoard(4, 4, 0.35)


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
//       isMine: false, 
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
  // board = generateBoard(4, 4)
  // Don't remove this function call: it makes the game work!
  for (var i=0; i<board.cells.length; i++){
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }
  lib.initBoard()
  addEventListeners()
  addAudioEventListeners()
}

function addEventListeners() {
  document.addEventListener('click', checkForWin)
  document.addEventListener('contextmenu', checkForWin)
  document.getElementById('reset-button').addEventListener('click', resetBoard)
  radioButtons = document.getElementsByTagName('input')
  console.log(radioButtons)
  for(i=0; i<radioButtons.length; i++) {
    radioButtons[i].addEventListener('click', resetBoard)
  }

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
  playApplause()
  
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
function generateCell(row, col, difficulty) {
  var cell = {}
  cell.row = row
  cell.col = col
  // cell.isMine = Math.random() < difficulty
  cell.isMarked = false
  cell.hidden = true
  return cell
}



//generate x number of cells
function generateMultipleCells(row, col, difficulty) {
  var cells = []
  var total = row * col
  for(var i=0; i<total; i++) {
    cells[i] = generateCell(row, col, difficulty)
    cells[i].row = Math.floor(i/col)+1
    cells[i].col = i%col + 1
    cells[i].isMine = false
  }
  return cells
}

//number of mines to plant
//go to a random element in the grid - 
    // eg board.cells.length = 9
    //  get random number in array Math.floor(Math.random()*10) 
    // board.cells[random number]
    // turn it into a mine
    // add to minesPlanted counter
    // go to next random number
    
function decideIfMine(row, col, difficulty) {
    var mines = Math.ceil(row * col * 0.1 * difficulty)
    console.log(mines)
    var minesPlanted = 0

  while (minesPlanted < mines)
  {
    var arraySize = row * col
    var randomNumber = Math.floor(Math.random()* arraySize)
    if (board.cells[randomNumber].isMine == false) {
      board.cells[randomNumber].isMine = true
      // console.log(randomNumber)
      minesPlanted++
    }
  }
}

//sm 3  easy  1   1
//sm 3  med   2   2
//sm 3  hard  3   3     9

//sm 4  easy  1   2-3
//sm 4  med   2   3-4
//sm 4  hard  3   5-6    16

// var minesPlanted = 0

// function decideIfMine() {

//   var mines = 3

//   while (minesPlanted < mines)
//   {
//     if(Math.random() < 0.2) {
//       minesPlanted++;
//       console.log("mines planted ")
//       console.log(minesPlanted)
//       return true
//     } else {
//       return false
//     }
//   }
// }

// 3 EASY   =1          3, 6, 9
// 3 MED    =2
// 3 HARD   =3

// 4
// 5

// Math.random()

//if 3x3 easy set x number of mines
//if 3x3 hard set y number of mines

//if 4x4 set z number of mines


//when generateBoard is called 
//a board object is generated
//board object contains array of objects
//objects have properties
//values of properties comes from...
//add x number of cell objects to board array
//return the array
    
// Generate board with x rows and x columns
function generateBoard(row, col, difficulty) {
  // var board = {}
  minesPlanted = 0
  board.cells = generateMultipleCells(row, col, difficulty)
  decideIfMine(row, col, difficulty)
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
    barking.pause()
    document.getElementsByClassName('board')[0].innerHTML = ""
    var userGridSize = document.querySelector('input[name="size"]:checked').value;
    var userDifficulty = document.querySelector('input[name="difficulty"]:checked').value;
    board = generateBoard(userGridSize, userGridSize, userDifficulty)
    // } else generateBoard(3,3)
    // userGridSize = 0

    startGame()
  }



// STRETCH 3 - Sound effects
// Find out how to play sound

// Play sound when user
  // uncovers cell  - that is not mine
  // marks cell
  // uncover bomb   -
  // win

  //set event listener to listen for right-click on any square
    //play bark
  //set event listener to listen for click on any square
  //after click - check for class - mine
    //play bang
  // or play whoosh

  // Possible improvements to audio
  // have one 'play audio' function - pass in the name of the audio file
  // remove html <audio> have elements generated in the DOM



function playGrowl() {
  growl.load()
  growl.play()
}

function playBarking() {
  digging.pause()
  barking.load()
  barking.play()
  }

function playDigging() {
  digging.load()
  digging.play()
  }

  function playApplause() {
    applause.load()
    applause.play()
    }


function addAudioEventListeners() {
  var mines = document.getElementsByClassName('mine')
  for (i = 0; i < mines.length; i++) {
    mines[i].addEventListener('click', playBarking)
  }
  document.getElementsByClassName('board')[0].addEventListener('contextmenu', playGrowl)
  document.getElementsByClassName('board')[0].addEventListener('click', playDigging)
}


// STRETCH 4 - I decide

