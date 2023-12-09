<?php //this script sends the leaderboard data from the database to the leaderboard page
session_start(); //start the session

$servername = 'localhost';
$username = 'Checkers';
$password = 'CSCI130Checkers_';
$dbName = 'gameData';

$sort = null;

$conn = new mysqli($servername, $username, $password, $dbName);
if ($conn->connect_error) {
    die("Error: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == 'POST') { //on incoming post request
    if (isset($_POST["sort"])) { //if the sort variable is set
        $sort = $_POST["sort"]; //set the sort variable to the value that was sent over
        switch ($sort) { //switch statement on $sort to determine which sql statement to use
            case "default": //no sort
                $stmt = "SELECT * FROM users";
                break;
            case "username": //sort by username
                $stmt = "SELECT * FROM users ORDER BY username";
                break;
            case "totalScore": //sort by totalScore
                $stmt = "SELECT * FROM users ORDER BY totalScore DESC";
                break;
            case "gamesWon": //sort by gamesWon
                $stmt = "SELECT * FROM users ORDER BY gamesWon DESC";
                break;
            case "gamesPlayed": //sort by gamesPlayed
                $stmt = "SELECT * FROM users ORDER BY gamesPlayed DESC";
                break;
            case "timePlayed": //sort by timePlayed
                $stmt = "SELECT * FROM users ORDER BY timePlayed DESC";
                break;
        }

        $leaderboard = []; //array to hold the leaderboard data
        $result = $conn->query($stmt); //query the sql statement that resulted from the switch statement and store the result table in $result

        while ($row = $result->fetch_assoc()) { //while there are rows in the result table
            $leaderboard[] = $row; //add the row to the leaderboard array
        }

        echo json_encode($leaderboard); //send the leaderboard array as a json object to the leaderboard page
    } else { //if the sort variable is not set (first time loading the page)
        $stmt = "SELECT * FROM users"; //sql statement to grab all the users
        $leaderboard = []; //array to hold the leaderboard data
        $result = $conn->query($stmt); //query the sql statement and store the result table in $result
        while ($row = $result->fetch_assoc()) { //while there are rows in the result table
            $leaderboard[] = $row; //add the row to the leaderboard array
        }
        echo json_encode($leaderboard); //send the leaderboard array as a json object to the leaderboard page
    }
}

$conn->close();
