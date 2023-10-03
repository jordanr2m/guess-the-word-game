// Unordered list to store guessed letters
const guessedLetters = document.querySelector(".guessed-letters");
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


// Display circles symbols as placeholders for chosen word's letters
const placeholder = function (word) {
    const placeholderLetters = []; // Make an empty array to store letter values as circles
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●") // "Add a circle to the placeholderLetters array for each letter of the word"
    }
    wordInProgress.innerText = placeholderLetters.join(""); // Rejoins array together (otherwise, circles will be separated by a coma)
};
placeholder(word);


// When player clicks "Guess" button
guessButton.addEventListener("click", function (e) {
    e.preventDefault(); /* Because you’re working with a form, you want to prevent the default behavior of clicking a button, the form submitting, and then reloading the page. To prevent this reloading behavior, add this line of code at the top of the callback function */
    const guess = guessText.value; // Grabs value of the #letter element
    console.log(guess);
    guessText.value = ""; // Clears input field after click guess button
});