 
// JavaScript written by Derek Evanson with the guided process of Jonas Schmedtmann as part of "Complete JavaScript Course 2020"

/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL  score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var winScore, pastRolls, currentRolls, scores, roundScore, activePlayer, gamePlaying;

setup();

function resetRound() {
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    roundScore = 0;
    pastRolls = [0,0];
    currentRolls = [0,0];
}


function setup() {
    gamePlaying = true;
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    pastRolls = [0,0];
    currentRolls = [0,0];
    winScore = 100;
    document.getElementById('score-1').textContent = scores[1];
    document.getElementById('score-0').textContent = scores[0];
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    resetRound();
}

function changePlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    resetRound();
}

function loseScore() {
        scores[activePlayer] = 0;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        changePlayer();
}

// Check if double sixes and past sixes
function rolledSixesTwice() {
    if (pastRolls[0] !== 6 && pastRolls[1] !== 6)
        return false;

    else if (currentRolls[0] !== 6 && currentRolls[1] !== 6)
        return false;

    else if (currentRolls[0] == 6) {
        for (var i = 0; i < pastRolls.length; i++) {
            if (currentRolls[0] == pastRolls[i])
                return true;
        }
    } else if (currentRolls[1] == 6) {
        for (var c = 0; c < pastRolls.length; c++) {
            if (currentRolls[1] == pastRolls[c])
                return true;
        }
    } else return false;
}

// Roll BTN
document.querySelector('.btn-roll').addEventListener('click', function() {

    // Check if game has ended
    if (gamePlaying) {

        // Random number
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        
        // Display the result
        var diceDOM = document.querySelector('.dice');
        var diceDOM2 = document.querySelector('.dice2');
        diceDOM.style.display = 'block';
        diceDOM2.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        diceDOM2.src = 'dice-' + dice2 + '.png';


        // Update the round score IF the rolled number was NOT a 1
        if (dice !== 1 && dice2 !== 1) {
            //add score
            roundScore += dice;
            roundScore += dice2;
            pastRolls[0] = currentRolls[0]; 
            pastRolls[1] = currentRolls[1]; 
            currentRolls[0] = dice;
            currentRolls[1] = dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            
            if(rolledSixesTwice()){
               loseScore();
               }
            
        } else {
            changePlayer();
        }
    }
});

// Hold BTN
document.querySelector('.btn-hold').addEventListener('click', function() {

    // Check if game has ended
    if (gamePlaying) {

        // Adding current score to global score
        scores[activePlayer] += roundScore;

        // Udate UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        //check if player has won the game
        if (scores[activePlayer] >= winScore) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner';
            resetRound();
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;

        } else {
            changePlayer();
        }
    }
});

// Set Score
document.querySelector('.btn-goal').addEventListener('click', function() {
winScore = prompt("Please enter your your new goal.");
});

// New game BTN
document.querySelector('.btn-new').addEventListener('click', setup);








