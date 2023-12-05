<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Menu For Checkers</title>
    <link type="text/css" rel="stylesheet" href="./styleHome.css">
</head>
<body>
<header id="header">
        <ol>
            <li><a href="./index.php"><img src="./pics/Fresno_State_Bulldogs_logo.svg.png" id="logo" alt="Fresno state bulldog logo"></a></li>
            <?php 
                session_start();
                if(isset($_SESSION["username"]) && $_SESSION["username"] != null){
                    echo '<li class="options"><a href="./menu.php">Game</a></li>';
                }
            ?>
            <li class="options"><a href="./leaderboard.php">Leaderboard</a></li>
            <li class="options"><a href="./contact.php">Contact</a></li>
            <li class="options"><a href="./help.php">Help</a></li>
            <?php
                if(isset($_SESSION["username"]) && $_SESSION["username"] != null){
                    echo '<li class="options"><a href="./logout.php">Log out</a></li>';
                }
                else {
                    echo '<li class="options"><a href="./login.html">Log in/Register</a></li>';
                }
            ?>
        </ol>
        <!--bulldog logo to go home, leaderboard, contact, help -->
    </header>
    <div style="text-align:center" id="container">
        <h1>Select The Game Board Size:</h1>
        <select id="gameBoardSelect">
            <option value="">Select Board Size</option>
            <option value="./game1.php">8x8 Board</option> 
            <option value="./game2.php">10x10 Board</option>
        </select>
    <br>
    <br>
    <button type="button" onclick="goToBoard()">Start Game</button>
    </div>
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