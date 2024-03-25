// Unordered list to store guessed letters
const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
// Text input area for letter guess
const guessText = document.querySelector("#letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
// Span for number of guesses remaining
const numberSpan = document.querySelector(".remaining span");
const guessMessage = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

// Starting word to test game with
let word = "Magnolia";
// Empty array to hold letters guessed by the player
let guessedLetters = [];
// Global variable for number of player guesses
let numGuesses = 8;

// fetch a random word
const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await response.text();
    const wordArray = data.split("\n"); // split on new line
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim(); // remove whitespace from word
    placeholder(word); // call function and pass new word as argument
}
// Start the game!
getWord();

// Display circle symbols as placeholders for word's letters
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        placeholderLetters.push("●")
    }
    wordInProgress.innerText = placeholderLetters.join(""); 
};

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    guessMessage.innerText = ""; // Clears guess message on new guess
    const guess = guessText.value; // Grab value of guess input

    const goodGuess = validateInput(guess); // Check to see if it is a valid guess
    if (goodGuess) {
        makeGuess(guess);
    }

    guessText.value = ""; // Clear guess input
});

// validate player's input
const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/
    if (input.length === 0) {
        guessMessage.innerText = "Please enter a letter";
    } else if (input.length > 1) {
        guessMessage.innerText = "Please enter a single letter at a time";
    } else if (!input.match(acceptedLetter)) {
        guessMessage.innerText = "Please enter a letter A through Z";
    } else {
        return input; // If all conditions are met, return the guess
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase(); // Convert letter to uppercase
    if (guessedLetters.includes(guess)) {
        guessMessage.innerText = "You've already guessed that letter! Please try again";
    } else {
        guessedLetters.push(guess); // Add letter to guessedLetters array
        showGuesses();
        updateGuessesRemaining(guess);
        updateWordInProgress(guessedLetters);
    }
};

// Display guessed letters
const showGuesses = function () {
    guessedLettersElement.innerHTML = ""; // Clear first to prevent duplicate letters
    for (const letter of guessedLetters) {
        const listItem = document.createElement("li");
        listItem.innerText = letter;
        guessedLettersElement.append(listItem);
    }
};

// Update guess count
const updateGuessesRemaining = function (guess) {
    const wordUpper = word.toUpperCase();
    if (!wordUpper.includes(guess)) {
        guessMessage.innerText = `Nice try, but the letter ${guess} is not in the word.`;
        numGuesses -= 1;
    } else {
        guessMessage.innerText = `Good guess! The word has the letter ${guess}.`;
    }

    if (numGuesses === 0) {
        guessMessage.innerHTML = `Game over! The word was <span class="highlight">${word}</span>`;
        playAgain(); // player lost - now they can play again
    } else if (numGuesses === 1) {
        numberSpan.innerText = `1 guess`;
    } else {
        numberSpan.innerText = `${numGuesses} guesses`
    }
};

// Update current word symbols
const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split(""); // turn word into an array
    const updatedCharacters = []; // array to hold updated word
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            updatedCharacters.push(letter.toUpperCase());
        } else {
            updatedCharacters.push("●");
        }
    }
    wordInProgress.innerText = updatedCharacters.join("");
    checkWinner(); // check if player won
}

const checkWinner = function () {
    // convert word to uppercase for comparison
    if (wordInProgress.innerText === word.toUpperCase()) {
        guessMessage.classList.add("win");
        guessMessage.innerHTML =  `<p class="highlight">You guessed the correct word! Congratulations 🥳</p>`;
        playAgain();
    }
};

const playAgain = function () {
    guessButton.classList.add("hide");
    remainingGuesses.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

// Play again button functionality
playAgainButton.addEventListener("click", function () {
    // Reset all original values
    guessMessage.classList.remove("win");
    guessedLetters = [];
    numGuesses = 8;
    guessMessage.innerText = "";
    guessedLettersElement.innerHTML = "";
    numberSpan.innerText = `${numGuesses} guesses`;
    getWord(); // grab a new word
    
    // Show the right UI elements
    guessButton.classList.remove("hide");
    remainingGuesses.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    playAgainButton.classList.add("hide");
});