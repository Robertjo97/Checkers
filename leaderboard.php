<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Leaderboard</title>
    <link type="text/css" rel="stylesheet" href="./leaderboard.css">
</head>

<body>
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
    <div style="text-align:center" id="sortContainer">
        <label for="sort">Sort by:</label>
        <select id="sort">
            <option value="default">Default</option>
            <option value="username">Username</option>
            <option value="totalScore">Total Score</option>
            <option value="gamesWon">Games Won</option>
            <option value="gamesPlayed">Games Played</option>
            <option value="timePlayed">Time Played</option>
        </select>
        <button id="sortButton" onclick="sortButton()">Sort</button>
    </div>
    <div id="leaderboard"></div>
    <div id="matchHistory"></div>
    <script src='./leaderboard2.js'></script>
</body>

</html>