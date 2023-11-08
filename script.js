class Board {                   //creates the board and pieces which holds the game logic as well
    constructor() {
        this.playerOne = true; // Holds current player
        this.board = document.getElementById('board'); // Gets the board from HTML
        this.selectedTile = null;
        this.pieceRow = 0;
        this.pieceCol = 0;
        
        // binds methods to the current instance of the game -- will try to get this to work without these later -- J
        this.clearHighlightsAndListeners = this.clearHighlightsAndListeners.bind(this);
        this.makeMove = this.makeMove.bind(this);
        this.possMoves = this.possMoves.bind(this);
        this.clickedTile = this.clickedTile.bind(this);
        this.clearSelection = this.clearSelection.bind(this);
        this.selectPiece = this.selectPiece.bind(this);
        this.BoardColorPicker = this.BoardColorPicker.bind(this);
    }

    clearHighlightsAndListeners() {                         //listens for the event for when player 1 or 2 tries to make a move
        if (this.selectedTile) {
            this.selectedTile.style.backgroundColor = '#323232';
        }
        const highlightedTiles = document.querySelectorAll('.highlight');
        highlightedTiles.forEach(tile => {
            tile.style.backgroundColor = '#323232';
            tile.classList.remove('highlight');             //removes the event listener
            tile.removeEventListener('click', this.clickedTile);
        });
    }

    makeMove(targetTile) {
        if (this.selectedTile && targetTile.classList.contains('highlight')) {
            // Move the piece to the new tile
            targetTile.appendChild(this.selectedTile.firstChild);
    
            // switches turns
            this.playerOne = !this.playerOne;
    
            if (this.playerOne) {
                document.getElementById('playerIdentifier').innerHTML = "Player 1's turn";
            }
            else {
                document.getElementById('playerIdentifier').innerHTML = "Player 2's turn";
            }
    
            // After the move, clear the highlights and event listeners
            this.clearHighlightsAndListeners();
    
            // Further game logic such as capturing a piece or checking for a win can go here
        }
    }

    possMoves() {
        if (this.selectedTile) {
            this.pieceRow = this.selectedTile.parentNode.rowIndex;
            this.pieceCol = this.selectedTile.cellIndex;
    
            // Calculate Player 1's possible moves (moving "up" the board)
            if (this.playerOne) {
                if (this.pieceCol > 0 && this.pieceRow > 0) {
                    this.highlightMove(this.pieceRow - 1, this.pieceCol - 1);  // calls highlightMove 
                }
                if (this.pieceCol < 7 && this.pieceRow > 0) {
                    this.highlightMove(this.pieceRow - 1, this.pieceCol + 1);  // calls highlightMove 
                }
            }
            // Calculate Player 2's possible moves (moving "down" the board)
            else {
                if (this.pieceCol > 0 && this.pieceRow < 7) {
                    this.highlightMove(this.pieceRow + 1, this.pieceCol - 1);  // calls highlightMove 
                }
                if (this.pieceCol < 7 && this.pieceRow < 7) {
                    this.highlightMove(this.pieceRow + 1, this.pieceCol + 1);  // calls highlightMove
                }
            }
        }
    }

    highlightMove(row, col) {                       //highlights in green which space is possible
        let tile = this.board.rows[row].cells[col];  // refers to the instance variable (const game)
        if (!tile.querySelector('.playerOnePiece') && !tile.querySelector('.playerTwoPiece')) {
            tile.style.backgroundColor = 'green';
            tile.classList.add('highlight');
            tile.addEventListener('click', this.clickedTile);  // pass the bound method
        }
    }

    clickedTile(event) {
        this.makeMove(event.target); //calls makeMove on the event target.
    }

    clearSelection() {
        // Clear the current selection (if any)
        if (this.selectedTile != null) {  // refers to the instance variable
            this.selectedTile.style.backgroundColor = '#323232';
            this.selectedTile = null;
        }

        const highlightedTiles = document.querySelectorAll('.highlight');
        highlightedTiles.forEach(tile => {
            tile.style.backgroundColor = '#323232';
            tile.classList.remove('highlight');
        });
    }

    selectPiece(piece) {
        this.clearSelection();
        if ((this.playerOne && piece.className === 'playerOnePiece') || 
        (!this.playerOne && piece.className === 'playerTwoPiece')) {
            let tile = piece.parentNode;
            tile.style.backgroundColor = 'yellow';
            this.selectedTile = tile;
            this.possMoves();           //calls the possible moves function (possMoves())
        }
    }

    BoardColorPicker() {
        let color = document.getElementById('BoardColorPicker').value;
        let whiteSpaces = document.getElementsByClassName('whiteSpace');
    
        for (let i = 0; i < whiteSpaces.length; i++) {
            whiteSpaces[i].style.backgroundColor = color;
        }
    }

    generatePieces() {
        let board = document.getElementById('board'); // gets the board from the HTML table

        // Player 2 pieces
        for (let i = 0; i < 3; i++) {
            let rowCells = board.rows[i].cells;
            for (let j = 0; j < 8; j++) {
                if (i === 1) {
                    if (j % 2 !== 0) {
                        rowCells[j].innerHTML = "<div class='playerTwoPiece' onclick='game.board.selectPiece(this)'></div>";
                    }
                } else if (j % 2 === 0) {
                    rowCells[j].innerHTML = "<div class='playerTwoPiece' onclick='game.board.selectPiece(this)'></div>";
                }
            }
        }

        // Player 1 pieces
        for (let i = 5; i < 8; i++) {
            let x = board.rows[i].cells;
            for (let j = 0; j < 8; j++) {
                if (i === 6) {
                    if (j % 2 === 0) {
                        x[j].innerHTML = "<div class='playerOnePiece' onclick='game.board.selectPiece(this)'></div>";
                    }
                } else if (j % 2 !== 0) {
                    x[j].innerHTML = "<div class='playerOnePiece' onclick='game.board.selectPiece(this)'></div>";
                }
            }
        }
    }

    playerOneColor() {          // handles the color switching for player 1
        let color = document.getElementById('playerOneColor').value;
        let pieces = document.getElementsByClassName('playerOnePiece');
        for (let i = 0; i < pieces.length; i++) {
            pieces[i].style.backgroundColor = color;
        }
    }

    playerTwoColor() {          // handles the color switching for player 2
        let color = document.getElementById('playerTwoColor').value;
        let pieces = document.getElementsByClassName('playerTwoPiece');
        for (let i = 0; i < pieces.length; i++) {
            pieces[i].style.backgroundColor = color;
        }
    }

    wipeBoard() {               //resets the game by wiping board and resetting pieces
        let board = document.getElementById('board');
        for (let i = 0; i < board.rows.length; i++) {
            let x = board.rows[i].cells;
            for (let j = 0; j < 8; j++) {
                x[j].innerHTML = " ";
            }
        }
        secs = -1;              // resets the global variables for the timer
        mins = 0;
        this.clearSelection();
        console.log("The Game Has Reset.");
        setTimeout(this.generatePieces.bind(this), 500); // generates the pieces again
    }

}
//End of Board class

class Game {                            //creates a new game instance. 
    constructor () {
        this.board = new Board ();
    }
}

const game = new Game();

// Timer functionality
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


