let snakeBtnElement = $("#snake-btn");
snakeBtnElement.on('mouseover', (ev) => {
    ev.target.src = "../gifs/snake-btn.gif";
    snakeBtnElement.on('mouseleave', (mouseLeaveEvent) => {
        ev.target.src = "/images/snake-btn.png";
    })
});
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
                        if (el.value === event.target.value) {
                            el.nextElementSibling.nextElementSibling.style.display = "inline";
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
                            livesElement.text(Number(livesElement.text()) - 1); livesElement.text();
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
(function hovered() {
    $(document).ready(function () {
        if (document.URL.includes("/Quiz")) {
            let eyeGifs = $('.eye-gif-image-container');

            let bamFireGifElements = $('.bam-fire-gif');

            let hasShown = false;
            eyeGifs.on('mouseover', (ev) => {
                let currentEyeGifIdName = ev.currentTarget.firstChild.nextSibling.id;
                let index = 0;
                let side = "left";
                if (currentEyeGifIdName === "right-eye-gif") {
                    index = 1;
                    side = "right";
                }

                let donateTextCurrent = $(`#${side}-donate`);

                if (hasShown === false) {
                    hasShown = true;
                    $(`#${side}-eye-gif`).after(`<img id="bam-fire-gif-${side}" class="bam-fire-gif" src="/Gifs/bam-fire-gif.gif" alt="bam fire gif" />`);

                    donateTextCurrent.fadeIn(750, function () {
                        $(`#bam-fire-gif-${side}`).remove();
                    });
                }
                let fireGifCurrent = $(`#bam-fire-gif-${side}`);

                donateTextCurrent.on("mouseover", (ev) => {
                    fireGifCurrent.remove();
                    donateTextCurrent.fadeIn(1);
                })

                eyeGifs.on('mouseleave', (ev) => {
                    fireGifCurrent.remove();
                    donateTextCurrent.hide();

                    hasShown = false;
                });
            });
        }
    })
})();
async function sendVote(entityId, isUpVote, entityType) {
    let thumbsUpCommentElement = $(`#${entityType}-thumbs-up-${entityId}`);
    let thumbsDownCommentElement = $(`#${entityType}-thumbs-down-${entityId}`);

    let isAnonymousUser = document.getElementById("username-current").value === "";
    if (isAnonymousUser) {
        begToRegister();
        return;
    }

    let token = $(`#${entityType}Form-${entityId} input[name=__RequestVerificationToken]`).val();
    let json = { entityId: entityId, isUpVote: isUpVote, entityType: entityType };
    await $.ajax({
        url: "/api/votes",
        type: "POST",
        data: JSON.stringify(json),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: { 'X-CSRF-TOKEN': token },
        success: function (data) {
            $(`#${entityType}-votes-count-${entityId}`).text(data.votesCount);
            if (entityType === "comment") {
                thumbsUpCommentElement.css("color", `${data.thumbsUpStyle}`);
                thumbsDownCommentElement.css("color", `${data.thumbsDownStyle}`);
            } else if (entityType === "question") {
                thumbsUpCommentElement.attr("src", `${data.thumbsUpStyle}`);
                thumbsDownCommentElement.attr("src", `${data.thumbsDownStyle}`);
            }
        }
    });
}
function begToRegister() {
    let registerAnchorElement = $("#register");
    registerAnchorElement.css("color", "yellow");

    setTimeout(() => {
        registerAnchorElement.css("color", "#9d9d9d");
    }, 650)



    setTimeout(() => {
        registerAnchorElement.css("color", "yellow");
    }, 1300);


    setTimeout(() => {
        registerAnchorElement.css("color", "#9d9d9d");
    }, 1950)

}