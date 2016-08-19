"use strict";

// $(document).ready(function(){

/* --------- GLOBAL VARIABLES --------- */

//   Building Blocks  //
    var displayDelays = {};
        displayDelays.dude = 600;
        displayDelays.bro = 500;
        displayDelays.beast = 400;
    
    var animateDurations = {};  // total button lighting animation durations
        animateDurations.dude = 400 ;
        animateDurations.bro = 300;
        animateDurations.beast = 200;

    var messages = {};
        messages.gameOver = function (){$('.message-area').html('GAME OVER')};
        messages.roundNumber = function(){$('#round').html('ROUND: '+ playRound)};
        messages.noRound = function(){$('#round').empty()};
        messages.noMessage = function(){$('.message-area').empty()};

    var jQselectors = [$('#green'), $('#red'), $('#yellow'), $('#blue')];
    
// Initial Values  //
    var delay = displayDelays.dude;
    var duration = animateDurations.dude;
    var playRound = 1;
    var challengeSequence = []; //challenge button sequence
    var buttonPressIndex = 0;
    var gameOverBool = false;


/* --------- FUNCTIONS --------- */

//  Helper Functions   //

    function lightUpButton (colorIndex) {
        var color = jQselectors[colorIndex];
        color.animate({opacity: 1}, duration);
        color.animate({opacity: 0.75}, duration * 0.33);
    }

    function lightThemUp(challengeSequence){
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

    function buttonDown (el){
        var colorIndex = el.attr('value');
        var color = jQselectors[colorIndex];
        color.animate({opacity: 1}, 200);
    }

   function buttonUp (el){
        var colorIndex = el.attr('value');
        var color = jQselectors[colorIndex];
        color.animate({opacity: .75}, 200);
        console.log('the color value is ' + colorIndex);
    }
    

//  Gaming Functions  //

    function startGame () {
        initializeGame();
        var timeoutId = setTimeout(function(){
            startRound();
        },1500);
    }


    function startRound (){
        buttonPressIndex = 0;
        challengeSequenceGenerator();
        lightThemUp(challengeSequence);
        messages.roundNumber();
    }

    function initializeGame (){
        delay = displayDelays.dude;
        duration = animateDurations.dude;
        playRound = 1;
        challengeSequence = []; //button sequence
        buttonPressIndex = 0;
        gameOverBool = false;
        messages.noMessage();
    }


    function endGame (){
        //disable mouse events until play game pressed
        gameOverBool = true;
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

    $('.play-btn').mousedown(function(){
        buttonDown($(this));
    });

    $('.play-btn').mouseup(function(event){
        buttonUp($(this));
        if (gameOverBool == false) {
            checkButtonPress($(this));
            console.log('button pressed');
        }
    });

    $('#play-game').click(function(){
        console.log('play game button pressed');
        startGame();
    });



// });