<?php
session_start();

$servername = 'localhost';
$username = 'Checkers';
$password = 'CSCI130Checkers_';
$dbName = 'gameData';

$user_id = $_SESSION["user_id"];

//$numMatches = null; //going to need to query for this
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

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    if(isset($_POST['totalScore']) && isset($_POST['timePlayed']) && isset($_POST['opScore']) && isset($_POST['win'])){
        $totalScore = $_POST['totalScore'];
        $matchScore = $totalScore;
        $timePlayed = $_POST['timePlayed'];
        $matchTime = $timePlayed;
        $opScore = $_POST['opScore'];
        $winner = ($_POST['win'] == 'true') ? 1 : 0;

        $getUser = $conn->prepare('SELECT totalScore, gamesWon, gamesPlayed, timePlayed FROM users where user_id = ?');
        $getUser->bind_param("i", $user_id);
        $getUser->execute();
        $result = $getUser->get_result();
        $row = $result->fetch_assoc();

        $totalScore += $row['totalScore'];
        $gamesWon = $row['gamesWon'] + ($winner ? 1 : 0);
        $gamesPlayed = $row['gamesPlayed'] + 1;
        $timePlayed += $row['timePlayed'];

        $updateUser = $conn->prepare("UPDATE users SET totalScore = ?, gamesWon = ?, gamesPlayed = ?, timePlayed = ? WHERE user_id = ?");
        $updateUser->bind_param("iiiii", $totalScore, $gamesWon, $gamesPlayed, $timePlayed, $user_id);
        $updateUser->execute();

        $updateMatch = $conn->prepare("INSERT INTO match_history (user_id, match_number, winner, totalScore, opScore, timePlayed) VALUES (?, ?, ?, ?, ?, ?)");
        $updateMatch->bind_param("iiiiii", $user_id, $gamesPlayed, $winner, $matchScore, $opScore, $matchTime);
        $updateMatch->execute();
    }
}
$conn->close();
?>
