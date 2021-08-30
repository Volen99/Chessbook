import {secondsToTime} from "./date";

function buildVideoWatchPath(screenName: string, postId: number) {
  return '/' + screenName.substring(1) + '/post/' + postId;
}

function buildVideoLink(screenName: string, postId: number, base?: string) {
  return (base ?? window.location.origin) + buildVideoWatchPath(screenName, postId);
}

function buildVideoEmbedPath(screenName: string, postId: number) {
  return '/posts/embed/' + screenName.substring(1) + '/' + postId;
}

function buildVideoEmbedLink(screenName: string, postId: number, base?: string) {
  return (base ?? window.location.origin) + buildVideoEmbedPath(screenName, postId);
}

function decorateVideoLink(options: {
  url: string

  startTime?: number
  stopTime?: number

  subtitle?: string

  loop?: boolean
  autoplay?: boolean
  muted?: boolean

  // Embed options
  title?: boolean
  warningTitle?: boolean
  controls?: boolean
  peertubeLink?: boolean
}) {
  const {url} = options;

  const params = generateParams(window.location.search);

  if (options.startTime !== undefined && options.startTime !== null) {
    const startTimeInt = Math.floor(options.startTime);
    params.set('start', secondsToTime(startTimeInt));
  }

  if (options.stopTime) {
    const stopTimeInt = Math.floor(options.stopTime);
    params.set('stop', secondsToTime(stopTimeInt));
  }

  if (options.subtitle) params.set('subtitle', options.subtitle);

  if (options.loop === true) params.set('loop', '1');
  if (options.autoplay === true) params.set('autoplay', '1');
  if (options.muted === true) params.set('muted', '1');
  if (options.title === false) params.set('title', '0');
  if (options.warningTitle === false) params.set('warningTitle', '0');
  if (options.controls === false) params.set('controls', '0');
  if (options.peertubeLink === false) params.set('peertubeLink', '0');

  return buildUrl(url, params);
}

function decoratePlaylistLink(options: {
  url: string

  playlistPosition?: number
}) {
  const {url} = options;

  const params = generateParams(window.location.search);

  if (options.playlistPosition) params.set('playlistPosition', '' + options.playlistPosition);

  return buildUrl(url, params);
}

// ---------------------------------------------------------------------------

export {
  buildVideoLink,

  buildVideoWatchPath,

  buildVideoEmbedPath,

  buildVideoEmbedLink,

  decorateVideoLink,
  decoratePlaylistLink
};

function buildUrl(url: string, params: URLSearchParams) {
  let hasParams = false;
  params.forEach(() => {
    hasParams = true;
  });

  if (hasParams) return url + '?' + params.toString();

  return url;
}

function generateParams(url: string) {
  const params = new URLSearchParams(window.location.search);
  // Unused parameters in embed
  params.delete('videoId');
  params.delete('resume');

  return params;
}
