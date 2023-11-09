<?php
$rawData = file_get_contents('./users.json');
$data = json_decode($rawData);
$username = null;
$password = null;
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    if(isset($_POST['username']) && isset($_POST['password'])){
        $username = $_POST['username'];
        $password = $_POST['password'];
        if($username == "" || $password == ""){
            echo 'Error: Invalid username or password';
            exit;
        }
        for($i = 0; $i < count($data); $i++){
            if($data[$i]->username == $username){
                echo 'Error: user already exists';
                exit;
            }
        }
        $user = array("username" => $username, 'password' => $password, 'totalScore' => 0, 'gamesWon' => 0, 'timePlayed' => 0, 'gamesPlayed' => 0, 'matchHistory' => []);
        $data[] = $user;
        file_put_contents('./users.json', json_encode($data));
        header('Location: ./game1.html');
        exit;
    }
}
?>