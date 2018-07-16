//Word bank & variabls
var wordBank = ["catwoman", "huntress", "clayface", "batgirl", "zatanna", "nightwing", "katana", "bluebird", "orphan", "oracle"];

const numofTries = 10;            

var guessedLetters = [];        // Stores the letters the user guessed
var currentGuess;           // Index of the current word in the array
var guessingWord = [];          // This will be the word we actually build to match the current word
var remainingGuesses = 0;       // How many tries the player has left
var StartGame = false;        // Flag to tell if the game has started
var EndGame = false;        // Flag for 'press any key to try again'     
var wins = 0;                   // How many wins has the player racked up

//////////////////////////////////////////////////////////////////

// Restarts the beginning of the game variables
function resetGame() {
    remainingGuesses = numofTries;
    StartGame = false;

    
    currentGuess = Math.floor(Math.random() * (wordBank.length));

    // to clear out the arrays
    guessedLetters = [];
    guessingWord = [];

    // Build the guessing word and clear it out
    for (var i = 0; i < wordBank[currentGuess].length; i++) {
        guessingWord.push("_");
    }


    // Show display
    updateDisplay();
};

 //  Updates the display on the HTML Page
function updateDisplay() {

    document.getElementById("totalWins").innerText = wins;
    document.getElementById("currentWord").innerText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").innerText += guessingWord[i];
    }
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
    if(remainingGuesses <= 0) {
        alert("Game over! You lose!");
        alert("Press any key to try again!")
        EndGame = true;
    }
};


///////////////////////////////////////////////////////////////////////////

document.onkeyup = function(event) {
    // newgame with keystroke
    if(EndGame) {
        resetGame();
        EndGame = false;
    } else {
        // ensures only A to Z will can be keyed
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }
    }
};

/////////////////////////////////////////////////////////////////////////////////////

function makeGuess(letter) {
    if (remainingGuesses > 0) {
        if (!StartGame) {
            StartGame = true;
        }

        // Make sure letter hasn't been used
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            checkGuess(letter);
        }
    }
    
    updateDisplay();
    youWin();
};


//////////////////////////////////////
//

function checkGuess(letter) {
    var positions = [];

//finds any all guessed letters and stores in Positions array
    for (var i = 0; i < wordBank[currentGuess].length; i++) {
        if(wordBank[currentGuess][i] === letter) {
            positions.push(i);
        }
    }

    // remove a guess
    if (positions.length <= 0) {
        remainingGuesses--;
    } else {
        //  replaces the underscores with a letter.
        for(var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};

///////////////////////////////////////////////////////////////////////////////////////////

function youWin() {
    if(guessingWord.indexOf("_") === -1) {
        alert("You win!");
        alert("Press any key to try again!");
        wins++;
        EndGame = true;
    }
};