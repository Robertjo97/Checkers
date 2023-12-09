<?php
session_start(); //start the session
$_SESSION["username"] = null; //create a session variable for the username
$_SESSION["user_id"] = null; //create a session variable for the user_id

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

if ($_SERVER['REQUEST_METHOD'] == 'POST') { //on incoming post request
    if (isset($_POST["username"]) && isset($_POST["password"])) { //if the username and password are set
        $user = $_POST['username']; //store the username in $user
        $pass = $_POST['password']; //store the password in $pass

        if ($user == ' ' || $pass == ' ') { //if the username or password is empty
            echo "Error: invalid username or password"; //print an error
        } else { 
            $sql = "SELECT * FROM users WHERE username = ?"; //check if theres already a user with that username

            $stmt = $conn->prepare($sql); //prepare the sql statement
            $stmt->bind_param("s", $user); //bind the username to the sql statement
            $stmt->execute(); //execute the sql statement

            $result = $stmt->get_result(); //store the result table in $result

            $stmt->close();

            if ($result->num_rows > 0) { //if there is a row in the result table (there exists a user in the database with the entered username)
                echo "Error: User already exists"; //print an error
            } else if ($result->num_rows == 0) { //if there is no row in the result table (there is no user in the database with the entered username)
                $insert = "INSERT INTO users (username, password, totalScore, gamesWon, timePlayed, gamesPlayed) VALUES (?, ?, 0, 0, 0, 0 )"; //insert the new user into the database

                $insertstmt = $conn->prepare($insert); //prepare the sql statement
                $insertstmt->bind_param("ss", $user, $pass); //bind the username and password to the sql statement
                if ($insertstmt->execute()) { //execute the sql statement
                    $id = $conn->insert_id; //get the user_id of the new user
                    $_SESSION["username"] = $user; //set the session variable for the username to the username of the new user
                    $_SESSION["user_id"] = $id; //set the session variable for the user_id to the user_id of the new user
                    header("Location: ./index.php"); //redirect to index.php
                    exit; //exit the script
                } else { //if the sql statement fails to execute
                    echo "Error: " . $insertstmt->error; //print an error
                }
                $insertstmt->close();
            }
        }
    }
}
$conn->close();
?>
