// Set the body to a variable
var body = document.body;

// create all selectors vars
highScoresEl = document.querySelector("#highscores");
formEl       = document.querySelector("#bform");

//vars
scoreKeeperMsg = [{"initials":"No High Scores Recorded","score":" "}];


init();
 

function init() {
  // Loop over every item in object
  var scoreKeeper = JSON.parse(localStorage.getItem("scoreKeeper"));
  var z =1;
   
  

  if (scoreKeeper != null)  { 
    
    for (var i = 0; i < scoreKeeper.length; i++) {
  
      var player   = scoreKeeper[i].initials;
      var score    = scoreKeeper[i].score;
      console.log(player + " " + score );

      var li = document.createElement("li");
      li.textContent = z + ". " + player + "    " + score ;
      highScoresEl.appendChild(li);
    
       z++;
    }
 }
 else {
      var li = document.createElement("li");
      li.textContent = "Currently there are no highscores. Take the quiz!" ;
      highScoresEl.appendChild(li);

 }


}

formEl.addEventListener("click", function(event){
  var selected = event.target.id;
  

  if(selected === "back") {  
    event.preventDefault();
    window.location.href = "index.html";   
  }
  else if (selected === "clear") {

    localStorage.clear();
  }
                             
});







