// Umm... But it works 😎 06.05.2020, Wednesday, ＢＡＤ ＦＥＥＬＩＮＧＳ
function flyUfo() {
    let hearts = ["beating-robot-heart.gif", "beating-red-heart.gif", "beating-white-heart.webp", "shining-beating-heart.webp"];

    setTimeout(() => {
        ufoContainer.remove();
    }, 10000)

    let ufoContainer = $("#ufo-container");
    let ufoElement = $("#img-ufo-ship");
    let ufoAudioElement = $("#ufo-sound");

    ufoAudioElement[0].play();

    ufoContainer.css("animation-play-state", "running");

    let rand = Math.floor(Math.random() * 1200) + 99;
    let id1 = setInterval(checkPosition, 5);
    function checkPosition() {
        if (ufoContainer.position().left > window.innerWidth - rand) {
            clearInterval(id1);
            $("#ufo-beam")[0].play();

            let heartsRandomIndex = Math.floor(Math.random() * Math.floor(hearts.length));
            let droppedHeartTemplate = `<img id="ufo-dropped-heart" src="/gifs/${hearts[heartsRandomIndex]}" alt="beating-robot-heart"/>`;
            ufoContainer.after(droppedHeartTemplate);

            let droppedHeartElement = $("#ufo-dropped-heart");
            droppedHeartElement.css("top", ufoContainer.position().top + "px");
            droppedHeartElement.css("left", ufoContainer.position().left + "px");

            let top = 15;
            let id2 = setInterval(fallDown, 5);

            droppedHeartElement.on("click", (ev) => {
                clearInterval(id2);

                let apiControllerCurrent = "UserQuizTokens";
                let isAnonymousUser = $("#username-current").val() === "";
                if (isAnonymousUser) {
                    apiControllerCurrent = "AnonymousUser"
                }

                $("#poke-sound")[0].play();
                droppedHeartElement.after(`<span id="plus-one-live" style="top: ${droppedHeartElement.position().top}px; left: ${droppedHeartElement.position().left}px;">+1</span>`);
                droppedHeartElement.remove();

                let livesElement = $("#lives-value");
                var __RequestVerificationToken = $("input[name=__RequestVerificationToken]")[0].value;
                $.ajax({
                    url: `api/${apiControllerCurrent}/GetUfoBonusLives`,
                    type: "GET",
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    headers: { 'X-CSRF-TOKEN': __RequestVerificationToken },
                    success: (data) => {
                        let userLivesColor = livesElement.css("color");
                        livesElement[0].textContent = data.lives;
                        livesElement.css("color", "lawngreen");

                        livesElement.animate({
                            'opacity': '0.5'
                        }, 3000, function () {
                            livesElement.css({
                                'color': `${userLivesColor}`,
                                'opacity': '1'
                            });
                        });
                    }
                });

                let plusOneLiveElement = $("#plus-one-live");
                plusOneLiveElement.fadeOut(3000, () => {
                    plusOneLiveElement.remove();
                });
            })
            function fallDown() {
                if (top >= 72) {
                    clearInterval(id2);

                    $("#poke-sound")[0].play();
                    droppedHeartElement.remove();
                } else {
                    top += 0.06;
                    droppedHeartElement.css("top", top + '%');
                }
            }
        }
    }
}