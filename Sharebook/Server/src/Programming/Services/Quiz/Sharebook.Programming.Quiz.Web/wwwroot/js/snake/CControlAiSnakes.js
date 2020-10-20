// this class manages AI Enemy Snakes

function CControlAiSnakes() {
    var _aAiSnakes;
    var _aDebugLine;

    this._init = function () {
        this.reset();
    };

    this.addSnakeToAI = function (oSnake) {
        var oSubAI = new CSubAISnake(oSnake, AI_SNAKES[oSnake.getType()].time_follow);
        oSnake.setSubAI(oSubAI);
        _aAiSnakes.push({snake: oSnake, subAI: oSubAI});
        if (SHOW_FIELD_OF_VIEW) {
            var oLineLeft = new createjs.Shape();
            var oLineRight = new createjs.Shape();
            var oLineCenter = new createjs.Shape();
            _aDebugLine.push(new Array());
            _aDebugLine[_aDebugLine.length - 1].push(oLineLeft);
            _aDebugLine[_aDebugLine.length - 1].push(oLineRight);
            _aDebugLine[_aDebugLine.length - 1].push(oLineCenter);
            s_oScrollStage.addChild(oLineLeft, oLineRight, oLineCenter);
        }
    };

    this.manageAI = function (oSnake, oLine) {
        var oInfo = this.fieldOfViewFood(oSnake.snake, oSnake.subAI, oLine);
        if (oInfo.result === AI_FOODS) {
            var iID = this.getFoodCloser(oSnake.snake, oInfo.foods);

            oSnake.subAI.setSoundFollow(false);

            if (!oSnake.snake.getTarget().result) {
                this.setDirectionSnake(oSnake, oInfo.foods[iID], AI_FOODS);
            }
        } else if (oInfo.result === AI_PLAYER && !s_oGame.getPlayerSnake().getEaten()) {
            this.setDirectionSnake(oSnake, oInfo, AI_PLAYER);
            oSnake.subAI.followTime();
            oSnake.subAI.playSoundFollow();
        } else {
            oSnake.subAI.setSoundFollow(false);
            oSnake.subAI.update();
        }
        oSnake.snake.update(SNAKES_AI_SPEED[ oSnake.snake.getType()]);
        //  console.log(oSnake.snake.getPos());
    };

    this.getFoodCloser = function (oSnake, aFoundFoods) {
        var iID = 0;
        var iMin = distanceWithoutSQRT(oSnake.getPos(), aFoundFoods[0].food.getPos());
        for (var i = 1; i < aFoundFoods.length; i++) {
            var fResult = distanceWithoutSQRT(oSnake.getPos(), aFoundFoods[i].food.getPos());
            if (iMin > fResult) {
                iMin = fResult;
                iID = i;
            }
        }
        return iID;
    };

    this.setDirectionSnake = function (oSnake, oInfo, iTypeFollow) {
        //   var oFood = s_oManageFoods.getFood(oInfo.id);
        //  var oDist = {x: oSnake.snake.getX() - oInfo.food.getX(), y: oSnake.snake.getY() - oInfo.food.getY()}
        var fAngle = Math.atan2(oInfo.vect.getY(), oInfo.vect.getX()) * (180 / Math.PI) - 90;
        oSnake.snake.rotate(fAngle);
        oSnake.snake.setTarget({result: true, target: iTypeFollow});
        //    console.log(fAngle);
    };

    this.fieldOfViewFood = function (oSnake, oSubAI, oLines) {
        var aFoundFoods = new Array();

        var vDirPos = new CVector2(oSnake.getDir().getX(), oSnake.getDir().getY());
        var vDirNeg = new CVector2(oSnake.getDir().getX(), oSnake.getDir().getY());

        vDirPos.rotate(AI_ANGLE_DETECT_FOODS);
        vDirNeg.rotate(-AI_ANGLE_DETECT_FOODS);

        //Calculate the magnitude and angle
        var oLinePos = new CVector2(oSnake.getX() + (DISTANCE_AI_DETECT_FOOD * vDirPos.getX()) - oSnake.getX(),
                oSnake.getY() + (DISTANCE_AI_DETECT_FOOD * vDirPos.getY()) - oSnake.getY());
        var oLineNeg = new CVector2(oSnake.getX() + (DISTANCE_AI_DETECT_FOOD * vDirNeg.getX() - oSnake.getX()),
                oSnake.getY() + (DISTANCE_AI_DETECT_FOOD * vDirNeg.getY()) - oSnake.getY());

        var fMagLinePos = oLinePos.length2();

        //  var fAngle = Math.abs(vLine2.angleBetween(vLine3))  //Eliminate directional feature of angle

        if (SHOW_FIELD_OF_VIEW) {
            var oGraphPos = new CVector2(oSnake.getX() - (DISTANCE_AI_DETECT_FOOD * vDirPos.getX()),
                    oSnake.getY() - (DISTANCE_AI_DETECT_FOOD * vDirPos.getY()));
            var oGraphNeg = new CVector2(oSnake.getX() - (DISTANCE_AI_DETECT_FOOD * vDirNeg.getX()),
                    oSnake.getY() - (DISTANCE_AI_DETECT_FOOD * vDirNeg.getY()));

            this.castFieldOfViewLine(oLines[0], oSnake, oGraphPos, "red");
            this.castFieldOfViewLine(oLines[1], oSnake, oGraphNeg, "black");
        }

        var fAngle = oLinePos.angleBetweenVectors(oLineNeg);

        var vCast = new CVector2(0, 0);
        var fAngleNeg, fAnglePos;

        if (!oSubAI.ignorePlayer()) {
            if (!this.countFollowersAI() || oSnake.getTarget().target === AI_PLAYER) {
                var oPlayerSnake = s_oGame.getPlayerSnake();

                vCast.set(oSnake.getX() - oPlayerSnake.getX(), oSnake.getY() - oPlayerSnake.getY());
                fAngleNeg = Math.abs(oLineNeg.angleBetweenVectors(vCast));
                fAnglePos = Math.abs(oLinePos.angleBetweenVectors(vCast));
                if (fAnglePos < fAngle && fAngleNeg < fAngle && fMagLinePos > vCast.length2() /*&& oSnake.getLengthQueue() > oPlayerSnake.getLengthQueue()*/) {
                    return {vect: vCast, result: AI_PLAYER};
                } else {
                    oSnake.setTarget({result: false, target: null});
                }
            }
        }

        var aFoods = s_oManageFoods.getFoods();

        //  console.log(oLinePos.getX() + " " + oSnake.getX());
        for (var i = 0; i < aFoods.length; i++) {
            if (aFoods[i].isVisible()) {
                vCast.set(oSnake.getX() - aFoods[i].getX(), oSnake.getY() - aFoods[i].getY());
                // this.castFieldOfViewLine(oLines[2], oSnake, aFoods[i], "blue");

                //Checking if falls within sector
                //Condition: Magnitude less than mag, angle between particle ang vLine2 less than ang
                fAngleNeg = Math.abs(oLineNeg.angleBetweenVectors(vCast));
                fAnglePos = Math.abs(oLinePos.angleBetweenVectors(vCast));
//            console.log((fAngle) * (180 / Math.PI) + "< " + fAngleNeg * (180 / Math.PI));
                if (fAnglePos < fAngle && fAngleNeg < fAngle && fMagLinePos > vCast.length2()) {
                    aFoundFoods.push({id: i, vect: vCast, result: AI_FOODS, food: aFoods[i]});
                }
            }
        }
        return {foods: aFoundFoods, result: null};
    }
    ;

    this.countFollowersAI = function () {
        var iFollowers = 0;
        for (var i = 0; i < _aAiSnakes.length; i++) {
            if (_aAiSnakes[i].snake.getTarget().target === AI_PLAYER) {
                iFollowers++;
            }
        }
        return iFollowers > MAX_AI_FOLLOW_PLAYER ? true : false;
    };

    this.castFieldOfViewLine = function (oLine, oStart, oFinish, szColor) {
        oLine.graphics.clear();

        oLine.graphics.beginStroke(szColor);
        oLine.graphics.setStrokeStyle(5);
        oLine.graphics.moveTo(oStart.getX(), oStart.getY());
        oLine.graphics.lineTo(oFinish.getX(), oFinish.getY());

        oLine.graphics.closePath();
    };

    this.removeSnakeByID = function (iID) {
        _aAiSnakes.splice(iID, 1);
        if (SHOW_FIELD_OF_VIEW) {
            for (var i = 0; i < _aDebugLine[iID].length; i++) {
                s_oScrollStage.removeChild(_aDebugLine[iID][i]);
            }
        }
    };

    this.reset = function () {
        _aAiSnakes = new Array();
        _aDebugLine = new Array();
    };

    this.update = function () {
        for (var i = 0; i < _aAiSnakes.length; i++) {
            this.manageAI(_aAiSnakes[i], _aDebugLine[i]);
        }
    };


    this._init();

    return this;
}

