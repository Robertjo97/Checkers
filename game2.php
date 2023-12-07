<!DOCTYPE html>
<html lang="en">

<head>
    <!-- 10x10 Game Board-->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checkers 10x10</title>
    <link type="text/css" rel="stylesheet" href="./game.css">
</head>

<body onload="game.board.generatePieces()">
    <header id="header">
        <ol>
            <li><a href="./index.php"><img src="./pics/Fresno_State_Bulldogs_logo.svg.png" id="logo" alt="Fresno state bulldog logo"></a></li>
            <?php
            session_start();
            if (isset($_SESSION["username"]) && $_SESSION["username"] != null) {
                echo '<li class="options"><a href="./menu.php">Game</a></li>';
            }
            ?>
            <li class="options"><a href="./leaderboard.php">Leaderboard</a></li>
            <li class="options"><a href="./contact.php">Contact</a></li>
            <li class="options"><a href="./help.php">Help</a></li>
            <?php
            if (isset($_SESSION["username"]) && $_SESSION["username"] != null) {
                echo '<li class="options"><a href="./logout.php">Log out</a></li>';
            } else {
                echo '<li class="options"><a href="./login.html">Log in/Register</a></li>';
            }
            ?>
        </ol>
        <!--bulldog logo to go home, leaderboard, contact, help -->
    </header>
    <h1>CHECKERS</h1>
    <section id="option" style="display:inline">
        <h2>Select Game Mode:</h2>
        <select id="gameBoardSelect">
            <option value=true>Single Player</option>
            <option value=false>Two Player</option>
        </select><br>
        <button onclick="setCPU()">Start Game</button>
    </section>
    <section style="display:none" id="gameBoard">
        <div id="playerIdentifier">Player 1's Turn</div>
        <div id="container">
            <div>
                <p>Number of pieces left for Player 1: </p>
                <p id="P1Pieces"></p>
            </div>
            <table id="board">
                <tr>
                    <td></td>
                    <td class="whiteSpace"></td>
                    <td></td>
                    <td class="whiteSpace"></td>
                    <td></td>
                    <td class="whiteSpace"></td>
                    <td></td>
                    <td class="whiteSpace"></td>
                    <td></td>
                    <td class="whiteSpace"></td>
                </tr>
                <tr>
                    <td class="whiteSpace"></td>
                    <td></td>
                    <td class="whiteSpace"></td>
                    <td></td>
                    <td class="whiteSpace"></td>
                    <td></td>
                    <td class="whiteSpace"></td>
                    <td></td>
                    <td class="whiteSpace"></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td class="whiteSpace"></td>
                    <td></td>
                    <td class="whiteSpace"></td>
                    <td></td>
                    <td class="whiteSpace"></td>
                    <td></td>
                    <td class="whiteSpace"></td>
                    <td></td>
                    <td class="whiteSpace"></td>
                </tr>
                <tr>
                    <td class="whiteSpace"></td>
                    <td></td>
                    <td class="whiteSpace"></td>
                    <td></td>
                    <td class="whiteSpace"></td>
                    <td></td>
                    <td class="whiteSpace"></td>
                    <td></td>
                    <td class="whiteSpace"></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td class="whiteSpace"></td>
                    <td></td>
                    <td class="whiteSpace"></td>
                    <td></td>
                    <td class="whiteSpace"></td>
                    <td></td>
                    <td class="whiteSpace"></td>
                    <td></td>
                    <td class="whiteSpace"></td>
                </tr>
                <tr>
                    <td class="whiteSpace"></td>
                    <td></td>
                    <td class="whiteSpace"></td>
                    <td></td>
                    <td class="whiteSpace"></td>
                    <td></td>
                    <td class="whiteSpace"></td>
                    <td></td>
                    <td class="whiteSpace"></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td class="whiteSpace"></td>
                    <td></td>
                    <td class="whiteSpace"></td>
                    <td></td>
                    <td class="whiteSpace"></td>
                    <td></td>
                    <td class="whiteSpace"></td>
                    <td></td>
                    <td class="whiteSpace"></td>
                </tr>
                <tr>
                    <td class="whiteSpace"></td>
                    <td></td>
                    <td class="whiteSpace"></td>
                    <td></td>
                    <td class="whiteSpace"></td>
                    <td></td>
                    <td class="whiteSpace"></td>
                    <td></td>
                    <td class="whiteSpace"></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td class="whiteSpace"></td>
                    <td></td>
                    <td class="whiteSpace"></td>
                    <td></td>
                    <td class="whiteSpace"></td>
                    <td></td>
                    <td class="whiteSpace"></td>
                    <td></td>
                    <td class="whiteSpace"></td>
                </tr>
                <tr>
                    <td class="whiteSpace"></td>
                    <td></td>
                    <td class="whiteSpace"></td>
                    <td></td>
                    <td class="whiteSpace"></td>
                    <td></td>
                    <td class="whiteSpace"></td>
                    <td></td>
                    <td class="whiteSpace"></td>
                    <td></td>
            </table>
            <div>
                <p>Number of pieces left for Player 2: </p>
                <p id="P2Pieces"></p>
            </div>
        </div>
        <p id="timer"></p>

        <div id="buttons-container">
            <input id="BoardColorPicker" type="color">
            <button type="button" onclick="game.board.BoardColorPicker()">Change Board Color</button>
            <br><br>
            <input id="playerOneColor" type="color">
            <button type="button" onclick="game.playerOne.playerOneColor()">Change Player 1 Color</button>
            <br><br>
            <input id="playerTwoColor" type="color">
            <button type="button" onclick="game.playerTwo.playerTwoColor()">Change Player 2 Color</button>
            <br><br>
            <button onclick="game.resetGame()">Reset Game</button>
        </div>

    </section>
    <audio id="myaudio" controls style="display:none">
      <source src="sounds/placing.mp3" type="audio/mp3">
    </audio>
    <script src="./script2.js"></script>
</body>

</html>