$(document).ready(function(){

    //event listeners
    $("remaining-time").hide();
    $("start").on('click', trivia.startGame);
    $document).on('click', 'option', trivia.guessChecker);

})

var trivia = {
    //trivia properties
    correct: 0,
    incorrect: 0,
    unanswered:0,
    timer: 20,
    timerOn: false,
    timerId: '',

    // questions options and answer data
    questions: {
        q1: "What is the name of Han Solo's ship?",
        q2: 'What is the famous weapon used by Jedi Knights?',
        q3: 'Which young Jedi Knight becomes Darth Vader?',
        q4: 'What planet is home to Chewbacca and the Wookiees?',
        q5: "Who is Luke and Leia's mother?",
        q6: 'What bounty hunter caputure Han Solo?',
        q7: "What color is Mace Windu's lightsaber?"
    },

    options: {
        q1: ['Ghost', 'TIE fighter', 'X-wing', 'Millennium Falcon'],
        q2: ['Blaster', 'Slingshot', 'Lightsaber', 'Bazooka'],
        q3: ['Anakin Skywalker', 'Obi-Wan Kenobi', 'Temiri Blagg', "Kitster Chanchani Banai" ],
        q4: ['Tatooine', 'Naboo', 'Alderaan', 'Kashyyyk'],
        q5: ['Rey', 'Padme Amidala', 'Ahsoka Tano', 'Rose Tico'],
        q6: ['Boba Fett', 'Zam Wesell', 'Bossk', 'Cad Bane'],
        q7: ['red', 'yellow', 'purple', 'blue'],

    },

    answers: {
        q1: 'Millennium Falcon',
        q2: 'Lightsaber',
        q3: 'Anakin Skywalker',
        q4: 'Kashyyyk',
        q5: 'Padme Amidala',
        q6: 'Boba Fett',
        q7: 'purple'

    },
        // trivia methods
        // methos to initialize game
    startGame: function (){
        // restarting game results
        trivia.currentSet = 0;
        trivia.correct = 0;
        trivia.incorrect = 0;
        trivia.unanswered = 0;
        clearInterval(trvia.timerId);

        //show game section
        $('#game').show();

        //empty last results
        $('#results').html('');

        // show timer
        $('#timer').text(trivia.timer);

        //remove start button
        $('#start').hide();

        $('#remaining-time').show();

        //ask first question
        trivia.nextQuestion();

    },

    //methid to loop through and display questions and options
    nextQuestion : function() {
        //set timer to 20 seconds each question
        trivia.timer = 10;
            $('#timer').removeClass('last-second');
            $('#timer').text(trivia.timer);

        // to prevent timer speed up
        if(!trivia.timerOn){
            trivia.timerId = setInterval(trivia.timerRunning, 1000);
        }

        //gets all the questions then indexes the current questions
        var questionContent = Object.values(trivia.questions) [trivia.currentSet];
        $('#question').text(questionContent);

        // an array of all the user options for the current question
        var questionOptions = Object.values(trivia.options) [trivia.currentSet];

        //creates all the trivia guess options in the html
        $.each(questionOptions, function(index, key){
            $('#options').append($('<button class="option btn btn-warning btn-lg">'+key+'</button>'));
        })
    },

        //method to decrement counter and count unanswered if timer runs out
        timerRunning : function(){
            // if timer still has time left and there are still questions left to ask
            if(trivia.timer> -1 && trivia.currentSet < Object.keys(trvia.questions).length){
                $('#timer').text(trivia.timer);
                trivia.timer--;
                    if(trivia.timer === 4){
                        $('#timer').addClass('last-seconds');
                    }
            }

            // the time has run out and increment unanswered, run result
            else if(trivia.timer === -1){
                trivia.unanswered++;
                trivia.result = false;
                clearInterval(trivia.timerId);
                resultID = setTimeout(trivia.guessResult, 1000);
                $('#results').html('<h3>Out of time! The answer was' + Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
            }

            //if all the questions have been shown end the game, show results
            else if(trivia.currentSet === Object.keys(trivia.questions).length){

                //adds results of game (correct, incorrect, unanswred) to the page
                $('#results')
                    .htm('<h3>Thank you for playing!</h3>'+
                    '<p>Correct: '+ trivia.correct +'</p>'+
                    '<p>Incorrect: '+ trivia.incorrect +'</p>'+
                    '<p>Unaswered: '+ trivia.unanswered +'</p>'+
                    '<p>Please play again!</p>');
            }

        }






}