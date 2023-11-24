<?php
session_start();
if($_SESSION["user_id"] != null){
$user_id = $_SESSION["user_id"]; //this will only be used for match history
}

$servername = 'localhost';
$username = 'Checkers';
$password = 'CSCI130Checkers_';
$dbName = 'gameData';

$conn = new mysqli($servername, $username, $password, $dbName);
if($conn->connect_error){
    die("Error: " . $conn->connect_error);
}
$size = "SELECT COUNT(*) FROM users";
$result = $conn->query($size);
$row = $result->fetch_row();

if($_SERVER["REQUEST_METHOD"] == 'POST'){
    echo $row[0];
}
?>