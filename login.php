<?php
session_start();
$_SESSION['username'] = null;

$servername = 'localhost';
$username = 'Checkers';
$password = 'CSCI130Checkers_';
$dbName = 'gameData';

$user = null;
$pass = null;

$conn = new mysqli($servername, $username, $password, $dbName);

if($conn->connect_error){
    die("Error: " . $conn->error);
}

if($_SERVER["REQUEST_METHOD"] == "POST"){
    if(isset($_POST["username"]) && isset($_POST["password"])){
        $user = $_POST["username"];
        $pass = $_POST["password"];

        $sql = "SELECT user_id, username, password FROM users WHERE username = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $user);
        $stmt->execute();

        $result = $stmt->get_result();
        
        if($result->num_rows > 0){
            $row = $result->fetch_assoc();
            if($pass == $row["password"]){
                $_SESSION["username"] = $row["username"];
                $_SESSION["user_id"] = $row["user_id"];
                header("Location: ./menu.php");
                exit;
            }
            else {
                echo "Invalid credentials";
            }
        }
        else {
            echo "Invalid credentials";
        }
        $stmt->close();
    }
}
$conn->close();
?>