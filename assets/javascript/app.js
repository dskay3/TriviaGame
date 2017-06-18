// Dyanmically adjusts the margin-top for the container depending on the size of the body
$(function(){
    var container = $("body");
    container.css("margin-top", (container.height()/4) + "px");
});

// Variables
var counter;
var playGame;
var numCorrect;
var numIncorrect;


// Trivia question objects
var trivia1 = {
    question: "What patronus did Luna Lovegood have?",
    answer1: "A Doe",
    answer2: "A Rabbit",
    answer3: "An Owl",
    answer4: "An Alper",
    answerPic: "assets/images/Luna-Patronus.gif",
    questionPic: "assets/images/luna.jpg"
}

var trivia2 = {
    question: "Who disguised himself as Mad Eye Moody?",
    answer1: "Vincent Crabbe",
    answer2: "Daniel Kim",
    answer3: "Barack Obama",
    answer4: "Barty Crouch Jr.",
    answerPic: "assets/images/barty-crouch-jr.gif",
    questionPic: "assets/images/AlastorMoody.jpg"
}

var trivia3 = {
    question: "What did Albus Dumbledore leave Harry Potter in his will?",
    answer1: "A Macbook Pro",
    answer2: "A Scar Remover",
    answer3: "Quiddich Snitch",
    answer4: "$400 Gift Card to Angus Barn",
    answerPic: "assets/images/snitch.gif",
    questionPic: "assets/images/Albus-Will.jpg"
}

var trivia4 = {
    question: "What did R.A.B stand for?",
    answer1: "Rock a boat",
    answer2: "Run and bleed",
    answer3: "Regulus Arcturus Black",
    answer4: "Ronald Arnold Beasley",
    answerPic: "assets/images/RegulusBlack.jpg",
    questionPic: "assets/images/RAB-locket.jpg"
}

var trivia5 = {
    question: "Who is Harry Potter's girlfriend / wife",
    answer1: "Hermione Granger",
    answer2: "Luna Lovegood",
    answer3: "Katy Perry",
    answer4: "Ginny Weasely",
    answerPic: "assets/images/ginny.gif",
    questionPic: "assets/images/love.gif"
}

// Start button functionality
function start() {
    var startBtn = '<button type="button" class="center" id="startBtn">Click to Start</button>';
    // Adds Start btn to the page
    $("#trivia").append(startBtn);
    // Dynamically adjusts the location of the start button and centers it in the middle of the container
    $("#startBtn").css("left", ($(".container").width()/2.6) + "px");
    // Button functionality when selected
    $("button").click(function() {
        $("#startBtn").animate({height:'toggle'});
        playTrivia();
    });
}

start();

// Trivia Game
function playTrivia() {
    timerReset();

}

// Resets timer
function timerReset() {
    counter = 25;
    playGame = true;
}

// Need function to append the question, questionPic, and answers

// Need function to calculate timer and append timer count

// Need function to increase numCorrect if answer is correct and display answerPic

// Need function to increase numIncorrect if answer is incorrect and display incorrect message

// Need function to display ending results and replay