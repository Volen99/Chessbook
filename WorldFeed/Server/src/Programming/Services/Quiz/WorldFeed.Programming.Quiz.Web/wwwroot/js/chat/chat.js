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