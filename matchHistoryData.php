<?php
session_start(); //start the session

$servername = 'localhost';
$username = 'Checkers';
$password = 'CSCI130Checkers_';
$dbName = 'gameData';

if (isset($_SESSION["user_id"]) && isset($_SESSION['username']) && $_SESSION["user_id"] != null && $_SESSION["username"] != null) { //if the user_id and username session variables are set (a user is logged in)
    $conn = new mysqli($servername, $username, $password, $dbName);
    if ($conn->connect_error) {
        die("Error: " . $conn->connect_error);
    }
    $user_id = $_SESSION["user_id"]; //store the logged in user's id in $user_id
    $user = $_SESSION["username"]; //store the logged in user's username in $user
    $matchHistory = []; //array to hold the match history data
    $stmt = $conn->prepare("SELECT * FROM match_history WHERE user_id = ?"); //sql statement to grab all the match history data for the logged in user
    $stmt->bind_param("i", $user_id); //bind the user_id to the sql statement
    $stmt->execute(); //execute the sql statement
    $result = $stmt->get_result(); //store the result table in $result
    while ($row = $result->fetch_assoc()) { //while there are rows in the result table
        $matchHistory[] = $row; //add the row to the matchHistory array
    }
    if ($_SERVER['REQUEST_METHOD'] == 'POST') { //on incoming post request
        $response = array('name' => $user, 'matchHistory' => $matchHistory); //create an array to hold the username and match history data
        echo json_encode($response); //send the array as a json object to the leaderboard page
    }
    $conn->close();
}
else {
    exit;
}
?>

