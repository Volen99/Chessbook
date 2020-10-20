// this class manage a single piece of snake queue

function CSingleQueue(iXPos, iYPos, iRotation, iType, oParentContainer) {
    var _oSprite;
    var _oLastPos;
    var _oDim;
    var _oParentContainer = oParentContainer;
    var _oTimeline;

    this._init = function (iXPos, iYPos, iType, iRotation) {
        var oSprite = s_oSpriteLibrary.getSprite("snake_parts_" + iType);

        var oData = {// image to use
            images: [oSprite],
            // width, height & registration point of each sprite
            frames: {width: oSprite.width / 2, height: oSprite.height, regX: (oSprite.width / 2) / 2, regY: oSprite.height / 2},
            animations: {body: 0, queue: 1}
        };

        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oSprite = createSprite(oSpriteSheet, "queue", (oSprite.width / 2) / 2, oSprite.height / 2, oSprite.width / 2, oSprite.height);
        _oParentContainer.addChild(_oSprite);

        _oSprite.x = iXPos;
        _oSprite.y = iYPos;
        _oLastPos = {x: iXPos, y: iYPos};

        _oDim = {w: oSprite.width / 2, h: oSprite.height};

        _oSprite.regY += REG_Y_OFFSET_QUEUE;

        _oSprite.rotation = iRotation;

        _oSprite.tickEnabled = false;

        _oParentContainer.addChild(_oSprite);

        _oTimeline = new createjs.Timeline();

        _oTimeline.addTween(createjs.Tween.get(_oSprite).to({scaleX: 1.2}, TIME_EATEN_EFFECT, createjs.Ease.cubicOut).call(function () {
            createjs.Tween.get(_oSprite).to({scaleX: 1}, TIME_EATEN_EFFECT, createjs.Ease.cubicIn);
        }));
    };

    this.changeState = function (szState) {
        _oSprite.gotoAndStop(szState);
    };

    this.getPos = function () {
        return {x: _oSprite.x, y: _oSprite.y};
    };

    this.setRegY = function (iVal) {
        _oSprite.regY = iVal;
    };

    this.getRegY = function () {
        return _oSprite.regY;
    };

    this.unload = function () {
        _oParentContainer.removeChild(_oSprite);
        _oSprite = null;
    };

    this.getLastPos = function () {
        return _oLastPos;
    };

    this.setLastPos = function (iX, iY) {
        _oLastPos.x = iX;
        _oLastPos.y = iY;
    };

    this.setRotation = function (iRotation) {
        _oSprite.rotation = iRotation;
    };

    this.getRotation = function () {
        return _oSprite.rotation;
    };

    this.getObj = function () {
        return _oSprite;
    };

    this.getDim = function () {
        return _oDim;
    };

    this.getEaten = function () {
        return false;
    };

    this.unload = function () {
        createjs.Tween.removeTweens(_oSprite);
        createjs.Tween.get(_oSprite).to({scaleX: 0, scaleY: 0}, 500, createjs.Ease.cubicOut).call(function () {
            _oParentContainer.removeChild(_oSprite);
        });
    };

    this.spawnAnim = function (iWaitTime) {
        _oSprite.scaleX = _oSprite.scaleY = 0;
        createjs.Tween.get(_oSprite).wait(iWaitTime).to({scaleX: 1, scaleY: 1}, TIME_SPAWN_QUEUE, createjs.Ease.cubicOut);
    };

    this.eatenEffect = function (iWaitTime) {
        createjs.Tween.get(this).wait(iWaitTime).call(function () {
            _oTimeline.gotoAndPlay(0);
        });
    };

    this.setScale = function (fScale) {
        _oSprite.scaleX = _oSprite.scaleY = fScale;
    };

    this.stopTimeline = function (iVal) {
        _oTimeline.gotoAndStop(iVal);
    };

    this.setPosition = function (iX, iY) {
        _oSprite.x = iX;
        _oSprite.y = iY;
        _oLastPos.x = iX;
        _oLastPos.y = iY;
    };

    this._init(iXPos, iYPos, iType, iRotation);

    return this;
}
