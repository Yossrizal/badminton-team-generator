interface Match {
    player1: string;
    player2: string;
}

let players: Array<string> = [];
let all_players: Array<string> = [
    "Maksymilian",
    "Herman",
    "Fletcher",
    "Ronnie",
    "Kieron",
    "Nana",
    "Aarav",
    "Kallum",
    "Jamal",
    "Ismael",
    "Cassius",
    "Adil",
    "Maxim",
    "Ivan"
];

function initiatePlayer(all_players: Array<string>): string
{
    let html: string;
    let player_name: string;
    let return_html: string = "";

    for (let index = 0; index < all_players.length; index++) {
        player_name = all_players[index];
        html = `<div class="col-sm-3">    
            <input class=" select-player" type="checkbox" name="player[]" value="${player_name}" checked>
            <label class="" for="flexCheckChecked">
            ${player_name}
            </label>
        </div>`;
        return_html += html;
    }

    return return_html;
}

function insertToHtml(html_id: string, html: string): void
{
    var player_list = document.getElementById(html_id) as HTMLElement;
    player_list.innerHTML = html;
}

function generateMatch()
{
    let wasit: string = "";
    let all_match: Array<Match> = [];
    let players_only: Array<string> = [...players];

    // set wasit
    if(players_only.length % 2 != 0){
        let pop: number = Math.floor((Math.random() * (players_only.length - 1)));
        wasit = players[pop];
        players_only.splice(pop, 1);
    } else {
        wasit = '-';
    }
    
    // set player
    const shuffle = (array: string[]) => { 
        for (let i = array.length - 1; i > 0; i--) { 
          const j = Math.floor(Math.random() * (i + 1)); 
          [array[i], array[j]] = [array[j], array[i]]; 
        } 
        return array; 
    }; 

    all_match = [];
    if(players_only.length > 0){
        shuffle(players_only);
        let counter:number = 1;
        let p: Array<string> = [];
        for (let i:number = 0; i < players_only.length; i++) {             
            counter++;
            if(counter <= 2){
                p[0] = players_only[i];
            } else {
                p[1] = players_only[i];
                all_match.push({player1: p[0],player2: p[1]});
                counter = 1;
            }
        }
    }

    insertMatch(wasit, all_match);
    
}

function insertMatch(wasit: string, all_match: Array<Match>): void
{
    
    let html: string = "";
    html += `<table class="table table-bordered text-center">`;
    html += `<thead>
                <tr>
                    <th colspan="3">Referee: ${wasit}</th>
                </tr>
            </thead>`;

    if(all_match.length == 0){
        console.log('match not found!');
    }
    

    if(players.length > 3){
        let round: number = 1;
        let count: number = 1;
        let close: boolean = true;
        html += `<tbody>`;
        for (let index = 0; index < all_match.length; index++) {
            const p1 = all_match[index].player1;
            const p2 = all_match[index].player2;

            if(count == 1){
                html += `
                    <tr>
                        <td style="width: 35%;">
                            <h6>TEAM ${index+1}</h6>
                            <label>${p1} & ${p2}</label>
                        </td>`;
                count++;
                close = false;
            } else if(count == 2){
                html += `
                        <td>
                            <h6>MATCH ${round}</h6>
                            <span class="badge bg-danger">VS</span>
                        </td>
                        <td style="width: 35%;">
                            <h6>TEAM ${index+1}</h6>
                            <label>${p1} & ${p2}</label>
                        </td>    
                    </tr>`;
                count = 1;
                close = true;
                round++;
            }
        }

        if(close == false){
            html += `
                    <td>
                        <h6>FINAL MATCH</h6>
                        <span class="badge bg-danger">VS</span>
                    </td>
                    <td style="width: 35%;">
                        <span>?</span><br>
                        -
                    </td>    
                </tr>`;
        }
    } else {
        html += `<tr>
                    <td>
                        <h6>SOLO</h6>
                        <b>${all_match[0].player1}</b>
                    </td> 
                    <td>
                        <h6>MATCH 1</span><br>
                        <span class="badge badge-danger">VS</span>
                    </td>
                    <td>
                        <h6>SOLO</span><br>
                        <b>${all_match[0].player2}</b>
                    </td>    
                </tr>`;
    }
    html += `</tbody></table>`;
    insertToHtml(`table-div`,html);
}

function generate()
{
    let checkboxes = document.querySelectorAll<HTMLInputElement>('.select-player');
    let checkboxesChecked: Array<string> = [];
    for (var i=0; i<checkboxes.length; i++) {
        // And stick the checked ones onto an array...
        if (checkboxes[i].checked) {
           checkboxesChecked.push(checkboxes[i].value);
        }
    }
    // console.log(checkboxesChecked.length);
    if(checkboxesChecked.length > 1){
        players = checkboxesChecked;
    } else {
        players = all_players;
        let checkbox_input = document.getElementsByClassName(`select-player`) as HTMLCollection;
        for (let index = 0; index < checkbox_input.length; index++) {
            checkbox_input[index].setAttribute(`checked`, `true`);
            console.log(checkbox_input[index]);
        }
    }
    generateMatch();
}

function docReady(fn: any) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}    

if (typeof window !== "undefined") {
    window.onload = function (){
        
        docReady(function() {
            
            // ininitate player list
            let html = initiatePlayer(all_players);
            insertToHtml(`player-list`,html);
            
            // generate button
            let gen_btn = document.getElementById(`generate_btn`) as HTMLElement;
            gen_btn.onclick=function(){generate()};

            let res_btn = document.getElementById(`reset_btn`) as HTMLElement;
            res_btn.onclick=function(){
                insertToHtml(`player-list`, html);
                insertToHtml(`table-div`, ``);
            };
        });
    };
}



