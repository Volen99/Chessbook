// The main class called by the index file.
// This file controls the sprite_lib.js file that manages the sprite loading, the loop game
// and initialize the canvas with the CreateJs library

// import { CMenu } from './CMenu.js';
// import { CPreloader } from './CPreloader.js';   

class CMain {
    _bUpdate;
    _iCurResource = 0;
    _RESOURCE_TO_LOAD = 0;
    _iState = STATE_LOADING;
    _oData;

    _oPreloader;
    _oMenu;
    _oHelp;
    _oGame;

    constructor(oData) {
        s_oMain = this;

        this._oData = oData;

        ENABLE_CHECK_ORIENTATION = this._oData.check_orientation;
        ENABLE_FULLSCREEN = this._oData.fullscreen;

        var canvas = document.getElementById("canvas");

        s_oStage = new createjs.Stage(canvas);
        createjs.Touch.enable(s_oStage);
        s_oStage.preventSelection = false;

        s_bMobile = /Mobi/.test(navigator.userAgent);
        if (s_bMobile === false) {
            s_oStage.enableMouseOver(20);
            $('body').on('contextmenu', '#canvas', function (e) {
                return false;
            });
        }

        s_iPrevTime = new Date().getTime();

        createjs.Ticker.addEventListener("tick", this._update.bind(this)); /// might bug
        createjs.Ticker.framerate = FPS;

        if (navigator.userAgent.match(/Windows Phone/i)) {
            DISABLE_SOUND_MOBILE = true;
        }

        s_oSpriteLibrary = new CSpriteLibrary();

        // The main class calls CPreloader.js to init preloader text and start sprite loading
        //ADD PRELOADER
        this._oPreloader = new CPreloader();

        this._bUpdate = true;
    }

    soundLoaded = function () {
        this._iCurResource++;
        var iPerc = Math.floor(this._iCurResource / this._RESOURCE_TO_LOAD * 100);
        this._oPreloader.refreshLoader(iPerc);
    }.bind(this); // :DDDDDDd

    _initSounds = function () {
        Howler.mute(!s_bAudioActive);

        s_aSoundsInfo = new Array();

        s_aSoundsInfo.push({ path: './audios/snake/', filename: 'snake_eating', loop: false, volume: 1, ingamename: 'snake_eating' });
        s_aSoundsInfo.push({ path: './audios/snake/', filename: 'click', loop: false, volume: 1, ingamename: 'click' });
        s_aSoundsInfo.push({ path: './audios/snake/', filename: 'game_over', loop: false, volume: 1, ingamename: 'game_over' });
        s_aSoundsInfo.push({ path: './audios/snake/', filename: 'snake_follow', loop: false, volume: 1, ingamename: 'snake_follow' });
        s_aSoundsInfo.push({ path: './audios/snake/', filename: 'scream', loop: false, volume: 1, ingamename: 'scream' });
        s_aSoundsInfo.push({ path: './audios/snake/', filename: 'soundtrack', loop: true, volume: 1, ingamename: 'soundtrack' });


        this._RESOURCE_TO_LOAD += s_aSoundsInfo.length;

        s_aSounds = new Array();
        for (var i = 0; i < s_aSoundsInfo.length; i++) {
            this.tryToLoadSound(s_aSoundsInfo[i], false);
        }

    };

    tryToLoadSound = function (oSoundInfo, bDelay) {

        setTimeout(function () {
            s_aSounds[oSoundInfo.ingamename] = new Howl({
                src: [oSoundInfo.path + oSoundInfo.filename + '.mp3'],
                autoplay: false,
                preload: true,
                loop: oSoundInfo.loop,
                volume: oSoundInfo.volume,
                onload: s_oMain.soundLoaded,
                onloaderror: function (szId, szMsg) {
                    for (var i = 0; i < s_aSoundsInfo.length; i++) {
                        if (szId === s_aSounds[s_aSoundsInfo[i].ingamename]._sounds[0]._id) {
                            s_oMain.tryToLoadSound(s_aSoundsInfo[i], true);
                            break;
                        }
                    }
                },
                onplayerror: function (szId) {
                    for (var i = 0; i < s_aSoundsInfo.length; i++) {
                        if (szId === s_aSounds[s_aSoundsInfo[i].ingamename]._sounds[0]._id) {
                            s_aSounds[s_aSoundsInfo[i].ingamename].once('unlock', function () {
                                s_aSounds[s_aSoundsInfo[i].ingamename].play();
                            });
                            break;
                        }
                    }

                }
            });


        }, (bDelay ? 200 : 0));


    };

    _loadImages = function () {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);

        s_oSpriteLibrary.addSprite("beating_robot_heart_0", "./sprites/beating_robot_heart_0.png");
        s_oSpriteLibrary.addSprite("hearts_eaten", "./sprites/hearts_eaten.png");
        s_oSpriteLibrary.addSprite("but_play", "./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("bg_help", "./sprites/bg_help.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("arrow", "./sprites/arrow.png");
        s_oSpriteLibrary.addSprite("but_home", "./sprites/but_home.png");
        s_oSpriteLibrary.addSprite("but_restart", "./sprites/but_restart.png");
        s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("food_0", "./sprites/food_0.png");
        s_oSpriteLibrary.addSprite("but_pause", "./sprites/but_pause.png");
        s_oSpriteLibrary.addSprite("but_continue", "./sprites/but_continue.png");
        s_oSpriteLibrary.addSprite("but_yes", "./sprites/but_yes.png");
        s_oSpriteLibrary.addSprite("but_not", "./sprites/but_not.png");
        s_oSpriteLibrary.addSprite("but_info", "./sprites/but_info.png");
        s_oSpriteLibrary.addSprite("logo_ctl", "./sprites/logo_ctl.png");

        s_oSpriteLibrary.addSprite("arrow_key", "./sprites/arrow_key.png");

        s_oSpriteLibrary.addSprite("edge_side_lr", "./sprites/edge_side_lr.png");
        s_oSpriteLibrary.addSprite("edge_side_ud", "./sprites/edge_side_ud.png");

        s_oSpriteLibrary.addSprite("logo", "./sprites/logo.png");
        s_oSpriteLibrary.addSprite("but_fullscreen", "./sprites/but_fullscreen.png");

        for (var j = 1; j < 4; j++) {
            for (var i = 0; i < FRAMES_NUM_HELP[j]; i++) {
                s_oSpriteLibrary.addSprite("help_" + j + "_" + i, "./sprites/help_" + j + "/help_" + j + "_" + i + ".jpg");
            }
        }

        for (var i = 0; i < SNAKE_TYPES; i++) {
            s_oSpriteLibrary.addSprite("snake_head_" + i, "./sprites/snake_head_" + i + ".png");
            s_oSpriteLibrary.addSprite("snake_parts_" + i, "./sprites/snake_parts_" + i + ".png");
        }
        this._RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
    };

    _onImagesLoaded = function () {
        this._iCurResource++;
        var iPerc = Math.floor(this._iCurResource / this._RESOURCE_TO_LOAD * 100);
        this._oPreloader.refreshLoader(iPerc);
    };

    _onAllImagesLoaded = function () {

    };

    preloaderReady = function () {
        this._loadImages();

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            this._initSounds();
        }


        this._bUpdate = true;
    };

    // When all sprites contained in "/sprites" and "/sounds" folder are loaded, the main class removes the preloader
    // and calls the CMenu.js file that shows the main menu
    // 
    _onRemovePreloader = function () {
        this._oPreloader.unload();

        s_oSoundTrack = playSound("soundtrack", 1, true);

        this.gotoMenu();
    };

    gotoMenu = function () {
        this._oMenu = new CMenu();
        this._iState = STATE_MENU;
    };

    gotoGame = function () {
        this._oGame = new CGame(this._oData);

        this._iState = STATE_GAME;
    };

    gotoHelp = function () {
        this._oHelp = new CHelp();
        this._iState = STATE_HELP;
    };

    stopUpdate = function () {
        this._bUpdate = false;
        createjs.Ticker.paused = true;
        $("#block_game").css("display", "block");

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            Howler.mute(true);
        }

    };

    startUpdate = function () {
        s_iPrevTime = new Date().getTime();
        this._bUpdate = true;
        createjs.Ticker.paused = false;
        $("#block_game").css("display", "none");

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            if (s_bAudioActive) {
                Howler.mute(false);
            }
        }

    };

    _update = function (event) {
        if (this._bUpdate === false) {
            return;
        }
        var iCurTime = new Date().getTime();
        s_iTimeElaps = iCurTime - s_iPrevTime;
        s_iCntTime += s_iTimeElaps;
        s_iCntFps++;
        s_iPrevTime = iCurTime;

        if (s_iCntTime >= 1000) {
            s_iCurFps = s_iCntFps;
            s_iCntTime -= 1000;
            s_iCntFps = 0;
        }

        if (this._iState === STATE_GAME) {
            this._oGame.update();
        } else if (this._iState === STATE_MENU) {
            this._oMenu.update();
        }

        s_oStage.update(event);

    };

    // s_oMain = this;

    // _oData = oData;
    // 
    // ENABLE_CHECK_ORIENTATION = oData.check_orientation;
    // ENABLE_FULLSCREEN = oData.fullscreen;
}

var s_bMobile;
var s_bAudioActive = false;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;
var s_iSpeedBlock;

var s_oDrawLayer;
var s_oStage;
var s_oScrollStage;
var s_oMain;
var s_oSpriteLibrary;
var s_oSoundTrack = null;
var s_bFullscreen = false;
var s_aSounds;
var s_aSoundsInfo;