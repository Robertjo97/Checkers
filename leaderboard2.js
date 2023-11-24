let leaderboard = document.getElementById('leaderboard');
let matchHistory = document.getElementById('matchHistory');

function getLeaderboardData(func) {
    let request = new XMLHttpRequest();
    request.open('POST', './leaderboardData2.php');
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            let playerData = JSON.parse(request.responseText);
            func(playerData);
        }
    }
}

function getMatchHistoryData(func) {
    let request = new XMLHttpRequest();
    request.open("POST", './matchHistoryData.php');
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            if (request.responseText) {
                let matchHistoryData = JSON.parse(request.responseText);
                let data = matchHistoryData.matchHistory;
                let name = matchHistoryData.name;
                func(data, name);
            }
        }
    }
}

function buildTable(playerData) {
    let title = document.createElement('h3');
    title.innerHTML = 'Leaderboard';
    leaderboard.appendChild(title);

    let table = document.createElement('table');
    leaderboard.appendChild(table);

    for (let i = -1; i < playerData.length; i++) {
        let tr = document.createElement('tr');
        table.appendChild(tr);
        if (i === -1) {
            tr.innerHTML = '<th>Username</th><th>Total Score</th><th>Games Won</th><th>Games Played</th><th>Time Played</th>';
        }
        else {
            for (let j = 0; j < 5; j++) {
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
                        td.innerHTML = playerData[i].gamesPlayed;
                        tr.appendChild(td);
                        break;

                    case 4:
                        let rawSeconds = playerData[i].timePlayed;
                        let minutes = Math.floor(rawSeconds / 60);
                        let seconds = rawSeconds - minutes * 60;

                        td.innerHTML = minutes + ' minutes ' + seconds + ' seconds';
                        tr.appendChild(td);
                        break;
                }
            }
        }
    }
}

function buildMatchHistory(data, name) {
    let title = document.createElement('h3');
    title.innerHTML = 'Match History';
    matchHistory.appendChild(title);

    let table = document.createElement('table');
    matchHistory.appendChild(table);

    for (let i = data.length; i >= 0; i--) {
        let tr = document.createElement('tr');
        table.appendChild(tr);
        if (i === data.length) {
            tr.innerHTML = '<th>Match</th><th>Winner</th><th>Loser</th><th>Score</th><th>Time</th>';
        }
        else {
            for (let j = 0; j < 5; j++) {
                let td = document.createElement('td');
                switch (j) {
                    case 0:
                        td.innerHTML = data[i].match_number;
                        break;

                    case 1:
                        if (data[i].winner == true) {
                            td.innerHTML = name; //change to signed in player 
                        }
                        else {
                            td.innerHTML = 'Player 2';
                        }
                        break;

                    case 2:
                        if (data[i].winner == false) {
                            td.innerHTML = name; //change
                        }
                        else {
                            td.innerHTML = 'Player 2';
                        }
                        break;
                    case 3:
                        if (data[i].winner == true) {
                            td.innerHTML = data[i].totalScore + ' : ' + data[i].opScore;
                        }
                        else {
                            td.innerHTML = data[i].opScore + ' : ' + data[i].totalScore;
                        }
                        break;
                    case 4:
                        let rawSeconds = data[i].timePlayed;
                        let minutes = Math.floor(rawSeconds / 60);
                        let seconds = rawSeconds - minutes * 60;
                        td.innerHTML = minutes + ' minutes ' + seconds + ' seconds';
                        break;
                }
                tr.appendChild(td);
            }
        }
    }
}

getLeaderboardData(buildTable);
getMatchHistoryData(buildMatchHistory);
