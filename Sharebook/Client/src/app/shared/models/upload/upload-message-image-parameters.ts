import {IUploadParameters, UploadBinaryParameters} from "./upload-binary-parameters";
import {MediaCategory} from "../enums/media-category";
import {MediaType} from "../enums/media-type";


// For more description visit : https://dev.twitter.com/rest/media/uploading-media
export interface IUploadMessageImageParameters extends IUploadParameters {
}

export class UploadMessageImageParameters extends UploadBinaryParameters implements IUploadMessageImageParameters {
  constructor(binary: ArrayBuffer) {
    super(binary);

    super.mediaType = MediaType.Media;
    super.mediaCategory = MediaCategory.DmImage;
  }
}
