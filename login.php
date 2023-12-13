<?php
session_start(); //start the session
$_SESSION['username'] = null; //create a session variable for the username
$_SESSION['user_id'] = null; //create a session variable for the user_id

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

if($_SERVER["REQUEST_METHOD"] == "POST"){ //on incoming post request
    if(isset($_POST["username"]) && isset($_POST["password"])){ //if the username and password are set
        $user = $_POST["username"]; //store the username in $user
        $pass = sha1($_POST["password"]); //store the password in $pass and hashes it

        $sql = "SELECT user_id, username, password FROM users WHERE username = ?"; //sql statement to grab the user_id, username, and password from the users table where the username matches the entered username
        $stmt = $conn->prepare($sql); //prepare the sql statement
        $stmt->bind_param("s", $user); //bind the username to the sql statement
        $stmt->execute(); //execute the sql statement

        $result = $stmt->get_result(); //store the result table in $result
        
        if($result->num_rows > 0){ //if there is a row in the result table (there exists a user in the database with the entered username)
            $row = $result->fetch_assoc(); //store the row in $row
            if($pass == $row["password"]){ //if the entered password matches the password in the row (the correct password for the entered username)
                $_SESSION["username"] = $row["username"]; //set the session variable for the username to the username in the row
                $_SESSION["user_id"] = $row["user_id"]; //set the session variable for the user_id to the user_id in the row
                header("Location: ./index.php"); //redirect to index.php
                exit; //exit the script
            }
            else { //if the entered password does not match the password in the row
                echo "Invalid credentials"; //print "Invalid credentials"
            }
        }
        else { //if there is no row in the result table (there is no user in the database with the entered username)
            echo "Invalid credentials"; //print "Invalid credentials"
        }
        $stmt->close();
    }
}
$conn->close();
?>