import {IUploadParameters, UploadBinaryParameters} from "./upload-binary-parameters";
import {MediaCategory} from "../enums/media-category";

// For more description visit : https://dev.twitter.com/rest/media/uploading-media
export interface IUploadTweetImageParameters extends IUploadParameters {
}

export class UploadTweetImageParameters extends UploadBinaryParameters implements IUploadTweetImageParameters {
  constructor(binary: ArrayBuffer, mediaType?: string) {
    super(binary, mediaType);

    // super.mediaType = MediaType.Media;
    super.mediaCategory = MediaCategory.Image;
  }
}
