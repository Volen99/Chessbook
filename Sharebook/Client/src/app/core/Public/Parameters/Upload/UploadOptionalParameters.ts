import {MediaType} from "../../Models/Enum/MediaType";
import {MediaCategory} from "../../Models/Enum/MediaCategory";
import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {SharebookLimits} from "../../Settings/SharebookLimits";
import {IMediaUploadProgressChangedEventArgs} from "../../Events/MediaUploadProgressChangedEventArgs";
import {CursorQueryParameters} from "../CursorQueryParameters";
import TimeSpan from "typescript-dotnet-commonjs/System/Time/TimeSpan";

export interface IUploadOptionalParameters {
  // Type of element that you want to publish.
  // This property will modify the QueryMediaType.
  mediaType?: MediaType;

  // Type of element that you want to publish.
  // This will be used as the ContentType in the HttpRequest.
  queryMediaType: string;

  // Type of upload. `tweet_video` allows to access the STATUS of the upload processing.
  // This property will modify the QueryMediaCategory.
  mediaCategory: MediaCategory | null;

  // Type of upload. `tweet_video` allows to access the STATUS of the upload processing.
  queryMediaCategory: string | null;

  // Maximum size of a chunk size (in bytes) for a single upload.
  maxChunkSize: number;

  // Timeout after which each chunk request will fail.
  // <para>Note that this is not a global upload timeout</para>
  timeout?: TimeSpan;

  // User Ids who are allowed to use the uploaded media.
  additionalOwnerIds: Array<number>;

  // When an upload completes Twitter takes few seconds to process the media
  // and confirm that it is a media that can be used on the platform.
  // With WaitForTwitterProcessing enabled, Tweetinvi will wait for Twitter
  // to confirm that the media has been successfully processed.
  waitForTwitterProcessing: boolean;

  // Additional parameters to use during the upload INIT HttpRequest.
  initCustomRequestParameters: ICustomRequestParameters;

  // Additional parameters to use during the upload APPEND HttpRequest.
  appendCustomRequestParameters: ICustomRequestParameters;

  // Additional parameters to use during the upload FINALIZE HttpRequest.
  finalizeCustomRequestParameters: ICustomRequestParameters;

  // Event to notify that the upload state has changed
  uploadStateChanged: (mediaUploadProgressChangedEventArgs: IMediaUploadProgressChangedEventArgs) => void;
}

export class UploadOptionalParameters implements IUploadOptionalParameters {
  constructor() {
    this.queryMediaType = "media";
    this.maxChunkSize = SharebookLimits.DEFAULTS.UPLOAD_MAX_CHUNK_SIZE;
    this.additionalOwnerIds = new Array<number>();
    this.waitForTwitterProcessing = true;

    this.initCustomRequestParameters = new CustomRequestParameters();
    this.appendCustomRequestParameters = new CustomRequestParameters();
    this.finalizeCustomRequestParameters = new CursorQueryParameters();
  }

  get mediaType(): MediaType {
    switch (this.queryMediaType) {
      case "media":
        return MediaType.Media;
      case "video/mp4":
        return MediaType.VideoMp4;
      default:
        return null;
    }
  }

  set mediaType(value: MediaType) {
    switch (value) {
      case MediaType.VideoMp4:
        this.queryMediaType = "video/mp4";
        break;
      default:
        this.queryMediaType = "media"; // By default we need to inform Twitter that the binary is a media
        break;
    }
  }

  public queryMediaType: string;

  get mediaCategory(): MediaCategory {
    switch (this.queryMediaCategory) {
      case "tweet_video":
        return MediaCategory.Video;
      case "tweet_gif":
        return MediaCategory.Gif;
      case "tweet_image":
        return MediaCategory.Image;
      case "dm_image":
        return MediaCategory.DmImage;
      case "dm_gif":
        return MediaCategory.DmGif;
      case "dm_video":
        return MediaCategory.DmVideo;
      default:
        return null;
    }
  }

  set mediaCategory(value: MediaCategory) {
    switch (value) {
      case MediaCategory.Video:
        this.queryMediaCategory = "tweet_video";
        break;
      case MediaCategory.Gif:
        this.queryMediaCategory = "tweet_gif";
        break;
      case MediaCategory.Image:
        this.queryMediaCategory = "tweet_image";
        break;
      case MediaCategory.DmImage:
        this.queryMediaCategory = "dm_image";
        break;
      case MediaCategory.DmGif:
        this.queryMediaCategory = "dm_gif";
        break;
      case MediaCategory.DmVideo:
        this.queryMediaCategory = "dm_video";
        break;
      default:
        this.queryMediaCategory = null;
        break;
    }
  }

  public queryMediaCategory: string;

  public maxChunkSize: number;

  public timeout?: TimeSpan;

  public additionalOwnerIds: Array<number>;

  public waitForTwitterProcessing: boolean;

  public initCustomRequestParameters: ICustomRequestParameters;

  public appendCustomRequestParameters: ICustomRequestParameters;

  public finalizeCustomRequestParameters: ICustomRequestParameters;

  public uploadStateChanged: (mediaUploadProgressChangedEventArgs: IMediaUploadProgressChangedEventArgs) => void;
}
