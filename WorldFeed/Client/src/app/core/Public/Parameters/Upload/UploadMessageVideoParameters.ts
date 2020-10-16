import {IUploadParameters, UploadBinaryParameters} from "./UploadBinaryParameters";
import {MediaType} from "../../Models/Enum/MediaType";
import {MediaCategory} from "../../Models/Enum/MediaCategory";

/// <summary>
/// For more description visit : https://dev.twitter.com/rest/media/uploading-media
/// <para>INIT : https://dev.twitter.com/en/docs/media/upload-media/api-reference/post-media-upload-init</para>
/// <para>APPEND : https://dev.twitter.com/en/docs/media/upload-media/api-reference/post-media-upload-append</para>
/// <para>FINALIZE : https://dev.twitter.com/en/docs/media/upload-media/api-reference/post-media-upload-finalize</para>
/// </summary>
export interface IUploadMessageVideoParameters extends IUploadParameters {
}

export class UploadMessageVideoParameters extends UploadBinaryParameters implements IUploadMessageVideoParameters {
  constructor(binary: number[]) {
    super(binary);
    super.mediaType = MediaType.VideoMp4;
    super.mediaCategory = MediaCategory.DmVideo;
  }
}
