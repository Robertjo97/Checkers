<?php
$rawData = file_get_contents('./users.json');
$data = json_decode($rawData);
$size = count($data);
$username = null;
$totalScore = null;
$timePlayed = null;
$opScore = null;
$numMatches = null;
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    if(isset($_POST['username']) && isset($_POST['totalScore']) && isset($_POST['win']) && isset($_POST['timePlayed']) && isset($_POST['opScore'])){
        $username = $_POST['username'];
        $totalScore = $_POST['totalScore'];
        $timePlayed = intval($_POST['timePlayed']);
        $opScore = $_POST['opScore'];
        
        //{"match":1, "winner":true, "totalScore":12, "opScore":4, "timePlayed": 54}
            for($i = 0; $i < $size; $i++){
                if($data[$i]->username == $username){
                    $numMatches = count($data[$i]->matchHistory);
                    if($_POST['win'] == 'true'){
                        $data[$i]->gamesWon++;
                        $matchHistory = array('match' => ($numMatches + 1), 'winner' => TRUE, 'totalScore' => $totalScore, 'opScore' => $opScore, 'timePlayed' => $timePlayed);
                    }
                    else {
                        $matchHistory = array('match' => ($numMatches + 1), 'winner' => FALSE, 'totalScore' => $totalScore, 'opScore' => $opScore, 'timePlayed' => $timePlayed);
                    }
                    $data[$i]->gamesPlayed++;
                    $data[$i]->totalScore += $totalScore;
                    $data[$i]->timePlayed += $timePlayed;
                    $data[$i]->matchHistory[] = $matchHistory;
                    break;
                }
            }
        file_put_contents('./users.json', json_encode($data));
        exit;
    }
}
?>