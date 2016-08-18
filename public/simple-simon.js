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

    var jQselectors = [$('#green'), $('#red'), $('#yellow'), $('#blue')];
    
// Initial Values  //
    var delay = displayDelays.dude;
    var duration = animateDurations.dude;
    var playRound = 0;
    var buttonSequence = []; //button sequence


/* --------- FUNCTIONS --------- */

//  Helper Functions   //

    function lightUpButton (colorIndex) {
        var color = jQselectors[colorIndex];
        color.animate({opacity: 1}, duration);
        color.animate({opacity: 0.75}, duration * 0.33);
    }

    function lightThemUp(buttonSequence){
        var i = 0;
        var timer = setInterval(function() {
            lightUpButton(buttonSequence[i]);
            i += 1;         
            if(i >= buttonSequence.length){
                    clearInterval(timer);
            }
        }, delay);
    }


    function challengeSequence (){
        var randomButton = Math.floor((Math.random() * (jQselectors.length)));
        buttonSequence.push(randomButton);
        console.log(buttonSequence);
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
    }

    var countdownTimer = 3;
    var timeoutID = setInterval(updateTimer,1000)

    // TODO: This function needs to be called once every second
    function updateTimer() {
        console.log("updateTimer function called")
        console.log(countdownTimer);
        if (countdownTimer == 0) {
            $('.message-area').html('');
            clearInterval(timeoutID);
        } else if (countdownTimer > 0) {
            $('.message-area').html(countdownTimer);
        }
        countdownTimer--;
    }


$('.play-btn').mousedown(function(){
    buttonDown($(this));
});

$('.play-btn').mouseup(function(event){
    buttonUp($(this));
});


/*  function gameOn(){ //future functionality
        playRound = 0;
        buttonSequence = [];
        duration = animateDurations.dude;
    }
*/


/*
    $(document).keyup(function(e){

        if (e.keyCode == buttonSequence[playRound]) {
            playRound += 1;
        } else {
            playRound = 0;
        }

        if (playRound == buttonSequence.length) {
            makeHeadingBlink();
        }
    });
*/


// for (var i=0; i<10; i++){
//     challengeSequence();
// }

// lightThemUp([0,1,2,3]);

// });