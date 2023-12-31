<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="./styleHome.css" type="text/css" rel="stylesheet">
    <title>Checkers Rules</title>
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
    <div id='container'>
    <h1 style="background-color:#b1102b; color:white; padding:5px;">Rules of Checkers</h1>
    <p>Checkers is a two-player strategy board game. Here are the basic rules:</p>
    <ol>
        <li>The game is played on an 8x8 or 10x10 board.</li>
        <li>Each player starts with 12 pieces (20 pieces for 10x10 board), either red or black, placed on the dark squares of the three rows closest to them.</li>
        <li>Players take turns moving one of their pieces diagonally forward to an adjacent unoccupied dark square.</li>
        <li>If an opponent's piece is adjacent and there is an empty square immediately beyond it, you must jump over the opponent's piece and capture it. The captured piece is removed from the board.</li>
        <li>If a piece reaches the opponent's back row, it becomes a "king," and kings can move both forward and backward diagonally.</li>
        <li>The game continues until one player captures all of the opponent's pieces or blocks them from making a legal move.</li>
    </ol>
    <p>Additional rules and variations may apply in different versions of the game.</p>
    <p>Enjoy playing checkers!</p>
    </div>
</body>
</html>