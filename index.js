$(document).ready(function(){
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
  var trivia = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',
    questions: {
      q1: 'How many different Pokemon game regions officially exist?',
      q2: 'Who is the main protagonist of the Legend of Zelda series?',
      q3: 'What is the name of the series of games where you play as a villager in a town of animals?',
      q4: 'Which Nintendo character was in the announcement of the 2020 Olympics in Japan?',
      q5: 'Whate is the name of the series of games where characters from multiple different games come together to participate in a winner-take-all battle?',
    },
    options: {
      q1: ['7', '10', '8', '4'],
      q2: ['Zelda', 'Kass', 'Sion', 'Link'],
      q3: ['Animal Town', 'Animal Crossing', 'Animal Land', 'Harvest Moon'],
      q4: ['Mario', 'Pikachu', 'Sonic', 'Donkey Kong'],
      q5: ['Super Brawl Buddies','Battle Royale','Super Smash Bros','Super Mario Bros'],
    },
    answers: {
      q1: '8',
      q2: 'Link',
      q3: 'Animal Crossing',
      q4: 'Mario',
      q5: 'Super Smash Bros',
    },
    startGame: function(){
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
      $('#game').show();

      $('#results').html('');

      $('#timer').text(trivia.timer);

      $('#start').hide();
  
      $('#remaining-time').show();

      trivia.nextQuestion();
      
    },

    nextQuestion : function(){
      
      trivia.timer = 20;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);

      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }

      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];

      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },
    timerRunning : function(){
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
        $('#results')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Play Again?</p>');

        $('#game').hide();

        $('#start').show();
      }
      
    },
    guessChecker : function() {

      var resultId;

      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];

      if($(this).text() === currentAnswer){
        $(this).addClass('btn-success').removeClass('btn-info');
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 2000);
        $('#results').html('<h3>Correct! Good Job!</h3>');
      }
      else{
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 2000);
        $('#results').html('<h3>Correct Answer: '+ currentAnswer +'</h3>');
      }
      
    },
    guessResult : function(){
      trivia.currentSet++;

      $('.option').remove();
      $('#results h3').remove();

      trivia.nextQuestion();
       
    }
  
  }