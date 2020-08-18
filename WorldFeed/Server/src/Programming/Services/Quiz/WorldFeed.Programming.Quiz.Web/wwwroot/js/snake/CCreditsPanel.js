// this class show credits panel

function CCreditsPanel() {

    var _oFade;
    var _oPanelContainer;
    var _oButExit;
    var _oLogo;
    var _oHitArea;
    var _oListener;

    var _pStartPanelPos;

    this._init = function () {

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.alpha = 0;
        s_oStage.addChild(_oFade);

        createjs.Tween.get(_oFade).to({alpha: 0.7}, 500);

        _oHitArea = new createjs.Shape();
        _oHitArea.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oHitArea.alpha = 0.01;
        _oListener = _oHitArea.on("click", this._onLogoButRelease);
        s_oStage.addChild(_oHitArea);

        _oPanelContainer = new createjs.Container();
        s_oStage.addChild(_oPanelContainer);

        var oSprite = s_oSpriteLibrary.getSprite('msg_box');
        var oPanel = createBitmap(oSprite);
        oPanel.regX = oSprite.width / 2;
        oPanel.regY = oSprite.height / 2;
        _oPanelContainer.addChild(oPanel);

        _oPanelContainer.x = CANVAS_WIDTH / 2;
        _oPanelContainer.y = CANVAS_HEIGHT / 2;
        _oPanelContainer.alpha = 0;
        _pStartPanelPos = {x: _oPanelContainer.x, y: _oPanelContainer.y};
        createjs.Tween.get(_oPanelContainer).to({alpha: 1}, 500);

        var oTitleS = new createjs.Text(INFO, " 40px " + FONT_GAME, "#000");
        oTitleS.y = -oSprite.height / 2 + 130;
        oTitleS.textAlign = "center";
        oTitleS.textBaseline = "middle";
        oTitleS.lineWidth = 500;
        oTitleS.outline = 4;
        _oPanelContainer.addChild(oTitleS);

        var oTitle = new createjs.Text(INFO, " 40px " + FONT_GAME, "#ff6c00");
        oTitle.y = -oSprite.height / 2 + 130;
        oTitle.textAlign = "center";
        oTitle.textBaseline = "middle";
        oTitle.lineWidth = 500;
        _oPanelContainer.addChild(oTitle);

        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _oButExit = new CGfxButton(315, -155, oSprite, _oPanelContainer);
        _oButExit.addEventListener(ON_MOUSE_UP, this.unload, this);
    };

    this.unload = function () {

        s_oStage.removeChild(_oHitArea);
        _oHitArea.off("click", _oListener);

        _oButExit.block(true);

        createjs.Tween.get(_oFade).to({alpha: 0}, 500);
        createjs.Tween.get(_oPanelContainer).to({alpha: 0}, 500).call(function () {
            s_oStage.removeChild(_oFade);
            s_oStage.removeChild(_oPanelContainer);

            _oButExit.unload();
        });

    };

    this._onLogoButRelease = function () {
    };

    this._onMoreGamesReleased = function () {
    };

    this._init();


}

