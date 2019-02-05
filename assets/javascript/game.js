
            var topics = [
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

                {hint: "Place in Portugal where Europeans like to go in the summer",
                answer: "algarve"
                },

                {hint: "City where Miró Foundation is located",
                answer: "barcelona"
                }

             ];
             console.log(topics);
     
             var wins = 0;
             var guessesLeft = 5;
             var wrongLetters = [];
             var correctLetters = [];
     
             var indexTopics = [Math.floor(Math.random() * topics.length)];
     
             var answer = topics[indexTopics].answer;
     
             var correctAnswer = [];
     
             var wrongLetters = [];
     
             var missingLetters = topics[indexTopics].answer.length;

             

     
             var winsText = document.getElementById("wins-text");
             var guessesLeftText = document.getElementById("remaining-tries-text");
             var wrongLettersText = document.getElementById("wrong-letters-text");
             var gameOver = document.getElementById("gameOver");
             var unsolved = document.getElementById("word-container");

             winsText.textContent = wins;
             guessesLeftText.textContent = guessesLeft;

            document.getElementById("start").addEventListener("click", function init () {
                document.getElementById("topic").innerHTML = topics[indexTopics].hint;
                for (var i=0; i < answer.length; i++) {
                   correctAnswer[i] = "_";
                   unsolved.innerHTML = correctAnswer.join(" ");
                }
            });    
     
            document.onkeydown = function guess(event) {
                var userGuess = event.key;
                 if (answer.indexOf(userGuess) >=0) {
                     if (correctAnswer.indexOf(userGuess.toUpperCase()) < 0) {
                         for (var j=0; j < answer.length; j++) {
                             if (userGuess === answer[j]) {
                                    missingLetters--;
                                    console.log(missingLetters);
                                    winsText.textContent = wins;
                                    correctAnswer[j] = userGuess.toUpperCase();
                                    var rightGuess = document.getElementById("word-container");
                                    rightGuess.innerHTML = correctAnswer.join(" ");
                                    if (missingLetters === 0) {
                                        wins++;
                                        winsText.textContent = wins;
                                        console.log(wins);
                                        gameOver.textContent = "WINNER!";
                                    }
                                }
                            }
                        }
                    } else {
                            if (guessesLeft > 0) {
                            guessesLeft--;
                            guessesLeftText.textContent = guessesLeft;
                            if (wrongLetters.indexOf(userGuess.toUpperCase()) < 0) {
                                    wrongLetters.push(userGuess.toUpperCase());
                                    wrongLettersText.textContent = wrongLetters.join(", ");
                                }
                            } 
                            if ((guessesLeft === 0) || (missingLetters === 0)) {
                                    gameOver.textContent = answer.toUpperCase();
                                }
                                
                            }
                        }

                 winsText.textContent = wins;
                 guessesLeftText.textContent = guessesLeft;
        
             
             

             document.getElementById("again").addEventListener("click", function reset() {
                 guessesLeft = 5;
                 guessesLeftText.textContent = guessesLeft;
                 wrongLetters = [];
                 correctAnswer = [];
                 indexTopics = [Math.floor(Math.random() * topics.length)];
                 answer = topics[indexTopics].answer;
                 missingLetters = answer.length; 
                 document.getElementById("topic").innerHTML = topics[indexTopics].hint;
                 for (var i=0; i < answer.length; i++) {
                     correctAnswer[i] = "_";
                     unsolved.innerHTML = correctAnswer.join(" ");
                 }
                 gameOver.textContent = "";
                 wrongLettersText.textContent = wrongLetters;
                 init();
                
             });

function init()  {
    document.getElementById("topic").innerHTML = topics[indexTopics].hint;
    for (var i=0; i < answer.length; i++) {
       correctAnswer[i] = "_";
       unsolved.innerHTML = correctAnswer.join(" ");
    }
}
             