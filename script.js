class Game {
    constructor() {
        this.board.drawBoard();
        this.playerOne = new Player('Player 1', 'playerOnePiece');
        this.playerTwo = new Player('Player 2', 'playerTwoPiece');
        this.currentPlayer = this.playerOne;
        this.board = new Board();
        this.timer = new Timer();
        setInterval(this.timer.displayTimer.bind(this.timer), 1000);
    }

    switchPlayer() {
        this.currentPlayer.turn = !this.currentPlayer.turn;
        if (this.currentPlayer === this.playerOne) {
            this.currentPlayer = this.playerTwo;
            document.getElementById('playerIdentifier').innerHTML = "Player 2's turn";
        } else {
            this.currentPlayer = this.playerOne;
            document.getElementById('playerIdentifier').innerHTML = "Player 1's turn";
        }
        this.board.clearHighlightsAndListeners();
        this.board.clearSelection();
    }

    wipeBoard() {              
        let board = document.getElementById('board');
        for (let i = 0; i < board.rows.length; i++) {       //for loop wipes the board
            let x = board.rows[i].cells;
            for (let j = 0; j < 8; j++) {
                x[j].innerHTML = " ";
            }
        }
        this.timer.secs = -1; // Reset the seconds of the timer object
        this.timer.mins = 0; // Reset the minutes of the timer object
        this.currentPlayer = this.playerOne;            // sets the current player back to player one
        this.board.clearHighlightsAndListeners();
        this.board.clearSelection();
        document.getElementById('playerIdentifier').innerHTML = "Player 1's turn";
        console.log("The Game Has Reset.");
        this.board.generatePieces(); // generates the pieces again
    }
}

class Player {
    constructor(name, pieceClass) {
        this.name = name;
        this.pieceClass = pieceClass;
        this.pieces = [];
        this.turn = true;
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
}

class Board {
    constructor() {
        this.selectedTile = null;
        this.pieceRow = 0;
        this.pieceCol = 0;
        this.board = document.getElementById('board'); // Gets the board from HTML
        this.clickedTile = this.clickedTile.bind(this); // Bind the clickedTile function to the current context
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
            game.switchPlayer();
    
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
            if (game.currentPlayer === game.playerOne) {
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
            tile.addEventListener('click', this.clickedTile);  //attaches event to highlighted tiles, then calls clickedTile with that event.
        }
     }

    clickedTile(event) {
        this.makeMove(event.target); //calls makeMove on the event target.
    }

    selectPiece(piece) {
        this.clearSelection();
        if ((game.currentPlayer === game.playerOne && piece.className === 'playerOnePiece') || 
        (game.currentPlayer === game.playerTwo && piece.className === 'playerTwoPiece')) {
            let tile = piece.parentNode;
            tile.style.backgroundColor = 'yellow';
            this.selectedTile = tile;
            this.possMoves();
        }
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

    BoardColorPicker() {
        let color = document.getElementById('BoardColorPicker').value;
        let whiteSpaces = document.getElementsByClassName('whiteSpace');
    
        for (let i = 0; i < whiteSpaces.length; i++) {
            whiteSpaces[i].style.backgroundColor = color;
        }
    }
}

class Timer {
    constructor() {
        this.secs = 0;
        this.mins = 0;
    }

    displayTimer() {
        this.secs++;
        this.mins = Math.floor(this.secs / 60);
        let x = this.secs % 60;               //the seconds left before a minute
        document.getElementById("timer").innerHTML = this.mins + ":" + this.pad(x);
    }
    
    pad(val) {
        return val > 9 ? val : "0" + val;
    }
}

class Piece {
    constructor(player, row, col) {
        this.player = player;
        this.position = { row, col };
    }
}

const game = new Game();



