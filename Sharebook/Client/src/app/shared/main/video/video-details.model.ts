import {VideoDetails as VideoDetailsServerModel} from '../../../shared/models/videos/video.model';
import {Video} from './video.model';
import {VideoFile} from "../../models/videos/video-file.model";
import {VideoConstant} from "../../models/videos/video-constant.model";
import {VideoState} from "../../models/videos/video-state.enum";
import {VideoStreamingPlaylist} from "../../models/videos/video-streaming-playlist.model";
import {Account} from "../../../shared/main/account/account.model";
import {VideoStreamingPlaylistType} from "../../models/videos/video-streaming-playlist.type";
import {VideoChannel} from "../video-channel/video-channel.model";

export class VideoDetails extends Video implements VideoDetailsServerModel {
  descriptionPath: string;
  support: string;
  channel: VideoChannel;
  tags: string[];
  files: VideoFile[];
  account: Account;
  commentsEnabled: boolean;
  downloadEnabled: boolean;

  waitTranscoding: boolean;
  state: VideoConstant<VideoState>;

  likesPercent: number;
  dislikesPercent: number;

  trackerUrls: string[];

  streamingPlaylists: VideoStreamingPlaylist[];

  constructor(hash: VideoDetailsServerModel, translations = {}) {
    super(hash, translations);

    this.descriptionPath = hash.descriptionPath;
    this.files = hash.files;
    this.channel = new VideoChannel(hash.channel);
    this.account = new Account(hash.account);
    this.tags = hash.tags;
    this.support = hash.support;
    this.commentsEnabled = hash.commentsEnabled;
    this.downloadEnabled = hash.downloadEnabled;

    this.trackerUrls = hash.trackerUrls;
    this.streamingPlaylists = hash.streamingPlaylists;

    this.buildLikeAndDislikePercents();
  }

  buildLikeAndDislikePercents() {
    this.likesPercent = (this.likes / (this.likes + this.dislikes)) * 100;
    this.dislikesPercent = (this.dislikes / (this.likes + this.dislikes)) * 100;
  }

  getHlsPlaylist() {
    return this.streamingPlaylists.find(p => p.type === VideoStreamingPlaylistType.HLS);
  }

  hasHlsPlaylist() {
    return !!this.getHlsPlaylist();
  }

  getFiles() {
    if (this.files.length !== 0) {
      return this.files;
    }

    const hls = this.getHlsPlaylist();
    if (hls) {
      return hls.files;
    }

    return [];
  }
}
