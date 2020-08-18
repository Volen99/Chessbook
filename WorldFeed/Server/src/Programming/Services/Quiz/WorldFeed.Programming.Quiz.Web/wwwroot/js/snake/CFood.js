// this class manage a food

function CFood(iXPos, iYPos, iRotation, iType, iSection, oSprite, oParentContainer) {
    var _oFood;
    var _oParentContainer = oParentContainer;
    var _oDim;
    var _oText;
    var _iType;
    var _iSection = iSection;
    var _bEaten = false;
    var _isHeart = false;

    this._init = function (iXPos, iYPos, iType, oSprite, iRotation) {
        if (oSprite.szKey === "food_0") {
            let oData = {// image to use
                images: [oSprite],
                // width, height & registration point of each sprite
                frames: { width: oSprite.width / 4, height: oSprite.height, regX: (oSprite.width / 4) / 2, regY: oSprite.height / 2 },
                animations: { apple: 0, orange: 1, cherry: 2, pear: 3 }
            };

            let oSpriteSheet = new createjs.SpriteSheet(oData);
            _oFood = createSprite(oSpriteSheet, 0, (oSprite.width / 4) / 2, oSprite.height / 2, oSprite.width / 4, oSprite.height);
            _oFood.stop();

            _oFood.regX += REG_FOOD_OFFSET[iType].x;
            _oFood.regY += REG_FOOD_OFFSET[iType].y;

            _oDim = { w: oSprite.width / 4 + COLLISION_OFFSET_FOOD[iType].x, h: oSprite.height + COLLISION_OFFSET_FOOD[iType].y };

            _iType = iType;

            _oFood.x = iXPos;
            _oFood.y = iYPos;

            _oFood.rotation = iRotation;

            _oFood.tickEnabled = false;

            _oParentContainer.addChild(_oFood);
        }
        else  {
            _isHeart = true;
            let oData = {// image to use
                images: [oSprite],
                // width, height & registration point of each sprite
                frames: { width: oSprite.width, height: oSprite.height, regX: oSprite.width / 2, regY: oSprite.height / 2 },
                animations: { apple: 0, orange: 1, cherry: 2, pear: 3 }
            };

            let oSpriteSheet = new createjs.SpriteSheet(oData);
            _oFood = createSprite(oSpriteSheet, 0, oSprite.width / 2, oSprite.height / 2, oSprite.width, oSprite.height);
            _oFood.stop();

            _oFood.regX += REG_FOOD_OFFSET[iType].x;
            _oFood.regY += REG_FOOD_OFFSET[iType].y;

            _oDim = { w: oSprite.width + COLLISION_OFFSET_FOOD[iType].x, h: oSprite.height + COLLISION_OFFSET_FOOD[iType].y };

            _iType = iType;

            _oFood.x = iXPos;
            _oFood.y = iYPos;

            _oFood.rotation = iRotation;

            _oFood.tickEnabled = false;

            _oParentContainer.addChild(_oFood);
        }
        
    };

    this.getPos = function () {
        return {x: _oFood.x, y: _oFood.y};
    };

    this.getY = function () {
        return _oFood.y;
    };

    this.getX = function () {
        return _oFood.x;
    };

    this.changeState = function (iState) {
        _oFood.gotoAndStop(iState);
    };

    this.getType = function () {
        return _iType;
    };

    this.getLocalPos = function () {
        return _oFood.localToGlobal(0, 0);
    };

    this.getDim = function () {
        return _oDim;
    };

    this.getEaten = function () {
        return _bEaten;
    };

    this.createTextID = function (iID) {
        _oText = new createjs.Text(iID, "20px " + FONT_GAME, "#ffffff");
//        oText.regX = _oDim.w * 0.5;
//        oText.regY = _oDim.h * 0.5;
        _oText.textAlign = "center";
        _oText.textBaseline = "middle";
        _oText.x = _oFood.x;
        _oText.y = _oFood.y;
        _oParentContainer.addChild(_oText);
    };

    this.eatenAnim = function (oPos) {
        createjs.Tween.get(_oFood).to({x: oPos.x, y: oPos.y, scaleX: 1, scaleY: 1}, 100, createjs.Ease.cubicIn).set({visible: false, scaleX: 1, scaleY: 1});
    };

    this.getID = function () {
        return _oText.text;
    };

    this.getSectionID = function () {
        return _iSection;
    };

    this.setEaten = function (bVal) {
        _bEaten = bVal;
    };

    this.setVisible = function (bVal) {
        _oFood.visible = bVal;
    };

    this.isVisible = function () {
        return _oFood.visible;
    };

    this.unload = function () {
        _oParentContainer.removeChild(_oFood);
        _oFood = null;
    };

    this.getObj = function () {
        return _oFood;
    };

    this.spawnAnim = function (iWaitTime) {
        _oFood.scaleX = _oFood.scaleY = 0;
        createjs.Tween.get(_oFood).wait(iWaitTime).to({scaleX: 1, scaleY: 1}, TIME_FOOD_SPAWN_ANIM, createjs.Ease.elasticOut);
    };

    this.setPosition = function (iX, iY) {
        _oFood.x = iX;
        _oFood.y = iY;


        if (SHOW_FOODS_ID) {
            _oText.x = iX;
            _oText.y = iY;
        }
    };

    this.isHeart = function () {
        return _isHeart;
    }

    this._init(iXPos, iYPos, iType, oSprite, iRotation);

    return this;
}

