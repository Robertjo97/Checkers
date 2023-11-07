let playerOne = true; //Holds current player
let board = document.getElementById('board'); //global board

function makeMove() {
    //TODO

    if (playerOne) {
        playerOne = false;
    }
    else if (!playerOne) {
        playerOne = true;
    }
}

let selectedTile = null;
let pieceRow = 0;
let pieceCol = 0;
/*function possMoves() {
    if(selectedTile != null){
        selectedTile.style.backgroundColor = 'black';

        
    }
    for (let i = 0; i < 8; i++) {
        let rowCells = board.rows[i].cells;
        for (let j = 0; j < 8; j++) {
            if (rowCells[j].style.backgroundColor == 'yellow') {
                pieceRow = i;
                pieceCol = j;
                selectedTile = rowCells[j];
                break;
            }
        }
    }
    //Player 1 possible moves highlighting
    if (playerOne) {
        //Inner piece
        if(pieceCol != 0 && pieceCol != 7){
        let row = board.rows[pieceRow - 1];
        let leftMove = row.cells[pieceCol - 1];
        leftMove.style.backgroundColor = 'green';
        let rightMove = row.cells[pieceCol + 1];
        rightMove.style.backgroundColor = 'green';
        }
        //left column piece
        else if(pieceCol == 0){
            let row = board.rows[pieceRow - 1];
            let rightMove = row.cells[pieceCol + 1];
            rightMove.style.backgroundColor = 'green';
        }
        //right column piece
        else if(pieceCol == 7){
            let row = board.rows[pieceRow - 1];
            let leftMove = row.cells[pieceCol - 1];
            leftMove.style.backgroundColor = 'green';
        }
    }
    //Player 2 possible moves highlighting
    else if (!playerOne) {
        //Inner piece
        if(pieceCol != 0 && pieceCol != 7){
        let row = board.rows[pieceRow + 1];
        let leftMove = row.cells[pieceCol - 1];
        leftMove.style.backgroundColor = 'green';
        let rightMove = row.cells[pieceCol + 1];
        rightMove.style.backgroundColor = 'green';
        }
        //left column piece
        else if(pieceCol == 0){
            let row = board.rows[pieceRow + 1];
            let rightMove = row.cells[pieceCol + 1];
            rightMove.style.backgroundColor = 'green';
        }
        //right column piece
        else if(pieceCol == 7){
            let row = board.rows[pieceRow + 1];
            let leftMove = row.cells[pieceCol - 1];
            leftMove.style.backgroundColor = 'green';
        }
    }
}*/

function possMoves() {
    if (selectedTile) {
        pieceRow = selectedTile.parentNode.rowIndex;
        pieceCol = selectedTile.cellIndex;

        // Calculate Player 1's possible moves (moving "up" the board)
        if (playerOne) {
            if (pieceCol > 0 && pieceRow > 0) { // Can move left-up if not on the left edge
                highlightMove(pieceRow - 1, pieceCol - 1);
            }
            if (pieceCol < 7 && pieceRow > 0) { // Can move right-up if not on the right edge
                highlightMove(pieceRow - 1, pieceCol + 1);
            }
        }
        // Calculate Player 2's possible moves (moving "down" the board)
        else {
            if (pieceCol > 0 && pieceRow < 7) { // Can move left-down if not on the left edge
                highlightMove(pieceRow + 1, pieceCol - 1);
            }
            if (pieceCol < 7 && pieceRow < 7) { // Can move right-down if not on the right edge
                highlightMove(pieceRow + 1, pieceCol + 1);
            }
        }
    }
}

function highlightMove(row, col) {
    let tile = board.rows[row].cells[col];
    if (!tile.querySelector('.playerOnePiece') && !tile.querySelector('.playerTwoPiece')) { //checks if a piece already occupies the tile
        tile.style.backgroundColor = 'green'; // Highlight the tile for a possible move
        tile.classList.add('highlight'); // Add class for easy reset
    }
}


function clearSelection() {
    // Clear the current selection (if any)
    if (selectedTile != null) {
        selectedTile.style.backgroundColor = '#323232'; // Reset the background color
        selectedTile = null; // Clear the reference
    }

    // Clear all green highlighted tiles
    const highlightedTiles = document.querySelectorAll('.highlight');
    highlightedTiles.forEach(tile => {
        tile.style.backgroundColor = '#323232';
        tile.classList.remove('highlight'); // Remove the highlight class
    });
}

function selectPiece(piece) {
    clearSelection(); // Clear any existing selection first

    // Proceed with selecting the new piece
    if ((playerOne && piece.className === 'playerOnePiece') ||
        (!playerOne && piece.className === 'playerTwoPiece')) {
        let tile = piece.parentNode;
        tile.style.backgroundColor = 'yellow'; // Highlight the selected piece
        selectedTile = tile; // Update the selected tile
        possMoves(); // Show possible moves for the new selection
        //makeMove();
    }
}

function BoardColorPicker() {
    let color = document.getElementById('BoardColorPicker').value;
    let whiteSpaces = document.getElementsByClassName('whiteSpace');

    for (let i = 0; i < whiteSpaces.length; i++) {
        whiteSpaces[i].style.backgroundColor = color;
    }
}

function generatePieces() {
    let board = document.getElementById('board');           //lets board variable be equal to the HTML table

    //Player 2 pieces
    for (let i = 0; i < 3; i++) {
        let rowCells = board.rows[i].cells;
        for (let j = 0; j < 8; j++) {
            if (i == 1) {
                if (j % 2 != 0) {
                    rowCells[j].innerHTML = "<div class='playerTwoPiece' onclick='selectPiece(this)'></div>";
                }
            }
            else if (j % 2 == 0) {
                rowCells[j].innerHTML = "<div class='playerTwoPiece' onclick='selectPiece(this)'></div>";
            }
        }
    }

    //Player 1 pieces
    for (let i = 5; i < 8; i++) {
        let x = board.rows[i].cells;
        for (j = 0; j < 8; j++) {
            if (i == 6) {
                if (j % 2 == 0) {
                    x[j].innerHTML = "<div class='playerOnePiece' onclick='selectPiece(this)'></div>";
                }
            }
            else if (j % 2 != 0) {
                x[j].innerHTML = "<div class='playerOnePiece' onclick='selectPiece(this)'></div>";
            }
        }
    }

}

function playerOneColor() {
    let color = document.getElementById('playerOneColor').value;
    let pieces = document.getElementsByClassName('playerOnePiece');
    for (let i = 0; i < pieces.length; i++) {
        pieces[i].style.backgroundColor = color;
    }
}

function playerTwoColor() {
    let color = document.getElementById('playerTwoColor').value;
    let pieces = document.getElementsByClassName('playerTwoPiece');
    for (let i = 0; i < pieces.length; i++) {
        pieces[i].style.backgroundColor = color;
    }
}

function wipeBoard() {                          //when reset is clicked, wipes the board and clears timer
    let board = document.getElementById('board');
    for (let i = 0; i < board.rows.length; i++) {
        let x = board.rows[i].cells;
        for (let j = 0; j < 8; j++) {
            x[j].innerHTML = " ";
        }
    }
    mins = 0;          //resets minutes to 0
    secs = 0;          //resets seconds to 0
    clearSelection();
    console.log("The Game Has Reset.");
    setTimeout(generatePieces, 500);
}

// Timer function
var secs = 0;
var mins = 0;
function displayTimer() {
    secs++;
    mins = Math.floor(secs / 60);
    let x = secs % 60;               //the seconds left before a minute
    document.getElementById("timer").innerHTML = mins + ":" + pad(x);
}


function pad(val) {
    return val > 9 ? val : "0" + val;
}

setInterval(displayTimer, 1000);


