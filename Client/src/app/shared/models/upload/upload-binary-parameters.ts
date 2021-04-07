import {IUploadOptionalParameters, UploadOptionalParameters} from "./upload-optional-parameters";

// For more description visit : https://dev.twitter.com/rest/media/uploading-media
// <para>INIT : https://dev.twitter.com/en/docs/media/upload-media/api-reference/post-media-upload-init</para>
// <para>APPEND : https://dev.twitter.com/en/docs/media/upload-media/api-reference/post-media-upload-append</para>
// <para>FINALIZE : https://dev.twitter.com/en/docs/media/upload-media/api-reference/post-media-upload-finalize</para>
export interface IUploadParameters extends IUploadOptionalParameters {
  // Binary that you want to publish
  binary: ArrayBuffer;
}

// https://dev.twitter.com/rest/media/uploading-media
export class UploadBinaryParameters extends UploadOptionalParameters implements IUploadParameters {

  constructor(binary: ArrayBuffer, mediaType?: string) {
    super(mediaType);

    this.binary = binary;
  }

  public binary: ArrayBuffer;
}
