$(document).ready(function () {
    let submitAnswerBtnElement = $('#submit-answer');
    let nextButtonElement = $('#next-button');
    let currentQuestionDataElement = $('#end-question-stats-component');

    let averageScoreHeading = $('#pass-rate-strong');
    let totalAttemptsHeading = $('#attempts-strong');

    let isAnonymousUser = $("#username-current").val() === "";

    let apiController = "UserQuizTokens";
    if (isAnonymousUser) {
        apiController = "AnonymousUser";
    }

    var __RequestVerificationToken = $("input[name=__RequestVerificationToken]")[0].value;
    submitAnswerBtnElement.on("click", async function (event) {
        let checkedCurrentElement = $("input[name=quiz]:checked");
        if (checkedCurrentElement.length === 0) {
            return;
        }

        let questionId = +event.currentTarget.value;
        let voteElement = $(`#vote-container-questions-${questionId}`);

        submitAnswerBtnElement.css("display", "none");
        nextButtonElement.css("display", "block");
        voteElement.css("display", "block");

        let answerValue = checkedCurrentElement.prop("defaultValue");

        let livesElement = $('#lives-value');

        let json = JSON.stringify({ questionId: questionId, answerValue: answerValue });
        let response = await $.ajax({
            url: '/api/question',
            type: "POST",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            headers: { 'X-CSRF-TOKEN': __RequestVerificationToken },
            success: async (data) => {
                if (data.redirectUrl !== "") {
                    location.href = data.redirectUrl;
                    return;
                }
                averageScoreHeading.text(Number(data.averageScore).toFixed(2) + "%");
                totalAttemptsHeading.text(data.totalAttempts);

                currentQuestionDataElement.css("display", "block");

                $.ajax({
                    url: `/api/${apiController}/GetIncreaseProgress`,
                    type: "GET",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    success: (progressData) => {
                        if (progressData.lives > 0 && progressData.questionsPassed % 5 === 0) {
                            livesElement.text(progressData.lives);
                            livesElement.css("right", "1%");
                        }
                        $("#questions-passed").text(`${progressData.questionsPassed}/1000`);
                    },
                });

                if (data.isQuestionAnsweredCorrectly) {
                    let passedQuestionsValue = Number($('#questions-passed').text().split('/')[0]);

                    if (passedQuestionsValue !== 1000) {
                        let correctAnswer = document.querySelector('input[name=quiz]:checked');
                        correctAnswer.parentElement.classList.add("showRightBox");

                        this.style.display = "none";
                    } else {
                        document.getElementById('button-try-again').hidden = false;
                        submitAnswerBtnElement.css("display", "none");
                    }
                }
                else {
                    let wrongAnswer = document.querySelector('input[name=quiz]:checked');
                    wrongAnswer.parentElement.classList.add("showWrongBox");

                    let inputs = document.querySelectorAll('input[name=quiz]');

                    inputs.forEach(el => {
                        if (el.value === data.correctAnswer) {
                            el.nextElementSibling.nextElementSibling.style.display = "Inline";
                            return el;
                        }
                    });

                    $.ajax({
                        url: `api/${apiController}/GetDecreaseLives`,   
                        type: "GET",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        headers: { 'X-CSRF-TOKEN': __RequestVerificationToken },
                        async: false,
                        success: (data) => {
                            livesElement.text(data.lives);
                            if (data.lives === 1) {
                                document.getElementById("audio-warring").play();

                                document.getElementById("how-much-gif-container").hidden = false;

                                setTimeout(() => {
                                    document.getElementById("how-much-gif-container").hidden = true;
                                }, 2500);
                            }

                            if (data.lives <= 0) {
                                document.getElementById("audio-test-faill").play();
                                nextButtonElement.css("display", "none");
                                $("#button-try-again").show();
                            }
                        }
                    });
                }
            }
        });

        let jsonUserQuizTokens = JSON.stringify({ isQuestionAnsweredCorrectly: response.isQuestionAnsweredCorrectly })
        await $.ajax({
            url: `/api/${apiController}`,
            type: "POST",
            data: jsonUserQuizTokens,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            headers: { 'X-CSRF-TOKEN': __RequestVerificationToken },
            success: (data) => {
                $("#current-streak span").text(`${data.streakCurrent}`);
                $("#best-streak span").text(`${data.streakBest}`);
            }
        });

        await $.ajax({
            url: `api/${apiController}/${questionId}`,
            type: "GET",
            contentType: "application/json; charset=utf-8",
        });
    });

})