// this class show help panel

function CHelpPanel(iXPos, iYPos, oSprite) {
    var _oHelpBg;
    var _oGroup;
    var _oFade;
    var _oHelpMove;
    var _oHelpEat;
    var _oHelpEnemy;
    var _oListener;

    this._init = function (iXPos, iYPos, oSprite) {
        _oGroup = new createjs.Container();
        _oGroup.x = iXPos;
        _oGroup.y = iYPos;

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.alpha = 0.5;
        _oGroup.addChild(_oFade);

        _oHelpBg = createBitmap(oSprite);
        _oHelpBg.x = CANVAS_WIDTH_HALF;
        _oHelpBg.y = CANVAS_HEIGHT_HALF;
        _oHelpBg.regX = oSprite.width * 0.5;
        _oHelpBg.regY = oSprite.height * 0.5;
        _oGroup.addChild(_oHelpBg);

        var oText1Back = new createjs.Text(TEXT_MOVE, "60px " + FONT_GAME, "#000000");
        oText1Back.textAlign = "center";
        oText1Back.lineWidth = 300;
        oText1Back.lineHeight = 44;
        oText1Back.textBaseline = "middle";
        oText1Back.x = CANVAS_WIDTH * 0.5 - 150;
        oText1Back.y = CANVAS_HEIGHT * 0.5 - 140;
        oText1Back.outline = 4;
        _oGroup.addChild(oText1Back);

        var oText1 = new createjs.Text(TEXT_MOVE, "60px " + FONT_GAME, "#ff6c00");
        oText1.textAlign = "center";
        oText1.textBaseline = "middle";
        oText1.lineWidth = 300;
        oText1.lineHeight = oText1Back.lineHeight;
        oText1.x = oText1Back.x;
        oText1.y = oText1Back.y;
        _oGroup.addChild(oText1);

        _oHelpMove = new CAnimHelp(1, CANVAS_WIDTH_HALF + 220, oText1Back.y + 50, _oGroup);

        var szSprite = "arrow_key";

        var iScale = 0.5;

        if (s_bMobile) {
            szSprite = "arrow";
            iScale = 0.4;
        }

        var oSpriteArrow = s_oSpriteLibrary.getSprite(szSprite);

        var oKeyLeft = createBitmap(oSpriteArrow);
        oKeyLeft.x = CANVAS_WIDTH_HALF + 50;
        oKeyLeft.y = CANVAS_HEIGHT_HALF - 140;
        oKeyLeft.regX = oSpriteArrow.width * 0.5;
        oKeyLeft.regY = oSpriteArrow.height * 0.5;
        oKeyLeft.scaleX = -iScale;
        oKeyLeft.scaleY = iScale;

        _oGroup.addChild(oKeyLeft);

        var oKeyRight = createBitmap(oSpriteArrow);
        oKeyRight.x = CANVAS_WIDTH_HALF + 190;
        oKeyRight.y = oKeyLeft.y;
        oKeyRight.regX = oSpriteArrow.width * 0.5;
        oKeyRight.regY = oSpriteArrow.height * 0.5;
        oKeyRight.scaleX = iScale;
        oKeyRight.scaleY = iScale;

        _oGroup.addChild(oKeyRight);

        var oText2Back = new createjs.Text(TEXT_EAT, "60px " + FONT_GAME, "#000000");
        oText2Back.textAlign = "center";
        oText2Back.lineWidth = 300;
        oText2Back.lineHeight = 44;
        oText2Back.textBaseline = "middle";
        oText2Back.x = CANVAS_WIDTH * 0.5 - 150;
        oText2Back.y = CANVAS_HEIGHT * 0.5 - 20;
        oText2Back.outline = 4;
        _oGroup.addChild(oText2Back);

        var oText2 = new createjs.Text(TEXT_EAT, "60px " + FONT_GAME, "#ff6c00");
        oText2.textAlign = "center";
        oText2.textBaseline = "middle";
        oText2.lineWidth = 300;
        oText2.lineHeight = oText2Back.lineHeight;
        oText2.x = oText2Back.x;
        oText2.y = oText2Back.y;
        _oGroup.addChild(oText2);

        _oHelpEat = new CAnimHelp(2, CANVAS_WIDTH_HALF + 220, CANVAS_HEIGHT_HALF + 37, _oGroup);

        var oText3Back = new createjs.Text(TEXT_AVOID, "60px " + FONT_GAME, "#000000");
        oText3Back.textAlign = "center";
        oText3Back.lineWidth = 300;
        oText3Back.lineHeight = 44;
        oText3Back.textBaseline = "middle";
        oText3Back.x = CANVAS_WIDTH * 0.5 - 150;
        oText3Back.y = CANVAS_HEIGHT * 0.5 + 115;
        oText3Back.outline = 4;
        _oGroup.addChild(oText3Back);

        var oText3 = new createjs.Text(TEXT_AVOID, "60px " + FONT_GAME, "#ff6c00");
        oText3.textAlign = "center";
        oText3.textBaseline = "middle";
        oText3.lineWidth = 300;
        oText3.lineHeight = oText3Back.lineHeight;
        oText3.x = oText3Back.x;
        oText3.y = oText3Back.y;
        _oGroup.addChild(oText3);

        _oHelpEnemy = new CAnimHelp(3, CANVAS_WIDTH_HALF + 220, oText3Back.y + 50, _oGroup);

        s_oStage.addChild(_oGroup);

        var oParent = this;
        _oListener = _oGroup.on("pressup", function () {
            oParent._onExitHelp();
        });
    };

    this.unload = function () {
        s_oStage.removeChild(_oGroup);

        var oParent = this;
        _oGroup.off("pressup", _oListener);
    };

    this._onExitHelp = function () {
        this.unload();
        s_oGame._onExitHelp();
    };

    this.update = function () {
        _oHelpMove.animMonitor();
        _oHelpEat.animMonitor();
        _oHelpEnemy.animMonitor();
    };

    this._init(iXPos, iYPos, oSprite);

    s_oHelp = this;

    return this;
}

var s_oHelp;