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
