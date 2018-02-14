(function () {
    "use strict";
    var availableLetters, words, guessInput, guess, guessButton, lettersGuessed, lettersMatched, output, man, letters, lives, currentWord, numLettersMatched, messages;

    function setup() {
        availableLetters = "abcdefghijklmnopqrstuvwxyz";
        lives = 13;
        words = ["The Good the Bad and the Ugly", "John Wayne movies", "That one with horses", "Django Unchained"];
        messages = {
            win: "Lucky cowpoke here!",
            lose: "Sorry, ya lost!",
            guessed: ": Guessed that letter already, try again...",
            validLetter: "Pls select a letter from A-Z"
        };

        lettersGuessed = lettersMatched = "";
        numLettersMatched = 0;

        
        currentWord = words[Math.floor(Math.random() * words.length)];

        
        output = document.getElementById("output");
        man = document.getElementById("man");
        guessInput = document.getElementById("letter");

        man.textContent = "You have " + lives + " lives remaining";
        output.textContent = "";

        document.getElementById("letter").value = "";

        
        guessButton = document.getElementById("guess");
        guessInput.style.display = "inline";
        guessButton.style.display = "inline";

        
        letters = document.getElementById("letters");
        letters.innerHTML = '<li class="currentWord">Current word:</li>';

        var letter, i;
        for (i = 0; i < currentWord.length; i++) {
            letter = '<li class="letter letter-' + currentWord.charAt(i).toLowerCase() + '">' + currentWord.charAt(i).toUpperCase() + '</li>';
            letters.insertAdjacentHTML("beforeend", letter);
        }
    }

    function gameOver(win) {
        if (win) {
            output.innerHTML = messages.win;
            output.classList.add("win");
        } else {
            output.innerHTML = messages.lose;
            output.classList.add("error");
        }

        guessInput.style.display = guessButton.style.display = "none";
        guessInput.value = "";
    }

    
    window.onload = setup();

    
    document.getElementById("restart").onclick = setup;

    
    guessInput.onclick = function () {
        this.value = "";
    };

    
    document.getElementById("hangman").onsubmit = function (e) {
        if (e.preventDefault) e.preventDefault();
        output.innerHTML = "";
        output.classList.remove("error", "warning");
        guess = guessInput.value;
        guessInput.value = "";
        //guessInput.focus(); tried to focus back to box but wouldn't work
        guess = guess.toLowerCase();
        currentWord = currentWord.toLowerCase();
        //console.log('GUESS', guess)

        
        if (guess) {
            //console.log("valid letter?", availableLetters.indexOf(guess) > -1);
            
            if (availableLetters.indexOf(guess) > -1) {
                //console.log("inside availableLetters.indexOf(guess) > -1")
                
                if ((lettersMatched && lettersMatched.indexOf(guess) > -1) || (lettersGuessed && lettersGuessed.indexOf(guess) > -1)) {
                    output.innerHTML = "" + guess.toUpperCase() + "" + messages.guessed;
                    output.classList.add("warning");
                    //console.log("inside lettersMatched && lettersMatched.indexOf(guess) > -1")
                }
            
                else if (currentWord.indexOf(guess) > -1) {
                    var lettersToShow;
                    lettersToShow = document.querySelectorAll(".letter.letter-" + guess.toLowerCase());
                    //console.log("inside currentWord.indexOf(guess) > -1")

                    for (var i = 0; i < lettersToShow.length; i++) {
                        lettersToShow[i].classList.add("correct");
                    }

                    
                    for (var j = 0; j < currentWord.length; j++) {
                        if (currentWord.charAt(j) === guess) {
                            numLettersMatched += 1;
                        }
                    }

                    lettersMatched += guess;
                    if (numLettersMatched === currentWord.length) {
                        gameOver(true);
                    }
                }
                
                else {
                    lettersGuessed += guess;
                    lives--;
                    man.innerHTML = "You have " + lives + " lives remaining";
                    if (lives === 0) gameOver();
                    //console.log("inside else")
                }
            }
            
            else {
                output.classList.add("error");
                output.innerHTML = messages.validLetter;
                //console.log("inside errorelse")
            }
        }
        
        else {
            output.classList.add("error");
            output.innerHTML = messages.validLetter;
        }
        return false;
    };
}());
