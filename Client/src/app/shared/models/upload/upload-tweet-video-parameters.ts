import {IUploadParameters, UploadBinaryParameters} from "./upload-binary-parameters";
import {MediaType} from "../enums/media-type";
import {MediaCategory} from "../enums/media-category";

// For more description visit : https://dev.twitter.com/rest/media/uploading-media
export interface IUploadTweetVideoParameters extends IUploadParameters {
}

export class UploadTweetVideoParameters extends UploadBinaryParameters implements IUploadTweetVideoParameters {
  constructor(binary: ArrayBuffer) {
    super(binary);

    super.mediaType = MediaType.VideoMp4;
    super.mediaCategory = MediaCategory.Video;
  }
}
