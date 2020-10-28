import {Inject, InjectionToken} from "@angular/core";

import {IMedia} from "../../Models/Interfaces/IMedia";
import {IUploadParameters} from "../../Parameters/Upload/UploadBinaryParameters";
import {IUploadTweetImageParameters} from "../../Parameters/Upload/UploadTweetImageParameters";
import {IUploadMessageImageParameters} from "../../Parameters/Upload/UploadMessageImageParameters";
import {IUploadTweetVideoParameters} from "../../Parameters/Upload/UploadTweetVideoParameters";
import {IUploadMessageVideoParameters} from "../../Parameters/Upload/UploadMessageVideoParameters";
import {IAddMediaMetadataParameters} from "../../Parameters/Upload/AddMediaMetadataParameters";
import {IUploadedMediaInfo} from "../../Models/Interfaces/DTO/IUploadedMediaInfo";
import {IUploadClientParametersValidator} from "../../../Core/Client/Validators/UploadClientParametersValidator";
import {IMediaMetadata} from "../../Models/Interfaces/DTO/IMediaMetadata";
import {UploadClient} from "../../../../sharebook/Client/Clients/UploadClient";
import {TwitterClient} from "../../../../sharebook/TwitterClient";

export interface IUploadClient {
  // Validate all the Upload client parameters
  parametersValidator: IUploadClientParametersValidator;

  uploadBinaryAsync(binary: number[]): Promise<IMedia>;

  /// <summary>
  /// Upload a binary in chunks and waits for the Twitter to have processed it
  /// <para>INIT : https://dev.twitter.com/en/docs/media/upload-media/api-reference/post-media-upload-init</para>
  /// <para>APPEND : https://dev.twitter.com/en/docs/media/upload-media/api-reference/post-media-upload-append</para>
  /// <para>FINALIZE : https://dev.twitter.com/en/docs/media/upload-media/api-reference/post-media-upload-finalize</para>
  /// </summary>
  /// <returns>Uploaded media</returns>
  uploadBinaryAsync(parameters: IUploadParameters): Promise<IMedia>;

  /// <inheritdoc cref="IUploadClient.UploadTweetImageAsync(IUploadTweetImageParameters)" />
  uploadTweetImageAsync(binary: number[]): Promise<IMedia>;

  /// <summary>
  /// Upload an image to Twitter
  /// </summary>
  /// <para>INIT : https://dev.twitter.com/en/docs/media/upload-media/api-reference/post-media-upload-init</para>
  /// <para>APPEND : https://dev.twitter.com/en/docs/media/upload-media/api-reference/post-media-upload-append</para>
  /// <para>FINALIZE : https://dev.twitter.com/en/docs/media/upload-media/api-reference/post-media-upload-finalize</para>
  /// <returns>Uploaded media</returns>
  uploadTweetImageAsync(parameters: IUploadTweetImageParameters): Promise<IMedia>;

  uploadMessageImageAsync(binary: number[]): Promise<IMedia>;

  /// <summary>
  /// Upload an image to Twitter
  /// </summary>
  /// <para>INIT : https://dev.twitter.com/en/docs/media/upload-media/api-reference/post-media-upload-init</para>
  /// <para>APPEND : https://dev.twitter.com/en/docs/media/upload-media/api-reference/post-media-upload-append</para>
  /// <para>FINALIZE : https://dev.twitter.com/en/docs/media/upload-media/api-reference/post-media-upload-finalize</para>
  /// <returns>Uploaded media</returns>
  uploadMessageImageAsync(parameters: IUploadMessageImageParameters): Promise<IMedia>;

  uploadTweetVideoAsync(binary: number[]): Promise<IMedia>;

  /// <summary>
  /// Upload a video in chunks and waits for the Twitter to have processed it
  /// <para>INIT : https://dev.twitter.com/en/docs/media/upload-media/api-reference/post-media-upload-init</para>
  /// <para>APPEND : https://dev.twitter.com/en/docs/media/upload-media/api-reference/post-media-upload-append</para>
  /// <para>FINALIZE : https://dev.twitter.com/en/docs/media/upload-media/api-reference/post-media-upload-finalize</para>
  /// <para>STATUS : https://dev.twitter.com/en/docs/media/upload-media/api-reference/get-media-upload-status</para>
  /// </summary>
  /// <returns>Uploaded media</returns>
  uploadTweetVideoAsync(parameters: IUploadTweetVideoParameters): Promise<IMedia>;

  /// <inheritdoc cref="IUploadClient.UploadMessageVideoAsync(IUploadMessageVideoParameters)" />
  uploadMessageVideoAsync(binary: number[]): Promise<IMedia>;

  /// <summary>
  /// Upload a video in chunks and waits for the Twitter to have processed it
  /// <para>INIT : https://dev.twitter.com/en/docs/media/upload-media/api-reference/post-media-upload-init</para>
  /// <para>APPEND : https://dev.twitter.com/en/docs/media/upload-media/api-reference/post-media-upload-append</para>
  /// <para>FINALIZE : https://dev.twitter.com/en/docs/media/upload-media/api-reference/post-media-upload-finalize</para>
  /// <para>STATUS : https://dev.twitter.com/en/docs/media/upload-media/api-reference/get-media-upload-status</para>
  /// </summary>
  /// <returns>Uploaded media</returns>
  uploadMessageVideoAsync(parameters: IUploadMessageVideoParameters): Promise<IMedia>;

  addMediaMetadataAsync(metadata: IMediaMetadata): Promise<void>;

  /// Add metadata to an uploaded media
  addMediaMetadataAsync(parameters: IAddMediaMetadataParameters): Promise<void>;

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

export const IUploadClientToken = new InjectionToken<IUploadClient>('IUploadClient', {
  providedIn: 'root',
  factory: () => new UploadClient(Inject(TwitterClient)),
});
