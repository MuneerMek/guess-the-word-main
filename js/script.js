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
// This array will contain all the letters the player guesses
const guessedLetters = [];
const remainingGuesses = 8;

// Call the function and pass it the word variable as the argument.
// You should see 8 ● symbols on the screen, one for each letter in the word “magnolia.”
// Hint: You’ll need to use an array and then join it back to a string using the .join("") method.
const placeholder = function (word) {
  const array = [];
  for (let letter of word) {
    array.push("●");
  }
  wordInProgress.innerText = array.join("");
};
placeholder(word);

// Because you’re working with a form, you want to prevent the default behavior of clicking a button,
// the form submitting, and then reloading the page. To prevent this reloading behavior,
// add this line of code at the top of the callback function: e.preventDefault();
guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  const guess = guessInput.value;
  guessInput.value = "";
  guessMessage.innerText = "";
  validGuess = inputValidator(guess);
  if (validGuess !== undefined) {
    makeGuess(validGuess);
  }
});

// Use regex to ensure the input is an english letter.
// Still inside the function, use a conditional block to check for different scenarios.
// First, check if the input is empty. Then, check if the player has entered more than one letter.
// Finally, check if they’ve entered a character that doesn’t match the regular expression pattern.
// Hint: You’ll need the .match() method here. Each condition should have a message directing the player on what to input.
// If all the other conditions aren’t met, the input is a letter, which is what you’re looking for! Return the input.
const inputValidator = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input === "") {
    guessMessage.innerText = "Please input a letter.";
  } else if (input.length > 1) {
    guessMessage.innerText = "Please input only one letter.";
  } else if (!input.match(acceptedLetter)) {
    guessMessage.innerText = "Please input a valid letter.";
  } else {
    return input;
  }
};

const makeGuess = function (letter) {
  letter = letter.toUpperCase();
  if (!guessedLetters.includes(letter)) {
    guessedLetters.push(letter);
    playerGuessListUpdater();
    wordProgressUpdater(guessedLetters);
  } else {
    guessMessage.innerText =
      "Letter has been guessed, please input a new letter.";
  }
  console.log(guessedLetters);
};

const playerGuessListUpdater = function () {
  playerGuessList.innerHTML = "";
  for (let letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    playerGuessList.append(li);
  }
};

const wordProgressUpdater = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const wordProgress = [];
  for (let letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      wordProgress.push(letter);
    } else {
      wordProgress.push("●");
    }
  }
  wordInProgress.innerText = wordProgress.join("");
  winCheck();
};

const guessCountAdjust = function (guess) {
  word = word.toUpperCase();
};

const winCheck = function () {
  if (wordInProgress.innerText === word.toUpperCase()) {
    guessMessage.classList.add("win");
    guessMessage.innerHTML = `<p class="highlight">You guessed the word correctly! Congrats!</p>`;
  }
};

// Test commit 3
