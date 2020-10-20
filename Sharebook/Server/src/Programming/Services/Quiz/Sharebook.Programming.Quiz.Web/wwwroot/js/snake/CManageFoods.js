// this class manages foods

function CManageFoods(oParentContainer) {
    var _aFoods;
    var _aFoodsOccurrence;
    var _aHeartsOccurrence;
    var _oParentContainer = oParentContainer;
    var _oContainer;
    var _fTimeSpawnFood = INTERVAL_SPAWN_FOOD;

    this._init = function () {
        _oContainer = new createjs.Container();
        _oContainer.tickChildren = false;
        _oParentContainer.addChild(_oContainer);

        _aFoods = new Array();
        _aFoodsOccurrence = new Array();
        _aHeartsOccurrence = new Array();

        this.updateFoodsOccurrence();

        // this.updateHeartsOccurrence();

        this.foodsInSections();

        //this.heartsInSections
    };

    this.foodsInSections = function () {
        var iFoodsForSection = Math.floor(MAX_FOODS_INSTANCE / FIELD_SECTION_SUBDIVISION.tot);
        var aSections = s_oManageSections.getSections();
        this._spawnRandomFoods(aSections[Math.floor(Math.random() * Math.floor(s_oManageSections.getSections().length))]);
        for (var i = 0; i < aSections.length; i++) {
            for (var j = 0; j < iFoodsForSection; j++) {
                this._spawnRandomFoods(aSections[i]);
            }
        }
    };

    this.heartsInSections = function () {
        var aSections = s_oManageSections.getSections();
        this._spawnRandomFoods(aSections[Math.floor(Math.random() * Math.floor(s_oManageSections.getSections().length))]);
    };

    this.updateFoodsOccurrence = function () {
        for (var i = 0; i < FOODS_OCCURRENCE.length; i++) {
            for (var j = 0; j < FOODS_OCCURRENCE[i]; j++) {
                _aFoodsOccurrence.push(i);
            }
        }
    };

    this.updateHeartsOccurrence = function () {
        for (var i = 0; i < HEARTS_OCCURRENCE.length; i++) {
            for (var j = 0; j < HEARTS_OCCURRENCE[i]; j++) {
                _aHeartsOccurrence.push(i);
            }
        }
    };

    this.getFoods = function () {
        return _aFoods;
    };

    var isSpawnHeart = true;
    this._spawnRandomFoods = function (oSection) {
        var iRandType = Math.floor(Math.random() * _aFoodsOccurrence.length);

        var spawnTypeCurrent = "food_"

        if (isSpawnHeart) {
            spawnTypeCurrent = "beating_robot_heart_";

            isSpawnHeart = false;
        }
        else {
            spawnTypeCurrent = "food_";
        }

        var iXRand;
        var iYRand;
        var oSprite = s_oSpriteLibrary.getSprite(spawnTypeCurrent + _aFoodsOccurrence[iRandType]);
        var iState = Math.floor(Math.random() * FOOD_STATE[_aFoodsOccurrence[iRandType]]);

        var iWidth = oSprite.width / 4;
        var iHeight = oSprite.height;

        var iOffsetX = iWidth * 2;
        var iOffsetY = iHeight * 2.2;

        var bCheckCol = true;
        var k = 0;

        while (bCheckCol) {
            iXRand = (Math.random() * ((oSection.getRect().x + oSection.getRect().width - iOffsetX) - (oSection.getRect().x + iOffsetX))) + oSection.getRect().x + iOffsetX;
            iYRand = (Math.random() * ((oSection.getRect().y + oSection.getRect().height - iOffsetY) - (oSection.getRect().y + iOffsetY))) + oSection.getRect().y + iOffsetY;
            //console.log(k);
            for (var j = 0; j < _aFoods.length; j++) {
                bCheckCol = this.checkCollisionFoodToObject(_aFoods[j], iWidth, iXRand, iYRand);
                if (bCheckCol) {
                    break;
                }
            }

            if (!bCheckCol) {
                var aSnakes = s_oGame.getSnakesArray();
                for (var i = 0; i < aSnakes.length; i++) {
                    bCheckCol = this.checkCollisionFoodToObject(aSnakes[j], aSnakes.getDim().h, iXRand, iYRand);
                    if (bCheckCol) {
                        break;
                    }
                }
            }

            if (k === MAX_FOODS_INSTANCE || !bCheckCol) {
                break;
            }
            k++;
        }

        // oPos1, oPos2, iDim1, iDim2
        // console.log(oSection.getRect());
        var oFood = new CFood(iXRand, iYRand, 0, _aFoodsOccurrence[iRandType], oSection.getID(), oSprite, _oContainer);
        oFood.changeState(iState);
        _aFoods.push(oFood);//iXPos, iYPos, iRotation, iType, oSprite, oParentContainer
        oSection.addFood(oFood);

        if (SHOW_FOODS_ID) {
            oFood.createTextID(_aFoods.length);
        }

    };

    this.checkCollisionFoodToObject = function (oObj, iRadius, iXRand, iYRand) {
        if (s_oGame.circleToCircleCollision({x: iXRand, y: iYRand}, oObj.getPos(), iRadius, oObj.getDim().w)) {
            return true;
        }
        return false;
    };

    this.unload = function () {
        _oParentContainer.removeChild(_oContainer);
        _oContainer = null;
    };

        //RESPAWN BY SECTION JUST SEE A SECTION WHERE LACK OF FOOD PUT IT BACK AND BREAK MAKE SHUFFLE
    this.restoresEatenFood = function () {
        var aSection = s_oManageSections.getSections();
        var aShuffleSec = s_oManageSections.getSectionIDShuffle();
        for (var i = 0; i < aShuffleSec.length; i++) {
            var aFoods = aSection[aShuffleSec[i]].getFoodsSection();
            for (var j = 0; j < aFoods.length; j++) {
                let foodCurrent = aFoods[j];
                if (foodCurrent.getEaten()) {
                    foodCurrent.setEaten(false);
                    var bCheckCol = true;
                    var k = 0;
                    var iXRand;
                    var iYRand;

                    var sectionIndex = i;
                    if (foodCurrent.isHeart()) {
                        sectionIndex = Math.floor(Math.random() * Math.floor(aShuffleSec.length));
                    }

                    var oSection = aSection[aShuffleSec[sectionIndex]];

                    if (foodCurrent.isHeart()) {
                        aSection[aShuffleSec[i]].removeFood(foodCurrent);
                        aSection[aShuffleSec[sectionIndex]].addFood(foodCurrent);
                    }

                    var iOffsetX = foodCurrent.getDim().w * 2;
                    var iOffsetY = foodCurrent.getDim().h * 2.2;

                    var iOffsetXX = oSection.getRect().width * 2;
                    var iOffsetYY = oSection.getRect().height * 2.2;

                    while (bCheckCol) {
                        iXRand = (Math.random() * ((oSection.getRect().x + oSection.getRect().width - iOffsetX) - (oSection.getRect().x + iOffsetX))) + oSection.getRect().x + iOffsetX;
                        iYRand = (Math.random() * ((oSection.getRect().y + oSection.getRect().height - iOffsetY) - (oSection.getRect().y + iOffsetY))) + oSection.getRect().y + iOffsetY;
                        for (var iA = 0; iA < _aFoods.length; iA++) {
                            bCheckCol = this.checkCollisionFoodToObject(_aFoods[iA], _aFoods[iA].getDim().w, iXRand, iYRand);
                            if (bCheckCol) {
                                break;
                            }
                        }

                        if (!bCheckCol) {
                            var aSnakes = s_oGame.getSnakesArray();
                            for (var iD = 0; iD < aSnakes.length; iD++) {
                                bCheckCol = this.checkCollisionFoodToObject(aSnakes[iD], aSnakes[iD].getDim().w, iXRand, iYRand);
                                if (bCheckCol) {
                                    break;
                                }
                            }
                        }
                        if (k === MAX_FOODS_INSTANCE || !bCheckCol) {
                            break;
                        }
                        k++;

                    }
                    var iState = Math.floor(Math.random() * FOOD_STATE[foodCurrent.getType()]);
                    foodCurrent.setPosition(iXRand, iYRand);
                    foodCurrent.changeState(iState);
                    foodCurrent.spawnAnim(Math.floor(Math.random() * MAXT_TIME_WAIT_FOOD_SPAWN_ANIM));
                    foodCurrent.setVisible(true);
                    return;
                }
            }
        }
    };

    this.restoresAllEatenFood = function () {
        for (var i = 0; i < _aFoods.length; i++) {
            if (_aFoods[i].getEaten()) {
                _aFoods[i].setEaten(false);
                var bCheckCol = true;
                var k = 0;
                var iXRand;
                var iYRand;
                var oSection = s_oManageSections.getSectionByID(_aFoods[i].getSectionID());

                var iOffsetX = _aFoods[i].getDim().w * 2;
                var iOffsetY = _aFoods[i].getDim().h * 2.2;

                while (bCheckCol) {
                    iXRand = (Math.random() * ((oSection.getRect().x + oSection.getRect().width - iOffsetX) - (oSection.getRect().x + iOffsetX))) + oSection.getRect().x + iOffsetX;
                    iYRand = (Math.random() * ((oSection.getRect().y + oSection.getRect().height - iOffsetY) - (oSection.getRect().y + iOffsetY))) + oSection.getRect().y + iOffsetY;
                    for (var j = 0; j < _aFoods.length; j++) {
                        bCheckCol = this.checkCollisionFoodToObject(_aFoods[j], _aFoods[j].getDim().w, iXRand, iYRand);
                        if (bCheckCol) {
                            break;
                        }
                    }

                    if (!bCheckCol) {
                        var aSnakes = s_oGame.getSnakesArray();
                        for (var iD = 0; iD < aSnakes.length; iD++) {
                            bCheckCol = this.checkCollisionFoodToObject(aSnakes[iD], aSnakes[iD].getDim().w, iXRand, iYRand);
                            if (bCheckCol) {
                                break;
                            }
                        }
                    }
                    if (k === MAX_FOODS_INSTANCE || !bCheckCol) {
                        break;
                    }
                    k++;

                }
                _aFoods[i].setPosition(iXRand, iYRand);
                _aFoods[i].spawnAnim(Math.floor(Math.random() * MAXT_TIME_WAIT_FOOD_SPAWN_ANIM));
                _aFoods[i].setVisible(true);
            }
        }
    };

    this.getFood = function (iID) {
        return _aFoods[iID];
    };

    this.updateVisibility = function () {
        for (var i = 0; i < _aFoods.length; i++) {
            if (!_aFoods[i].getEaten()) {
                var oPos = _aFoods[i].getLocalPos();
                if (oPos.x > -_aFoods[i].getDim().w + s_iOffsetX && oPos.x < CANVAS_WIDTH + _aFoods[i].getDim().w - s_iOffsetX
                        && oPos.y > -_aFoods[i].getDim().h + s_iOffsetY && oPos.y < CANVAS_HEIGHT + _aFoods[i].getDim().h - s_iOffsetY) {
                    _aFoods[i].setVisible(true);
                } else {
                    _aFoods[i].setVisible(false);
                }
            }
        }
    };

    this.update = function () {
        this.updateVisibility();

        if (_fTimeSpawnFood > 0) {
            _fTimeSpawnFood -= s_iTimeElaps;
        } else {
            _fTimeSpawnFood = INTERVAL_SPAWN_FOOD;
            this.restoresEatenFood();
        }
    };


    this._init();

    s_oManageFoods = this;

    return this;
}

var s_oManageFoods = null;