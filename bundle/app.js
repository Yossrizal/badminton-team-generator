"use strict";
let html_id = "player-list";
let wasit = "";
let all_match = [];
let players = [
    'Yoss',
    'Aip',
    'Pahlev',
    'Opan',
    'Imam',
    'Riyadi',
    'Ridwan',
    'Ryan',
    'Rivaldi'
];
function initiatePlayer(players) {
    let html;
    let player_name;
    let return_html = "";
    for (let index = 0; index < players.length; index++) {
        player_name = players[index];
        html = `<div class="col-sm-4 form-check">    
            <input class="form-check-input select_player" type="checkbox" name="player[]" value="${player_name}">
            <label class="form-check-label" for="flexCheckChecked">
            ${player_name}
            </label>
        </div>`;
        return_html += html;
    }
    return return_html;
}
function insertToHtml(html_id, html) {
    var player_list = document.getElementById(html_id);
    player_list.innerHTML = html;
}
function generateMatch(players) {
    // set wasit
    if (players.length % 2 != 0) {
        let pop = Math.floor((Math.random() * (players.length - 1)));
        wasit = players[pop];
        players.splice(pop, 1);
    }
    else {
        wasit = '-';
    }
    // set player
    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };
    if (players.length > 0) {
        shuffle(players);
        let counter = 1;
        let p = [];
        for (let i = 0; i < players.length; i++) {
            counter++;
            if (counter <= 2) {
                p[0] = players[i];
            }
            else {
                p[1] = players[i];
                all_match.push({ player1: p[0], player2: p[1] });
                counter = 1;
            }
        }
    }
    console.log([`players:`, players]);
}
function insertMatch() {
    let html = "";
    if (all_match.length == 0) {
        console.log('match not found!');
    }
    if (players.length > 3) {
        let round = 1;
        let count = 1;
        let close = true;
        for (let index = 0; index < all_match.length; index++) {
            const p1 = all_match[index].player1;
            const p2 = all_match[index].player2;
            if (count == 1) {
                html += `
                    <tr>
                        <td>
                            <span style="font-size: 0.6em;">TEAM ${index + 1}</span><br>
                            <b style="font-size: 0.8em;">${p1} & ${p2}</b>
                        </td>`;
                count++;
                close = false;
            }
            else if (count == 2) {
                html += `
                        <td>
                            <span style="font-size: 0.6em;">MATCH ${round}</span><br>
                            <span class="badge badge-danger">VS</span>
                        </td>
                        <td>
                            <span style="font-size: 0.6em;">TEAM ${index + 1}</span><br>
                            <b style="font-size: 0.8em;">${p1} & ${p2}</b>
                        </td>    
                    </tr>`;
                count = 1;
                close = true;
                round++;
            }
        }
        if (close == false) {
            html += `
                    <td>
                        <span style="font-size: 0.6em;">FINAL MATCH</span><br>
                        <span class="badge badge-danger">VS</span>
                    </td>
                    <td>
                        <span style="font-size: 0.6em;">?</span><br>
                        -
                    </td>    
                </tr>`;
        }
    }
    else {
        html += `<tr>
                    <td>
                        <span style="font-size: 0.6em;">SOLO</span><br>
                        <b>${all_match[0].player1}</b>
                    </td> 
                    <td>
                        <span style="font-size: 0.6em;">MATCH 1</span><br>
                        <span class="badge badge-danger">VS</span>
                    </td>
                    <td>
                        <span style="font-size: 0.6em;">SOLO</span><br>
                        <b>${all_match[0].player2}</b>
                    </td>    
                </tr>`;
    }
    let was = document.getElementById('wasit_name');
    was.innerHTML = wasit;
    let table = document.getElementById(`table-match`).getElementsByTagName('tbody')[0];
    table.innerHTML = html;
}
if (typeof window !== "undefined") {
    window.onload = function () {
        //ininitate player list
        let html = initiatePlayer(players);
        insertToHtml(html_id, html);
        console.log('generate player executed!');
        generateMatch(players);
        console.log(all_match);
        insertMatch();
    };
}
