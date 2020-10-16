import {IUploadParameters} from "../../core/Public/Parameters/Upload/UploadBinaryParameters";
import {ITwitterRequest} from "../../core/Public/Models/Interfaces/ITwitterRequest";
import {IAddMediaMetadataParameters} from "../../core/Public/Parameters/Upload/AddMediaMetadataParameters";
import {IChunkUploadResult} from "../../core/Core/Upload/ChunkUploaderResult";
import {ITwitterResult} from "../../core/Core/Web/TwitterResult";
import {IChunkedUploader} from "../../core/Core/Upload/IChunkedUploader";
import {ITwitterAccessor} from "../../core/Core/Web/ITwitterAccessor";
import {IUploadHelper} from "./UploadHelper";
import {TwitterRequest} from "../../core/Public/TwitterRequest";
import {ChunkUploadAppendParameters} from "../../core/Core/Upload/ChunkUploadAppendParameters";
import {MediaCategory} from "../../core/Public/Models/Enum/MediaCategory";
import {ChunkUploadInitParameters} from "../../core/Core/Upload/ChunkUploadInitParameters";
import {UploadProgressState} from "../../core/Public/Parameters/Enum/UploadProgressState";
import {MultipartTwitterQuery} from "../../core/Public/MultipartTwitterQuery";
import {HttpMethod} from "../../core/Public/Models/Enum/HttpMethod";
import {IMedia} from "../../core/Public/Models/Interfaces/IMedia";
import {IUploadedMediaInfo} from "../../core/Public/Models/Interfaces/DTO/IUploadedMediaInfo";
import InvalidOperationException from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/InvalidOperationException";
import {Resources} from "../../properties/resources";
import TimeSpan from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/TimeSpan";
import DateTime from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime";
import {MediaUploadProgressChangedEventArgs} from "../../core/Public/Events/MediaUploadProgressChangedEventArgs";

export interface IUploadQueryExecutor {
  // Upload a binary
  uploadBinaryAsync(uploadQueryParameters: IUploadParameters, request: ITwitterRequest): Promise<IChunkUploadResult>;

  // Add metadata to a media that has been uploaded.
  addMediaMetadataAsync(metadata: IAddMediaMetadataParameters, request: ITwitterRequest): Promise<ITwitterResult>;
}

export class UploadQueryExecutor implements IUploadQueryExecutor {
  private readonly _twitterAccessor: ITwitterAccessor;
  private readonly _chunkedUploadFactory: IFactory<IChunkedUploader>;
  private readonly _uploadHelper: IUploadHelper;

  constructor(twitterAccessor: ITwitterAccessor, chunkedUploadFactory: IFactory<IChunkedUploader>, uploadHelper: IUploadHelper) {
    this._twitterAccessor = twitterAccessor;
    this._chunkedUploadFactory = chunkedUploadFactory;
    this._uploadHelper = uploadHelper;
  }

  public async uploadBinaryAsync(uploadQueryParameters: IUploadParameters, baseRequest: ITwitterRequest): Promise<IChunkUploadResult> {
    let binary = uploadQueryParameters.binary;
    let uploader = this.createChunkedUploader();

    let initParameters = new ChunkUploadInitParameters();
    initParameters.totalBinaryLength = binary.length;
    initParameters.mediaType = uploadQueryParameters.queryMediaType;
    initParameters.mediaCategory = uploadQueryParameters.queryMediaCategory;
    initParameters.additionalOwnerIds = uploadQueryParameters.additionalOwnerIds;
    initParameters.customRequestParameters = uploadQueryParameters.initCustomRequestParameters;

    let initRequest = new TwitterRequest(baseRequest);
    let initOperationSucceeded = await uploader.initAsync(initParameters, initRequest); // .ConfigureAwait(false);

    if (initOperationSucceeded === false) {
      return uploader.result;
    }

    let binaryChunks = UploadQueryExecutor.getBinaryChunks(binary, uploadQueryParameters.maxChunkSize);

    let totalSize = await UploadQueryExecutor.calculateSizeAsync("media", binary); // .ConfigureAwait(false);
    let uploadedSize: number = 0;

    uploadQueryParameters.uploadStateChanged(new MediaUploadProgressChangedEventArgs(UploadProgressState.INITIALIZED, 0, totalSize));

    for (let i = 0; i < binaryChunks.length; ++i) {
      let binaryChunk = binaryChunks[i];
      let startUploadedSize = uploadedSize;
      // Must be `media`, if using the real media type as content id, Twitter does not accept when invoking .Finalize().
      let appendParameters = new ChunkUploadAppendParameters(binaryChunk, "media", uploadQueryParameters.timeout);
      appendParameters.uploadProgressChanged = (args) => {
        uploadedSize = startUploadedSize + args.NumberOfBytesUploaded;
        uploadQueryParameters.uploadStateChanged(new MediaUploadProgressChangedEventArgs(UploadProgressState.PROGRESS_CHANGED, uploadedSize, totalSize));
      };
      appendParameters.customRequestParameters = uploadQueryParameters.appendCustomRequestParameters;


      let appendRequest = new TwitterRequest(baseRequest);
      let appendOperationSucceeded = await uploader.appendAsync(appendParameters, appendRequest); // .ConfigureAwait(false);

      if (appendOperationSucceeded === false) {
        uploadQueryParameters.uploadStateChanged(new MediaUploadProgressChangedEventArgs(UploadProgressState.FAILED, uploadedSize, totalSize));
        return uploader.result;
      }
    }

    let finalizeRequest = new TwitterRequest(baseRequest);

    let finalizeSucceeded: boolean = await uploader.finalizeAsync(uploadQueryParameters.finalizeCustomRequestParameters, finalizeRequest); // .ConfigureAwait(false);
    if (finalizeSucceeded) {
      let result = uploader.result;
      uploadQueryParameters.uploadStateChanged(new MediaUploadProgressChangedEventArgs(UploadProgressState.COMPLETED, uploadedSize, totalSize));

      let category = uploadQueryParameters.mediaCategory;
      let isAwaitableUpload = category === MediaCategory.Gif || category === MediaCategory.Video;

      if (isAwaitableUpload && uploadQueryParameters.waitForTwitterProcessing) {
        let request = new TwitterRequest(baseRequest);
        await this._uploadHelper.waitForMediaProcessingToGetAllMetadataAsync(result.media, request); // .ConfigureAwait(false);
      }
    }

    return uploader.result;
  }

  private static async calculateSizeAsync(contentId: string, binary: number[]): Promise<number> {
    // using (var httpContent = MultipartTwitterQuery.CreateHttpContent(contentId, new[] { binary }))
    // {
    //     return (await httpContent.ReadAsByteArrayAsync().ConfigureAwait(false)).Length;
    // }

    let httpContent: MultipartFormDataContent = MultipartTwitterQuery.CreateHttpContent(contentId, [binary]); // new[] { binary }
    return (await httpContent.ReadAsByteArrayAsync())/*.ConfigureAwait(false))*/.length;
  }

  private static getBinaryChunks(binary: number[], chunkSize: number): Array<number[]> {
    let result = new Array<number[]>();
    let numberOfChunks: number = Math.ceil(/*(double)*/ binary.length / chunkSize) as number;

    for (let i = 0; i < numberOfChunks; ++i) {
      let skip: number = i * chunkSize;
      let take: number = Math.min(chunkSize, binary.length - skip);

      let temp: number[] = binary.slice();
      temp.splice(0, skip);

      let chunkBytes: number[] = temp.slice(0, take); /*.ToArray()*/

      result.push(chunkBytes);
    }

    return result;
  }

  private createChunkedUploader(): IChunkedUploader {
    return this._chunkedUploadFactory.Create();
  }

  public addMediaMetadataAsync(metadata: IAddMediaMetadataParameters, request: ITwitterRequest): Promise<ITwitterResult> {
    let json = JsonConvert.SerializeObject(metadata);

    request.query.url = "Your server URL";     // "https://upload.twitter.com/1.1/media/metadata/create.json";
    request.query.httpMethod = HttpMethod.POST;
    request.query.httpContent = new StringContent(json);

    return this._twitterAccessor.executeRequestAsync(request);
  }

  public async getMediaStatusAsync(media: IMedia, autoWait: boolean, request: ITwitterRequest): Promise<ITwitterResult<IUploadedMediaInfo>> {
    if (!media.hasBeenUploaded) {
      throw new InvalidOperationException(Resources.Exception_Upload_Status_NotUploaded);
    }

    if (media.uploadedMediaInfo.processingInfo == null) {
      throw new InvalidOperationException(Resources.Exception_Upload_Status_No_ProcessingInfo);
    }

    if (autoWait) {
      let timeBeforeOperationPermitted = TimeSpan.fromSeconds(media.uploadedMediaInfo.processingInfo.checkAfterInSeconds);

      let waitTimeRemaining = media.uploadedMediaInfo.createdDate.add(timeBeforeOperationPermitted).subtract(DateTime.now);
      if (waitTimeRemaining.TotalMilliseconds > 0) {
        await this.sleep(waitTimeRemaining.TotalMilliseconds as number); // .ConfigureAwait(false);
      }
    }

    request.query.url = `https://upload.twitter.com/1.1/media/upload.json?command=STATUS&media_id=${media.id}`;
    request.query.httpMethod = HttpMethod.GET;

    return await this._twitterAccessor.executeRequestAsync<IUploadedMediaInfo>(request); // .ConfigureAwait(false);
  }

  private sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
