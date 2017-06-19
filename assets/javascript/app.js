// Dyanmically adjusts the margin-top for the container depending on the size of the body
$(function(){
    var container = $("body");
    container.css("margin-top", (container.height()/4) + "px");
});

// Trivia question objects
var trivia1 = {
    question: "Which patronus did Luna Lovegood have?",
    correct: "A Rabbit",
    answer1: "A Doe",
    answer2: "An Owl",
    answer3: "An Alper",
    answerPic: "assets/images/Luna-Patronus.gif",
    questionPic: "assets/images/luna.jpg"
}

var trivia2 = {
    question: "Who disguised himself as Mad Eye Moody?",
    answer1: "Vincent Crabbe",
    answer2: "Daniel Kim",
    answer3: "Barack Obama",
    correct: "Barty Crouch Jr.",
    answerPic: "assets/images/barty-crouch-jr.gif",
    questionPic: "assets/images/AlastorMoody.jpg"
}

var trivia3 = {
    question: "What did Albus Dumbledore leave Harry Potter in his will?",
    answer1: "A Macbook Pro",
    answer2: "A Scar Remover",
    correct: "Quiddich Snitch",
    answer3: "$400 Gift Card to Angus Barn",
    answerPic: "assets/images/snitch.gif",
    questionPic: "assets/images/Albus-Will.jpg"
}

var trivia4 = {
    question: "What did R.A.B stand for?",
    answer1: "Rock a boat",
    answer2: "Run and bleed",
    correct: "Regulus Arcturus Black",
    answer3: "Ronald Arnold Beasley",
    answerPic: "assets/images/RegulusBlack.jpg",
    questionPic: "assets/images/RAB-locket.jpg"
}

var trivia5 = {
    question: "Who is Harry Potter's girlfriend / wife?",
    answer1: "Hermione Granger",
    answer2: "Luna Lovegood",
    answer3: "Katy Perry",
    correct: "Ginny Weasely",
    answerPic: "assets/images/ginny.gif",
    questionPic: "assets/images/love.gif"
}

// Variables
var numCorrect;
var numIncorrect;
var choiceContainer = ["", "", "", ""];
var choices = ["", "", "", ""];
var choiceArr;
var triviaObj;
var intervalId;

// Resets variables
function reset() {
    triviaObj = {
        trivia1: trivia1,
        trivia2: trivia2, 
        trivia3: trivia3,
        trivia4: trivia4,
        trivia5: trivia5
    };
    numCorrect = 0;
    numIncorrect = 0;
}

// Timer Object
var timer = {
    remainingTime: 25,
    reset: function() {
        timer.remainingTime = 25;
    },
    countDown: function() {
        if (timer.remainingTime > 0) {
            $("#timerContainer").html('<p>Remaining Time: <span id="timeLeft">'+ timer.remainingTime + "</span></p>");
        } else {
            // $("#timerContainer").html("<p>No more time!</p>");
            setTimeout(function() {
                if (numIncorrect + numCorrect === 5) {
                    endGame();
                } else {
                    incorrect();
                }
            });
        }
        timer.remainingTime--;
    }
}

// Start button functionality
function start() {
    var startBtn = '<button type="button" id="startBtn">Click to Start</button>';
    // Adds Start btn to the page
    $("#trivia-row").append(startBtn);
    // Dynamically adjusts the location of the start button and centers it in the middle of the container
    $("#startBtn").css("left", ($(".container").width()/2.73) + "px");
    // Button functionality when selected
    $("button").click(function() {
        $("#startBtn").animate({height:'toggle'});
        reset();
        playTrivia();
    });
}

// Executes start
start();

// Trivia Game
function playTrivia() {
    timer.reset();

    var activeTrivia = randTopic(triviaObj);
    var testTrivia = triviaObj[activeTrivia];

    genQuestion(testTrivia);
    timerDisplay();
    delete triviaObj[activeTrivia];
}

// Generates random topic
var randTopic = function(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1/++count)
            result = prop;
    return result;
}

// Generates question and answer choices
function genQuestion(trivia) {
    // Empties the div
    $("#trivia-row").empty();

    var question = $("<div>");
    question.attr("id", "questions");
    question.addClass("col-sm-12 text-center");
    question.text(trivia.question);
    $("#trivia-row").append(question);

    choiceArr = [trivia.answer1, trivia.answer2, trivia.answer3, trivia.correct];

    for (var i = 0; i < 4; i++) {
        choiceContainer[i] = $("<div>");
        choiceContainer[i].addClass("col-sm-6 choiceContainer");
        $("#trivia-row").append(choiceContainer[i]);

        choices[i] = $("<button>");
        choices[i].addClass("choiceBtn");
        choices[i].text(choiceArr[i]);
        choices[i].attr("value", choices[i].text());
        choiceContainer[i].append(choices[i]);
    }

    $("button").click(function() {
        if ($(this).text() == trivia.correct) {
            correct();
        } else {
            incorrect();
        }
    });
}

// Executes when selected answer is correct
function correct() {
    clearInterval(intervalId);
    numCorrect++;
    if (numCorrect + numIncorrect < 5) {
        playTrivia();
    } else {
        endGame();
    }
    console.log("correct count " + numCorrect);
}

// Executes when selected answer is incorrect
function incorrect() {
    clearInterval(intervalId);
    numIncorrect++;
    if (numCorrect + numIncorrect < 5) {
        playTrivia();
    } else {
        endGame();
    }
    console.log("incorrect count " + numIncorrect);
}

// Displays results and replay button
function endGame() {
    $("#trivia-row").empty();

    var endContainer = $("<div>");
    endContainer.attr("id", "endContainer");
    endContainer.html('<p class="result">Number Correct: ' + numCorrect + "</p>" + '<p class="result">Number Incorrect: ' + numIncorrect + "</p>");
    $("#trivia-row").append(endContainer);
    
    var replayBtn = $("<button>");
    replayBtn.attr("id", "replayBtn");
    replayBtn.text("Click to Play Again");
    $("#endContainer").append(replayBtn);

    $("#replayBtn").click(function() {
        reset();
        playTrivia();
    });
}

// Creates timer container
function timerDisplay() {
    var timerContainer = $("<div>");
    timerContainer.attr("id", "timerContainer");
    $("#trivia-row").append(timerContainer);

    intervalId = setInterval(timer.countDown, 1000);
    console.log("remaining time: "+ timer.remainingTime);
}

