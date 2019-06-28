$(document).ready(function(){
  
  $("#remaining-time").hide();
  $("#start").on('click', quiz.startGame);
  $(document).on('click' , '.option', quiz.guessChecker);
  
})

var quiz = {
  
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentSet: 0,
  timer: 20,
  timerOn: false,
  timerId : '',
 
  questions: {
    q1: 'How do you call a function named "myFunction"?',
    q2: 'Is JavaScript case-sensitive?',
    q3:'What will the following code return: Boolean(10 > 9)',
    q4:'How do you create a function in JavaScript?',
    q5:'How to write an IF statement in JavaScript?',
    q6:'How does a FOR loop start?',
    q7:'How do you round the number 7.25, to the nearest integer?',
    q8:'JavaScript is the same as Java.',
    q9:'Which event occurs when the user clicks on an HTML element?',
    q10:'How can you add a comment in a JavaScript?',

  },
  options: {
    q1: ['call myFunction()', 'myFunction()', 'call function myFunction()'],
    q2: ['Yes', 'No'],
    q3: ['Nan','True', 'Fale'],
    q4: ['function = myFunction()', 'function:myFunction()', 'function myFunction()'],
    q5: ['if (i == 5)', 'if i = 5', 'if i = 5 then', 'if i == 5 then'],
    q6: ['for (i = 0; i <= 5)', 'for (i <= 5; i++)', 'for (i = 0; i <= 5; i++)', 'for i = 1 to 5'],
    q7: ['Math.round(7.25)', 'round(7.25)', 'rnd(7.25)', 'Math.rnd(7.25)'],
    q8: ['True', 'False'],
    q9: ['onclick', 'onmouseover', 'onchange', 'onmouseclick'],
    q10: ['//This is a comment', '<!--This is a comment-->', 'This is a comment']
  },      
  
  
  answers: {
    q1: 'myFunction()',
    q2: 'Yes',
    q3: 'True',
    q4: 'function myFunction()',
    q5: 'if (i == 5)',
    q6: 'for (i = 0; i <= 5; i++)',
    q7: 'Math.round(7.25)',
    q8: 'False',
    q9: 'onclick',
    q10:'//This is a comment'
    
  },
  

  startGame: function(){
   
    quiz.currentSet = 0;
    quiz.correct = 0;
    quiz.incorrect = 0;
    quiz.unanswered = 0;
    clearInterval(quiz.timerId);

    $('#game').show();
    $('#results').html('');
    $('#timer').text(quiz.timer);
    $('#start').hide();
    $('#remaining-time').show();
    quiz.nextQuestion();
    
  },
  
  nextQuestion : function(){
    

    quiz.timer = 20;
     $('#timer').removeClass('last-seconds');
    $('#timer').text(quiz.timer);
    if(!quiz.timerOn){
      quiz.timerId = setInterval(quiz.timerRunning, 1000);
    }
    var questionContent = Object.values(quiz.questions)[quiz.currentSet];
    $('#question').text(questionContent);
    var questionOptions = Object.values(quiz.options)[quiz.currentSet];
    $.each(questionOptions, function(index, key){
      $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
    })
    
  },
 
  timerRunning : function(){
    if(quiz.timer > -1 && quiz.currentSet < Object.keys(quiz.questions).length){
      $('#timer').text(quiz.timer);
      quiz.timer--;
        if(quiz.timer === 4){
          $('#timer').addClass('last-seconds');
        }
    }


    else if(quiz.timer === -1){
      quiz.unanswered++;
      quiz.result = false;
      clearInterval(quiz.timerId);
      resultId = setTimeout(quiz.guessResult, 1000);
      $('#results').html('<h3>Out of time! The answer was '+ Object.values(quiz.answers)[quiz.currentSet] +'</h3>');
    }

    else if(quiz.currentSet === Object.keys(quiz.questions).length){
      
      // adds results of game (correct, incorrect, unanswered) to the page
      $('#results')

    
        .html('<h3>Thank you for playing!</h3>'+
        '<p>Correct: '+ quiz.correct +'</p>'+
        '<p>Incorrect: '+ quiz.incorrect +'</p>'+
        '<p>Unaswered: '+ quiz.unanswered +'</p>'+
        '<p>Please play again!</p>');
      
      // hide game sction
      $('#game').hide();
      
      // show start button to begin a new game
      $('#start').show();
    }
    
  },
 
  guessChecker : function() {
    
  
    var resultId;
    var currentAnswer = Object.values(quiz.answers)[quiz.currentSet];
    if($(this).text() === currentAnswer){
        $(this).addClass('btn-success').removeClass('btn-info');
      
      quiz.correct++;
      clearInterval(quiz.timerId);
      resultId = setTimeout(quiz.guessResult, 1000);
      $('#results').html('<h3>Correct Answer!</h3>');
    }
    
    else{

      $(this).addClass('btn-danger').removeClass('btn-info');
      
        quiz.incorrect++;
      clearInterval(quiz.timerId);
      resultId = setTimeout(quiz.guessResult, 5000);
      $('#results').html('<h3>Incorrect Answer! correct answer is: '+ currentAnswer +'</h3>');
    }
    
  },

  guessResult : function(){
    
  
    quiz.currentSet++;
     $('.option').remove();
    $('#results h3').remove();
     // begin next question
    quiz.nextQuestion();
     
  }

}