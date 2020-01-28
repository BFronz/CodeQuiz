// Set the body to a variable
var body = document.body;

// create all selectors vars
highScoresEl = document.querySelector("#highscores");
formEl       = document.querySelector("#bform");



init();
 

function init() {
  // Loop over every item in object
  var scoreKeeper = JSON.parse(localStorage.getItem("scoreKeeper"));
  var z = 1;

   if(scoreKeeper.length === 0 ) {return;} 

  for (var i = 0; i < scoreKeeper.length; i++) {
  
    var player   = scoreKeeper[i].initials;
    var score    = scoreKeeper[i].score;
    console.log(player + " " + score );

    var li = document.createElement("li");
    var br = document.createElement("br");
    li.textContent = z + " " + player + "    " + score ;
    highScoresEl.appendChild(li);
    //highScoresEl.appendChild(br);
 
    z++; 
  }
}

formEl.addEventListener("click", function(){
  event.preventDefault();
 
  var selected = event.target.id;

  if(selected === "back") { window.location.href = "index.html";   }
  else if (selected === "clear") {
    localStorage.clear();
  }
                             
});







