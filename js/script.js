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

// Starting word to test game with. Use let so it can be reassigned
let word = "Magnolia";
// Empty array to hold letters guessed by the player. Change to let so that array can be emptied for a new game
let guessedLetters = [];
// Global variable for number of guesses
let numGuesses = 8;

// Async function to connect to API
const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await response.text();
    // console.log(data); - Check that it is connected to API
    const wordArray = data.split("\n"); 
    // console.log(wordArray); - Check that words are in an array
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim(); // remove whitespace from word
    placeholder(word); // call function and pass new word as argument. Removed function call from global space (below) to here.
}
// Start the game!
getWord();

// Display circles symbols as placeholders for chosen word's letters
const placeholder = function (word) {
    const placeholderLetters = []; // Make an empty array to store letter values as circles
    for (const letter of word) {
        // console.log(letter);
        placeholderLetters.push("●") // "Add a circle to the placeholderLetters array for each letter of the word"
    }
    wordInProgress.innerText = placeholderLetters.join(""); // Rejoins array together (otherwise, circles will be separated by a coma)
};
// placeholder(word);


// When player clicks "Guess" button
guessButton.addEventListener("click", function (e) {
    e.preventDefault(); /* Because you’re working with a form, you want to prevent the default behavior of clicking a button, the form submitting, and then reloading the page. To prevent this reloading behavior, add this line of code at the top of the callback function */
    guessMessage.innerText = ""; // Clears guess message on new guess
    const guess = guessText.value; // Grabs value of the #letter input element
    // console.log(guess); - shows letter in console

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
        // console.log(guessedLetters); - Verfiy letters are added to array
        showGuesses();
        updateGuessesRemaining(guess);
        updateWordInProgress(guessedLetters);
    }
};

// Function to show guessed letters
const showGuesses = function () {
    guessedLettersElement.innerHTML = ""; // Clear first to prevent duplicate letters
    for (letter of guessedLetters) {
        const listItem = document.createElement("li");
        listItem.innerText = letter;
        guessedLettersElement.append(listItem);
    }
};

// Function to update word in progress
const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase(); // prevents casing issues
    const wordArray = wordUpper.split(""); // turn word into an array
    // console.log(wordArray);
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

// Function to update guess count
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
        // numberSpan.innerText = `0 guesses`;
        playAgain();
    } else if (numGuesses === 1) {
        numberSpan.innerText = `1 guess`;
    } else {
        numberSpan.innerText = `${numGuesses} guesses`
    }
};

// Function to check if player won - Must remember case sensitivity!!
const checkWinner = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        guessMessage.classList.add("win");
        guessMessage.innerHTML =  `<p class="highlight">You guessed correct the word! Congrats!</p>`;
        playAgain();
    }
};

// Function to start game over. Add to 2 scenarios: player wins or player loses
const playAgain = function () {
    guessButton.classList.add("hide");
    remainingGuesses.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

// Play again button functionality
playAgainButton.addEventListener("click", function () {
    // Reset all original values & grab new word
    guessMessage.classList.remove("win");
    guessedLetters = [];
    numGuesses = 8;
    guessMessage.innerText = "";
    guessedLettersElement.innerHTML = "";
    numberSpan.innerText = `${numGuesses} guesses`;
    // Grab a new word
    getWord();
    
    // Show the right UI elements
    guessButton.classList.remove("hide");
    remainingGuesses.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    playAgainButton.classList.add("hide");
});