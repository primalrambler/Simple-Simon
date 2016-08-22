"use strict";

// $(document).ready(function(){

/* --------- GLOBAL VARIABLES --------- */

//   Building Blocks  //
    var displayDelays = {};  // timing delays between each button lighting up
        displayDelays.dude = 600;
        displayDelays.bro = 500;
        displayDelays.beast = 400;
    
    var roundDelays = {};  // timing delays between rounds
        roundDelays.dude = 750;
        roundDelays.bro = 400;
        roundDelays.beast = 200;
    
    var animateDurations = {};  // total button lighting animation durations
        animateDurations.dude = 400 ;
        animateDurations.bro = 300;
        animateDurations.beast = 200;

    var messages = {};  // consolidated messaging center
        messages.gameOver = function (){$('.message-area').html('GAME OVER')};
        messages.roundNumber = function(){$('.message-area').html('ROUND: '+ playRound)};
        messages.noRound = function(){$('.message-area').empty()};
        messages.noMessage = function(){$('.message-area').empty()};

    var jQselectors = [$('#green'), $('#red'), $('#blue'), $('#yellow')];
    
// Initial Values  //
    var delay = displayDelays.dude;
    var duration = animateDurations.dude;
    var roundDelay = roundDelays.dude
    var playRound = 1;
    var challengeSequence = []; //challenge button sequence
    var buttonPressIndex = 0;  //counter for checking button pressed against challenge Sequence
    var gameOverBool = false;  //used to disable button checking after losing the game. players
                              // can still light the buttons up but game won't start until Play button pushed


/* --------- FUNCTIONS --------- */

//  Helper Functions   //

    function lightUpButton (colorIndex) {   //button lighten/dimming
        var color = jQselectors[colorIndex];
        color.animate({opacity: 1}, duration);
        color.animate({opacity: 0.75}, duration * 0.33);
    }

    function lightThemUp(challengeSequence){  //lights up the challenge Sequence
        var i = 0;
        var timer = setInterval(function() {
            lightUpButton(challengeSequence[i]);
            i += 1;         
            if(i >= challengeSequence.length){
                    clearInterval(timer);
            }
        }, delay);
    }


    function challengeSequenceGenerator (){  
        var randomButton = Math.floor((Math.random() * (jQselectors.length)));
        challengeSequence.push(randomButton);
        console.log('challenge sequence is ' + challengeSequence);
    }

    function buttonDown (el){               // light up button pushed
        var colorIndex = el.attr('value');
        var color = jQselectors[colorIndex];
        color.animate({opacity: 1}, 200);
    }

   function buttonUp (el){                  // dim the pushed button
        var colorIndex = el.attr('value');
        var color = jQselectors[colorIndex];
        color.animate({opacity: .75}, 200);
        console.log('the color value is ' + colorIndex);
    }

    function gameMode (){  //sets the play difficulty based on the number of rounds played
        if (playRound < 6) {                            // default game play speed
            delay = displayDelays.dude;
            duration = animateDurations.dude;
            roundDelay = roundDelays.dude;
        } else if (playRound >= 6 && playRound < 15){   //next harder level game play
            delay = displayDelays.bro;
            duration = animateDurations.bro;
            roundDelay = roundDelays.bro;
        } else {                                        //beast mode
            delay = displayDelays.beast;
            duration = animateDurations.beast;
            roundDelay = roundDelays.beast;
        }
    }
    

//  Gaming Functions  //

    function startGame () {  
        initializeGame();
        var timeoutId = setTimeout(function(){
            startRound();  
        },1500);     //timed delay for player to focus on first button
    }


    function startRound (){  
        buttonPressIndex = 0;
        challengeSequenceGenerator();
        messages.roundNumber();
        setTimeout(function(){
            lightThemUp(challengeSequence); }, roundDelay);
    }

    function initializeGame (){  // resets all global variables and clear messages
        //reset global variables
        gameMode();
        playRound = 1;
        challengeSequence = []; //button sequence
        buttonPressIndex = 0;
        gameOverBool = false;

        //pass/clear messages
        messages.noMessage();
    }


    function endGame (){
        gameOverBool = true;  //disable mouse events until play game pressed
        messages.noRound();
        messages.gameOver();
    }


    function checkButtonPress (button){
        if (button.attr('value') == challengeSequence[buttonPressIndex]){
            buttonPressIndex +=1;
        } else {
            endGame();
            console.log('button did not match');
        }
        if (buttonPressIndex == challengeSequence.length){
            playRound += 1;
            startRound();
        }
    }


/* --------- EVENT LISTENERS --------- */

    $('.play-btn').mousedown(function(){  //listener for lighting button up
        buttonDown($(this));
    });

    $('.play-btn').mouseup(function(event){  //listerner for dimming button and checking correct play sequence
        buttonUp($(this));
        if (gameOverBool == false) {
            checkButtonPress($(this));
            console.log('button pressed');
        }
    });

    $('#play-game').click(function(){  //starts game play
        console.log('play game button pressed');
        startGame();
    });


// });