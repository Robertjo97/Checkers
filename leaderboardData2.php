<?php
session_start();

$servername = 'localhost';
$username = 'Checkers';
$password = 'CSCI130Checkers_';
$dbName = 'gameData';

$sort = null;

$conn = new mysqli($servername, $username, $password, $dbName);
if ($conn->connect_error) {
    die("Error: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == 'POST') {
    if (isset($_POST["sort"])) {
        $sort = $_POST["sort"];
        switch ($sort) {
            case "default":
                $stmt = "SELECT * FROM users";
                break;
            case "username":
                $stmt = "SELECT * FROM users ORDER BY username";
                break;
            case "totalScore":
                $stmt = "SELECT * FROM users ORDER BY totalScore DESC";
                break;
            case "gamesWon":
                $stmt = "SELECT * FROM users ORDER BY gamesWon DESC";
                break;
            case "gamesPlayed":
                $stmt = "SELECT * FROM users ORDER BY gamesPlayed DESC";
                break;
            case "timePlayed":
                $stmt = "SELECT * FROM users ORDER BY timePlayed DESC";
                break;
        }

        $leaderboard = [];
        $result = $conn->query($stmt);

        while ($row = $result->fetch_assoc()) {
            $leaderboard[] = $row;
        }

        echo json_encode($leaderboard);
    } else {
        $stmt = "SELECT * FROM users";
        $leaderboard = [];
        $result = $conn->query($stmt);
        while ($row = $result->fetch_assoc()) {
            $leaderboard[] = $row;
        }
        echo json_encode($leaderboard);
    }
}

$conn->close();
