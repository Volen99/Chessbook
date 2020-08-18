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