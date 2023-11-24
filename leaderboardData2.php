<?php
session_start();

$servername = 'localhost';
$username = 'Checkers';
$password = 'CSCI130Checkers_';
$dbName = 'gameData';

$conn = new mysqli($servername, $username, $password, $dbName);
if($conn->connect_error){
    die("Error: " . $conn->connect_error);
}

$leaderboard = [];
$leaderboardData = "SELECT * FROM users";
$leaderboardResult = $conn->query($leaderboardData);

while($leaderboardRow = $leaderboardResult->fetch_assoc()){
    $leaderboard[] = $leaderboardRow;
}

if($_SERVER["REQUEST_METHOD"] == 'POST'){
    echo json_encode($leaderboard);
}
?>