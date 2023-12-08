<?php //this script creates the database
$servername = 'localhost';
$username = 'Checkers';
$password = 'CSCI130Checkers_';
$dbName = 'gameData';

$conn = new mysqli($servername, $username, $password);

if($conn->connect_error){
    die('Error: ' . $conn->connect_error);
}
else {
    $sql = "CREATE DATABASE " . $dbName;
    if($conn->query($sql) === TRUE){    //query the above statement, if it works, signify that the database was created
        echo "Database created successfully";
    }
    else {
        echo "Error creating database";
    }
}

$conn->close();
?>