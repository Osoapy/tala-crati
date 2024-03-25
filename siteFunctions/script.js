// Imports
import * as dictionary from './dictionary.js';

dictionary.ping(); // Heya, .log() here!

function constructPage() {
    // Construction of the enter/backspace inputs
    let backspace = document.getElementById(`backspaceButton`);
    backspace.addEventListener('click', function() {
        removeLetter();
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
    if(listOfTryies.length != 5) {
        currentTry.textContent = "";
        let lastTry = document.getElementsByClassName("active")[0];
        lastTry.classList.remove("active");
        currentTry.classList.remove("lastActive");
        currentTry.classList.add("active");
    }
    else {
        currentTry.textContent = "";
        currentTry.classList.remove("lastActive");
        currentTry.classList.add("active");
    }
}