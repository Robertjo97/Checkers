let leaderboard = document.getElementById('leaderboard'); //grab the leaderboard div
let matchHistory = document.getElementById('matchHistory'); //grab the match history div

function getLeaderboardData(func) { //function to perform AJAX requests to get leaderboard data
    let request = new XMLHttpRequest();
    request.open('POST', './leaderboardData2.php'); //requests data from leaderboardData2.php
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            let playerData = JSON.parse(request.responseText); //parse JSON data and store in playerData
            func(playerData); //supply playerData to callback function
        }
    }
}

function getMatchHistoryData(func) { //same as above but for match history
    let request = new XMLHttpRequest();
    request.open("POST", './matchHistoryData.php'); //requests data from matchHistoryData.php
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            if (request.responseText) { //this check is because the matchHistoryData script only returns data if there is a user logged in.
                let matchHistoryData = JSON.parse(request.responseText); //parse JSON data and store in matchHistoryData
                let data = matchHistoryData.matchHistory; //matchHistoryData.matchHistory is the array of match history data
                let name = matchHistoryData.name; //matchHistoryData.name is the username of the logged in user
                func(data, name); //supply data and name to callback function
            }
        }
    }
}

function buildTable(playerData) { //function to build the leaderboard table
    let title = document.createElement('h3'); //create and append title
    title.innerHTML = 'Leaderboard';
    leaderboard.appendChild(title);

    let table = document.createElement('table'); //create and append table
    leaderboard.appendChild(table);

    for (let i = -1; i < playerData.length; i++) { //loop through playerData and build the table rows. Start at -1 to build the header row
        let tr = document.createElement('tr');
        table.appendChild(tr);
        if (i === -1) { //if i is -1, build the header row
            tr.innerHTML = '<th>Username</th><th>Total Score</th><th>Games Won</th><th>Games Played</th><th>Time Played</th>';
        }
        else { //otherwise build the data rows
            for (let j = 0; j < 5; j++) { //create the columns
                let td = document.createElement('td');
                switch (j) {
                    case 0: //first column is username
                        td.innerHTML = playerData[i].username;
                        tr.appendChild(td);
                        break;

                    case 1: //second column is total score
                        td.innerHTML = playerData[i].totalScore + ' captures';
                        tr.appendChild(td);
                        break;

                    case 2: //third column is games won
                        td.innerHTML = playerData[i].gamesWon;
                        tr.appendChild(td);
                        break;

                    case 3: //fourth column is games played
                        td.innerHTML = playerData[i].gamesPlayed;
                        tr.appendChild(td);
                        break;

                    case 4: //last column is time played
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

function buildMatchHistory(data, name) { //function to build the match history table
    let title = document.createElement('h3'); //create and append title
    title.innerHTML = 'Match History';
    matchHistory.appendChild(title);

    let table = document.createElement('table'); //create and append table
    matchHistory.appendChild(table);

    for (let i = data.length; i >= 0; i--) { //loop through data and build the table rows. Start at data.length to build the header row, and decrement as the recent matches should be at the top
        let tr = document.createElement('tr');
        table.appendChild(tr);
        if (i === data.length) { //if i is data.length, build the header row
            tr.innerHTML = '<th>Match</th><th>Winner</th><th>Loser</th><th>Score</th><th>Time</th>';
        }
        else { //otherwise build the data rows
            for (let j = 0; j < 5; j++) { //create the columns
                let td = document.createElement('td');
                switch (j) {
                    case 0: //first column is match number
                        td.innerHTML = data[i].match_number;
                        break;

                    case 1: //second column is winner
                        if (data[i].winner == true) {
                            td.innerHTML = name; 
                        }
                        else {
                            td.innerHTML = 'Player 2';
                        }
                        break;

                    case 2: //third column is loser
                        if (data[i].winner == false) {
                            td.innerHTML = name;
                        }
                        else {
                            td.innerHTML = 'Player 2';
                        }
                        break;
                    case 3: //fourth column is score
                        if (data[i].winner == true) {
                            td.innerHTML = data[i].totalScore + ' : ' + data[i].opScore;
                        }
                        else {
                            td.innerHTML = data[i].opScore + ' : ' + data[i].totalScore;
                        }
                        break;
                    case 4: //last column is time
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

function sortButton(){ //function to sort the leaderboard
    leaderboard.innerHTML = ''; //clear the leaderboard div
    let sort = document.getElementById('sort'); //grab the sort dropdown menu
    let request = new XMLHttpRequest(); //perform AJAX request to get leaderboard data
    request.open('POST', './leaderboardData2.php'); //requests data from leaderboardData2.php
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); 
    request.send('sort=' + sort.value); //send the value of the sort menu to the leaderboardData2 script
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            let playerData = JSON.parse(request.responseText);
            buildTable(playerData); //build the leaderboard table with the new data
        }
    }
}

getLeaderboardData(buildTable); //build the leaderboard table
getMatchHistoryData(buildMatchHistory); //build the match history table
