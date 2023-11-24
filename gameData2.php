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

if ($_SERVER["REQUEST_METHOD"] == 'POST') {
    if (isset($_POST["totalScore"]) && isset($_POST["timePlayed"]) && isset($_POST["opScore"]) && isset(["$win"])) {
        $totalScore = $_POST['totalScore'];
        $timePlayed = $_POST['timePlayed'];
        $opScore = $_POST['opScore'];
    }

    echo 'Request Received. Currently signed in user: ' . $user . ' ' . $totalScore . " " . $timePlayed . " " . $opScore . " " . '$numMatches goes here' . " " . $win;
}
