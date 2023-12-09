<?php //this script creates the tables
$servername = 'localhost';
$username = 'Checkers';
$password = 'CSCI130Checkers_';
$dbName = 'gameData';

$conn = new mysqli($servername, $username, $password, $dbName);

if ($conn->connect_error) {
    die("Error: " . $conn->connect_error);
}

//sql1 creates a "users" table to hold each individual user's stats
$sql1 = "CREATE TABLE IF NOT EXISTS users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        totalScore INT,
        gamesWon INT,
        timePlayed INT,
        gamesPlayed INT
        );";
//sql2 creates a "match_history" table to hold the each individual's match stats. They are linked by the user_id
$sql2 = "CREATE TABLE IF NOT EXISTS match_history (
    match_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    match_number INT,
    winner BOOLEAN,
    totalScore INT,
    opScore INT,
    timePlayed INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);";

if($conn->query($sql1) === TRUE && $conn->query(($sql2)) === TRUE){
    echo "Success";
}
else {
    echo 'fail';
}

$conn->close();
?>