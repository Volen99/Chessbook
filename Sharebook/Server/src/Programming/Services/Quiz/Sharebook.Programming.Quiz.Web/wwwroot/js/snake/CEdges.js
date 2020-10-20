// this class manages edges

function CEdges(oParentContainer) {
    var _aEdges;
    var _aRectangle;
    var _oParentContainer = oParentContainer;
    var _oContainer;

    this._init = function () {
        _oContainer = new createjs.Container();
        _oParentContainer.addChild(_oContainer);
        _aEdges = new Array();
        _aRectangle = new Array();

        var oSpriteEdgeLR = s_oSpriteLibrary.getSprite("edge_side_lr");
        var oSpriteEdgeUD = s_oSpriteLibrary.getSprite("edge_side_ud");

        var iX = EDGES_PROPERTIES.x;
        var iY = EDGES_PROPERTIES.y;

        var iXLastEdge = iX + oSpriteEdgeLR.height * EDGES_PROPERTIES.w - oSpriteEdgeLR.width;
        SPAWN_FOODS_RANGE.xMax = iXLastEdge - EDGEBOARD_X * 0.5;
        EDGES_PROPERTIES.xMax = iXLastEdge;

        for (var i = 0; i < EDGES_PROPERTIES.h; i++) {
            _aEdges.push(new CEdge(iX, iY, {lr: true, val: 1}, oSpriteEdgeLR, _oContainer));//LEFT
            _aEdges.push(new CEdge(iXLastEdge, iY, {lr: true, val: -1}, oSpriteEdgeLR, _oContainer));//RIGHT
            iY += oSpriteEdgeLR.height;
        }

        SPAWN_FOODS_RANGE.yMax = iY - EDGEBOARD_Y * 0.5;
        EDGES_PROPERTIES.yMax = iY;

        for (var i = 0; i < EDGES_PROPERTIES.w; i++) {
            _aEdges.push(new CEdge(iX, EDGES_PROPERTIES.y,  {lr: false, val: -1}, oSpriteEdgeUD, _oContainer));//UP
            _aEdges.push(new CEdge(iX, iY-23,  {lr: false, val: 1}, oSpriteEdgeUD, _oContainer));//DOWN
            iX += oSpriteEdgeUD.width;
        }

        this.createEdgesCollision(iXLastEdge, iY, oSpriteEdgeLR);
    };

    this.createEdgesCollision = function (iLastX, iLastY, oSprite) {
        var aPoints = [{x: EDGES_PROPERTIES.x, y: EDGES_PROPERTIES.y, w: iLastX + oSprite.height * 0.5, h: oSprite.width-17, normal: new CVector2(0, 1)}, //UP
            {x: EDGES_PROPERTIES.x, y: EDGES_PROPERTIES.y + oSprite.width, w: oSprite.width-20, h: iLastY + oSprite.height * 0.5, normal: new CVector2(1, 0)}, //LEFT
            {x: EDGES_PROPERTIES.x, y: iLastY, w: iLastX + oSprite.height * 0.5, h: oSprite.width, normal: new CVector2(0, -1)}, //DOWN
            {x: iLastX+22, y: EDGES_PROPERTIES.y + oSprite.width, w: oSprite.width, h: iLastY + oSprite.height * 0.5, normal: new CVector2(-1, 0)}]; //RIGHT
        for (var i = 0; i < aPoints.length; i++) {
            _aRectangle.push({rect: new createjs.Rectangle(aPoints[i].x, aPoints[i].y,
                        aPoints[i].w, aPoints[i].h), normal: aPoints[i].normal});

            if (SHOW_COLLISION_SHAPE) {
                var oShape = new createjs.Shape();
                oShape.graphics.beginFill("#00ff00").drawRect(aPoints[i].x, aPoints[i].y,
                        aPoints[i].w, aPoints[i].h);
                oShape.alpha = 0.5;
                _oContainer.addChild(oShape);
            }
        }
    };

    this.getRectangles = function () {
        return _aRectangle;
    };

    this.unload = function () {
        _oParentContainer.removeChild(_oContainer);
        _oContainer = null;
    };

    this.getObj = function () {
        return _oContainer;
    };

    this.setPosition = function (iX, iY) {
        _oContainer.x = iX;
        _oContainer.y = iY;
    };

    this._init();

    return this;
}
