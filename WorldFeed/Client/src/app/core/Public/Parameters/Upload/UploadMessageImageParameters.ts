import {IUploadParameters, UploadBinaryParameters} from "./UploadBinaryParameters";
import {MediaCategory} from "../../Models/Enum/MediaCategory";
import {MediaType} from "../../Models/Enum/MediaType";

// <summary>
// For more description visit : https://dev.twitter.com/rest/media/uploading-media
// <para>INIT : https://dev.twitter.com/en/docs/media/upload-media/api-reference/post-media-upload-init</para>
// <para>APPEND : https://dev.twitter.com/en/docs/media/upload-media/api-reference/post-media-upload-append</para>
// <para>FINALIZE : https://dev.twitter.com/en/docs/media/upload-media/api-reference/post-media-upload-finalize</para>
// </summary>
export interface IUploadMessageImageParameters extends IUploadParameters {
}

export class UploadMessageImageParameters extends UploadBinaryParameters implements IUploadMessageImageParameters {
  constructor(binary: number[]) {
    super(binary);
    super.mediaType = MediaType.Media;
    super.mediaCategory = MediaCategory.DmImage;
  }
}
