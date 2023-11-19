class Game {                //10 x 10 board
    constructor() {
        this.playerOne = new Player('Player 1', 'playerOnePiece');      //player 1
        this.playerTwo = new Player('Player 2', 'playerTwoPiece');      //player 2
        this.currentPlayer = this.playerOne;                            //default player 1 goes first
        this.board = new Board();                                       //the game board
        this.timer = new Timer();                                       //the game timer
        setInterval(this.timer.displayTimer.bind(this.timer), 1000);
    }

    switchPlayer() {                                //switches player back and forth
        if (this.currentPlayer === this.playerOne) {
            this.currentPlayer = this.playerTwo;
            document.getElementById('playerIdentifier').innerHTML = "Player 2's Turn";
            setTimeout(() => this.cpuMove(), 500);      //makes it look like cpu is thinking for half a second
        } else {
            this.currentPlayer = this.playerOne;
            document.getElementById('playerIdentifier').innerHTML = "Player 1's Turn";
        }
    }

    cpuMove() {
        let possibleMoves = this.board.getAllPossibleMoves(this.playerTwo);
        let bestMove = this.chooseBestCapture(possibleMoves);
        if (bestMove) {
            this.board.executeMove(bestMove);
        } else {
            bestMove = possibleMoves.length > 0 ? possibleMoves[0] : null;
            if (bestMove) {
                this.board.executeMove(bestMove);       //executes move for the CPU
            }
        }
        this.checkWin();                                //scans pieces array to see if a player has won
    }

    chooseBestCapture(possibleMoves) {
        //filters to see which piece can capture
        let captureMoves = possibleMoves.filter(move => move.captured);
        if (captureMoves.length > 0) {
            // returns the first possible capture
            return captureMoves[0];
        }

        // if no capture moves, returns null
        return null;
    }

    checkWin() {
        if(this.playerOne.pieces.length === 0) {                //checks if player 1 has any pieces left 
            alert("Player 2 wins! Player 1 has no more pieces left.");
            console.log("Player 2 wins! Player 1 has no more pieces left.");
        } else if (this.playerTwo.pieces.length === 0) {        //checks if player 2 has any pieces left
            alert("Player 1 wins! Player 2 has no more pieces left.");
            console.log("Player 1 wins! Player 2 has no more pieces left.");
        }
        // else {
        //     console.log("Player " + (this.currentPlayer === this.playerOne ? "2" : "1") + " wins! The opponent cannot make any moves.");
        // }
    }

    winningPlayer() {
        if(this.playerOne.pieces.length < this.playerTwo.pieces.length) {
            console.log("Currently Winning: Player Two");
        }
        else if (this.playerOne.pieces.length > this.playerTwo.pieces.length) {
            console.log("Currently Winning: Player One");
        }
    }

    resetGame() {
        this.board.clearHighlightsAndListeners();           //clear any event listeners and highlighted tiles
        this.board.clearSelection();                        //clears any selected tiles from a player
        this.timer.secs = -1;                                //resets the seconds of the timer
        this.timer.mins = 0;                                 //resets the minutes of the timer
        document.getElementById('playerIdentifier').innerHTML = "Player 1's Turn";

        // wipes the board
        let board = document.getElementById('board');
        for (let i = 0; i < board.rows.length; i++) {
            let x = board.rows[i].cells;
            for (let j = 0; j < 10; j++) {
                x[j].innerHTML = "";
            }
        }

        // reset players and generate pieces
        this.playerOne = new Player('Player 1', 'playerOnePiece');
        this.playerTwo = new Player('Player 2', 'playerTwoPiece');
        this.playerOne.resetPiecesArr();                        //resets the number of pieces for player 1 in their array
        this.playerTwo.resetPiecesArr();                        //resets the number of pieces for player 2 in their array
        this.currentPlayer = this.playerOne;                    //sets the first move back to player 1
        console.log("The Game Has Reset");
        this.board.generatePieces();
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

    resetPiecesArr() {                  // resets the pieces array back to empty
        this.pieces = [];
    }

    displayNumOfPieces() {              //displays the number of pieces the player has left
        if (this.name === "Player 1"){  //player one pieces
            document.getElementById("P1Pieces").innerHTML = this.pieces.length;
        }
        else if (this.name === "Player 2") {    //player 2 pieces
            document.getElementById("P2Pieces").innerHTML = this.pieces.length;
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

    /* CPU RELATED FUNCTIONS START HERE */
    executeMove(move) {
        const pieceToMove = game.currentPlayer.pieces[move.pieceIndex];
        const targetTile = this.getTileAt(move.to);
    
        // moving piece to target tile
        const pieceElement = this.getPieceElementAt(move.from);
        targetTile.appendChild(pieceElement);
    
        //update position
        pieceToMove.position.row = move.to.row;
        pieceToMove.position.col = move.to.col;
    
        // removes a piece if it captures one
        if (move.captured) {
            this.removePieceAt(move.captured); 
        }
    
        // Check if the piece should be kinged
        this.checkForKing(pieceToMove);
    
        // switch players and display number of pieces
        game.playerTwo.displayNumOfPieces();
        game.playerOne.displayNumOfPieces();
        game.switchPlayer();
    }

    
    getTileAt(position) {                       // returns specific tile position
        return this.board.rows[position.row].cells[position.col];
    }
    
    // returns specific piece location
    getPieceElementAt(position) {               // returns specific piece location
        return this.board.rows[position.row].cells[position.col].firstChild;
    }
    
    // removes piece if CPU makes a capture
    removePieceAt(position) {
        const opponent = game.currentPlayer === game.playerOne ? game.playerTwo : game.playerOne;
        const capturedPieceElement = this.getPieceElementAt(position);
    
        if (capturedPieceElement) {
            // removing the piece from player 1's pieces array
            const capturedPieceIndex = opponent.pieces.findIndex(p => 
                p.position.row === position.row && p.position.col === position.col);
            if (capturedPieceIndex !== -1) {
                opponent.pieces.splice(capturedPieceIndex, 1);
            }
            // removes the piece visually from the board
            this.board.rows[position.row].cells[position.col].removeChild(capturedPieceElement);
        }
    }
    
    
    checkForKing(piece) {                   //checks for if a piece made it to the end of the board and kings it
        if ((piece.player === 'Player 1' && piece.position.row === 0) || 
            (piece.player === 'Player 2' && piece.position.row === 7)) {
            piece.kingPiece();
            const pieceElement = this.getPieceElementAt(piece.position);
            pieceElement.classList.add(piece.player === 'Player 1' ? 'playerOnePieceKing' : 'playerTwoPieceKing');
        }
    }

    getAllPossibleMoves(player) {
        let allMoves = [];
        
        player.pieces.forEach(piece => {
            // iterates all possible moves
            let moves = this.getLegalMovesForPiece(piece, player);
            allMoves.push(...moves);
        });
    
        return allMoves;
    }

    getLegalMovesForPiece(piece, player) {
        let legalMoves = [];
        let directions = player === game.playerOne ? [[-1, -1], [-1, 1]] : [[1, -1], [1, 1]]; // normal set of direction for moves
        let pieceIndex = player.pieces.indexOf(piece); // F=finds current index of current piece
    
        // checks kings movement (in all four diagonal directions)
        if (piece.isKing) {
            directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
        }
    
        // checking for normal moves first
        directions.forEach(direction => {
            let [dx, dy] = direction;
            let newRow = piece.position.row + dx;
            let newCol = piece.position.col + dy;
    
            // if it is within bounds of the 10x10 board
            if (newRow >= 0 && newRow < 10 && newCol >= 0 && newCol < 10) {
                let potentialMove = this.board.rows[newRow].cells[newCol];
                // checks if move is even legal
                if (this.isTileEmpty(potentialMove)) {
                    legalMoves.push({           //prepares to send an object back to help for execution of pieces by CPU
                        pieceIndex: pieceIndex, // current piece index
                        from: piece.position,   //current position
                        to: { row: newRow, col: newCol },
                        captured: null          //if capture is possible later or not
                    });
                }
                // check for captures
                else if (this.isOpponentPiece(potentialMove, player)) {
                    let jumpRow = newRow + dx;
                    let jumpCol = newCol + dy;
                    if (jumpRow >= 0 && jumpRow < 10 && jumpCol >= 0 && jumpCol < 10) {
                        let potentialJump = this.board.rows[jumpRow].cells[jumpCol];
                        if (this.isTileEmpty(potentialJump)) {
                            legalMoves.push({
                                pieceIndex: pieceIndex, 
                                from: piece.position,
                                to: { row: jumpRow, col: jumpCol },
                                captured: { row: newRow, col: newCol }
                            });
                        }
                    }
                }
            }
        });
    
        return legalMoves;
    }
    
    // seeing if a tile is empty
    isTileEmpty(tile) {
        return !tile.hasChildNodes();
    }
    
    
    isOpponentPiece(tile, player) {                 //checks if it is player 1's piece or itself
        if (!tile.hasChildNodes()) {
            return false;
        }
        let piece = tile.firstChild;
        if (player === game.playerOne) {
            return piece.classList.contains('playerTwoPiece') || piece.classList.contains('playerTwoPieceKing');
        } else {
            return piece.classList.contains('playerOnePiece') || piece.classList.contains('playerOnePieceKing');
        }
    }
    /* CPU RELATED FUNCTIONS END HERE */

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
            const pieceIndex = player.pieces.findIndex(                 // finds the index in the array of the selected piece
                p => p.position.row === this.pieceRow && p.position.col === this.pieceCol
            );
    
            // calculates the position of the jumped-over piece
            const jumpedRow = (this.pieceRow + targetTile.parentNode.rowIndex) / 2;
            const jumpedCol = (this.pieceCol + targetTile.cellIndex) / 2;
    
            // check if there is an opponent piece at the position of the jumped-over piece
            const opponent = game.currentPlayer === game.playerOne ? game.playerTwo : game.playerOne;
            const opponentPiece = opponent.pieces.find(
                p => p.position.row === jumpedRow && p.position.col === jumpedCol
            );
    
            // if there is an opponent piece on the jumped-over position, capture it
            if (opponentPiece) {
                opponent.removePiece(opponentPiece);
    
                // remove captured piece from the board
                const capturedPieceCell = this.board.rows[opponentPiece.position.row].cells[opponentPiece.position.col];
                capturedPieceCell.innerHTML = ''; // clear that piece from html table
            }

            // checks if a piece made it to end of board and kings it
            if ((game.currentPlayer === game.playerOne && targetTile.parentNode.rowIndex === 0) ||
                (game.currentPlayer === game.playerTwo && targetTile.parentNode.rowIndex === 9)) {
    
                if (pieceIndex !== -1) {
                    player.pieces[pieceIndex].kingPiece();
                    // visual logic here
                    const pieceElement = selectedTile.firstChild;
                    pieceElement.classList.remove('playerOnePiece', 'playerTwoPiece');
                    pieceElement.classList.add(game.currentPlayer === game.playerOne ? 'playerOnePieceKing' : 'playerTwoPieceKing');
                }
            } 
    
            // update the position of the piece in the player's pieces array
            if (pieceIndex !== -1) {
                player.pieces[pieceIndex].position.row = targetTile.parentNode.rowIndex;
                player.pieces[pieceIndex].position.col = targetTile.cellIndex;
            }
    
            // appends the piece to the new tile
            targetTile.appendChild(piece);
    
            // checks for win, current player winning, number of pieces left and switches turns 
            player.displayNumOfPieces();
            opponent.displayNumOfPieces();
            game.switchPlayer();
            game.winningPlayer();
            game.checkWin();
    
            // clear the highlights and event listeners
            this.clearHighlightsAndListeners();
        }
    }

    clearSelection() {
        // clears the current selection (if any)
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
            (game.currentPlayer === game.playerTwo && piece.className === 'playerTwoPiece') ||
            (game.currentPlayer === game.playerOne && piece.className === 'playerOnePieceKing') ||
            (game.currentPlayer === game.playerTwo && piece.className === 'playerTwoPieceKing')) {
            this.clearHighlightsAndListeners();
            let tile = piece.parentNode;
            tile.style.backgroundColor = 'yellow';
            this.selectedTile = tile;
            this.pieceRow = this.selectedTile.parentNode.rowIndex;
            this.pieceCol = this.selectedTile.cellIndex;

            let pieceIndex = game.currentPlayer.pieces.findIndex(                 // finds the index in the array of the selected piece
            p => p.position.row === this.pieceRow && p.position.col === this.pieceCol
        );
            
            if (!game.currentPlayer.pieces[pieceIndex].isKing) {        //checks if the piece is a king piece
                if (game.currentPlayer === game.playerOne) {            //player 1's possible moves highlighted
                    if (this.pieceCol > 0 && this.pieceRow > 0) {       //up the baord
                        this.highlightMove(this.pieceRow - 1, this.pieceCol - 1);  // calls highlightMove 
                    }
                    if (this.pieceCol < 9 && this.pieceRow > 0) {
                        this.highlightMove(this.pieceRow - 1, this.pieceCol + 1);  // calls highlightMove 
                    }
                } else {                                                //player 2's possible moves highlighted
                    if (this.pieceCol > 0 && this.pieceRow < 9) {       //down the board
                        this.highlightMove(this.pieceRow + 1, this.pieceCol - 1);  // calls highlightMove 
                    }
                    if (this.pieceCol < 9 && this.pieceRow < 9) {
                        this.highlightMove(this.pieceRow + 1, this.pieceCol + 1);  // calls highlightMove
                    }
                }
            }
            else {                                                      //calculates player's king possible moves
                if (game.currentPlayer === game.playerOne) {
                    if (this.pieceCol > 0 && this.pieceRow > 0){
                        this.highlightKingMove(this.pieceRow - 1, this.pieceCol - 1);   //up left highlight
                    }
                    if (this.pieceCol < 9 && this.pieceRow > 0) {
                        this.highlightKingMove(this.pieceRow - 1, this.pieceCol + 1);   //up right highlight
                    }
                    if (this.pieceCol > 0 && this.pieceRow < 9) {
                        this.highlightKingMove(this.pieceRow + 1, this.pieceCol - 1);   //down left highlight
                    }
                    if (this.pieceCol < 9 && this.pieceRow < 9) {
                        this.highlightKingMove(this.pieceRow + 1, this.pieceCol + 1);   //down right highlight
                    }
                } else {                                                //calculates player 2's king possible moves
                    if (this.pieceCol > 0 && this.pieceRow > 0){
                        this.highlightKingMove(this.pieceRow - 1, this.pieceCol - 1);   //up left highlight
                    }
                    if (this.pieceCol < 9 && this.pieceRow > 0) {
                        this.highlightKingMove(this.pieceRow - 1, this.pieceCol + 1);   //up right highlight
                    }
                    if (this.pieceCol > 0 && this.pieceRow < 9) {
                        this.highlightKingMove(this.pieceRow + 1, this.pieceCol - 1);   //down left highlight
                    }
                    if (this.pieceCol < 9 && this.pieceRow < 9) {
                        this.highlightKingMove(this.pieceRow + 1, this.pieceCol + 1);   //down right highlight
                    }
                }
            }
        }
    }

    //highlights moves for king pieces
    highlightKingMove(row, col) {
        let tile = this.board.rows[row].cells[col];  // refers to the instance variable (const game)
            if (!tile.querySelector('.playerOnePiece') && !tile.querySelector('.playerTwoPiece') &&
                !tile.querySelector('.playerOnePieceKing') && !tile.querySelector('.playerTwoPieceKing')) {     //if the tiles are empty, highlight green
                tile.style.backgroundColor = 'green';
                tile.classList.add('highlight');
                tile.addEventListener('click', this.clickedTile);  //attaches event to highlighted tiles, then calls clickedTile with that event.
            } else if (tile.querySelector('.playerOnePiece') || tile.querySelector('.playerTwoPiece') ||
                       tile.querySelector('.playerOnePieceKing') || tile.querySelector('.playerTwoPieceKing')) {
                const opponentPiece = tile.querySelector('.playerOnePiece') || tile.querySelector('.playerTwoPiece') ||
                                      tile.querySelector('.playerOnePieceKing') || tile.querySelector('.playerTwoPieceKing');
                const opponent = game.currentPlayer === game.playerOne ? game.playerTwo : game.playerOne;
                // checks if the target tile contains an opponent piece and is capturable
                if (opponentPiece && this.isCapturableTile(row, col)) {
                    const captureTargetRow = row + (row - this.pieceRow);
                    const captureTargetCol = col + (col - this.pieceCol);
        
                    // check if the capture target tile is within the range and is empty
                    if (captureTargetRow >= 0 && captureTargetRow < 10 && captureTargetCol >= 0 && captureTargetCol < 10) {
                        const captureTargetTile = this.board.rows[captureTargetRow].cells[captureTargetCol];
        
                        if (!captureTargetTile.querySelector('.playerOnePiece') && !captureTargetTile.querySelector('.playerTwoPiece') &&
                            !captureTargetTile.querySelector('.playerOnePieceKing') && !captureTargetTile.querySelector('.playerTwoPieceKing')) {
                            captureTargetTile.style.backgroundColor = 'green';
                            captureTargetTile.classList.add('highlight');
                            captureTargetTile.addEventListener('click', this.clickedTile);
                        }
                    }
                }
            }
    }

    //highlights moves for normal pieces
    highlightMove(row, col) {                       
        let tile = this.board.rows[row].cells[col];  // refers to the instance variable (const game)
            if (!tile.querySelector('.playerOnePiece') && !tile.querySelector('.playerTwoPiece') &&       //if the tiles are empty, highlight green
                !tile.querySelector('.playerOnePieceKing') && !tile.querySelector('.playerTwoPieceKing')) {  
                tile.style.backgroundColor = 'green';
                tile.classList.add('highlight');
                tile.addEventListener('click', this.clickedTile);  //attaches event to highlighted tiles, then calls clickedTile with that event.
            } else if (tile.querySelector('.playerOnePiece') || tile.querySelector('.playerTwoPiece') ||
                       tile.querySelector('.playerOnePieceKing') || tile.querySelector('.playerTwoPieceKing')) {
                const opponentPiece = tile.querySelector('.playerOnePiece') || tile.querySelector('.playerTwoPiece') ||
                           tile.querySelector('.playerOnePieceKing') || tile.querySelector('.playerTwoPieceKing');
                const opponent = game.currentPlayer === game.playerOne ? game.playerTwo : game.playerOne;
                // checks if the target tile contains an opponent piece and is capturable
                if (opponentPiece && this.isCapturableTile(row, col)) {
                    const captureTargetRow = row + (row - this.pieceRow);
                    const captureTargetCol = col + (col - this.pieceCol);
        
                    // check if the capture target tile is within the range and is empty
                    if (captureTargetRow >= 0 && captureTargetRow < 10 && captureTargetCol >= 0 && captureTargetCol < 10) {
                        const captureTargetTile = this.board.rows[captureTargetRow].cells[captureTargetCol];
        
                        if (!captureTargetTile.querySelector('.playerOnePiece') && !captureTargetTile.querySelector('.playerTwoPiece') &&
                            !captureTargetTile.querySelector('.playerOnePieceKing') && !captureTargetTile.querySelector('.playerTwoPieceKing')) {
                            captureTargetTile.style.backgroundColor = 'green';
                            captureTargetTile.classList.add('highlight');
                            captureTargetTile.addEventListener('click', this.clickedTile);
                        }
                    }
                }
            }
    }

    isCapturableTile(row, col) {                    // sees if a title is capturable
        const opponent = game.currentPlayer === game.playerOne ? game.playerTwo : game.playerOne;
    
        // check if there is an opponent piece on the target tile and finds its index
        const opponentPieceIndex = opponent.pieces.findIndex(
            p => p.position.row === row && p.position.col === col
        );
    
        //if the opponent piece on the target tile is capturable
        return opponentPieceIndex !== -1;
    }

    clickedTile(e) {                                //listens for when the player clicks a green tile and proceeds to move the piece
        const targetTile = e.target;
        this.movePiece(this.selectedTile, targetTile);
    }

    generatePieces() {
        let board = document.getElementById('board'); // gets the board from the HTML table

        // Player 2 pieces
        for (let i = 0; i < 4; i++) {
            let rowCells = board.rows[i].cells;
            for (let j = 0; j < 10; j++) {
                if (i % 2 !== 0) {
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
        game.playerTwo.displayNumOfPieces();

        // Player 1 pieces
        for (let i = 6; i < 10; i++) {
            let x = board.rows[i].cells;
            for (let j = 0; j < 10; j++) {
                if (i % 2 === 0) {
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
        game.playerOne.displayNumOfPieces();
    }

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
        this.position = { row, col };           //holds position of each players piece on the board
        this.isKing = false;                    //all piece objects are set to false
    }

    kingPiece() {                               //kings the selected piece
        this.isKing = true;
    }
}

class Timer {
    constructor() {
        this.secs = 0;                          //seconds
        this.mins = 0;                          //minutes
    }

    displayTimer() {
        this.secs++;
        this.mins = Math.floor(this.secs / 60);
        let x = this.secs % 60;               //the seconds left before a minute
        document.getElementById("timer").innerHTML = this.mins + ":" + this.pad(x);
    }
    
    pad(val) {
        return val > 9 ? val : "0" + val;       //ternary statement if value is greater than 9, returns just val
    }
}

const game = new Game();                        // makes a game instance