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
$stmt = "SELECT * FROM users";
$result = $conn->query($stmt);

while($row = $result->fetch_assoc()){
    $leaderboard[] = $row;
}

if($_SERVER["REQUEST_METHOD"] == 'POST'){
    echo json_encode($leaderboard);
}
$conn->close();
?>