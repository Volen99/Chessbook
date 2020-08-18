function CSection(iID, oProp) {
    var _oSection;
    var _iID = iID;
    var _aFoods;

    this._init = function (oProp) {
        _aFoods = new Array();
        _oSection = new createjs.Rectangle(oProp.x, oProp.y, oProp.w, oProp.h);
        this.createDebugShape();
    };

    this.createDebugShape = function () {
        if (SHOW_SECTION_SHAPE) {
            var oShape = new createjs.Shape();
            oShape.graphics.beginFill(getRandomColor()).drawRect(_oSection.x, _oSection.y,
                    _oSection.width, _oSection.height);
            oShape.alpha = 0.5;
            s_oScrollStage.addChild(oShape);
        }
    };

    this.addFood = function (oFood) {
        _aFoods.push(oFood);
    };

    this.removeFood = function (oFood) {
        _aFoods.shift(oFood);
    }

    this.getFoodsSection = function () {
        return _aFoods;
    };

    this.getRect = function () {
        return _oSection;
    };

    this.getID = function () {
        return _iID;
    };

    this._init(oProp);
    return this;
}
