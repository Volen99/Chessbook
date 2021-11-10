/**
 * Code extracted from https://github.com/mikemaccana/outdated-browser-rework
 * Required to work:
 *    1. ua-parser-min.js -->  https://github.com/faisalman/ua-parser-js
 *    2. browserSupport variable with browsers configuration
 */

var EDGEHTML_VS_EDGE_VERSIONS = {
    12: 0.1,
    13: 21,
    14: 31,
    15: 39,
    16: 41,
    17: 42,
    18: 44
}

var parsedUserAgent = new UAParser();

function isBrowserUnsupported(browserSupport) {
    var browserName = parsedUserAgent.getBrowser().name;
    var isUnsupported = false;
    if (!(browserName in browserSupport)) {
        if (!options.isUnknownBrowserOK) {
            isUnsupported = true
        }
    } else if (!browserSupport[browserName]) {
        isUnsupported = true
    }
    return isUnsupported;
}


function parseMinorVersion(version) {
    return version.replace(/[^\d.]/g, '').split(".")[1];
}


function isBrowserOutOfDate(browserSupport) {
    var browserName = parsedUserAgent.getBrowser().name;
    var browserMajorVersion = parsedUserAgent.getBrowser().major;
    if (browserName === "Edge") {
        browserMajorVersion = EDGEHTML_VS_EDGE_VERSIONS[browserMajorVersion]
    }
    var isOutOfDate = false;
    if (isBrowserUnsupported(browserSupport)) {
        isOutOfDate = true;
    } else if (browserName in browserSupport) {
        var minVersion = browserSupport[browserName];
        if (browserMajorVersion < minVersion) {
            isOutOfDate = true
        }
    }
    return isOutOfDate
}
