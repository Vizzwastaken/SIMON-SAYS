var buttonColors=["red","green","blue","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;
document.addEventListener("keydown",function(event)
{
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function nextSequence()
{
    userClickedPattern=[];
    level ++;
    $("#level-title").text("Level " + level);

    var randomnumber=Math.floor(Math.random()*4);
    var randomcolorchosen=buttonColors[randomnumber];
    gamePattern.push(randomcolorchosen);
    // console.log(gamePattern);
    var btnid="#"+randomcolorchosen;
    $(btnid).fadeOut(100).fadeIn(100);
    playsound(randomcolorchosen);

}

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        // console.log("success");
        // console.log(gamePattern.length);
        // console.log(userClickedPattern.length);
        if(gamePattern.length === userClickedPattern.length)
        {

            setTimeout(function () {
                nextSequence();
              }, 1000);              
        }
    }
    else
    {
        // console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over"); 
        },200);
        $("#level-title").text("Game over, Press any key to restart");
        startover();
       
    }
}

function playsound(name)
{
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function buttonanimate(currentcolor)
{
    var clrid="#"+currentcolor;
    $(clrid).addClass("pressed");
    setTimeout(function(){
        $(clrid).removeClass("pressed");
    },100);
    
}


$(".btn").click(function()
{
    var userchosencolor=$(this).attr('id');
    userClickedPattern.push(userchosencolor);
    // console.log(userClickedPattern);
    playsound(userchosencolor);
    buttonanimate(userchosencolor);
    checkAnswer(userClickedPattern.length-1);

});

function startover()
{
    started=false;
    gamePattern=[];
    level=0;   
}

