import {inject, Inject, InjectionToken} from "@angular/core";

import {UploadRequester} from "../../../../sharebook/Client/Requesters/UploadRequester";
import {IChunkUploadResult} from 'src/app/core/Core/Upload/ChunkUploaderResult';
import {IUploadParameters} from "../../Parameters/Upload/UploadBinaryParameters";
import {ITwitterResult} from 'src/app/core/Core/Web/TwitterResult';
import {IAddMediaMetadataParameters} from "../../Parameters/Upload/AddMediaMetadataParameters";
import {IUploadedMediaInfo} from '../../Models/Interfaces/DTO/IUploadedMediaInfo';
import {IMedia} from "../../Models/Interfaces/IMedia";
import {UploadClientRequiredParametersValidator} from "../../../Core/Client/Validators/UploadClientRequiredParametersValidator";
import {UploadQueryExecutor} from "../../../../controllers/Upload/UploadQueryExecutor";
import {UploadMediaStatusQueryExecutor} from "../../../../controllers/Upload/UploadMediaStatusQueryExecutor";
import {UploadHelper} from "../../../../controllers/Upload/UploadHelper";
import {TwitterClientEvents} from "../../../Core/Events/TweetinviGlobalEvents";
import {TwitterClient} from "../../../../sharebook/TwitterClient";

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
  addMediaMetadataAsync(parameters: IAddMediaMetadataParameters): Promise<ITwitterResult>;

  /// <summary>
  /// Get a video processing status
  /// <para>https://dev.twitter.com/en/docs/media/upload-media/api-reference/get-media-upload-status</para>
  /// </summary>
  /// <returns>Current status of the video processing</returns>
  getVideoProcessingStatusAsync(media: IMedia): Promise<ITwitterResult<IUploadedMediaInfo>>;

  /// <summary>
  /// Wait for the upload of a media has completed
  /// <para>Read more : https://dev.twitter.com/en/docs/media/upload-media/api-reference/get-media-upload-status</para>
  /// </summary>
  /// <returns>Completes wait the media is ready for use</returns>
  waitForMediaProcessingToGetAllMetadataAsync(media: IMedia): Promise<void>;
}

export const IUploadRequesterToken = new InjectionToken<IUploadRequester>('IUploadRequester', {
  providedIn: 'root',
  factory: () => new UploadRequester(inject(TwitterClient), inject(TwitterClientEvents), inject(UploadClientRequiredParametersValidator),
    inject(UploadQueryExecutor), inject(UploadMediaStatusQueryExecutor), inject(UploadHelper)),
});
