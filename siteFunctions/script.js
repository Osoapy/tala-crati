// Imports
import * as dictionary from './dictionary.js';

dictionary.ping(); // Heya, .log() here!

// Global variables
let sessionWordList = [], currentWord = "";

// Simplier functions
function countLetter(str, letra) {
    let times = 0;
    for (let k = 0; k < str.length; k++) {
        if (str[k] === letra) {
            times++;
        }
    }
    return times;
}

// Complex functions
function constructPage() {
    // Construction of the enter/backspace/restart buttons
    let backspace = document.getElementById(`backspaceButton`);
    backspace.addEventListener('click', function() {
        removeLetter();
    });

    let enter = document.getElementById(`enterButton`);
    enter.addEventListener('click', function() {
        verifyWord();
    });

    let restart = document.getElementById(`restartButton`);
    restart.addEventListener('click', function() {
        restartWord();
    });

    // Construction of the letter inputs
    for(let k = 0; k < 26; k++) {
        let button = document.getElementById(`letterButton${String.fromCharCode(65 + k)}`);
        console.log("constructPage()\'s \"for\" interaction number " + (k + 1) + " modifing the letter " + String.fromCharCode(65 + k)); // Heya, .log() here!
        button.addEventListener('click', function() {
            addLetter(String.fromCharCode(65 + k));
        });
    }
}

// Constructing the page
constructPage();

function validatePage() {
    // First we need to know if that word already has been used in this session
    currentWord = dictionary.getRandomWord(); // Heya, .log() here!
    while(sessionWordList.includes(currentWord)) {
        currentWord = dictionary.getRandomWord(); // Heya, .log() here!
    }
    sessionWordList[sessionWordList.length + 1] = currentWord;
    console.log("The current word is " + currentWord); // Heya, .log() here!
}

// Validating the page
validatePage();

function restartWord() {
    // Adding a new word to the session word list/getting a new word
    validatePage();

    // Resetting the letter inputs
    for(let k = 0; k < 5; k++) {
        if (k != 0) {
            for(let n = 0; n < 5; n++) {
                let letter = document.getElementById(`try${String(k + 1)}-${String(n + 1)}`);
                letter.textContent = "";
                letter.className = "letterInput";
            }
        }
        else {
            for(let n = 0; n < 5; n++) {
                let letter = document.getElementById(`try${String(k + 1)}-${String(n + 1)}`);
                letter.textContent = "";
                letter.className = "letterInput current";
                if(k == 0 && n == 0) {
                    letter.className = "letterInput current active";
                }
            }
        }
    }
}

function addLetter(letter) {
    console.log(letter + " button was pressed!"); // Heya, .log() here!
    let currentTry = document.getElementsByClassName("active")[0];
    if (currentTry) {
        currentTry.textContent = letter;
        currentTry.classList.add("lastActive");
        currentTry.classList.remove("active");
        if (currentTry.id[5] != '5') {
            currentTry = document.getElementById(`try${currentTry.id[3]}-${parseInt(currentTry.id[5]) + 1}`);
            currentTry.classList.add("active");
        }
    }
}

function removeLetter() {
    console.log("backspace button was pressed!"); // Heya, .log() here!
    let listOfTryies = document.getElementsByClassName("lastActive");
    let currentTry = listOfTryies[listOfTryies.length - 1];
    if (currentTry) {
        currentTry.textContent = "";
        if(listOfTryies.length != 5) {
            let lastTry = document.getElementsByClassName("active")[0];
            lastTry.classList.remove("active");
            currentTry.classList.remove("lastActive");
            currentTry.classList.add("active");
        }
        else {
            currentTry.classList.remove("lastActive");
            currentTry.classList.add("active");
        }
    }
}

function verifyWord() {
    console.log("enter button was pressed!"); // Heya, .log() here!
  
    // Checking if all 5 letters spaces are filled
    let listOfTryies = document.getElementsByClassName("lastActive");
    if (listOfTryies.length != 5) {
        console.log("Invalidating word... (first if)"); // Heya, .log() here!
        invalidateWord();
        return;
    }
  
    // We need to check if the word is in the dictionary
    let word = "";
    for(let k = 0; k < 5; k++) {
        word += listOfTryies[k].textContent;
    }
    console.log("The word you submitted is", word); // Heya, .log() here!
    if (!dictionary.wordsList.includes(word)) {
        console.log("Invalidating word... (second if)"); // Heya, .log() here!
        invalidateWord();
        return;
    }

    // Validating word
    console.log("Validating word..."); // Heya, .log() here!
    validateWord(listOfTryies, parseInt(listOfTryies[0].id[3]), word);
}

function invalidateWord() {
    console.log("THIS WORD IS NOT VALID!!!"); // Heya, .log() here!
}

function validateWord(pastTry, lastRow, word) {
    console.log("THIS WORD IS VALID!!!"); // Heya, .log() here!

    // We'll not use the last input row, so...
    let resolvedPositionsDomain = [0, 0, 0, 0, 0];
    let resolvedPositionsCounterDomain = [0, 0, 0, 0, 0];
    let almost = 0;
    for (let k = 0; k < 5; k++) {
        console.log("validateWord()\'s for interaction number " + (k + 1)); // Heya, .log() here!
        if (word[k] == currentWord[k]) {
            console.log("The letter " + word[k] + " is in the right place!"); // Heya, .log() here!
            pastTry[almost].className = "letterInput correct";
            resolvedPositionsDomain[k] = 1;
            resolvedPositionsCounterDomain[k] = 1;
        }
        else if (currentWord.includes(word[k])) {
            console.log("The letter " + word[k] + " is in an almost"); // Heya, .log() here!
            almost++;
        }
        else {
            console.log("The letter " + word[k] + " is wrong!"); // Heya, .log() here!
            pastTry[almost].className = "letterInput wrong";
            resolvedPositionsCounterDomain[k] = 1;
        }
    }
    console.log(resolvedPositionsDomain); // Heya, .log() here!
    console.log(resolvedPositionsCounterDomain); // Heya, .log() here!
    for (let k = 0; k < almost; k++) {
        console.log("Inside the almost for"); // Heya, .log() here!
        let letterIndex = 0, found = 0;
        for (; resolvedPositionsCounterDomain[letterIndex] != 0; letterIndex++) {}
        for (let n = 0; n < 5; n++) {
            console.log("Inside the almost for's inner for"); // Heya, .log() here!
            if (resolvedPositionsDomain[n] == 0) {
                if (word[letterIndex] == currentWord[n]) {
                    pastTry[0].className = "letterInput almost";
                    resolvedPositionsDomain[n] = 1;
                    found = 1;
                    break;
                }
            }
        }
        if (found == 0) {
            pastTry[0].className = "letterInput wrong";  
        }
        resolvedPositionsCounterDomain[letterIndex] = 1;
    }

    // Preparing the next input row if it isn't the correct word or the last input row
    if (lastRow != 6) {
        if(word != currentWord) {
            for(let k = 0; k < 5; k++) {
                console.log("validateWord()\'s second for interaction number " + (k + 1)); // Heya, .log() here!
                let currentTry = document.getElementById(`try${lastRow + 1}-${k + 1}`);
                currentTry.className = "letterInput current";
                if(k == 0) {
                    currentTry.className = "letterInput current active";
                }
            }
        }
    }
}