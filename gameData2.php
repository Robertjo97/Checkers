<?php //this script grabs game data after a match and stores it in appropriate tables in the database
session_start();

$servername = 'localhost';
$username = 'Checkers';
$password = 'CSCI130Checkers_';
$dbName = 'gameData';

$user_id = $_SESSION["user_id"]; //this variable holds the logged in user, ensuring the new data is going to the correct user

$totalScore = null;
$matchScore = null;
$gamesWon = null;
$gamesPlayed = null;
$timePlayed = null;
$matchTime = null;
$opScore = null;
$winner = null;

$conn = new mysqli($servername, $username, $password, $dbName);
if ($conn->connect_error) {
    die('Error: ' . $conn->connect_error);
}

if($_SERVER['REQUEST_METHOD'] == 'POST'){ //on incoming post request
    if(isset($_POST['totalScore']) && isset($_POST['timePlayed']) && isset($_POST['opScore']) && isset($_POST['win'])){ //ensure all required data is being sent over
        $totalScore = $_POST['totalScore']; //totalScore will be for the total lifetime score of the user
        $matchScore = $totalScore; //matchScore will be the logged in user's score for the match
        $timePlayed = $_POST['timePlayed']; //timePlayed will be for the life-time played for the user
        $matchTime = $timePlayed; //matchTime will be for the time of the match
        $opScore = $_POST['opScore']; //opponents score in the match played
        $winner = ($_POST['win'] == 'true') ? 1 : 0; //winner is a boolean value, 1 for win, 0 for loss based on 'true' or 'false' being sent over from the game

        $getUser = $conn->prepare('SELECT totalScore, gamesWon, gamesPlayed, timePlayed FROM users where user_id = ?'); //sql statement to grab the current user's row in the users table
        $getUser->bind_param("i", $user_id); //bind the user_id to the above sql statement
        $getUser->execute(); //execute the sql statement
        $result = $getUser->get_result(); //result stores the result table of the query
        $row = $result->fetch_assoc(); //row stores the result row from the query (the proper user row)

        $totalScore += $row['totalScore']; //add the current match's score to the user's lifetime score
        $gamesWon = $row['gamesWon'] + ($winner ? 1 : 0); //add a win to the user's lifetime wins if they won the match
        $gamesPlayed = $row['gamesPlayed'] + 1; //add a game to the user's lifetime games played
        $timePlayed += $row['timePlayed']; //add the current match's time to the user's lifetime time played

        $updateUser = $conn->prepare("UPDATE users SET totalScore = ?, gamesWon = ?, gamesPlayed = ?, timePlayed = ? WHERE user_id = ?"); //sql statement to update the user's data in the users table
        $updateUser->bind_param("iiiii", $totalScore, $gamesWon, $gamesPlayed, $timePlayed, $user_id); //bind all the updated values to the sql statement
        $updateUser->execute(); //execute the sql statement

        $updateMatch = $conn->prepare("INSERT INTO match_history (user_id, match_number, winner, totalScore, opScore, timePlayed) VALUES (?, ?, ?, ?, ?, ?)"); //sql statement to insert the match data into the match_history table
        $updateMatch->bind_param("iiiiii", $user_id, $gamesPlayed, $winner, $matchScore, $opScore, $matchTime); //bind all the match data to the sql statement
        $updateMatch->execute(); //execute the sql statement
    }
}
$conn->close();
?>
