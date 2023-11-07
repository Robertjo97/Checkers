let playerOne = true; //Holds current player
let board = document.getElementById('board'); //global board

function makeMove(){
    //TODO

    if(playerOne){
        !playerOne;
    }
    else if(!playerOne){
        playerOne;
    }
}

function possMoves() {
    pieceRow = 0;
    pieceCol = 0;
    for (let i = 0; i < 8; i++) {
        let rowCells = board.rows[i].cells;
        for (let j = 0; j < 8; j++) {
            if (rowCells[j].style.backgroundColor == 'yellow') {
                pieceRow = i;
                pieceCol = j;
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
}
function selectPiece(piece) {
     if(playerOne && piece.className == 'playerOnePiece'){
        let tile = piece.parentNode;
        tile.style.backgroundColor = 'yellow';
        possMoves();
     }
     else if(!playerOne && piece.className == 'playerTwoPiece'){
        let tile = piece.parentNode;
        tile.style.backgroundColor = 'yellow';
        possMoves();
     }
     else {
        return;
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


