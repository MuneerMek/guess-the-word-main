// Where guessed letters are appended to
const playerGuessList = document.querySelector(".guessed-letters");
// Guess button to send input
const guessButton = document.querySelector(".guess");
// Input box for guessing a letter
const guessInput = document.querySelector("#letter");
// Paragraph that shows the word in progress
const wordInProgress = document.querySelector(".word-in-progress");
// Paragraph that shares the number of guesses remaining
const remainingGuessCount = document.querySelector(".remaining");
// Paragraph span that contains the guess count
const remainingGuessCountSpan = document.querySelector(".remaining span");
// Will display messages when the player makes a guess
const guessMessage = document.querySelector(".message");
// Hidden by default, will appear when game is finished
const playAgainButton = document.querySelector(".play-again");
// Dummy word for guessing game
const word = "magnolia";

// Call the function and pass it the word variable as the argument.
// You should see 8 ● symbols on the screen, one for each letter in the word “magnolia.”
// Hint: You’ll need to use an array and then join it back to a string using the .join("") method.
const wordProgressUpdater = function (word) {
  const array = [];
  for (let letter of word) {
    console.log(letter);
    array.push("●");
  }
  wordInProgress.innerText = array.join("");
};

wordProgressUpdater(word);

// Because you’re working with a form, you want to prevent the default behavior of clicking a button,
// the form submitting, and then reloading the page. To prevent this reloading behavior,
// add this line of code at the top of the callback function: e.preventDefault();.
guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  const guess = guessInput.value;
  console.log(guess);
  guessInput.value = "";
});
