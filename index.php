<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home Page</title>
    <link href="./styleHome.css" type="text/css" rel="stylesheet">
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
    <h1 style="text-align:center; font-weight: bold; color:white; background-color:#b1102b; padding:20px;">Welcome to Checkers</h1>
    <ul class="indexList">
        <li><img src="./pics/bulldoggif.gif" id="bulldog1" alt="bulldog gif"></li>
        <li style="width: 25%; margin:0; font-size:28px; text-align:center">
            <section style="font-weight: bold; color:#13284c";>Project for Fresno State CSCI-130<br><br>Written by Julian Prater and Robert Orlando</section>
        </li>
        <li><img src="./pics/bulldoggif.gif" id="bulldog2" alt="bulldog gif"></li>
    </ul>
    <div style="text-align:center;margin-top:150px;"><img style="height:300px; width:auto;"src='./pics/background3.png' id="background" alt="checkerboard image"></div>

</body>

</html>