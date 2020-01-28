// Set the body to a variable
var body = document.body;

// create all selectors vars
var highscoreEl   = document.querySelector("#highscore");
var gametimerEl   = document.querySelector("#gametimer");
var main          = document.querySelector("#main");
var qformEl       = document.querySelector("#qform");
var hformEl       = document.querySelector("#hform");
var mainheaderEl  = document.querySelector(".main-header");
var maintitleEl   = document.querySelector(".main-title");
var mainmessageEl = document.querySelector(".main-message");
var mainbodyEl    = document.querySelector(".main-body");
var mainbuttonsEl = document.querySelector(".main-buttons");
var mainfooterEl  = document.querySelector(".main-footer");
var mainbtnEL     = document.querySelector(".main-btn"); 
var startEl       = document.querySelector(".btn-start");
var qtimesEl      = document.querySelector(".qtimes");
var quesnoEl      = document.querySelector(".quesno");


// data
var questions = [{
    question: "Which is not a pseudo class?",
    choices: ["active", "hover", "disabled", "selector"],
    answer: "selector"
  }, {
    question: "Javascript is used to program the _______ of web pages.",
    choices: ["content", "behavior", "layout", "cost"],
    answer: "behavior"
  }, {
    question: "Which html element contains meta information about the document?",
    choices: ["head", "body", "div", "article"],
    answer: "head"
  }, {
    question: "Which is not a JavaScript event handler?",
    choices: ["oncklick", "onfocus", "ondrop", "onmouseover"],
    answer: "ondrop"
  }, {
    question: "Which of the following are ways to insert CSS styles into a web page.?",
    choices: ["External", "Inline", "Internal", "All of the above"],
    answer: "All of the above"
  }, {
    question: "getElementById is a DOM _____.",
    choices: ["Object", "Collection", "Method", "Node"],
    answer: "Method"
  }

];


// vars
var gametime = 60000; // 1 minute
var newQuestion    = "";
var newChoices     = [];
var newAnswer      = "";
var questionsTotal = questions.length;
var questionNum    = 0;
var questionCount  = 0;
var newAnswerIndex = 0;
var secondsLeft    = 60;
var haltIt         = 0;
var scoreKeeper   = [];



// some inital set up
hideIt(qformEl);
hideIt(hformEl);
quesnoEl.textContent = questionsTotal;
qtimesEl.textContent = questionsTotal * 10;


// functions
function hideIt(element) {
    element.style.visibility = 'hidden';
}
function showIt(element) {
    element.style.visibility = 'visible';
}
 
function showQuestions(){  
   
    // some set up  
    hideIt(mainbuttonsEl);
    hideIt(maintitleEl);
    showIt(qformEl);
    mainheaderEl.setAttribute("style", "text-align: left;");
    if(questionNum === 0) { setTime(); } 

    // pull data
    newQuestion    = questions[questionNum].question;
    newChoices     = questions[questionNum].choices;
    newAnswer      = questions[questionNum].answer;
    
    
    // QA
    console.log("question #: " + questionNum + " question " + newQuestion);
    console.log("choices: " + newChoices);
    console.log("answer: " + newAnswer);
    console.log("answer index: " + newAnswerIndex );
    console.log("-------------------");
   
    // Display questions & buttomns
    mainheaderEl.textContent = newQuestion;
    for(var i = 0; i<newChoices.length; i++) {   
        var newBtn = document.getElementById(i);
        newBtn.textContent = newChoices[i];
    }     
} 
 
function checkAnswer(btnNum){
    newAnswerIndex = newChoices.indexOf(newAnswer);
    btnNum = parseInt(btnNum);
    
     // OA 
    console.log("question#: " + questionNum +  " correct answer: " + newAnswer + " correct answer index: " +  newAnswerIndex + "  button selected: " + btnNum);
    console.log("-------------------");   

    // check users answer 
    if(btnNum === newAnswerIndex) {
        mainfooterEl.setAttribute("style", "border-top: 1px solid black; ")
        mainfooterEl.textContent = "Correct!";
    } else {
        mainfooterEl.setAttribute("style", "border-top: 1px solid black; ")
        mainfooterEl.textContent = "Wrong!";
        adjustTimer();
    }

   questionNum++; // get next question

   // send  to appropriate function 
   if(questionNum < questionsTotal)   { 
        showQuestions();
    }
    else {
        allDone();
    } 
} 

// timer functions
function setTime() {
    var timerInterval = setInterval(function() {
      secondsLeft--;
      
      if(haltIt == 1){
            clearInterval(timerInterval);
            return;
        }
         
      if(secondsLeft <= 0) {
        clearInterval(timerInterval);
        allDone(); 
      }
      else{
        gametimerEl.textContent = "Time: " + secondsLeft;
      }
    }, 1000);
  }
function adjustTimer(){
    secondsLeft = secondsLeft - 10;
    if(secondsLeft < 10) {
        secondsLeft = 0;
    }
    else{
        secondsLeft =  secondsLeft - 10;
    }
}



// end game
function allDone () {
    haltIt = 1;
    hideIt(qformEl);
    var showScore = secondsLeft;
    if(showScore<0){ showScore = 0 ;}
    mainheaderEl.setAttribute("style", "font-weight:bold; text-align: left;");
    mainheaderEl.textContent = "All Done!"
    mainmessageEl.textContent = "Your final score is " + showScore;
    gametimerEl.textContent = "Time: " + showScore;
    mainfooterEl.setAttribute("style", "border: none; ")
    mainfooterEl.textContent = "";  
    
   if(showScore <= 0) {
    mainfooterEl.textContent = "Please refresh screen and try again!";
   }
   else {
      showIt(hformEl);
   }

  }






// listeners 
startEl.addEventListener("click", showQuestions);

qformEl.addEventListener("click", function(event){
    event.preventDefault();
    var selected = event.target.id;
    checkAnswer(selected);
}); 


hformEl.addEventListener("click", function(event){
  event.preventDefault();

  var x = document.getElementsByClassName("main-message");
  var str = x[0].innerHTML;
  const words = str.split(' ');
  var score = parseInt(words[4].trim());

  var initials = document.querySelector("#hscores-text").value;
  
  if (initials === "") {
    displayMessage("error", "Initals cannot be blank");
  } 

  console.log(initials);
  var storedScores = JSON.parse(localStorage.getItem("scoreKeeper"));
  if (storedScores !== null) {
      scoreKeeper = storedScores;
  }

  


   scoreKeeper.push({initials:initials,score:score});
   localStorage.setItem("scoreKeeper", JSON.stringify(scoreKeeper));
 
    //localStorage.setItem("initials", initials);
    //localStorage.setItem("score", score);

    window.location.href = "highscores.html";  


    

    



});



