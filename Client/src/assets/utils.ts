import {escapeHTML} from "../app/shared/core-utils/renderer/html";

function toTitleCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function isWebRTCDisabled() {
  return !!((window as any).RTCPeerConnection || (window as any).mozRTCPeerConnection || (window as any).webkitRTCPeerConnection) === false;
}

function isIOS() {
  if (/iPad|iPhone|iPod/.test(navigator.platform)) {
    return true;
  }

  // Detect iPad Desktop modes
  return !!(navigator.maxTouchPoints &&
    navigator.maxTouchPoints > 2 &&
    /MacIntel/.test(navigator.platform));
}

// https://github.com/danrevah/ngx-pipes/blob/master/src/pipes/math/bytes.ts
// Don't import all Angular stuff, just copy the code with shame
const dictionaryBytes: Array<{ max: number, type: string }> = [
  {max: 1024, type: 'B'},
  {max: 1048576, type: 'KB'},
  {max: 1073741824, type: 'MB'},
  {max: 1.0995116e12, type: 'GB'}
];

function bytes(value: number) {
  const format = dictionaryBytes.find(d => value < d.max) || dictionaryBytes[dictionaryBytes.length - 1];
  const calc = Math.floor(value / (format.max / 1024)).toString();

  return [calc, format.type];
}

function isSafari () {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

function isMobile() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

// function buildVideoLink(options: {
//   baseUrl?: string
//
//   startTime?: number
//   stopTime?: number
//
//   subtitle?: string
//
//   loop?: boolean
//   autoplay?: boolean
//   muted?: boolean
//
//   // Embed options
//   title?: boolean
//   warningTitle?: boolean
//   controls?: boolean
//   peertubeLink?: boolean
// } = {}) {
//   const {baseUrl} = options;
//
//   const url = baseUrl
//     ? baseUrl
//     : window.location.origin + window.location.pathname.replace('/embed/', '/watch/');
//
//   const params = generateParams(window.location.search);
//
//   if (options.startTime !== undefined && options.startTime !== null) {
//     const startTimeInt = Math.floor(options.startTime);
//     params.set('start', secondsToTime(startTimeInt));
//   }
//
//   if (options.stopTime) {
//     const stopTimeInt = Math.floor(options.stopTime);
//     params.set('stop', secondsToTime(stopTimeInt));
//   }
//
//   if (options.subtitle) params.set('subtitle', options.subtitle);
//
//   if (options.loop === true) params.set('loop', '1');
//   if (options.autoplay === true) params.set('autoplay', '1');
//   if (options.muted === true) params.set('muted', '1');
//   if (options.title === false) params.set('title', '0');
//   if (options.warningTitle === false) params.set('warningTitle', '0');
//   if (options.controls === false) params.set('controls', '0');
//   if (options.peertubeLink === false) params.set('peertubeLink', '0');
//
//   return buildUrl(url, params);
// }

function buildVideoOrPlaylistEmbed(embedUrl: string, embedTitle: string) {
  const title = escapeHTML(embedTitle);
  return '<iframe width="560" height="315" ' +
    'sandbox="allow-same-origin allow-scripts allow-popups" ' +
    'title="' + title + '" ' +
    'src="' + embedUrl + '" ' +
    'frameborder="0" allowfullscreen>' +
    '</iframe>';
}

function getRtcConfig() {
  return {
    iceServers: [
      {
        urls: 'stun:stun.stunprotocol.org'
      },
      {
        urls: 'stun:stun.framasoft.org'
      }
    ]
  };
}

// ---------------------------------------------------------------------------

export {
  getRtcConfig,
  toTitleCase,
  isWebRTCDisabled,
  buildVideoOrPlaylistEmbed,
  isMobile,
  bytes,
  isIOS,
  isSafari
};
