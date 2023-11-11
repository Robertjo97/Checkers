class Game {
    constructor() {
        this.playerOne = new Player('Player 1', 'playerOnePiece');
        this.playerTwo = new Player('Player 2', 'playerTwoPiece');
        this.currentPlayer = this.playerOne;
        this.board = new Board();                   //the game board
        this.timer = new Timer();                   //the game timer
        setInterval(this.timer.displayTimer.bind(this.timer), 1000);
        //this.board.drawBoard();
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
        //this.board.clearHighlightsAndListeners();
        //this.board.clearSelection();
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
    }

    addPiece(piece) {                   // this adds pieces to the pieces array by pushing
        this.pieces.push(piece);
    }

    removePiece(piece) {                // removes pieces from the array when capture happens
        const index = this.pieces.indexOf(piece);
        if (index !== -1) {
            this.pieces.splice(index, 1);
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
}

class Board {
    constructor() {
        this.selectedTile = null;
        this.selectedPiece = null;
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

    movePiece(selectedTile, targetTile) {
        if (this.selectedTile && targetTile.classList.contains('highlight')) {
            const piece = this.selectedTile.firstChild;
            const player = game.currentPlayer;
            const pieceIndex = player.pieces.findIndex(
                p => p.position.row === this.pieceRow && p.position.col === this.pieceCol
            );

            // Update the position of the piece in the player's pieces array
            if (pieceIndex !== -1) {
                player.pieces[pieceIndex].position.row = targetTile.parentNode.rowIndex;
                player.pieces[pieceIndex].position.col = targetTile.cellIndex;
            }

            // moves selected piece to the new tile
            targetTile.appendChild(piece);

            // switches turns 
            game.switchPlayer();

            // clears the highlights and event listeners
            this.clearHighlightsAndListeners();
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

    selectPiece(piece) {
        if ((game.currentPlayer === game.playerOne && piece.className === 'playerOnePiece') ||      //checking for player 1 or 2 turn
            (game.currentPlayer === game.playerTwo && piece.className === 'playerTwoPiece')) {
            this.clearHighlightsAndListeners();
            let tile = piece.parentNode;
            tile.style.backgroundColor = 'yellow';
            this.selectedTile = tile;
            //this.selectedTile = piece.parentNode;
            this.pieceRow = this.selectedTile.parentNode.rowIndex;
            this.pieceCol = this.selectedTile.cellIndex;

            if (game.currentPlayer === game.playerOne) {            //player 1's possible moves highlighted
                if (this.pieceCol > 0 && this.pieceRow > 0) {
                    this.highlightMove(this.pieceRow - 1, this.pieceCol - 1);  // calls highlightMove 
                }
                if (this.pieceCol < 7 && this.pieceRow > 0) {
                    this.highlightMove(this.pieceRow - 1, this.pieceCol + 1);  // calls highlightMove 
                }
            } else {                                                //player 2's possible moves highlighted
                if (this.pieceCol > 0 && this.pieceRow < 7) {
                    this.highlightMove(this.pieceRow + 1, this.pieceCol - 1);  // calls highlightMove 
                }
                if (this.pieceCol < 7 && this.pieceRow < 7) {
                    this.highlightMove(this.pieceRow + 1, this.pieceCol + 1);  // calls highlightMove
                }
            }
        }
    }

    highlightMove(row, col) {
        let tile = this.board.rows[row].cells[col];  // refers to the instance variable (const game)
            if (!tile.querySelector('.playerOnePiece') && !tile.querySelector('.playerTwoPiece')) {
                tile.style.backgroundColor = 'green';
                tile.classList.add('highlight');
                tile.addEventListener('click', this.clickedTile);  //attaches event to highlighted tiles, then calls clickedTile with that event.
            }
    }

    clickedTile(e) {
        const targetTile = e.target;
        this.movePiece(this.selectedTile, targetTile);
    }

    generatePieces() {
        let board = document.getElementById('board'); // gets the board from the HTML table

        // Player 2 pieces
        for (let i = 0; i < 3; i++) {
            let rowCells = board.rows[i].cells;
            for (let j = 0; j < 8; j++) {
                if (i === 1) {
                    if (j % 2 !== 0){
                    const piece = new Piece(game.playerTwo.name, i, j);
                    game.playerTwo.addPiece(piece);
                    rowCells[j].innerHTML = "<div class='playerTwoPiece' onclick='game.board.selectPiece(this)'></div>";
                    }
                } else if (j % 2 === 0){
                    const piece = new Piece(game.playerTwo.name, i, j);
                    game.playerTwo.addPiece(piece);
                    rowCells[j].innerHTML = "<div class='playerTwoPiece' onclick='game.board.selectPiece(this)'></div>";
                }
            }
        }

        // Player 1 pieces
        for (let i = 5; i < 8; i++) {
            let x = board.rows[i].cells;
            for (let j = 0; j < 8; j++) {
                if (i === 6) {
                    if (j % 2 === 0){
                    const piece = new Piece(game.playerOne.name, i, j);
                    game.playerOne.addPiece(piece);
                    x[j].innerHTML = "<div class='playerOnePiece' onclick='game.board.selectPiece(this)'></div>";
                    }
                } else if (j % 2 !== 0) {
                    const piece = new Piece(game.playerOne.name, i, j);
                    game.playerOne.addPiece(piece);
                    x[j].innerHTML = "<div class='playerOnePiece' onclick='game.board.selectPiece(this)'></div>";
                }
            }
        }
    }

    // drawBoard() {               //makes an 8x8 board
    //     const board = document.createElement('TABLE');
    //     const newBoard = document.getElementById("container")
    //     board.id = 'board';
    //     for (let i = 0; i < 8; i++) {
    //         let tr = document.createElement('TR');
    //         board.appendChild(tr);
    //         for (let j = 0; j < 8; j++){
    //             let td = document.createElement('TD');
    //             if (i % 2 === 0) {
    //                 if (j % 2 !== 0){
    //                     td.className = "whiteSpace";
    //                 }
    //             }
    //             else if (j % 2 === 0){
    //                 td.className = "whiteSpace";
    //             }
    //             tr.appendChild(td);
    //         }
    //     }
    //     newBoard.innerHTML = " ";
    //     newBoard.appendChild(board);
    //     //this.generatePieces();
    // }

    BoardColorPicker() {
        let color = document.getElementById('BoardColorPicker').value;
        let whiteSpaces = document.getElementsByClassName('whiteSpace');
    
        for (let i = 0; i < whiteSpaces.length; i++) {
            whiteSpaces[i].style.backgroundColor = color;
        }
    }
}

class Piece {
    constructor(player, row, col) {             // name of player, the row and column its located in (position)
        this.player = player;
        this.position = { row, col };
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

const game = new Game();