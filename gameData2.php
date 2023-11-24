<?php
session_start();

$servername = 'localhost';
$username = 'Checkers';
$password = 'CSCI130Checkers_';
$dbName = 'gameData';

$user = $_SESSION["username"];
$numMatches = null; //going to need to query for this

$totalScore = null;
$timePlayed = null;
$opScore = null;
$win = null;

$conn = new mysqli($servername, $username, $password, $dbName);
if ($conn->connect_error) {
    die('Error: ' . $conn->connect_error);
}

$sql = "SELECT * FROM users WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $user);
$stmt->execute();

$result = $stmt->get_result();
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $numMatches = $row['COUNT(*)'];
} else {
    $numMatches = 0;
}

if ($_SERVER["REQUEST_METHOD"] == 'POST') {
    if (isset($_POST["totalScore"]) && isset($_POST["timePlayed"]) && isset($_POST["opScore"]) && isset(["$win"])) {
        $totalScore = $_POST['totalScore'];
        $timePlayed = $_POST['timePlayed'];
        $opScore = $_POST['opScore'];
        echo 'Request Received. Currently signed in user: ' . $user . ' ' . $totalScore . " " . $timePlayed . " " . $opScore . " " . '$numMatches goes here' . " " . $win;
    }
}
