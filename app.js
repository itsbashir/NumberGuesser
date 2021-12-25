/*
GAME RULES:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/


// Game values 
let min=1,
    max=10,
    winningNum= getRandomNumber(min,max),
    guessesLeft= 3;

// UI components 

const gameWrapper = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign min and max to UI 
// we don't need to keep the range in html and remove it 
minNum.textContent = min; 
maxNum.textContent = max;

// Creat event listener for guess
guessBtn.addEventListener('click', function () {
  let guess = parseInt(guessInput.value); 
  console.log(guess);


  // validate our input 
  // checks for empty input and is between the range specified 
  if (isNaN(guess) || guess < min || guess >= max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red'); // included red as a parameter as error 
  }

  // check if the winning number 
  if (guess === winningNum) {
    // game over -win
    gameOver(true,`${winningNum} is correct GUESS! WINNER`);

    // // disable the input 
    // guessInput.disabled = true;
    // // change border color 
    // guessInput.style.borderColor = 'green';
    // // let user winner 
    // setMessage(`${winningNum} is correct GUESS! WINNER`, 'green');
  } else {  
    // wrong number 
    guessesLeft -=1;
    if (guessesLeft === 0) {
      // game over - lost 
      gameOver(false,`Game Over the correct answer is ${winningNum}!`)
      // // disable the input 
      // guessInput.disabled = true;
      // // change border color 
      // guessInput.style.borderColor = 'red';
      // // let user winner 
      // setMessage(`Game Over the correct answer is ${winningNum}!`, 'red')
    }else {
      // guess continue - incorrect answer
      // change border color 
      guessInput.style.borderColor = 'red';
      // tell user its the wrong number 
      setMessage(`${guess} is incorrect, you have ${guessesLeft} guesses left`, 'red')
    };

    // clear the input 
    guessInput.value = '';
  }
}); 

// 14/03/2021

// play again delegation and event listener
// click will skip the winning message where as mousedow will show it to us and let us click play again

gameWrapper.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  } 
});

// wining number function generator
function getRandomNumber(min, max) {
  // math object give random number with max - min + 1 do it's between 1-10. without +1 it will only give us 0-9
// with min at the end its cause you want to set it to what minimum what was set to. math floor rounds down 
  return Math.floor(Math.random() * (max-min +1) + min);
};





// Error message 
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

// function for game over 
function gameOver(won, msg) {
  let color; 
  // ternary operator to simplify 
  won === true ? color ='green' :  color ='red';
  // disable the input 
  guessInput.disabled = true;
  // change border color 
  guessInput.style.borderColor = color;
  // set text color 
  message.style.color = color;
  // let user winner 
  setMessage(msg); 

  // play again 
  guessBtn.value = 'Play Again';
  // Add class and append it 
  guessBtn.className += 'play-again';


}