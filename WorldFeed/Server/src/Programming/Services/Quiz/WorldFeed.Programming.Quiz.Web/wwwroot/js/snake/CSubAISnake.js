// this class is a extention of AI Snakes

function CSubAISnake(oSnake, iTimeFollow) {
    var _oSnake = oSnake;
    var _fTimeChangeDir = 0;
    var _fTimeTurn;
    var _iTimeFollow = iTimeFollow;
    var _iTimeIgnore = AI_TIME_IGNORE_PLAYER;
    var _bIgnorePlayer = false;
    var _bSoundFollowPlayed = false;

    this._init = function () {
        _fTimeTurn = (Math.random() * (AI_WAIT_TIME_FOR_CHANGE_DIR.max - AI_WAIT_TIME_FOR_CHANGE_DIR.min)) + AI_WAIT_TIME_FOR_CHANGE_DIR.min;
    };

    this.setRandomDirection = function () {
        if (_fTimeChangeDir < 0) {
            if (_fTimeTurn > 0) {
                _oSnake.rotation(HERO_ROT_SPEED);
                _fTimeTurn -= s_iTimeElaps;
            } else {
                _fTimeTurn = (Math.random() * (AI_WAIT_TIME_FOR_CHANGE_DIR.max - AI_WAIT_TIME_FOR_CHANGE_DIR.min)) + AI_WAIT_TIME_FOR_CHANGE_DIR.min;
                _fTimeChangeDir = (Math.random() * (AI_TIME_CHANGE_DIR.max - AI_TIME_CHANGE_DIR.min)) + AI_TIME_CHANGE_DIR.min;
            }
        } else {
            _fTimeChangeDir -= s_iTimeElaps;
        }
    };

    this.followTime = function () {
        if (_iTimeFollow < 0) {
            _bIgnorePlayer = true;
            _fTimeChangeDir = -1;
        } else {
            _iTimeFollow -= s_iTimeElaps;

        }
    };

    this.setFollowTime = function (iVal) {
        _iTimeFollow = iVal;
    };

    this.getFollowTime = function () {
        return _iTimeFollow;
    };

    this.playSoundFollow = function () {
        if (_bSoundFollowPlayed) {
            return;
        }
        _bSoundFollowPlayed = true;

        playSound("snake_follow", 1, false);
    };

    this.setSoundFollow = function (bVal) {
        _bSoundFollowPlayed = bVal;
    };

    this.ignorePlayerTime = function () {
        if (_bIgnorePlayer) {
            if (_iTimeIgnore > 0) {
                _iTimeIgnore -= s_iTimeElaps;
            } else {
                _bIgnorePlayer = false;
                _iTimeIgnore = AI_TIME_IGNORE_PLAYER;
                _iTimeFollow = AI_SNAKES[_oSnake.getType()].time_follow;

            }
        }
    };

    this.ignorePlayer = function () {
        return _bIgnorePlayer;
    };

    this.update = function () {
        this.setRandomDirection();
        this.ignorePlayerTime();
    };

    this._init();
    return this;
}
