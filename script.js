'use strict';

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const player0Score = document.getElementById('score--0');
const player1Score = document.getElementById('score--1');

const player0CurrentScore = document.getElementById('current--0');
const player1CurrentScore = document.getElementById('current--1');
const dice = document.querySelector('.dice');

const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, activePlayer, currentScore, gameStatus;

const switchPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
        //Switch to next player
        activePlayer = (activePlayer === 0) ? 1 : 0;
        currentScore = 0;

        player0.classList.toggle('player--active');
        player1.classList.toggle('player--active');
}

const rollDiceAction = () => {
    if (gameStatus) {
        //Rolling of dice and generating value
        const diceVal = Math.trunc(Math.random() * 6) + 1;

        //Displaying of dice
        dice.classList.remove('hidden');
        dice.src = `dice-${diceVal}.png`;

        //If dice value is 1
        if (diceVal !== 1) {
            //Add value to player's current score
            currentScore += diceVal;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else {
            switchPlayer();
        }
    }
}

const holdAction = () => {
    if (gameStatus) {
         //Add current score to actice player
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 10) {
            gameStatus = false;
            dice.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }
        else {
            switchPlayer();
        }
    }
}

const newGameAction = () => {

    scores = [0, 0];
    activePlayer = 0;
    currentScore = 0;
    gameStatus = true;

    player0Score.textContent = 0;
    player1Score.textContent = 0;
    player0CurrentScore.textContent = 0;
    player1CurrentScore.textContent = 0;

    dice.classList.add('hidden');
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
}

newGameAction();

btnRollDice.addEventListener('click', rollDiceAction);
btnHold.addEventListener('click', holdAction);
btnNewGame.addEventListener('click', newGameAction);



