// this class controls game GUI that contains text and buttons

function CInterface() {
    var _pStartPosAudio;
    var _pStartPosExit;
    var _pStartPosScore;
    var _pStartPosBest;
    var _pStartPosPause;
    var _pStartPosArrowLeft;
    var _pStartPosArrowRight;
    var _pStartPosFullscreen;

    var _oSpriteBeatingHeart
    var _startPosBeatingHeart;
    
    var _oButExit;
    var _oButPause;
    var _oScoreText;
    var _oBestScoreText;
    var _oHelpPanel;
    var _oAudioToggle;
    var _oArrowLeft;
    var _oArrowRight;
    var _oPause;
    var _oEndPanel;
    var _oButFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;

    var _beatingHeart;
    var _heartsEaten;

    this._init = function () {
        _heartsEaten = 0;
        _pStartPosScore = {x: (CANVAS_WIDTH / 2) - 50, y: 55};
        _oScoreText = new createjs.Text(TEXT_SCORE + ": 0", "32px " + FONT_GAME, "#ffffff");
        _oScoreText.x = _pStartPosScore.x;
        _oScoreText.y = _pStartPosScore.y;
        _oScoreText.textAlign = "left";
        _oScoreText.regY = _oScoreText.getBounds().height * 0.5;
        s_oStage.addChild(_oScoreText);

        _pStartPosBest = {x: (CANVAS_WIDTH / 2) - 450, y: 55};
        _oBestScoreText = new createjs.Text("" + ": 0", "40px " + FONT_GAME, "#ffffff");
        _oBestScoreText.x = _pStartPosBest.x;
        _oBestScoreText.y = _pStartPosBest.y;
        _oBestScoreText.textAlign = "left";


        _oBestScoreText.regX = _oBestScoreText.getBounds().width * 0.5;
        _oBestScoreText.regY = _oBestScoreText.getBounds().height * 0.5;
        s_oStage.addChild(_oBestScoreText);

        // Create heart CGFFakeButton
        var oSprite = s_oSpriteLibrary.getSprite('hearts_eaten');
        _startPosBeatingHeart = { x: (CANVAS_WIDTH / 2) - 490, y: 49 };
        _oSpriteBeatingHeart = new CGfxButton(_startPosBeatingHeart.x, _startPosBeatingHeart.y, oSprite, s_oStage);

        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: CANVAS_WIDTH - (oSprite.height / 2) - 20, y: (oSprite.height / 2) + 20};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);




        var oSprite = s_oSpriteLibrary.getSprite('but_pause');
        _pStartPosPause = {x: _pStartPosExit.x - oSprite.height - 20, y: _pStartPosExit.y};
        _oButPause = new CGfxButton(_pStartPosPause.x, _pStartPosPause.y, oSprite, s_oStage);
        _oButPause.addEventListener(ON_MOUSE_UP, this._onPause, this);

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: _pStartPosPause.x - oSprite.height - 20, y: _pStartPosExit.y};
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, oSprite, s_bAudioActive, s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
            
            _pStartPosFullscreen = {x:_pStartPosAudio.x - oSprite.width/2 - 20,y:_pStartPosPause.y};
        }else{
            _pStartPosFullscreen = {x: _pStartPosPause.x - oSprite.height - 20, y: _pStartPosExit.y};
        }
        
        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        
        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }
        
        if (_fRequestFullScreen && screenfull.enabled){
            oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');
            

            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }
        
        if (s_bMobile) {
            _pStartPosArrowLeft = {x: CANVAS_WIDTH * 0.5 - 430 - EDGEBOARD_X, y: CANVAS_HEIGHT * 0.5 + 220 + EDGEBOARD_Y};
            var oSpriteArrow = s_oSpriteLibrary.getSprite("arrow");
            _oArrowLeft = createBitmap(oSpriteArrow);
            _oArrowLeft.regX = oSpriteArrow.width * 0.5;
            _oArrowLeft.regY = oSpriteArrow.height * 0.5;
            _oArrowLeft.x = _pStartPosArrowLeft.x;
            _oArrowLeft.y = _pStartPosArrowLeft.y;
            _oArrowLeft.scaleX = -1;
            s_oStage.addChild(_oArrowLeft);

            _pStartPosArrowRight = {x: CANVAS_WIDTH * 0.5 + 430 + EDGEBOARD_X, y: CANVAS_HEIGHT * 0.5 + 220 + EDGEBOARD_Y};
            _oArrowRight = createBitmap(oSpriteArrow);
            _oArrowRight.regX = oSpriteArrow.width * 0.5;
            _oArrowRight.regY = oSpriteArrow.height * 0.5;
            _oArrowRight.x = _pStartPosArrowRight.x;
            _oArrowRight.y = _pStartPosArrowRight.y;
            s_oStage.addChild(_oArrowRight);
        }

        _oHelpPanel = new CHelpPanel(0, 0, s_oSpriteLibrary.getSprite('bg_help'));

        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    this.refreshButtonPos = function (iNewX, iNewY) {
        _oButExit.setPosition(_pStartPosExit.x - iNewX, iNewY + _pStartPosExit.y);
        _oButPause.setPosition(_pStartPosPause.x - iNewX, iNewY + _pStartPosPause.y);
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX, iNewY + _pStartPosAudio.y);
        }
        
        if (_fRequestFullScreen && screenfull.enabled){
            _oButFullscreen.setPosition(_pStartPosFullscreen.x - iNewX,_pStartPosFullscreen.y + iNewY);
        }

        _oBestScoreText.x = _pStartPosBest.x + iNewX;
        _oBestScoreText.y = _pStartPosBest.y + iNewY;

        // Heart
        _oSpriteBeatingHeart.setPosition(_startPosBeatingHeart.x + iNewX, _startPosBeatingHeart.y + iNewY)



        if (s_bMobile) {
                _oArrowLeft.x = _pStartPosArrowLeft.x + iNewX;
                _oArrowLeft.y = _pStartPosArrowLeft.y - iNewY;

                _oArrowRight.x = _pStartPosArrowRight.x - iNewX;
                _oArrowRight.y = _pStartPosArrowRight.y - iNewY;
        }
        _oScoreText.y = _pStartPosScore.y + iNewY;

        s_oGame.updateScrollLimit(iNewX, iNewY);

    };

    this.unload = function () {
        _oButExit.unload();
        _oButExit = null;

        _oHelpPanel.unload();

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        if (_fRequestFullScreen && screenfull.enabled){
            _oButFullscreen.unload();
        }
        
        s_oInterface = null;
    };

    this.refreshScore = function (iScore) {
        _oScoreText.text = TEXT_SCORE + ": " + iScore;
    };

    this.refreshBestScore = function (heartsEaten, bAnim) {
        _heartsEaten = heartsEaten;
        _oBestScoreText.text = "" + ": " + heartsEaten;
        if (bAnim) {
            _oBestScoreText.color = "#ffff00";
            createjs.Tween.get(_oBestScoreText, {override: true}).to({scaleX: 1.1, scaleY: 1.1},
                    500, createjs.Ease.cubicOut).to({scaleX: 1, scaleY: 1}, 500, createjs.Ease.cubicIn).set({color: "#fff"});
        }
    };

    this._onPause = function () {
        s_oGame.unpause(false);
        this.createPauseInterface();
    };

    this.createPauseInterface = function () {
        _oPause = new CPause();
    };

    this.createEndPanel = function (iScore, heartsEaten) {
        _oEndPanel = new CEndPanel(s_oSpriteLibrary.getSprite("msg_box"));
        _oEndPanel.show(iScore, heartsEaten);
    };

    this.unloadPause = function () {
        _oPause.unload();
        _oPause = null;
    };

    this.onExitFromHelp = function () {
        _oHelpPanel.unload();
    };

    this._onAudioToggle = function () {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    this._onExit = function () {
        var _oAreYouSure = new CAreYouSurePanel(s_oStage, _heartsEaten);
        _oAreYouSure.show();
    };
    
    this.resetFullscreenBut = function(){
	if (_fRequestFullScreen && screenfull.enabled){
		_oButFullscreen.setActive(s_bFullscreen);
	}
    };


    this._onFullscreenRelease = function(){
        if(s_bFullscreen) { 
		_fCancelFullScreen.call(window.document);
	}else{
		_fRequestFullScreen.call(window.document.documentElement);
	}
	
	sizeHandler();

    };
    
    s_oInterface = this;

    this._init();

    return this;
}

var s_oInterface = null;