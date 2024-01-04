'use strict;';



//  SET INITIAL VALUES
let player0El = document.querySelector('.player--0');
let player1El = document.querySelector('.player--1');
let score0El = document.getElementById('score--0');
let score1El = document.getElementById('score--1');
let current0El = document.getElementById('current--0');
let current1El = document.getElementById('current--1');

let diceEl = document.querySelector('.dice');
let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');


// starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0,0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

let initialize = function(){

    const scores = [0,0];
    let currentScore = 0;
    let activePlayer = 0;
    let playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};

let switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}




//  DICE ROLL FUNCTIONALITY

btnRoll.addEventListener('click', function(){

    if(playing){
        //1.generate a random dice roll
        let dice = Math.trunc(Math.random()*6)+1;

        //2. display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

         //3. check if rolled = 1, if true -> switch to next player
        if(dice !== 1){
             currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent=currentScore;
        }else{
             // switch to next player
             switchPlayer();
         }
    }
    
})


// HOLD FUNCTIONALITY

btnHold.addEventListener('click', function(){

    if(playing){
        // 1. add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. check if player's score >=100
         if(scores[activePlayer] >= 100){
             //finish game
                playing = false;
                diceEl.classList.add('hidden');
                document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
                document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }

          // 3. switch to next player
         switchPlayer();
    }


    // if(activePlayer === 0){
    //     scores[0] += currentScore;
    //     score0El.textContent = scores[0];
    //     if(score[0] >= 100){
    //         //winner
    //     }else{
    //         activePlayer = 1;
    //         player0El.classList.toggle('player--active');
    //         player1El.classList.toggle('player--active');
    //     }
    // }else{
    //     scores[1] += currentScore;
    //     score1El.textContent = scores[1];
    //     if(score[0] >= 100){
    //         //winner
    //     }else{
    //         activePlayer = 0;
    //         player0El.classList.toggle('player--active');
    //         player1El.classList.toggle('player--active');
    //     }
    // }
    
})



// RESET FUNCTIONALITY

btnNew.addEventListener('click', function(){
    initialize();
})