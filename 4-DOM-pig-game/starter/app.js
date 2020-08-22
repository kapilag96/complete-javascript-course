/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gamePlaying, prevScore, dices;

// Function to initialize the game
function initialize(){
    scores = [0, 0];
    dices  = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    prevScore = null;

    // Set all scores to 0 initially
    for(let playerNum of [0, 1]){
        // Don't display the dice initially
        document.querySelector(`.dice-${playerNum}`).style.display = 'none';

        document.getElementById(`current-${playerNum}`).textContent = 0;
        document.getElementById(`score-${playerNum}`).textContent = 0;
        // Set player names
        document.getElementById(`name-${playerNum}`).textContent = `Player ${playerNum + 1}`;
        // Remove the winner and active classes from both players
        const player = document.querySelector(`.player-${playerNum}-panel`);
        player.classList.remove('winner');
        player.classList.remove('active');
    }
    // Make first player active again
    document.querySelector(`.player-0-panel`).classList.add('active');
}

initialize();

document.querySelector('.btn-new').addEventListener('click', initialize);

function switchPlayer(){
    /*
    The function to switch player
    */
    // Change the round score to 0 and set it on element
    roundScore = 0;
    document.getElementById(`current-${activePlayer}`).textContent = 0;
    // Make the current activePlayer inactive
    document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
    // Change the active player
    activePlayer === 0? activePlayer = 1: activePlayer = 0;
    // Make the current player active
    document.querySelector(`.player-${activePlayer}-panel`).classList.add('active');
    // Hide the dice since the active player switched

}

// Callback function when ROLL button is clicked
document.querySelector('.btn-roll').addEventListener('click', () => {
    if(!gamePlaying) return;

    for (let diceNum of [0, 1]){
        // Generate a random dice roll
        const dice     = Math.floor(Math.random() * 6) + 1;
        const diceDOM = document.querySelector(`.dice-${diceNum}`);
        diceDOM.style.display = 'block';
        diceDOM.src    = `dice-${dice}.png`;
        dices[diceNum] = dice;
    }

    if (!dices.includes(1)){
        roundScore += dices[0] + dices[1];
        document.getElementById(`current-${activePlayer}`).textContent = roundScore;
    }
    else{
        switchPlayer();
    }
});

document.querySelector('.btn-hold').addEventListener('click', () => {
    if (!gamePlaying) return;
    scores[activePlayer] += roundScore;
    roundScore = 0;
    document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

    if(scores[activePlayer] >= parseInt(document.querySelector('.winning-score').value)){
        gamePlaying = false;
        document.getElementById(`name-${activePlayer}`).textContent = 'WINNER';
        const winningPlayer = document.querySelector(`.player-${activePlayer}-panel`);
        winningPlayer.classList.add('winner');
        winningPlayer.classList.remove('active');
        for (let playerNum of [0, 1]) document.querySelector(`.dice-${playerNum}`).style.display = 'none';
    }
    else{
        switchPlayer();
    }
    // Check if player won the game
});
