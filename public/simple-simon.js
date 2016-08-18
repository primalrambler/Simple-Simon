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

    var jQselectors = [$('.green'), $('.red'), $('.yellow'), $('.blue')];
    
// Initial Values  //
    var delay = displayDelays.dude;
    var duration = animateDurations.dude;
    var playRound = 0;
    var buttonSequence = []; //button sequence


/* --------- FUNCTIONS --------- */

//  Helper Functions   //

    function lightSequenceButton (buttonColor) {
        var color = jQselectors[buttonColor];
        color.animate({opacity: 1}, duration);
        color.animate({opacity: 0.75}, duration * 0.33);
    }

    function lightThemUp(buttonSequence){
        var i = 0;
        var timer = setInterval(function() {
            lightSequenceButton(buttonSequence[i]);
            i += 1;         
            if(i >= buttonSequence.length){
                    clearInterval(timer);
            }
        }, delay);
    }

    function randomButtonGenerator (){
        return Math.floor((Math.random() * (jQselectors.length)));
    }

    function challengeSequence (){
        buttonSequence.push(randomButtonGenerator());
        console.log(buttonSequence);
    }






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


for (var i=0; i<10; i++){
    challengeSequence();
}

// });