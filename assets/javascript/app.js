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
    };

    $("#start-button").on("click", runGame);

    // start button clicked
    function runGame() {
        var correctAnswer;
        var wins = 0;
        var loses = 0;

        $("#wins").html("<h2>" + wins + "</h2>");        
        $("#loses").html("<h2>" + loses + "</h2>");
        
        // questions
        var url = " https://opentdb.com/api.php?amount=20";    
        $.ajax({        
            url: url,
            method: 'GET'    
        }).done(function (response) {

            var questionNumber = 0;
            var aNumber = 0;

            function nextGame() {
                aNumber++;
                console.log("questionNumber " + questionNumber);
                console.log("Next game " + aNumber);
                console.log("wins " + wins);
                console.log("losses " + loses);
                $("#trivia-questions").empty();
                runTimer();

                console.log("question number" + questionNumber);
                if (questionNumber < 10) {

                    var question = response.results[questionNumber].question;
                    // console.log(question);

                    //show question
                    let h3div = $("<h3>");
                    h3div.text(question);
                    $("#trivia-questions").append(h3div);

                    //show answers
                    var answersArray = response.results[questionNumber].incorrect_answers;
                    correctAnswer = response.results[questionNumber].correct_answer;
                    answersArray.push(correctAnswer);

                    //shuffles array
                    shuffle(answersArray);

                    for (var i = 0; i < answersArray.length; i++) {
                        let buttondiv = $("<button>");
                        buttondiv.addClass("answers");
                        let brdiv = $("<br>");
                        buttondiv.text(answersArray[i]);
                        buttondiv.val(answersArray[i]);
                        $("#trivia-questions").append(buttondiv);
                        $("#trivia-questions").append(brdiv);
                    };

                    //listens to answer chosen event, stopTimer
                    $(".answers").on("click", function (event) {
                        event.preventDefault();
                        stopTimer();

                        if ($(this).val() == correctAnswer) {
                            console.log("wins " + wins);
                            wins++;
                            $("#trivia-questions").html("<h3>Correct!</h3>");
                            $("#wins").html("<h2>" + wins + "</h2>");
                            setTimeout(function () {
                                nextGame();
                            }, 2000);
                        } else {
                            console.log("losses " + loses);
                            loses++;
                            $("#trivia-questions").html("<h3>Incorrect, the answer is </h3>" + correctAnswer);
                            $("#loses").html("<h2>" + loses + "</h2>");
                            setTimeout(function () {
                                nextGame();
                            }, 2000);
                        }
                    });

                    questionNumber++;
                    console.log("question incrementing " + questionNumber);

                } else {
                    setTimeout(function () {
                        $("#trivia-questions").empty();
                        $("#trivia-questions").append($("<h2>").text("Game over! Press Start to play again."));

                        stopTimer();
                    }, 2000);

                };
            };


            //  Interval Demonstration
            //  Set our number counter 
            var number = 20;

            //  Variable that will hold our interval ID when we execute
            //  the "run" function
            var intervalId;

            function runTimer() {

                clearInterval(intervalId);
                intervalId = setInterval(decrement, 1000);
            }

            //  The decrement function.
            function decrement() {

                //  Decrease number by one.
                number--;

                //  Show the number in the #show-number tag.
                $("#timer").html("<h3>" + number + "</h3>");


                //  Once number hits zero...
                if (number === 0) {

                    //  ...run the stop function.
                    stopTimer();

                    //  Alert the user that time is up.

                    $("#timer").html("<h3>Time Up!</h3>");

                    setTimeout(function () {
                        nextGame();
                    }, 2000);

                };
            };

            //  The stop function
            function stopTimer() {
                number = 20;
                //  Clears our intervalId
                //  We just pass the name of the interval
                //  to the clearInterval function.
                clearInterval(intervalId);
            };
            nextGame();
        }).fail(function (err) {
            throw err;
        });

    };
});