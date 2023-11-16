<?php
$rawData = file_get_contents('./users.json');
$data = json_decode($rawData);
$size = count($data);
$username = null;
$totalScore = null;
$timePlayed = null;
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    if(isset($_POST['username']) && isset($_POST['totalScore']) && isset($_POST['win']) && isset($_POST['timePlayed'])){
        $username = $_POST['username'];
        $totalScore = $_POST['totalScore'];
        $timePlayed = intval($_POST['timePlayed']);
            for($i = 0; $i < $size; $i++){
                if($data[$i]->username == $username){
                    if($_POST['win'] == 'true'){
                        $data[$i]->gamesWon++;
                    }
                    $data[$i]->gamesPlayed++;
                    $data[$i]->totalScore += $totalScore;
                    $data[$i]->timePlayed += $timePlayed;
                    break;
                }
            }
        file_put_contents('./users.json', json_encode($data));
        exit;
    }
}
?>