//var chatMessages = []; // haahhahahahaahah :D

//$(document).ready(function () {
//    var connection = new signalR.HubConnectionBuilder()
//        .withUrl("/chat")
//        .build();


//    // I want to register a method, whose name is "NewMessage" and so that the Server can invoke it
//    connection.on("NewMessage",
//        function (message) {
//            let userNameCurrent = $("#username-current").val();
//            let isMeSending = userNameCurrent === message.user.userName;

//            let messageTemplate = '';

//            if (isMeSending) {
//                messageTemplate = `<div class="row msg_container base_sent">
//                                <div class="col-md-10 col-xs-10">
//                                    <div class="messages msg_sent">
//                                        <p id="new-message-sent-${message.id}">
//                                            ${message.text}
//                                        </p>
//                                        <time id="time-sent-${message.id}" datetime="2009-11-13T20:00">${message.user.userName} • 51 min</time>
//                                    </div>
//                                </div>
//                                <div class="col-md-2 col-xs-2 avatar">
//                                    <img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" class=" img-responsive ">
//                                </div>
//                            </div>`;
//            } else {
//                messageTemplate = `<div class="row msg_container base_receive">
//                                <div class="col-md-2 col-xs-2 avatar">
//                                    <img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" class=" img-responsive ">
//                                </div>
//                                <div class="col-md-10 col-xs-10">
//                                    <div class="messages msg_receive">
//                                        <p id="new-message-receive-${message.id}">
//                                            ${message.text}
//                                        </p>
//                                        <time id="time-receive-${message.id}" datetime="2009-11-13T20:00">${message.user.userName} • 51 min</time>
//                                    </div>
//                                </div>
//                            </div>`;
//            }

//            if (chatMessages.length === 0) {
//                chatMessages.push(messageTemplate);
//            }
//            else {
//                $("#msg-container").append(chatMessages.pop());
//                chatMessages = [];
//            }
//        });

//    $("#btn-chat").click(function () {
//        var message = $("#btn-input").val();
//        connection.invoke("Send", message);
//        $("#btn-input").val('');
//    });

//    connection.start().
//        catch(function (err) {
//            return console.error(err.toString());
//        });

//    //function escapeHtml(unsafe) {
//    //    return unsafe
//    //        .replace(/&/g, "&amp;")
//    //        .replace(/</g, "&lt;")
//    //        .replace(/>/g, "&gt;")
//    //        .replace(/"/g, "&quot;")
//    //        .replace(/'/g, "&#039;");
//    //}
//});
//$(document).on('click', '.panel-heading span.icon_minim', function (e) {
//    var $this = $(this);
//    if (!$this.hasClass('panel-collapsed')) {
//        $this.parents('.panel').find('.panel-body').slideUp();
//        $this.addClass('panel-collapsed');
//        $this.removeClass('glyphicon-minus').addClass('glyphicon-plus');
//    } else {
//        $this.parents('.panel').find('.panel-body').slideDown();
//        $this.removeClass('panel-collapsed');
//        $this.removeClass('glyphicon-plus').addClass('glyphicon-minus');
//    }
//});
//$(document).on('focus', '.panel-footer input.chat_input', function (e) {
//    var $this = $(this);
//    if ($('#minim_chat_window').hasClass('panel-collapsed')) {
//        $this.parents('.panel').find('.panel-body').slideDown();
//        $('#minim_chat_window').removeClass('panel-collapsed');
//        $('#minim_chat_window').removeClass('glyphicon-plus').addClass('glyphicon-minus');
//    }
//});
//$(document).on('click', '#new_chat', function (e) {
//    var size = $(".chat-window:last-child").css("margin-left");
//    size_total = parseInt(size) + 400;
//    alert(size_total);
//    var clone = $("#chat_window_1").clone().appendTo(".container");
//    clone.css("margin-left", size_total);
//});
//$(document).on('click', '.icon_close', function (e) {
//    //$(this).parent().parent().parent().parent().remove();
//    $("#chat_window_1").remove();
//});
//$(function () {
//    $("#addClass").click(function () {
//        $('#qnimate').addClass('popup-box-on');
//    });

//    $("#removeClass").click(function () {
//        $('#qnimate').removeClass('popup-box-on');
//    });
//})
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