/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, round_score, active_player, game_play;
init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(game_play) {
        var dice = Math.floor(Math.random() * 6)+1;

        var dice_select = document.querySelector('.dice');
        dice_select.style.display = 'block';
        dice_select.src = 'dice-' + dice + '.png';
    
        if (dice !== 1) {
            round_score += dice;
            document.querySelector('#current-' + active_player).textContent = round_score;
        } else {
            activate_next();
        }
    }
});

function activate_next() {
    active_player === 0 ? active_player = 1 : active_player = 0;
    round_score = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}


document.querySelector('.btn-hold').addEventListener('click', function() {
    if(game_play) {
        score[active_player] += round_score;
        document.querySelector('#score-' + active_player).textContent = score[active_player];
    
        if (score[active_player] >= 50) {
            document.querySelector('#name-' + active_player).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + active_player + '-panel').classList.add('winner');
            document.querySelector('.player-' + active_player + '-panel').classList.remove('active');
            game_play = false;
        } else {
            activate_next();
        }
    }
});


document.querySelector('.btn-new').addEventListener('click', init);


function init() {
    score = [0,0];
    round_score = 0;
    active_player = 0;
    game_play = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    // document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}


