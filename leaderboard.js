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
            tr.innerHTML = '<th>Username</th><th>Total Score</th><th>Games Won</th><th>Time Played</th><th>Games Played</th><th>Match History</th>';
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
                        td.innerHTML = playerData[i].totalScore;
                        tr.appendChild(td);
                        break;

                    case 2:
                        td.innerHTML = playerData[i].gamesWon;
                        tr.appendChild(td);
                        break;

                    case 3:
                        td.innerHTML = playerData[i].timePlayed;
                        tr.appendChild(td);
                        break;

                    case 4:
                        td.innerHTML = playerData[i].gamesPlayed;
                        tr.appendChild(td);
                        break;

                    case 5:
                        td.innerHTML = '<a href="./leaderboard.html">' + playerData[i].username + "'s Match History</a> ";
                        tr.appendChild(td);
                        break;
                }
            }
        }
    }
}

getPlayerData(buildTable);
