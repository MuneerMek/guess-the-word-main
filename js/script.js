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
let word = "magnolia";
// This array will contain all the letters the player guesses
const guessedLetters = [];
// Guesses left for player, displayed beneath word
let remainingGuesses = 8;
// Function to determine word from api
const getWord = async function () {
  const res = await fetch(
    `https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt`
  );
  const data = await res.text();
  const wordArray = data.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  const randomWord = wordArray[randomIndex].trim();
  word = randomWord;
  placeholder(word);
};

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
getWord();

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
    guessCountAdjust(letter);
    wordProgressUpdater(guessedLetters);
  } else {
    guessMessage.innerText =
      "Letter has been guessed, please input a new letter.";
  }
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
  const wordUpper = word.toUpperCase();
  if (wordUpper.includes(guess)) {
    guessMessage.innerText = `Nice guess!`;
  } else {
    guessMessage.innerText = `Word does not contain "${guess}"`;
    remainingGuesses -= 1;
  }
  if (remainingGuesses === 0) {
    remainingGuessCount.innerText = `You're all out of guesses! The word was "${wordUpper}", try again next time!`;
  } else if (remainingGuesses === 1) {
    remainingGuessCountSpan.innerText = `${remainingGuesses} guess`;
  } else {
    remainingGuessCountSpan.innerText = `${remainingGuesses} guesses`;
  }
};

const winCheck = function () {
  if (wordInProgress.innerText === word.toUpperCase()) {
    guessMessage.classList.add("win");
    guessMessage.innerHTML = `<p class="highlight">You guessed the word correctly! Congrats!</p>`;
  }
};
