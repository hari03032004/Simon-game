
var buttonColor= ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level =0;
var started=false;

$(document).keypress(function (e) { 
  if(!started){

    $("#level-title").text("Level "+ level);
    nextSequence();
    started= true;
  }
});


$(".btn").click(function (){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

    console.log("success");

    if(userClickedPattern.length === gamePattern.length){

      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout( function(){
      $("body").removeClass("game-over");
    },200)

    $("h1").text("Game-Over press Any Button to Restart");
    startOver();
  }
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");

  setTimeout(function() {
    $("#"+currentColor).removeClass("pressed");
  }, 100);
}


function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+level);
  var randomNo = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColor[randomNo];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  
  
  playSound(randomChosenColour);
}


function startOver(){
  gamePattern = [];
  started =false;
  userClickedPattern = [];
  level = 0;
}



