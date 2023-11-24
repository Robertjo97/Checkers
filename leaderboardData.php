<?php
$playerData = file_get_contents('./users.json');

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    echo $playerData;
}
?>