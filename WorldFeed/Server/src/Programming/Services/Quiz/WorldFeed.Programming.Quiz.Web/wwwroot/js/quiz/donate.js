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