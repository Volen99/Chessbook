import {MediaCategory} from "../../Models/Enum/MediaCategory";
import {IUploadParameters, UploadBinaryParameters} from "./UploadBinaryParameters";
import {MediaType} from "../../Models/Enum/MediaType";

// For more description visit : https://dev.twitter.com/rest/media/uploading-media
// <para>INIT : https://dev.twitter.com/en/docs/media/upload-media/api-reference/post-media-upload-init</para>
// <para>APPEND : https://dev.twitter.com/en/docs/media/upload-media/api-reference/post-media-upload-append</para>
// <para>FINALIZE : https://dev.twitter.com/en/docs/media/upload-media/api-reference/post-media-upload-finalize</para>
export interface IUploadTweetImageParameters extends IUploadParameters {
}

export class UploadTweetImageParameters extends UploadBinaryParameters implements IUploadTweetImageParameters {
  constructor(binary: ArrayBuffer) {
    super(binary);

    super.mediaType = MediaType.Media;
    super.mediaCategory = MediaCategory.Image;
  }
}
