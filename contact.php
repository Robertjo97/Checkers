<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link type="text/css" rel="stylesheet" href="./styleHome.css">
    <title>Checkers Rules</title>
</head>
<body>
<header id="header">
        <ol>
            <li><a href="./index.php"><img src="./pics/Fresno_State_Bulldogs_logo.svg.png" id="logo" alt="Fresno state bulldog logo"></a></li>
            <li class="options"><a href="./leaderboard.php">Leaderboard</a></li>
            <li class="options"><a href="./contact.php">Contact</a></li>
            <li class="options"><a href="./help.php">Help</a></li>
            <?php
                session_start();
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
    <h1>Contact</h1>
</body>
</html>