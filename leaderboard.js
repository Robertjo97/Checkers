let leaderboard = document.getElementById('leaderboard');
let playerData = null;
function getPlayerData(){
    let request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState == 4 && request.status == 200){
            playerData = JSON.parse(request.responseText);
            for(let i = 0; i < playerData.length; i++){
                let username = document.createElement('p');
                username.className = 'username';
                username.innerHTML = playerData[i].username;
                leaderboard.appendChild(username);

                let totalScore = document.createElement('p');
                totalScore.className = 'totalScore';
                totalScore.innerHTML = playerData[i].totalScore;
                leaderboard.appendChild(totalScore);

                let gamesWon = document.createElement('p');
                gamesWon.className = 'gamesWon';
                gamesWon.innerHTML = playerData[i].gamesWon;
                leaderboard.appendChild(gamesWon);

                let timePlayed = document.createElement('p');
                timePlayed.className = 'timePLayed';
                timePlayed.innerHTML = playerData[i].timePlayed;
                leaderboard.appendChild(timePlayed);
                
                let gamesPlayed = document.createElement('p');
                gamesPlayed.className = 'gamesWon';
                gamesPlayed.innerHTML = playerData[i].gamesPlayed;
                leaderboard.appendChild(gamesPlayed);

                let matchHistory = document.createElement('p');
                matchHistory.className = 'matchHistory';
                matchHistory.innerHTML = 'TBD';
               // matchHistory.innerHTML = playerData[i].matchHistory[i].game1;
                leaderboard.appendChild(matchHistory);
            }
        }
    }
    request.open('POST', './leaderboard.php');
    request.send();
}
getPlayerData();
