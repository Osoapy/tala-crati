const wordsList = ["INQUE", "CRATI"];
export default wordsList;

export { wordsList }

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function ping() {
    console.log("Heya, I'm being imported from dictionary.js");
}

export function getRandomWord() {
    console.log("in \"getRandomWord()\"");
    return wordsList[getRandomInteger(0, wordsList.length - 1)];
}