const topics = [
    {hint: "Berlin neighborhood",
    answer: "mitte"
    },

    {hint: "Park with a dragon",
    answer: "guell"
    },

    {hint: "London street market",
    answer: "camden"
    },

    {hint: "Second oldest amusement park in the world",
    answer: "tivoli"
    },

    {hint: "The city that never sleeps",
    answer: "new york"
    },

    {hint: "City where Miró Foundation is located",
    answer: "barcelona"
    },

    {hint: "Fashion designer",
    answer: "alexander mcqueen"
    },

    {hint: "Famous person",
    answer: "david bowie"
    },

    {hint: "A street",
    answer: "abbey road"
    },

    {hint: "Capital of a country",
    answer: "tokyo"
    },

    {hint: "Film director",
    answer: "sofia coppola"
    }  
];

const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

console.log(topics);

let wins = 0;
let guessesLeft = 6;
let wrongLetters = [];
let correctLetters = [];
let  missingLetters;

let indexTopics;
let hint;
let answer;

let correctAnswer = [];
let letters = []
let checkArray = []

let userGuess;

const winsText = document.getElementById("wins-text");
const guessesLeftText = document.getElementById("remaining-tries-text");
const wrongLettersText = document.getElementById("wrong-letters-text");

//CLEAN PREVIOUS DATA
const clean = () => {
    document.querySelector("#word-container").innerHTML = " "
    wrongLettersText.innerHTML = " ";
    guessesLeft = 6;
    guessesLeftText.innerHTML = guessesLeft;
    wrongLetters = [];
    correctLetters = [];
    correctAnswer = [];
    checkArray = [];
    missingLetters = 0;
}

//GET THE RANDOM TOPIC AND SET UP GAME
const setUp = () => {
    indexTopics = [Math.floor(Math.random() * topics.length)];
    hint = topics[indexTopics].hint;
    answer = topics[indexTopics].answer;
    document.querySelector("#topic").innerHTML = hint;
    letters = Array.from(answer)
    letters.forEach(letter => {
        if (checkArray.indexOf(letter) < 0 && letter !== " ") {
            checkArray.push(letter)
            console.log("checkArray: " + checkArray)
        } else {
            console.log("repeated letter or space")
        }
    })
    missingLetters = checkArray.length
    console.log("missing letters: " + missingLetters)
    letters.forEach(letter => {
        let element = document.createElement("div")
        if (letter === " ") {
            element.setAttribute ("class", "letter space")
        } else {
            element.innerHTML = "__";
            element.setAttribute("class", "letter " + letter)
        }
        document.querySelector("#word-container").append(element)  
    })
}

//BUILD THE BOARD WITH LETTERS
const build = () => {
    document.querySelector(".again-btn-div").innerHTML = " "
    let alphabetLines = document.querySelectorAll(".alphabet")
        alphabetLines.forEach(alphabetLine => {
            alphabetLine.innerHTML = " "
        })
    alphabet.forEach((item, i) => {
        let unit = document.createElement("div")
        unit.setAttribute("class", `col-lg-1 mr-2 mb-2 block block${item}`)
        unit.setAttribute("id", item)
        unit.setAttribute("clicked", "false");
        unit.innerHTML = item.toUpperCase();
        if (i>=0 && i<=5) {
            document.querySelector(".row1").append(unit)
        } else if (i>=6  && i<=11) {
            document.querySelector(".row2").append(unit)
        } else if (i>=12 && i<=17) {
            document.querySelector(".row3").append(unit)
        } else if (i>=18 && i <=23) {
            document.querySelector(".row4").append(unit)
        } else {
            document.querySelector(".row5").append(unit)
        }
    })
    let againSpan = document.createElement("span");
    againSpan.setAttribute("id", "another-word");
    let againLink = document.createElement("a");
    againLink.setAttribute("href", "#");
    againLink.setAttribute("class", "again middle")
    againLink.innerHTML = "TRY ANOTHER WORD";
    againSpan.append(againLink);
    document.querySelector(".again-btn-div").append(againSpan);
}

//SET THE GAME FROM ZERO
const start = () => {
    wins = 0;
    winsText.textContent = wins;
    clean()
    setUp()
    build()  
}

//COMPARE LETTERS THE USER GUESSED WITH THOSE IN THE ANSWER || DECREASES CHANCES AND INCREASES WINS
const guess = () => {
    if (guessesLeft > 0 && checkArray.indexOf(userGuess) >=0 && missingLetters > 0) {
        let correctGuessedLetters = document.querySelectorAll(`.${userGuess}`)
        correctGuessedLetters.forEach((correctGuessedLetter) => {
            correctGuessedLetter.innerHTML = userGuess.toUpperCase()
        })
        console.log(correctGuessedLetters)
        if (correctLetters.indexOf(userGuess) >=0) {
            let alert = document.querySelector(".alert-msg")
            alert.innerHTML = "You already entered " + userGuess.toUpperCase();
            $("#alert").modal("show")
        } else { 
            correctLetters.push(userGuess)
            missingLetters--
        }
    } else if (guessesLeft > 0 && checkArray.indexOf(userGuess) < 0 && missingLetters > 0) {
        if (wrongLetters.indexOf(userGuess) >=0) {
            let msg = document.querySelector(".alert-msg")
            msg.innerHTML = "You already tried " + userGuess.toUpperCase();
            $("#alert").modal("show")
        } else { 
        guessesLeft--
        guessesLeftText.innerHTML = guessesLeft;
        wrongLetters.push(userGuess)
        wrongLettersText.append(userGuess.toUpperCase() + " ")
        }
    }  
    score()
}

//SCORE RESULTS
const score = () => {
    if (missingLetters === 0 && guessesLeft > 0) {
        wins++
        winsText.textContent = wins;
        let result = document.querySelector(".modal-title");
        result.innerHTML = "Congratulations. You guessed"
        let showAnswer = document.querySelector(".modal-body")
        showAnswer.innerHTML = answer.toUpperCase()
        $("#modal").modal("show")
    }
    if (missingLetters > 0 && guessesLeft === 0) {
        let result = document.querySelector(".modal-title");
        result.innerHTML = "Game over. The answer was"
        let showAnswer = document.querySelector(".modal-body")
        showAnswer.innerHTML = answer.toUpperCase()
        $("#modal").modal("show")
    } 
}

//FUNCTION THAT COMPARES LETTERS AND ANSWER IN CASE USER TYPES LETTERS
const guessType = (event) => {
    userGuess = event.key.toLowerCase()
    if (alphabet.indexOf(userGuess) < 0) {
        let alert = document.querySelector(".alert-msg")
        alert.innerHTML = "You need to type only letters."
        $("#alert").modal("show")
    
    } else {
        document.getElementById(userGuess).classList.add("clicked")
        guess()
    }
    
}

//FUNCTION THAT COMPARES LETTERS AND ANSWER IN CASE USER CLICKS LETTERS
const guessClick = () => {
    guess()
}

//FUNCTION CALLED WHEN "NEXT IS CLICKED"
const again = () => {
    winsText.textContent = wins;
    clean()
    setUp()
    build()
}

//ADD EVENT LISTENER TO BUTTON AND CALL FUNCTION START
document.querySelector("#start").addEventListener("click", start)

//IN CASE USER TYPES LETTERS USE THIS FUNCTION
document.onkeydown = guessType;

//IN CASE USER CLICKS LETTERS USE ADD EVENT LISTENER TO BLOCKS OF LETTERS
document.addEventListener("click", function (event) {
    if(event.target.classList.contains("block")) {
        userGuess = event.target.id
        event.target.classList.add("clicked")
        guessClick(userGuess)
    }
})

//ADD EVENT LISTENER TO BUTTONS NEXT FOR WORD
document.addEventListener("click", function (event) {
    if(event.target.classList.contains("again")) {
        again()
    }
})

//INITIAL WINS AND GUESSES LEFT
winsText.textContent = wins;
guessesLeftText.innerHTML = guessesLeft;