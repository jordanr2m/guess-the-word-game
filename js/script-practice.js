// List of guessed letters
const guessedLettersList = document.querySelector('.guessed-letters');
// Guess button
const guessButton = document.querySelector(".guess");
// Text input field
const textInput = document.querySelector("#letter");
// Word in progress p
const wordInProgress = document.querySelector(".word-in-progress");
// Remaining guesses p
const remainingGuesses = document.querySelector(".remaining");
// Number span
const numberSpan = document.querySelector(".remaning span");
// Message when player guesses p
const message = document.querySelector(".message");
// Play Again Button
const playAgainButton = document.querySelector(".play-again");

const word = "dog";
const guessedLetters = []; // Array to hold guessed letters


// Step 2
const letterToSymbol = function (word) {
    const circleSymbols = [];
    for (const letter of word) {
        circleSymbols.push("💛")
    }
    wordInProgress.innerText = circleSymbols.join("");
}
letterToSymbol(word); // Must call function to run and test it


guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
    const userGuess = textInput.value;
    console.log(userGuess);

    const goodGuess = validateInput(userGuess); // userGuess represents the input
    // console.log(goodGuess); Must return a letter. Cannot return undefined
    if (goodGuess) {
        makeGuess(userGuess);
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

const makeGuess = function (letter) {
    letter = letter.toUpperCase();
    if (guessedLetters.includes(letter)) {
        message.innerHTML = `You already guessed <u>${letter}</u>. Please enter something new :)`;
    } else {
        guessedLetters.push(letter);
        console.log(guessedLetters);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
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
    console.log(wordArray);
    const revealWord = []; // array to hold updated word symbols
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("💛");
        }
    }
    console.log(revealWord);
    wordInProgress.innerText = revealWord.join("");
    checkWinner(); // call function here to check if player won
};

const checkWinner = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats! :)</p>`;
    }
};