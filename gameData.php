<?php
$rawData = file_get_contents('./users.json');
$data = json_decode($rawData);
$size = count($data);
$username = null;
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    if(isset($_POST['username'])){
        $username = $_POST['username'];
        for($i = 0; $i < $size; $i++){
            if($data[$i]->username == $username){
                $data[$i]->gamesWon++;
                $data[$i]->gamesPlayed++;
                $data[$i]->totalScore += 12;
                break;
            }
        }
        file_put_contents('./users.json', json_encode($data));
        exit;
    }
}
?>