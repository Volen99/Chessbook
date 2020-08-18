// this class manage logo game

function CLogo(iX, iY, oParentContainer) {

    var _oParenContainer = oParentContainer;
    var _oLogo;

    this._init = function (iX, iY) {
        var oSprite = s_oSpriteLibrary.getSprite("logo");
        _oLogo = createBitmap(oSprite);
        _oLogo.regX = oSprite.width * 0.5;
        _oLogo.regY = oSprite.height * 0.5;
        _oLogo.x = iX;
        _oLogo.y = iY;

        _oParenContainer.addChild(_oLogo);
    };

    this.animLogo = function () {
        createjs.Tween.get(_oLogo).to({y: CANVAS_HEIGHT_HALF - 100}, 1000, createjs.Ease.bounceOut);
    };

    this._init(iX, iY);
    return this;
}
