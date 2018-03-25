//countdown timer 20 sec
$(document).ready(function () {

function shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
        // Pick a random index
        let rand = Math.floor(Math.random() * counter);
        counter--;
        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[rand];
        array[rand] = temp;
    }
    return array;
}

var wins = 0;
var loses = 0;

// start button clicked


// question 1 at a time
var url = " https://opentdb.com/api.php?amount=10";    
$.ajax({        
    url: url,
    method: 'GET'    
}).done(function (response) {
    console.log(response.results[0]);

    var question = response.results[0].question;

    //show question
    let h3div = $("<h3>");
    h3div.text(question);
    $("#trivia-questions").append(h3div);

    //show answers
    var answersArray = response.results[0].incorrect_answers;
    var correctAnswer = response.results[0].correct_answer;
    answersArray.push(correctAnswer);
    shuffle(answersArray);
    for (var i = 0; i < answersArray.length; i++) {
        let buttondiv = $("<button>");
        buttondiv.addClass("answers");
        let brdiv = $("<br>");
        buttondiv.text(answersArray[i]);
        $("#trivia-questions").append(buttondiv);
        $("#trivia-questions").append(brdiv);
    }

    $("#trivia-questions").on("click", ".answers", function (event) {


        if ($(this).text == correctAnswer) {
            wins++;
            $("#trivia-questions").html("<h3>Correct!</h3>");
            $("#wins").html("<h2>" + wins + "</h2>");
        } else {
            loses++;
            $("#trivia-questions").html("<h3>Incorrect, the answer is </h3>" + correctAnswer);
            $("#loses").html("<h2>" + loses + "</h2>");

        }
    });



}).fail(function (err) {
throw err;
});

})




// $("#clear-button").on("click", function (event) {
//     console.log("working");
//     event.preventDefault();
//     $("#results").empty();
// });

// possible answers with buttons to click

// don't let player pick more than 1 answer

// if timer is up then answer

// if answer correct, then say, "Correct!", add 1 to wins, and print it
// if (result == correctAnswer) {
//    
// }
// // move to next question

// if not correct, "Sorry, wrong answer, the correct answer is:  correctAnswer", add 1 to loses
// else {
//     loses++;
//     $("#trivia-questions").html("<h3>Incorrect, the answer is </h3>" + correctAnswer);
//     $("#loses").html("<h2>" + loses + "</h2>");
// }
// move to next question

// after 5 questions move to final window

// display window with wins, losses, option to restart without reloading