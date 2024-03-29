// Imports
import * as dictionary from './dictionary.js';

dictionary.ping(); // Heya, .log() here!

let sessionWordList = [], currentWord = "";

function constructPage() {
    // First we need to know if that word already has been used in this session
    currentWord = dictionary.getRandomWord(); // Heya, .log() here!
    while(sessionWordList.includes(currentWord)) {
        currentWord = dictionary.getRandomWord(); // Heya, .log() here!
    }
    sessionWordList[sessionWordList.length + 1] = currentWord;
    console.log("The current word is " + currentWord); // Heya, .log() here!
  
    // Construction of the enter/backspace inputs
    let backspace = document.getElementById(`backspaceButton`);
    backspace.addEventListener('click', function() {
        removeLetter();
    });

    let enter = document.getElementById(`enterButton`);
    enter.addEventListener('click', function() {
        verifyWord();
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

constructPage();

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
    for(let k = 0; k < 5; k++) {
        console.log("validateWord()\'s for interaction number " + (k + 1)); // Heya, .log() here!
        pastTry[0].className = "letterInput";
    }

    // Preparing the next input row if it isn't the correct word or the last input row
    if (lastRow != 6) {
        if(word != currentWord) {
            for(let k = 0; k < 5; k++) {
                console.log("validateWord()\'s second for interaction number " + (k + 1)); // Heya, .log() here!
                let Try = document.getElementById(`try${lastRow + 1}-${k + 1}`);
                Try.className = "letterInput current";
                if(k == 0) {
                    Try.className = "letterInput current active";
                }
            }
        }
    }
}