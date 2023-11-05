let playerOne = true;
let playerOnePieces = document.getElementsByClassName('playerOnePiece');
let board = document.getElementById('board');

function possMoves(){
    pieceRow = 0;
    pieceCol = 0;
    for(let i = 0; i < 8; i++){
        let rowCells = board.rows[i].cells;
        for(let j = 0; j < 8; j++){
             if(rowCells[j].style.backgroundColor == 'yellow'){
                 pieceRow = i;
                 pieceCol = j;
                 break;
             }
        }
    }
    console.log(pieceRow + ',' + pieceCol);
}
function selectPiece(piece){
    let tile = piece.parentNode;
    tile.style.backgroundColor = 'yellow';
    possMoves();
    //for(let i = 0; i < )
}

function BoardColorPicker() {
    let color = document.getElementById('BoardColorPicker').value;
    let whiteSpaces = document.getElementsByClassName('whiteSpace');

    for (let i = 0; i < whiteSpaces.length; i++) {
        whiteSpaces[i].style.backgroundColor = color;
    }
}

function generatePieces(){
    let board = document.getElementById('board');           //lets board variable be equal to the HTML table

    //Player 2 pieces
    for (let i = 0; i < 3; i++) {
        let rowCells = board.rows[i].cells;
        for(let j = 0; j < 8; j++){
            if(i == 1){
                if(j % 2 != 0){
                    rowCells[j].innerHTML = "<div class='playerTwoPiece'></div>";
                }
            }
            else if(j % 2 == 0){
                rowCells[j].innerHTML = "<div class='playerTwoPiece'></div>";
            }
        }
    } 

    //Player 1 pieces
    for (let i = 5; i < 8; i++) {
        let x = board.rows[i].cells;
        for (j = 0; j < 8; j++) {
            if(i == 6){
                if(j % 2 == 0){
                    x[j].innerHTML = "<div class='playerOnePiece' onclick='selectPiece(this)'></div>";
                }
            }
            else if(j % 2 != 0){
                x[j].innerHTML = "<div class='playerOnePiece' onclick='selectPiece(this)'></div>";
            }
        }
    }
}

function playerOneColor(){
    let color = document.getElementById('playerOneColor').value;
    let pieces = document.getElementsByClassName('playerOnePiece');
    for(let i = 0; i < pieces.length; i++){
        pieces[i].style.backgroundColor = color;
    }
}

function playerTwoColor(){
    let color = document.getElementById('playerTwoColor').value;
    let pieces = document.getElementsByClassName('playerTwoPiece');
    for(let i = 0; i < pieces.length; i++){
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


