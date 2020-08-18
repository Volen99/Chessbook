// this class manages sections

function CManageSections() {
    var _aSections;
    var _aSectionsIDShuffle;

    this._init = function () {
        _aSections = new Array();
        _aSectionsIDShuffle=new Array();
        this.createSection();
    };

    this.createSection = function () {
        var iX = EDGES_PROPERTIES.x;
        var iY = EDGES_PROPERTIES.y;

        var iWidth = EDGES_PROPERTIES.xMax / FIELD_SECTION_SUBDIVISION.w;
        var iHeight = EDGES_PROPERTIES.yMax / FIELD_SECTION_SUBDIVISION.h;

        var iID = 0;
        for (var i = 0; i < FIELD_SECTION_SUBDIVISION.h; i++) {
            for (var j = 0; j < FIELD_SECTION_SUBDIVISION.w; j++) {
                _aSections.push(new CSection(iID, {x: iX, y: iY, w: iWidth, h: iHeight}));
                _aSectionsIDShuffle.push(iID);
                iX += iWidth;
                iID++;
            }
            iY += iHeight;
            iX = EDGES_PROPERTIES.x;
        }
    };

    this.getSections = function () {
        return _aSections;
    };

    this.getSectionIDShuffle = function () {
        return shuffle(_aSectionsIDShuffle);
    };

    this.getSectionByID = function (iVal) {
        return _aSections[iVal];
    };

    this._init();
    s_oManageSections = this;

    return this;
}

var s_oManageSections = null;