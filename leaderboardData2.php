<?php
session_start();

$servername = 'localhost';
$username = 'Checkers';
$password = 'CSCI130Checkers_';
$dbName = 'gameData';

$leaderboard = [];

$conn = new mysqli($servername, $username, $password, $dbName);
if($conn->connect_error){
    die("Error: " . $conn->connect_error);
}
$size = "SELECT COUNT(*) FROM users";
$sizeResult = $conn->query($size);
$sizeRow = $sizeResult->fetch_row();

$playerData = "SELECT * FROM users";
$leaderboardResult = $conn->query($playerData);

while($leaderboardRow = $leaderboardResult->fetch_assoc()){
    $leaderboard[] = $leaderboardRow;
}

if($_SERVER["REQUEST_METHOD"] == 'POST'){
    echo json_encode($leaderboard);
}
?>