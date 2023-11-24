<?php
session_start();
$_SESSION["username"] = null;

$servername = "localhost";
$username = "Checkers";
$password = "CSCI130Checkers_";
$dbName = "gameData";
$user = null;
$pass = null;

$conn = new mysqli($servername, $username, $password, $dbName);
if ($conn->connect_error) {
    die("Error: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST["username"]) && isset($_POST["password"])) {
        $user = $_POST['username'];
        $pass = $_POST['password'];

        if ($user == ' ' || $pass == ' ') {
            echo "Error: invalid username or password";
        } else {
            $sql = "SELECT * FROM users WHERE username = ?";

            $stmt = $conn->prepare($sql);
            $stmt->bind_param("s", $user);
            $stmt->execute();

            $result = $stmt->get_result();

            $stmt->close();

            if ($result->num_rows > 0) {
                echo "Error: User already exists";
            } else if ($result->num_rows == 0) {
                $insert = "INSERT INTO users (username, password, totalScore, gamesWon, timePlayed, gamesPlayed) VALUES (?, ?, 0, 0, 0, 0 )";

                $insertstmt = $conn->prepare($insert);
                $insertstmt->bind_param("ss", $user, $pass);
                if ($insertstmt->execute()) {
                    $id = $conn->insert_id;
                    $_SESSION["username"] = $user;
                    $_SESSION["user_id"] = $id;
                    header("Location: ./index.php");
                    exit;
                } else {
                    echo "Error: " . $insertstmt->error;
                }
                $insertstmt->close();
            }
        }
    }
}
$conn->close();
?>
