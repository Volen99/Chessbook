// this class manage the animated menu elements

function CAnimMenu(oParentContainer) {

    var _oParentContainer = oParentContainer;
    var _oContainer;
    var _oLogo = null;

    var _oGoodSnake;
    var _oBadSnake;

    var _fRotDirGood = MENU_SNAKE_GOOD_ROTATION;
    var _fRotDirBad = MENU_SNAKE_BAD_ROTATION;
    var _fStopGoodMovement;
    var _fStopBadMovement;

    var _bFinishGood = false;
    var _bFinishBad = false;

    var _iBufferGood = MENU_SNAKE_GOOD_TIME_ROTATION * 0.5;
    var _iBufferBad = MENU_SNAKE_BAD_TIME_ROTATION * 0.5;
    var _iDelayBad = MENU_BAD_SNAKE_DELAY;

    this._init = function () {
        _oContainer = new createjs.Container();
        _oParentContainer.addChild(_oContainer);

        var iTypeGood = 4;
        var iLengthGoodQueue = 15;
        _oGoodSnake = new CSnake(-100, CANVAS_HEIGHT_HALF, s_oSpriteLibrary.getSprite("snake_head_" + iTypeGood), iTypeGood,
                iLengthGoodQueue, 0, _oContainer);

        _oGoodSnake.rotate(90);

        _fStopGoodMovement = s_oSpriteLibrary.getSprite("snake_parts_" + iTypeGood).height * (iLengthGoodQueue / (MENU_SNAKES_VELOCITY / 20)) + CANVAS_WIDTH - s_iOffsetX;


        var iTypeBad = Math.floor(Math.random() * 3);
        var iLengthBadQueue = 25;
        _oBadSnake = new CSnake(-100, CANVAS_HEIGHT_HALF, s_oSpriteLibrary.getSprite("snake_head_" + iTypeBad), iTypeBad,
                iLengthBadQueue, 0, _oContainer);

        _oBadSnake.rotate(90);
        _oLogo = new CLogo(CANVAS_WIDTH_HALF, s_oSpriteLibrary.getSprite("logo").height * -0.5, _oParentContainer);
        createjs.Tween.get(this).wait(1500).call(function () {
            _oLogo.animLogo();
            s_oMenu.animContainerGUI();
        });

        _fStopBadMovement = s_oSpriteLibrary.getSprite("snake_parts_" + iTypeBad).height * (iLengthBadQueue / (MENU_SNAKES_VELOCITY / 20)) + CANVAS_WIDTH - s_iOffsetX;
    };

    this.animSnakes = function () {
        if (!_bFinishGood) {
            if (_iBufferGood < 0) {
                _fRotDirGood *= -1;
                _iBufferGood = MENU_SNAKE_GOOD_TIME_ROTATION;
            } else {
                _iBufferGood -= s_iTimeElaps;
                _oGoodSnake.rotation(_fRotDirGood);
            }

            _oGoodSnake.update(MENU_SNAKES_VELOCITY);

            if (_oGoodSnake.getX() > _fStopGoodMovement) {
                _bFinishGood = true;
                this.unloadSnake(_oGoodSnake);
            }
        }

        if (!_bFinishBad) {
            if (_iBufferBad < 0) {
                _fRotDirBad *= -1;
                _iBufferBad = MENU_SNAKE_BAD_TIME_ROTATION;
            } else {
                _iBufferBad -= s_iTimeElaps;
                _oBadSnake.rotation(_fRotDirBad);
            }
            if (_iDelayBad < 0) {
                _oBadSnake.update(MENU_SNAKES_VELOCITY);


                if (_oBadSnake.getX() > _fStopBadMovement) {
                    _bFinishBad = true;
                    this.unloadSnake(_oBadSnake);
                }
            } else {
                _iDelayBad -= s_iTimeElaps;
            }
        }
    };

    this.unloadSnake = function (oSnake) {
        oSnake.unload();
    };

    this.update = function () {

        this.animSnakes();

    };

    this._init();

    return this;
}