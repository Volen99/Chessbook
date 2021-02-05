import {IUploadParameters} from "./upload-binary-parameters";
import {IChunkUploadResult} from "../../../compose/upload/chunked-upload/core/chunk-uploader-result";
import {IAddMediaMetadataParameters} from "./add-media-metadata-parameters";
import {IMedia} from "./media/media";
import {IUploadedMediaInfo} from "./media/uploaded-media-info";

export interface IUploadRequester {
  /// <summary>
  /// Upload a binary in chunks and waits for the Twitter to have processed it
  /// <para>INIT : https://dev.twitter.com/en/docs/media/upload-media/api-reference/post-media-upload-init</para>
  /// <para>APPEND : https://dev.twitter.com/en/docs/media/upload-media/api-reference/post-media-upload-append</para>
  /// <para>FINALIZE : https://dev.twitter.com/en/docs/media/upload-media/api-reference/post-media-upload-finalize</para>
  /// </summary>
  /// <returns>Uploaded media information</returns>
  uploadBinaryAsync(parameters: IUploadParameters): Promise<IChunkUploadResult>;

  /// <summary>
  /// Add metadata to an uploaded media
  /// <para>Read more : https://dev.twitter.com/en/docs/media/upload-media/api-reference/post-media-metadata-create</para>
  /// </summary>
  /// <returns>Whether the operation was a success</returns>
  addMediaMetadataAsync(parameters: IAddMediaMetadataParameters): Promise<void/*ITwitterResult*/>;

  /// <summary>
  /// Get a video processing status
  /// <para>https://dev.twitter.com/en/docs/media/upload-media/api-reference/get-media-upload-status</para>
  /// </summary>
  /// <returns>Current status of the video processing</returns>
  getVideoProcessingStatusAsync(media: IMedia): Promise<IUploadedMediaInfo>;

  /// <summary>
  /// Wait for the upload of a media has completed
  /// <para>Read more : https://dev.twitter.com/en/docs/media/upload-media/api-reference/get-media-upload-status</para>
  /// </summary>
  /// <returns>Completes wait the media is ready for use</returns>
  waitForMediaProcessingToGetAllMetadataAsync(media: IMedia): Promise<void>;
}
