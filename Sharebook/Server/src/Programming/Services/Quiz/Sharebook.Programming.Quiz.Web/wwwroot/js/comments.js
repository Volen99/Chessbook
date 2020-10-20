let navigatorElement = document.getElementById('navigator-top');

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function scrollFunction() {
    if (navigatorElement !== null && navigator !== undefined) {
        if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1440) {
            navigatorElement.style.display = "block";
        } else {
            navigatorElement.style.display = "none";
        }
    }
}