// List of guessed letters
const guessedLettersList = document.querySelector('.guessed-letters');
// Guess button
const guessButton = document.querySelector(".guess");
// Text input field
const textInput = document.querySelector("#letter");
// Word in progress p
const wordInProgress = document.querySelector(".word-in-progress");
// Remaining guesses p
const remainingGuessesElement = document.querySelector(".remaining");
// Number span
const numberSpan = document.querySelector(".remaining span");
// Message when player guesses p
const message = document.querySelector(".message");
// Play Again Button
const playAgainButton = document.querySelector(".play-again");

let word = "Magnolia";
const guessedLetters = []; // Array to hold guessed letters
let remainingGuesses = 8; // Max number of guesses a player can make. Increase or decrease num to change difficulty. Use let because value of num will change over time

// Step 5
const getWord = async function () {
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await res.text(); // convert to text file instead of JSON
    // console.log(data); - Shows entire list of words in console
    const wordArray = data.split("\n"); // Turn text list into an array to select random word
    // console.log(wordArray);
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    letterToSymbol(word);
}

// Start the game!
getWord();


// Step 2
const letterToSymbol = function (word) {
    const circleSymbols = [];
    for (const letter of word) {
        circleSymbols.push("💛")
    }
    wordInProgress.innerText = circleSymbols.join("");
}
// letterToSymbol(word); - Must call function to run it while testing


guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
    const guess = textInput.value;
    // console.log(guess);

    const goodGuess = validateInput(guess); // userGuess represents the input
    // console.log(goodGuess); Must return a letter. Cannot return undefined
    if (goodGuess) {
        makeGuess(guess);
    }

    textInput.value = "";
});

// Step 3
const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/; // Regular expression
    if (input.length === 0) {
        message.innerText = "Please enter a letter A - Z";
    } else if (input.length > 1) {
        message.innerText = "Please enter one letter at a time";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter A - Z";
    } else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerHTML = `You already guessed <u>${guess}</u>. Please enter something new :)`;
    } else {
        guessedLetters.push(guess);
        // console.log(guessedLetters);
        updateGuessesRemaining(guess);
        showGuessedLetters();
        updateWordInProgress(guessedLetters); // call function to update word
    }
};


// Step 4
const showGuessedLetters = function () {
    guessedLettersList.innerHTML = ""; // Clear list first to prevent duplicates
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersList.append(li);
    }
};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase(); // Make all letters in the word uppercase
    const wordArray = wordUpper.split(""); // spit word string into an array
    // console.log(wordArray);
    const revealWord = []; // array to hold updated word symbols
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("💛");
        }
    }
    // console.log(revealWord);
    wordInProgress.innerText = revealWord.join("");
    checkWinner(); // call function here to check if player won
};

// Step 5 - Use a consistent parameter, guess, to represent the letter the player guesses
const updateGuessesRemaining = function (guess) {
    const upperWord = word.toUpperCase(); // change casing to compare values
    if (!upperWord.includes(guess)) {
        message.innerText = `Nice try, but the letter ${guess} is not in the word.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Good guess! The word has the letter ${guess}.`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>`;
    } else if (remainingGuesses === 1) {
        numberSpan.innerText = `1 guess`;
    } else {
        numberSpan.innerText = `${remainingGuesses} guesses`;
    } // If the number is anything other than 1 or 0, show it in the span
};

// Step 4
const checkWinner = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats! :)</p>`;
    }
};

