// Imports
import * as dictionary from './dictionary.js';

dictionary.ping(); // Heya, .log() here!

function constructPage() {
    let body = document.getElementById("keyboard");
    for(let k = 0; k < 26; k++) {
        let button = document.createElement("button");
        button.id = "letterButton" + (k + 1);
        button.classList = "letterButton";
        button.textContent = String.fromCharCode(65 + k);
        body.appendChild(button);
        console.log("constructPage()\'s \"for\" interaction number " + (k + 1)); // Heya, .log() here!
    }
}

constructPage();