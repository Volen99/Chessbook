function CAreYouSurePanel(oParentContainer, heartsEaten) {
    var _oBg;
    var _oMsgStroke;
    var _oMsg;
    var _oButYes;
    var _oButNo;
    var _oContainer;
    var _oParentContainer;
    var _oFade;

    this._init = function () {
        _oContainer = new createjs.Container();
        _oContainer.alpha = 0;
        _oParentContainer.addChild(_oContainer);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.alpha = 0.5;

        _oFade.on("click", function () { });

        _oContainer.addChild(_oFade);

        var oSpriteBg = s_oSpriteLibrary.getSprite('msg_box');

        _oBg = createBitmap(oSpriteBg);
        _oBg.x = CANVAS_WIDTH_HALF;
        _oBg.y = CANVAS_HEIGHT_HALF;
        _oBg.regX = oSpriteBg.width * 0.5;
        _oBg.regY = oSpriteBg.height * 0.5;

        _oContainer.addChild(_oBg);

        _oMsgStroke = new createjs.Text(TEXT_ARE_SURE, "80px " + FONT_GAME, "#000");
        _oMsgStroke.x = CANVAS_WIDTH / 2;
        _oMsgStroke.y = CANVAS_HEIGHT_HALF - 65;
        _oMsgStroke.textAlign = "center";
        _oMsgStroke.textBaseline = "middle";
        _oMsgStroke.outline = 5;
        _oContainer.addChild(_oMsgStroke);

        _oMsg = new createjs.Text(TEXT_ARE_SURE, "80px " + FONT_GAME, "#ff6c00");
        _oMsg.x = CANVAS_WIDTH / 2;
        _oMsg.y = _oMsgStroke.y;
        _oMsg.textAlign = "center";
        _oMsg.textBaseline = "middle";
        _oContainer.addChild(_oMsg);

        _oButYes = new CGfxButton(CANVAS_WIDTH / 2 + 260, CANVAS_HEIGHT * 0.5 + 100, s_oSpriteLibrary.getSprite('but_yes'), _oContainer);
        _oButYes.addEventListener(ON_MOUSE_UP, historyBack);

        _oButNo = new CGfxButton(CANVAS_WIDTH / 2 - 260, CANVAS_HEIGHT * 0.5 + 100, s_oSpriteLibrary.getSprite('but_not'), _oContainer);
        _oButNo.addEventListener(ON_MOUSE_UP, this._onButNo, this);

        function historyBack() {
            let apiControllerCurrent = "UserQuizTokens";
            let isAnonymousUser = $("#user-current").val() === "";
            if (isAnonymousUser) {
                apiControllerCurrent = "AnonymousUser"
            }

            let json = JSON.stringify({ lives: heartsEaten })
            var __RequestVerificationToken = $("input[name=__RequestVerificationToken]")[0].value;
            $.ajax({
                url: `/api/${apiControllerCurrent}/PostIncreaseSnakeLives`,
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: json,
                dataType: 'json',
                headers: { 'X-CSRF-TOKEN': __RequestVerificationToken },
                success: (data) => {
                    history.back();
                }
            });
        }
    };

    this.show = function () {
        s_oGame.unpause(false);
        createjs.Tween.get(_oContainer, { ignoreGlobalPause: true }).to({ alpha: 1 }, 150, createjs.quartOut);
    };

    this.unload = function () {
        createjs.Tween.get(_oContainer, { ignoreGlobalPause: true }).to({ alpha: 0 }, 150, createjs.quartOut).call(function () {
            _oParentContainer.removeChild(_oContainer, _oFade);
        });
    };

    this._onButYes = function () {
        this.unload();
        s_oGame.onExit();
        _oFade.removeAllEventListeners();
    };

    this._onButNo = function () {
        s_oGame.unpause(true);
        this.unload();
        _oContainer.visible = false;
        _oFade.removeAllEventListeners();
    };

    _oParentContainer = oParentContainer;

    this._init();
}