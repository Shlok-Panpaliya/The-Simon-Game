var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];

var level = 0;

var started = false;

var userClickedPattern = [];

$(document).keypress(function(){
    if(!started)
    {
        $("#level-title").text("Game Starts");
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){

    var userChosenColor = $(this).attr("id");
    
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePressed(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

function playSound(userColor)
{
    var audio = new Audio("sounds/" + userColor + ".mp3");
    audio.play();
}

function animatePressed(currColor)
{
    $("#" + currColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currColor).removeClass("pressed");
    },100);
}

function nextSequence()
{
    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
   
    var randomChosenColor = buttonColors[randomNumber];
   
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);


}
function checkAnswer(currLevel)
{
    if(gamePattern[currLevel] === userClickedPattern[currLevel])
    {
        console.log("success");

    if(userClickedPattern.length === gamePattern.length)
    {
        setTimeout(function(){
            nextSequence();
        },1000);
    }}
    else{
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){

            $("body").removeClass("game-over");
        },300 );
        $("#level-title").text("Game Over .Press any Key to Restart");
        startOver();
    }

}

function startOver()
{
    started = false;
    level = 0;
    gamePattern = [];
}

