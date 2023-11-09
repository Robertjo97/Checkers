<?php
$rawData = file_get_contents('./users.json');
$data = json_decode($rawData);
$size = count($data);
$username = null;
$password = null;
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        if(isset($_POST['username']) && isset($_POST['password'])){
            $username = $_POST['username'];
            $password = $_POST['password'];
            for($i = 0; $i < $size; $i++){
                if($data[$i]->username == $username && $data[$i]->password == $password){
                    header('Location: ./game1.html');
                    exit;
                }
            }
            echo 'fail';
        }
    }
?>