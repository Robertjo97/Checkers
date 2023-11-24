<?php
session_start();

$servername = 'localhost';
$username = 'Checkers';
$password = 'CSCI130Checkers_';
$dbName = 'gameData';

if (isset($_SESSION["user_id"]) && isset($_SESSION['username']) && $_SESSION["user_id"] != null && $_SESSION["username"] != null) {
    $conn = new mysqli($servername, $username, $password, $dbName);
    if ($conn->connect_error) {
        die("Error: " . $conn->connect_error);
    }
    $user_id = $_SESSION["user_id"];
    $user = $_SESSION["username"];
    $matchHistory = [];
    $stmt = $conn->prepare("SELECT * FROM match_history WHERE user_id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    while ($row = $result->fetch_assoc()) {
        $matchHistory[] = $row;
    }
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $response = array('name' => $user, 'matchHistory' => $matchHistory);
        echo json_encode($response);
    }
    $conn->close();
}
else {
    exit;
}
?>

