//  this class manage a tiled background

function CBackground(oParenctContainer) {

    var _oParentContainer = oParenctContainer;
    var _oContainer;
    var _oBgTiling;

    this._init = function () {
        _oContainer = new createjs.Container();
        _oContainer.tickChildren = false;
        _oParentContainer.addChild(_oContainer);

        var matTiling = new createjs.Matrix2D();

        matTiling.a = matTiling.d = 1;

        _oBgTiling = new createjs.Shape();
        _oBgTiling.graphics.beginBitmapFill(s_oSpriteLibrary.getSprite("bg_game"), 'repeat', matTiling).drawRect(0, 0, 3072, 2048);
        _oBgTiling.y = 0;
        _oBgTiling.alpha = 1;

        _oBgTiling.tickEnabled = false;

        _oContainer.addChild(_oBgTiling);
    };

    this._init();
    return this;
}

