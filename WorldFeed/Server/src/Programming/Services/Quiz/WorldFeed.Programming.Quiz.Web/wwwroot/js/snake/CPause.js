// this class show a pause menu

function CPause() {

    var _oContainer;
    var _oFade;
    var _oListener;

    this._init = function () {
        var oContainer = new createjs.Container();
        oContainer.alpha = 0;

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.alpha = 0.5;

        var oHitArea = new createjs.Shape();
        oHitArea.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        _oFade.hitArea = oHitArea;
        _oListener = _oFade.on("click", function () {});

        oContainer.addChild(_oFade);

        var oPauseText = new createjs.Text(TEXT_PAUSE, "80px " + FONT_GAME, "#ff6c00");
        oPauseText.x = CANVAS_WIDTH * 0.5;
        oPauseText.y = CANVAS_HEIGHT * 0.5 - 130;
        oPauseText.textAlign = "center";
        oContainer.addChild(oPauseText);

        var oSpriteContinue = s_oSpriteLibrary.getSprite("but_continue");
        var oButContinue;
        oButContinue = new CGfxButton(CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.5 + 70, oSpriteContinue, oContainer);
        oButContinue.addEventListenerWithParams(ON_MOUSE_UP, this._onLeavePause, this, oContainer);

        s_oStage.addChild(oContainer);

        createjs.Tween.get(oContainer, {ignoreGlobalPause: true}).to({alpha: 1}, 300, createjs.quartOut);

    };

    this.unload = function () {
        _oFade.off("click", _oListener);
        s_oStage.removeChild(_oContainer);
    };

    this._onLeavePause = function (oContainer) {
        createjs.Tween.get(oContainer, {ignoreGlobalPause: true}).to({alpha: 0}, 300, createjs.quartIn).call(function () {
            s_oInterface.unloadPause();
            s_oGame.unpause(true);
        });
    };

    this._init();

    return this;
}