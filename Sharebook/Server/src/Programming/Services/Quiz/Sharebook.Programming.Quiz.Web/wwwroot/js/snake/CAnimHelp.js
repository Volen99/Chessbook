// this class show animation help

function CAnimHelp(iType, iX, iY, oParentContainer) {
    var _pStartPos;
    var _aMonitor = new Array();
    var _oParentContainer = oParentContainer;
    var _oContainer;
    var _oContainer;
    var _iAnimMonitor = 0;
    var _iType;
    var _fBuffer = 0;

    this._init = function (iType, iX, iY) {
        _pStartPos = {x: iX, y: iY};
        _oContainer = new createjs.Container();
        _oContainer.x = _pStartPos.x;
        _oContainer.y = _pStartPos.y;
        _oParentContainer.addChild(_oContainer);

        for (var i = 0; i < FRAMES_NUM_HELP[iType]; i++) {
            _aMonitor.push(createBitmap(s_oSpriteLibrary.getSprite("help_" + iType + "_" + i)));
            _aMonitor[i].visible = false;
            _oContainer.addChild(_aMonitor[i]);
        }

        _aMonitor[0].visible = true;

        _iType = iType;

        _oContainer.regX = s_oSpriteLibrary.getSprite("help_" + iType + "_" + 0).width;
        _oContainer.regY = s_oSpriteLibrary.getSprite("help_" + iType + "_" + 0).height;
    };

    this.setPosition = function (iX, iY) {
        _oContainer.x = iX;
        _oContainer.y = iY;
    };

    this.getStartPos = function () {
        return _pStartPos;
    };

    this.setVisibleMonitor = function (bVal) {
        _oContainer.visible = bVal;
    };

    this.viewMonitor = function (aMonitor, iFrame) {
        aMonitor[iFrame].visible = true;
    };
    
    this.hideMonitor = function (aMonitor, iFrame) {
        aMonitor[iFrame].visible = false;
    };

    this.animMonitor = function () {
        _fBuffer += s_iTimeElaps;
        if (_fBuffer > BUFFER_ANIM_MONITOR[_iType]) {
            this.hideMonitor(_aMonitor, _iAnimMonitor);
            if (_iAnimMonitor + 1 < FRAMES_NUM_HELP[_iType]) {
                this.viewMonitor(_aMonitor, _iAnimMonitor + 1);
                _iAnimMonitor++;
            } else {
                _iAnimMonitor = 0;
                _fBuffer = 0;
                this.viewMonitor(_aMonitor, _iAnimMonitor);
            }
            _fBuffer = 0;
        }
    };

    this._init(iType, iX, iY);

    s_oAnimMonitor = this;

    return this;
}

var s_oAnimMonitor = null;