let leaderboard = document.getElementById('leaderboard');
let table = document.createElement('table');
leaderboard.appendChild(table);

function getPlayerData(func) {
    let request = new XMLHttpRequest();
    request.open('POST', './leaderboard.php');
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            let playerData = JSON.parse(request.responseText);
            func(playerData);
        }
    }
}

function buildTable(playerData) {
    for (let i = -1; i < playerData.length; i++) {
        let tr = document.createElement('tr');
        table.appendChild(tr);
        if (i === -1) {
            tr.innerHTML = '<th>Username</th><th>Total Score</th><th>Games Won</th><th>Time Played</th><th>Games Played</th>';
        }
        else {
            for (let j = 0; j < 6; j++) {
                let td = document.createElement('td');
                switch (j) {
                    case 0:
                        td.innerHTML = playerData[i].username;
                        tr.appendChild(td);
                        break;

                    case 1:
                        td.innerHTML = playerData[i].totalScore + ' captures';
                        tr.appendChild(td);
                        break;

                    case 2:
                        td.innerHTML = playerData[i].gamesWon;
                        tr.appendChild(td);
                        break;

                    case 3:
                        let rawSeconds = playerData[i].timePlayed;
                        let minutes = Math.floor(rawSeconds / 60);
                        let seconds = rawSeconds - minutes * 60;

                        td.innerHTML = minutes + ' minutes ' + seconds + ' seconds';
                        tr.appendChild(td);
                        break;

                    case 4:
                        td.innerHTML = playerData[i].gamesPlayed;
                        tr.appendChild(td);
                        break;
                }
            }
        }
    }
}

function buildMatchHistory(playerData){

}

getPlayerData(buildTable);
