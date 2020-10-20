// this class manages the game logic

function CGame(oData) {
    var _pStartScroll;
    var _oPlayerSnake;
    var _oBg;
    var _oInterface;
    var _oEndPanel = null;
    var _oFade;
    var _oFoods;
    var _oEdges;
    var _oAiSnakes;
    var _oSection;
    var _oContainerEdges;
    var _bStartGame = false;
    var _bKeyDown = false;
    var _iScore;
    var _heartsEaten;
    var _iGameState = STATE_INIT;
    var _iSection;
    var _iVelocityStep;
    var _iPlayerSpeed;
    var _iBestScore;
    var _aEnemySnakes;
    var _aSnakes;
    var _fRotationDir;
    var _fLerpCamera = LERP_RATE;
    var _oHitArea;
    var _oListenerMouseDown;
    var _oListenerMouseUp;

    // This function attach on the canvas some game sprites like background (oBg) and the GUI.
    this._init = function () {
        _oContainerEdges = new createjs.Container();
        s_oScrollStage = new createjs.Container();
        s_oStage.addChild(s_oScrollStage);

        _oBg = new CBackground(s_oScrollStage);

        _iScore = 0;
        _heartsEaten = 0;

        _aSnakes = new Array();
        _aEnemySnakes = new Array();

        setVolume("soundtrack", 0.4);

        _iVelocityStep = 0;

        _iSection = 0;

        _fRotationDir = 0;

        _oEdges = new CEdges(_oContainerEdges);

        _oSection = new CManageSections();

        _oFoods = new CManageFoods(s_oScrollStage);

        _oAiSnakes = new CControlAiSnakes();

        _iPlayerSpeed = HERO_SPEED;

        this.createPlayerSnake();

        _iScore = _iBestScore = START_QUEUE_SNAKES[PLAYER];

        this.resetCameraOnPlayer();

        _pStartScroll = { xMax: SCROLL_LIMIT.xMax, xMin: SCROLL_LIMIT.xMin, yMax: SCROLL_LIMIT.yMax, yMin: SCROLL_LIMIT.yMin };

        this.addEnemySnakes();

        s_oScrollStage.addChild(_oContainerEdges);

        if (s_bMobile === false) {
            document.onkeydown = onKeyDown;
            document.onkeyup = onKeyUp;
        } else {
            this.createControl();
        }

        _oInterface = new CInterface();
        _oInterface.refreshScore(_iScore);
        _oInterface.refreshBestScore(_heartsEaten, false);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        s_oStage.addChild(_oFade);

        createjs.Tween.get(_oFade).to({ alpha: 0 }, MS_FADE_TIME, createjs.Ease.cubicOut).call(function () {
            _oFade.visible = false;
        });
    };

    this.resetCameraOnPlayer = function () {
        s_oScrollStage.x += _oPlayerSnake.getDir().getX() * HERO_SPEED + (PLAYER_CAMERA_OFFSET.x - _oPlayerSnake.getLocalPos().x);
        s_oScrollStage.y += _oPlayerSnake.getDir().getY() * HERO_SPEED + (PLAYER_CAMERA_OFFSET.y - _oPlayerSnake.getLocalPos().y);
    };

    // This function is called when user want to exit from the game
    this.unload = function () {
        _bStartGame = false;
        stopSound("soundtrack");

        if (s_bMobile) {
            _oHitArea.off('mousedown', _oListenerMouseDown);
            _oHitArea.off('pressup', _oListenerMouseUp);
        }

        s_oStage.removeAllChildren();
        createjs.Tween.removeAllTweens();
        s_oGame = null;
        _oInterface.unload();

    };

    // This function create player snake with relative settings
    this.createPlayerSnake = function () {
        var iType = PLAYER;
        var oSpritePlayer = s_oSpriteLibrary.getSprite('snake_head_' + iType);
        _oPlayerSnake = new CSnake(HERO_START_X, HERO_START_Y, oSpritePlayer, iType, START_QUEUE_SNAKES[iType], null, s_oScrollStage);
        _aSnakes.push(_oPlayerSnake);
    };

    // This function create a number of enemy snakes defined in settings
    this.addEnemySnakes = function () {
        var iID = 0;
        for (var i = 0; i < AI_SNAKES.length; i++) {
            var iType = AI_SNAKES[i].type;
            var oSpriteSnake1 = s_oSpriteLibrary.getSprite('snake_head_' + iType);
            var oEnemySnake = new CSnake(AI_SNAKES[i].x, AI_SNAKES[i].y, oSpriteSnake1, iType, START_QUEUE_SNAKES[iType], iID, s_oScrollStage);
            _aEnemySnakes.push(oEnemySnake);
            _aSnakes.push(oEnemySnake);

            _oAiSnakes.addSnakeToAI(oEnemySnake);
            iID++;
        }
    };

    this.createControl = function () {
        _oHitArea = new createjs.Shape();
        _oHitArea.graphics.beginFill("rgba(255,0,0,0.01)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(_oHitArea);

        _oListenerMouseDown = _oHitArea.on('mousedown', this.onPressStart);
        _oListenerMouseUp = _oHitArea.on('pressup', this.onPressRelease);
    };

    this.onPressStart = function (evt) {
        if (evt.stageX < CANVAS_WIDTH * 0.5) {
            s_oGame.onLeft();
        } else if (evt.stageX > CANVAS_WIDTH * 0.5) {
            s_oGame.onRight();
        }
    };

    this.onPressRelease = function () {
        s_oGame.onKeyReleased();
    };

    this.onRestart = function () {
        _fRotationDir = 0;
        this.unloadASnake(_oPlayerSnake);

        for (var i = 0; i < _aEnemySnakes.length; i++) {
            this.unloadASnake(_aEnemySnakes[i]);
            _oAiSnakes.removeSnakeByID(i);
        }

        _aSnakes = new Array();
        _aEnemySnakes = new Array();

        _oAiSnakes.reset();

        _bKeyDown = false;

        this.createPlayerSnake();

        this.scrollStage(_oPlayerSnake, _iPlayerSpeed);

        //  this.resetCameraOnPlayer();
        _fLerpCamera = 0.1;
        createjs.Tween.get(this).wait(750).call(function () {
            _fLerpCamera = LERP_RATE;
        });

        this.addEnemySnakes();

        _iScore = _oPlayerSnake.getLengthQueue();
        _oInterface.refreshScore(_iScore);

        playExistingSound("soundtrack");
        s_oScrollStage.setChildIndex(_oContainerEdges, s_oScrollStage.numChildren - 1);

        _oFoods.restoresAllEatenFood();
        _iGameState = STATE_PLAY;
        s_oGame.unpause(true);

    };

    this.unloadASnake = function (oSnake) {
        oSnake.unloadQueue();
        oSnake.unload();
    };

    function onKeyUp(evt) {
        if (_bStartGame === false) {
            return;
        }

        switch (evt.keyCode) {
            case 38:
                case 87:
                s_oGame.onKeyUpUp();
                break;
            case 37:
            case 39:
            case 65:
            case 68:
                _bKeyDown = false;
                break;
        }
    }

    function onKeyDown(evt) {
        if (_bStartGame === false || _bKeyDown) {
            evt.preventDefault();
            return false;
        }

        if (!evt) {
            evt = window.event;
        }

        switch (evt.keyCode) {  
            // left  
            case 37:
                case 65:
                s_oGame.onLeft();
                break;

            //up
            case 38:
                case 87:
                s_oGame.onKeyDownUp();
                break;

            // right  
            case 39:
                case 68:
                s_oGame.onRight();
                break;
        }

        evt.preventDefault();
        return false;
    }

    this.onKeyDownUp = function () {
        if (ALLOW_SPEED_UP) {
            _iPlayerSpeed = HERO_SPEED_UP;
        }
    };

    this.onKeyUpUp = function () {
        _iPlayerSpeed = HERO_SPEED;
    };

    this.getPlayerSnake = function () {
        return _oPlayerSnake;
    };

    this.getSnakesArray = function () {
        return _aSnakes;
    };

    this.onLeft = function () {
        if (_oPlayerSnake.getEaten()) {
            return;
        }
        _bKeyDown = true;

        _fRotationDir = -HERO_ROT_SPEED;
    };

    this.onRight = function () {
        if (_oPlayerSnake.getEaten()) {
            return;
        }
        _bKeyDown = true;

        _fRotationDir = HERO_ROT_SPEED;
    };

    this.onKeyReleased = function () {
        _bKeyDown = false;
    };

    // If the user click on the exit button in the up-right corner, the game returns to the menu screen
    this.onExit = function () {
        _oFade.visible = true;
        createjs.Tween.get(_oFade, { ignoreGlobalPause: true }).to({ alpha: 1 }, MS_FADE_TIME, createjs.Ease.cubicOut).call(function () {
            s_oGame.unpause(true);
            s_oGame.unload();
            $(s_oMain).trigger("end_session");

            playExistingSound("soundtrack");
            setVolume("soundtrack", 1);
            s_oMain.gotoMenu();
        });
    };

    this._onExitHelp = function () {
        _oInterface.onExitFromHelp();
        _bStartGame = true;

        _iGameState = STATE_PLAY;

        $(s_oMain).trigger("start_level", 1);
    };

    this.updateScrollLimit = function (iNewX, iNewY) {
        _pStartScroll.xMax = SCROLL_LIMIT.xMax + iNewX;
        _pStartScroll.xMin = SCROLL_LIMIT.xMin - iNewX;
        _pStartScroll.yMax = SCROLL_LIMIT.yMax + iNewY;
        _pStartScroll.yMin = SCROLL_LIMIT.yMin - iNewY;

    };

    // This function is called every update for center the visual to player snake
    this.scrollStage = function (oFollow) {
        s_oScrollStage.x += oFollow.getDir().getX() * HERO_SPEED + (PLAYER_CAMERA_OFFSET.x - oFollow.getLocalPos().x) * _fLerpCamera;
        s_oScrollStage.y += oFollow.getDir().getY() * HERO_SPEED + (PLAYER_CAMERA_OFFSET.y - oFollow.getLocalPos().y) * _fLerpCamera;

        if (s_oScrollStage.x < _pStartScroll.xMin) {
            s_oScrollStage.x = _pStartScroll.xMin;
        } else if (s_oScrollStage.x > _pStartScroll.xMax) {
            s_oScrollStage.x = _pStartScroll.xMax;
        }

        if (s_oScrollStage.y < _pStartScroll.yMin) {
            s_oScrollStage.y = _pStartScroll.yMin;
        } else if (s_oScrollStage.y > _pStartScroll.yMax) {
            s_oScrollStage.y = _pStartScroll.yMax;
        }
    };

    this.cutQueueAt = function (oSnake1, iQueueCol) {
        oSnake1.cutQueueAtPoint(iQueueCol);
    };

    this.unpause = function (bVal) {
        _bStartGame = bVal;
        createjs.Ticker.paused = !bVal;
    };

    this.snakeCloseMounthAnim = function (oSnake) {
        oSnake.changeState("close");
        oSnake.setIgnoreAnim(true);
        oSnake.onAnimationEnd();
    };

    this.manageCollision = function () {
        this.snakeSection();
        this.snakeFoodsCollision();
        this.snakeEdgesCollision();

        this.snakesCollisions();
    };

    this.snakesCollisions = function () {
        for (var i = 0; i < _aEnemySnakes.length; i++) {
            this.snakesHeadHeadCollision(_oPlayerSnake, _aEnemySnakes[i]);
            this.snakesHeadQueueCollision(_oPlayerSnake, _aEnemySnakes[i]);
        }
    };

    // This function is called every update for head collision between snakes.
    this.snakesHeadHeadCollision = function (oPlayerSnake, oEnemySnake) {
        if (oPlayerSnake.getEaten()) {
            return;
        }
        this.snakeOpenMounth(oPlayerSnake, oEnemySnake);
        if (this.circleToCircleCollision(oPlayerSnake.getPos(), oEnemySnake.getPos(), oPlayerSnake.getDim().h, oEnemySnake.getDim().h)) {
            _bKeyDown = false;
            oPlayerSnake.die();
            createjs.Tween.get(this).wait(MS_TIME_SHOW_WIN_PANEL).call(this.onDiePlayerSnake);

        }
    };

    this.snakesHeadQueueCollision = function (oSnake1, oSnake2) {
        if (oSnake2.getTarget().target !== AI_PLAYER || oSnake1.getEaten()) {
            return;
        }
        var aQueue1 = oSnake1.getQueue();
        for (var j = aQueue1.length - 2; j > 0; j--) {
            this.snakeOpenMounth(oSnake2, aQueue1[j]);
            if (this.circleToCircleCollision(aQueue1[j].getPos(), oSnake2.getPos(), aQueue1[j].getDim().h, oSnake2.getDim().w)) {
                this.cutQueueAt(oSnake1, j);
                if (oSnake1.getCurrentAnimation() !== "damage_open" && oSnake1.getCurrentAnimation() !== "remain_damage") {
                    oSnake1.changeState("damage_open");
                }
                oSnake2.getSubAI().setFollowTime(oSnake2.getSubAI().getFollowTime() - MS_DECREASE_TIME_EATEN_QUEUE);
                oSnake1.screamingSound();
                this.snakeCloseMounthAnim(oSnake2);
                _iScore = oSnake1.getLengthQueue();
                _oInterface.refreshScore(_iScore);
                break;
            }
        }
    };

    this.snakeSection = function () {
        var aSections = _oSection.getSections();
        for (var i = 0; i < _aSnakes.length; i++) {
            for (var j = 0; j < aSections.length; j++) {
                if (aSections[j].getRect().intersects(_aSnakes[i].getRectangle())) {
                    _aSnakes[i].setSectionID(aSections[j].getID());
                    break;
                }
            }
        }
    };

    // This function is called every update for check collision between edges and snakes
    this.snakeEdgesCollision = function () {
        var aEdgesCol = _oEdges.getRectangles();
        for (var j = 0; j < _aSnakes.length; j++) {
            for (var i = 0; i < aEdgesCol.length; i++) {
                if (aEdgesCol[i].rect.intersects(_aSnakes[j].getRectangle())) {
                    _aSnakes[j].bounce(aEdgesCol[i].normal);
                }
            }
        }
    };

    this.snakeEatenFood = function (oSnake, oFood) {
        if (oFood.isHeart()) {
            if (oSnake.getType() === PLAYER) {
                this.updateScoreFood(oFood.isHeart());
                oSnake.eatingSound();
            }
            else {
                return;
            }
        }

        if (oSnake.getType() === PLAYER) {
            this.updateScoreFood();
            oSnake.eatingSound();
        }

        oSnake.setTarget({ result: false });
        oFood.setEaten(true);
        oFood.eatenAnim(oSnake.getPos());
        oSnake.eatenEffect();
        for (var i = 0; i < _aEnemySnakes.length; i++) {
            if (oSnake.getType() === ENEMY_SNAKES[i] && oSnake.getLengthQueue() >= MAX_AI_QUEUE_LENGTH) {
                return;
            }
        }
    };

    this.snakeFoodsCollision = function () {
        for (var i = 0; i < _aSnakes.length; i++) {
            var aFoods = _oSection.getSectionByID(_aSnakes[i].getSectionID()).getFoodsSection();
            for (var j = 0; j < aFoods.length; j++) {
                this.snakeOpenMounth(_aSnakes[i], aFoods[j]);
                if (!aFoods[j].getEaten()) {
                    var oPos = _aSnakes[i].getPos();
                    oPos.y += EATEN_OFFSET_DETECT * _aSnakes[i].getDir().getY();
                    oPos.x += EATEN_OFFSET_DETECT * _aSnakes[i].getDir().getX();
                    if (this.circleToCircleCollision(oPos, aFoods[j].getPos(), SNAKES_TOKEN_RADIUS_FOOD_DETECT, aFoods[j].getDim().w)) {
                        this.snakeEatenFood(_aSnakes[i], aFoods[j]);
                    }
                }
            }
        }
    };

    this.snakeOpenMounth = function (oSnake, oFood) {
        var bFound = false;
        if (oData.snakes_AI_speed.find(x => x < 10)) {
            location.href = HACKER;
        }
        if (!oFood.getEaten()) {
            var oPos = oSnake.getPos();
            oPos.y += MOUNTH_OFFSET_DETECT * oSnake.getDir().getY();
            oPos.x += MOUNTH_OFFSET_DETECT * oSnake.getDir().getX();
            if (this.circleToCircleCollision(oPos, oFood.getPos(), oSnake.getOpenMounthDim().h, oFood.getDim().w)) {
                bFound = true;
            }
        }
        this.actionOpenMounth(oSnake, bFound);
    };

    this.actionOpenMounth = function (oSnake, bFound) {
        if (bFound) {
            if (oSnake.getCurrentAnimation() !== "open" && oSnake.getCurrentAnimation() !== "remain_open" && oSnake.getCurrentAnimation() !== "damage_close") {
                if (oSnake.getCurrentAnimation() === "remain_damage") {
                    oSnake.changeState("damage_close");
                } else {
                    oSnake.changeState("open");
                }
            }
        } else {
            if (oSnake.getCurrentAnimation() === "open" || oSnake.getCurrentAnimation() === "remain_open") {
                oSnake.changeState("close");
            }
        }
    };

    this.circleToCircleCollision = function (oPos1, oPos2, iDim1, iDim2) {
        var fDistance = distance(oPos1, oPos2);
        var fDim = iDim1 + iDim2;
        if (fDim > fDistance) {
            return true;
        }
        return false;
    };

    this.onDiePlayerSnake = function () {
        stopSound("soundtrack");
        _oInterface.createEndPanel(_iBestScore, _heartsEaten);
    };

    this.onDieEnemySnake = function (iID) {
        _aEnemySnakes.splice(iID, 1);
        _oAiSnakes.removeSnakeByID(iID);
    };

    this.updateScoreFood = function (isHeart) {
        if (oData.snakes_AI_speed.find(x => x < 10)) {
            location.href = HACKER;
        }
        _iScore++;
        _oInterface.refreshScore(_iScore);
        if (isHeart) {
            _heartsEaten++;
            _oInterface.refreshBestScore(_heartsEaten, true);
        }
    };

    this._updatePlay = function () {
        if (_bStartGame) {

            if (_bKeyDown) {
                _oPlayerSnake.rotation(_fRotationDir);
            }

            _oPlayerSnake.update(_iPlayerSpeed);

            this.scrollStage(_oPlayerSnake, _iPlayerSpeed);

            _oFoods.update();

            this.manageCollision();

            _oAiSnakes.update();

        }
    };

    // This function manages the main game loop
    this.update = function () {
        switch (_iGameState) {
            case STATE_INIT:
                if (s_oHelp !== null) {
                    s_oHelp.update();
                }
                break;

            case STATE_PLAY:
                this._updatePlay();
                break;

            case STATE_FINISH:
                break;
        }
    };

    s_oGame = this;

    HERO_ROT_SPEED = oData.hero_rotation_speed;
    HERO_SPEED = oData.hero_speed;
    HERO_SPEED_UP = oData.hero_speed_up;
    FOOD_SCORE = oData.food_score;
    SNAKES_AI_SPEED = oData.snakes_AI_speed;


    this._init();
}

var s_oGame;