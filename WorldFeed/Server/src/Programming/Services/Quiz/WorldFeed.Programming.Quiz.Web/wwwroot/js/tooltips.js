const buttonsIds = ["#legacy-dude", "#snake-container"]
const tooltipsIds = ["#tooltip-legacy-dude", "#tooltip-snake"];

const buttons = [];
const tooltips = [];

for (var i = 0; i < buttonsIds.length; i++) {
    let buttonCurrent = document.querySelector(buttonsIds[i]);
    if (buttonCurrent !== null) {
        buttons.push(buttonCurrent);
    }
}

for (var i = 0; i < tooltipsIds.length; i++) {
    let tooltipCurrent = document.querySelector(tooltipsIds[i]);
    if (tooltipCurrent !== null) {
        tooltips.push(tooltipCurrent);
    }
}

let popperInstance = null;

function create(button, tooltip) {
    popperInstance = Popper.createPopper(button, tooltip, {
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 8],
                },
            },
        ],
    });
}

function show() {
    let tooltipCurrent = document.querySelector(`#${this.id} + div`); 
    tooltipCurrent.setAttribute('data-show', '');
    create(this, tooltipCurrent);
}

function hide() {
    let tooltipCurrent = document.querySelector(`#${this.id} + div`); 
    tooltipCurrent.removeAttribute('data-show');
    destroy();
}

function destroy() {
    if (popperInstance) {
        popperInstance.destroy();
        popperInstance = null;
    }
}

const showEvents = ['mouseenter', 'focus'];
const hideEvents = ['mouseleave', 'blur'];

showEvents.forEach(event => {
    buttons.forEach(btn => {
        btn.addEventListener(event, show);
    });
});

hideEvents.forEach(event => {
    buttons.forEach(btn => {
        btn.addEventListener(event, hide);
    });
});