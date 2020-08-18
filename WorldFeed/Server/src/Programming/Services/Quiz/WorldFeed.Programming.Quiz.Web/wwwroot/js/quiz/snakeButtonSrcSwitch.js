let snakeBtnElement = $("#snake-btn");
snakeBtnElement.on('mouseover', (ev) => {
    ev.target.src = "../gifs/snake-btn.gif";
    snakeBtnElement.on('mouseleave', (mouseLeaveEvent) => {
        ev.target.src = "/images/snake-btn.png";
    })
});