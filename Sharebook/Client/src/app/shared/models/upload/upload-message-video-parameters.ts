import {IUploadParameters, UploadBinaryParameters} from "./upload-binary-parameters";
import {MediaCategory} from "../enums/media-category";
import {MediaType} from "../enums/media-type";

// For more description visit : https://dev.twitter.com/rest/media/uploading-media
export interface IUploadMessageVideoParameters extends IUploadParameters {
}

export class UploadMessageVideoParameters extends UploadBinaryParameters implements IUploadMessageVideoParameters {
  constructor(binary: ArrayBuffer) {
    super(binary);

    super.mediaType = MediaType.VideoMp4;
    super.mediaCategory = MediaCategory.DmVideo;
  }
}
