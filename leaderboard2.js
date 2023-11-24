let leaderboard = document.getElementById('leaderboard');
let matchHistory = document.getElementById('matchHistory');

function getPlayerData(func) {
    let request = new XMLHttpRequest();
    request.open('POST', './leaderboardData2.php');
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            let playerData = request.responseText;
            func(playerData);
        }
    }
}

function buildTable(playerData) {
    let title = document.createElement('h3');
    title.innerHTML= 'Leaderboard';
    leaderboard.appendChild(title);

    let table = document.createElement('table');
    leaderboard.appendChild(table);
    
    for (let i = -1; i < playerData; i++) {
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
                        td.innerHTML = 'username';
                        tr.appendChild(td);
                        break;

                    case 1:
                        td.innerHTML = 'totalScore' + ' captures';
                        tr.appendChild(td);
                        break;

                    case 2:
                        td.innerHTML = 'gamesWon';
                        tr.appendChild(td);
                        break;

                    case 3:
                        td.innerHTML = 'gamesPlayed';
                        tr.appendChild(td);
                        break;

                    case 4:
                        // let rawSeconds = playerData[i].timePlayed;
                        // let minutes = Math.floor(rawSeconds / 60);
                        // let seconds = rawSeconds - minutes * 60;

                        // td.innerHTML = minutes + ' minutes ' + seconds + ' seconds';
                        td.innerHTML = 'timePlayed';
                        tr.appendChild(td);
                        break;
                }
            }
        }
    }
}

// function buildMatchHistory(playerData) {
//     let title = document.createElement('h3');
//     title.innerHTML = 'Match History';
//     matchHistory.appendChild(title);

//     let table = document.createElement('table');
//     matchHistory.appendChild(table);

//     for (let i = playerData[0].matchHistory.length; i >= 0; i--) { //playerData should actually be signed in user
//         let tr = document.createElement('tr');
//         table.appendChild(tr);
//         if (i === playerData[0].matchHistory.length) {
//             tr.innerHTML = '<th>Match</th><th>Winner</th><th>Loser</th><th>Score</th><th>Time</th>';
//         }
//         else {
//             for (let j = 0; j < 5; j++) {
//                 let td = document.createElement('td');
//                 switch (j) {
//                     case 0:
//                         td.innerHTML = 'Match ' + playerData[0].matchHistory[i].match;
//                         break;

//                     case 1:
//                         if (playerData[0].matchHistory[i].winner == true) {
//                             td.innerHTML = 'Rob'; //change to signed in player 
//                         }
//                         else {
//                             td.innerHTML = 'Player 2';
//                         }
//                         break;

//                     case 2:
//                         if (playerData[0].matchHistory[i].winner == false) {
//                             td.innerHTML = 'Rob'; //change
//                         }
//                         else {
//                             td.innerHTML = 'Player 2';
//                         }
//                         break;
//                     case 3:
//                         if (playerData[0].matchHistory[i].winner == true) {
//                             td.innerHTML = playerData[0].matchHistory[i].totalScore + ' : ' + playerData[0].matchHistory[i].opScore;
//                         }
//                         else {
//                             td.innerHTML = playerData[0].matchHistory[i].opScore + ' : ' + playerData[0].matchHistory[i].totalScore;
//                         }
//                         break;
//                     case 4:
//                         let rawSeconds = playerData[0].matchHistory[i].timePlayed;
//                         let minutes = Math.floor(rawSeconds / 60);
//                         let seconds = rawSeconds - minutes * 60;
//                         td.innerHTML = minutes + ' minutes ' + seconds + ' seconds';
//                         break;
//                 }
//                 tr.appendChild(td);
//             }
//         }
//     }
// }

getPlayerData(buildTable);
// getPlayerData(buildMatchHistory);
