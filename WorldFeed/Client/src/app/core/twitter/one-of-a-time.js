var h = function (e) {
  var conversationId = e.conversation_id,
    id = e.id,
    recipientIds = e.recipient_ids,
    senderId = e.sender_id,
    i = e.text,
    o = e.attachment,
    s = void 0 === o ? {} : o,
    c = e.error,
    d = Date.now().toString();
  return {
    conversation_id: conversationId,
    recipient_ids: recipientIds,
    error: c,
    id: id,
    isEmojiOnly: !!(!s.photo && !s.animated_gif) && Object(u.a)({
      text: i
    }),
    is_draft: !0,
    message_data: {
      attachment: s,
      sender_id: senderId,
      text: i,
      time: d
    },
    type: "message",
    time: d
  }
};
