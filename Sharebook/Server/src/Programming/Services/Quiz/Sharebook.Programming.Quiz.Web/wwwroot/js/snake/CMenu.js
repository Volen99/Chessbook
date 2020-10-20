// simple menu with the play button

class CMenu {
     _pStartPosAudio;
     _pStartPosPlay;
     _pStartPosCredits;
     _pStartPosFullscreen;
    
     _oBg;
     _oButPlay;
     _oCreditsBut;
     _oFade;
     _oAudioToggle;
     _oAnimMenu;
     _oContainerMenuGUI;
     _oButFullscreen;
     _fRequestFullScreen = null;
     _fCancelFullScreen = null;

    constructor(oData) {
         s_oMenu = this;

        this._oBg = CBackground(s_oStage);

        this._oContainerMenuGUI = new createjs.Container();
        this._oContainerMenuGUI.alpha = 0;
        s_oStage.addChild(this._oContainerMenuGUI);

        var oSprite = s_oSpriteLibrary.getSprite('but_play');
        this._pStartPosPlay = {x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 200};
        this._oButPlay = new CGfxButton(this._pStartPosPlay.x, this._pStartPosPlay.y, oSprite, this._oContainerMenuGUI);
        this._oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        this._oButPlay.pulseAnimation();

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            this._pStartPosAudio = {x: CANVAS_WIDTH - (oSprite.height / 2) - 10, y: (oSprite.height / 2) + 10};
            this._oAudioToggle = new CToggle(this._pStartPosAudio.x, this._pStartPosAudio.y, oSprite, s_bAudioActive, this._oContainerMenuGUI);
            this._oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        }

        var oSpriteCredits = s_oSpriteLibrary.getSprite('but_info');
        this._pStartPosCredits = {x: (oSpriteCredits.height / 2) + 10, y: (oSpriteCredits.height / 2) + 10};
        this._oCreditsBut = new CGfxButton((CANVAS_WIDTH / 2), CANVAS_HEIGHT - 240, oSpriteCredits, this._oContainerMenuGUI);
        this._oCreditsBut.addEventListener(ON_MOUSE_UP, this._onCreditsBut, this); // those thises were local

        this._oAnimMenu = new CAnimMenu(s_oStage);

        s_oStage.addChild(this._oContainerMenuGUI);
        
        var doc = window.document;
        var docEl = doc.documentElement;
        this._fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        this._fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        
        if(ENABLE_FULLSCREEN === false){
            this._fRequestFullScreen = false;
        }
        
        if (this._fRequestFullScreen && screenfull.enabled){
            oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');
            this._pStartPosFullscreen = { x: this._pStartPosCredits.x + oSprite.width / 2 + 10, y: oSprite.height / 2 + 10 };

            this._oButFullscreen = new CToggle(this._pStartPosFullscreen.x, this._pStartPosFullscreen.y,oSprite,s_bFullscreen, this._oContainerMenuGUI);
            this._oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }
        
        this._oFade = new createjs.Shape();
        this._oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        s_oStage.addChild(this._oFade);

        let _oFadeCopy = this._oFade;
        createjs.Tween.get(this._oFade).to({ alpha: 0 }, MS_FADE_TIME, createjs.Ease.cubicOut).call(function () {
            //this._oFade.visible = false;
            _oFadeCopy.visible = false;
        });

        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    animContainerGUI = function () {
        createjs.Tween.get(this._oContainerMenuGUI).to({alpha: 1}, 500, createjs.Ease.cubicOut);
    };

    refreshButtonPos = function (iNewX, iNewY) {
        this._oCreditsBut.setPosition(this._pStartPosCredits.x + iNewX, iNewY + this._pStartPosCredits.y);
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            this._oAudioToggle.setPosition(this._pStartPosAudio.x - iNewX, iNewY + this._pStartPosAudio.y);
        }
        if (this._fRequestFullScreen && screenfull.enabled){
            this._oButFullscreen.setPosition(this._pStartPosFullscreen.x + iNewX, this._pStartPosFullscreen.y + iNewY);
        }
    };

    unload = function () {
        this._oButPlay.unload();
        this._oButPlay = null;

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            this._oAudioToggle.unload();
            this._oAudioToggle = null;
        }
        if (this._fRequestFullScreen && screenfull.enabled){
            this._oButFullscreen.unload();
        }

        s_oStage.removeAllChildren();

        s_oMenu = null;
    };

    _onAudioToggle = function () {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    _onCreditsBut = function () {
        new CCreditsPanel();
    };

    // If the user click the Play button in main menu, the CGame.js class is called and start the game
    _onButPlayRelease = function () {
        this._oFade.visible = true;

        createjs.Tween.get(this._oFade).to({alpha: 1}, MS_FADE_TIME, createjs.Ease.cubicOut).call(function () {
            s_oMenu.unload();
            s_oMain.gotoGame();
            $(s_oMain).trigger("start_session");
        });
    };
    
    resetFullscreenBut = function(){
	if (this._fRequestFullScreen && screenfull.enabled){
		this._oButFullscreen.setActive(s_bFullscreen);
	}
    };


    _onFullscreenRelease = function(){
        if(s_bFullscreen) { 
		this._fCancelFullScreen.call(window.document);
	}else{
		this._fRequestFullScreen.call(window.document.documentElement);
	}
	
	sizeHandler();
    };

    update = function () {
        this._oAnimMenu.update();
    };

    // s_oMenu = this;

    //this._init();
}

var s_oMenu = null;