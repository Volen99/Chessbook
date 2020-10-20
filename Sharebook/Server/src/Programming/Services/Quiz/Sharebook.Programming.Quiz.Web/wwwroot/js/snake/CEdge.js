// this class manage a edge

function CEdge(iXPos, iYPos, oFlip, oSprite, oParentContainer) {
    var _oEdge;
    var _oParentContainer = oParentContainer;

    this._init = function (iXPos, iYPos, oSprite, oFlip) {

        _oEdge = createBitmap(oSprite);

        _oEdge.x = iXPos;
        _oEdge.y = iYPos;

        if (oFlip.lr === true) {
            _oEdge.scaleX = oFlip.val;
            if (_oEdge.scaleX < 0) {
                _oEdge.regX = oSprite.width;
            }
        } else {
            _oEdge.scaleY = oFlip.val;
            if (_oEdge.scaleY < 0) {
                _oEdge.regY = oSprite.height;
            }
        }
        _oEdge.tickEnabled=false;

        _oParentContainer.addChild(_oEdge);
    };

    this.getPos = function () {
        return {x: _oEdge.x, y: _oEdge.y};
    };

    this.unload = function () {
        _oParentContainer.removeChild(_oEdge);
        _oEdge = null;
    };

    this.getObj = function () {
        return _oEdge;
    };

    this.setPosition = function (iX, iY) {
        _oEdge.x = iX;
        _oEdge.y = iY;
    };

    this._init(iXPos, iYPos, oSprite, oFlip);

    return this;
}

