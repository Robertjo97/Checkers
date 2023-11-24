<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Menu For Checkers</title>
    <link type="text/css" rel="stylesheet" href="./game.css">
</head>
<body>
    <header>
        <ol>
            <li><a href="./index.php"><img src="./pics/Fresno_State_Bulldogs_logo.svg.png" id="logo" alt="Fresno state bulldog logo"></a></li>
            <li class="options"><a href="./leaderboard.php">Leaderboard</a></li>
            <li class="options"><a href="./contact.html">Contact</a></li>
            <li class="options"><a href="./help.php">Help</a></li>
            <?php
                session_start();
                if(isset($_SESSION["username"]) && $_SESSION["username"] != null){
                    echo '<li class="options">Welcome, ' . $_SESSION["username"] . '</li>';
                }
                else {
                    echo '<li class="options"><a href="./login.php">Log in/Register</a></li>';
                }
            ?>
            <!--li class="options"><a href="./login.html">Log in/Register</a></li>-->
        </ol>
        <!--bulldog logo to go home, leaderboard, contact, help -->
    </header>
    <div id="menu-container">
        <h1>Select The Game Board Size:</h1>
        <select id="gameBoardSelect">
            <option value="">Select Board Size</option>
            <option value="./game1.php">8x8 Board</option> 
            <option value="./game2.html">10x10 Board</option>
        </select>
    
    </div>
    <br>
    <button type="button" onclick="goToBoard()">Start Game</button>
    <script>
        function goToBoard() {
            var selectedBoard = document.getElementById('gameBoardSelect').value;
            if (selectedBoard) {
                window.location.href = selectedBoard;
            }
        }
    </script>
</body>
</html>