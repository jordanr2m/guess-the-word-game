// Unordered list to store guessed letters
const guessedLettersElement = document.querySelector(".guessed-letters");
// "Guess" button
const guessButton = document.querySelector(".guess");
// Text input for letter guess
const guessText = document.querySelector("#letter");
// Word in progress (empty paragraph initially)
const wordInProgress = document.querySelector(".word-in-progress");
// Remaining guesses paragraph
const remainingGuesses = document.querySelector(".remaining");
// Span for number of guesses remaining
const numberSpan = document.querySelector(".remaining span");
// Messages for when player guesses a letter (empty paragraph initially)
const guessMessage = document.querySelector(".message");
// Play again button (hidden initially)
const playAgainButton = document.querySelector(".play-again");

// Starting word to test game with
const word = "Magnolia";

// Empty array to hold letters guessed by the player
const guessedLetters = [];


// Display circles symbols as placeholders for chosen word's letters
const placeholder = function (word) {
    const placeholderLetters = []; // Make an empty array to store letter values as circles
    for (const letter of word) {
        // console.log(letter);
        placeholderLetters.push("●") // "Add a circle to the placeholderLetters array for each letter of the word"
    }
    wordInProgress.innerText = placeholderLetters.join(""); // Rejoins array together (otherwise, circles will be separated by a coma)
};
placeholder(word);


// When player clicks "Guess" button
guessButton.addEventListener("click", function (e) {
    e.preventDefault(); /* Because you’re working with a form, you want to prevent the default behavior of clicking a button, the form submitting, and then reloading the page. To prevent this reloading behavior, add this line of code at the top of the callback function */
    guessMessage.innerText = ""; // Clears guess message on new guess
    const guess = guessText.value; // Grabs value of the #letter input element
    console.log(guess); // shows letter in console

    const goodGuess = validateInput(guess); // Check to see if it is a valid guess. "If it is a good guess, do the following:"
    if (goodGuess) {
        makeGuess(guess);
    }

    guessText.value = ""; // Clears user input field after clicking guess button
});


// Function to validate player's input
const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/ // Variable for accepted letter sequence. Regular expression to ensure player inputs a letter
    if (input.length === 0) {
        guessMessage.innerText = "Please enter a letter";
    } else if (input.length > 1) {
        guessMessage.innerText = "Please enter a single letter at a time";
    } else if (!input.match(acceptedLetter)) {
        guessMessage.innerText = "Please enter a letter A through Z";
    } else {
        return input; // If all conditions are met, return the input
    }
};

// Function to capture player's input and see if they already entered the letter
const makeGuess = function (guess) {
    guess = guess.toUpperCase(); // Converts all letters to uppercase to avoid case-sensitivity issues
    if (guessedLetters.includes(guess)) {
        guessMessage.innerText = "You've already guessed that letter! Please try again";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters); // Verfiy letters are added to array
    }
};