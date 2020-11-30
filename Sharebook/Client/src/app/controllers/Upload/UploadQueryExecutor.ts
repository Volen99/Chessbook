import {inject, Inject, Injectable, InjectionToken} from "@angular/core";

import {IUploadParameters} from "../../core/Public/Parameters/Upload/UploadBinaryParameters";
import {ITwitterRequest} from "../../core/Public/Models/Interfaces/ITwitterRequest";
import {IAddMediaMetadataParameters} from "../../core/Public/Parameters/Upload/AddMediaMetadataParameters";
import {IChunkUploadResult} from "../../core/Core/Upload/ChunkUploaderResult";
import {ITwitterResult} from "../../core/Core/Web/TwitterResult";
import {IChunkedUploader} from "../../core/Core/Upload/IChunkedUploader";
import {ITwitterAccessor, ITwitterAccessorToken} from "../../core/Core/Web/ITwitterAccessor";
import {IUploadHelper, IUploadHelperToken, UploadHelper} from "./UploadHelper";
import {TwitterRequest} from "../../core/Public/TwitterRequest";
import {ChunkUploadAppendParameters} from "../../core/Core/Upload/ChunkUploadAppendParameters";
import {MediaCategory} from "../../core/Public/Models/Enum/MediaCategory";
import {ChunkUploadInitParameters} from "../../core/Core/Upload/ChunkUploadInitParameters";
import {UploadProgressState} from "../../core/Public/Parameters/Enum/UploadProgressState";
import {HttpMethod} from "../../core/Public/Models/Enum/HttpMethod";
import {IMedia} from "../../core/Public/Models/Interfaces/IMedia";
import {IUploadedMediaInfo} from "../../core/Public/Models/Interfaces/DTO/IUploadedMediaInfo";
import {Resources} from "../../properties/resources";
import {MediaUploadProgressChangedEventArgs} from "../../core/Public/Events/MediaUploadProgressChangedEventArgs";
import {TwitterAccessor} from "../../Tweetinvi.Credentials/TwitterAccessor";
import {IFactory, IFactoryToken} from "../../core/Core/Injectinvi/IFactory";
import InvalidOperationException from "typescript-dotnet-commonjs/System/Exceptions/InvalidOperationException";
import TimeSpan from "typescript-dotnet-commonjs/System/Time/TimeSpan";
import {ChunkedUploader} from "./ChunkedUploader";
import {MultipartTwitterQuery} from "../../core/Public/MultipartTwitterQuery";
import {JsonConvert} from "json2typescript";
import {AppInjector} from "../../sharebook/Injectinvi/app-injector";
import {SharebookConsts} from "../../core/Public/sharebook-consts";

export interface IUploadQueryExecutor {
  // Upload a binary
  uploadBinaryAsync(uploadQueryParameters: IUploadParameters, request: ITwitterRequest): Promise<IChunkUploadResult>;

  // Add metadata to a media that has been uploaded.
  addMediaMetadataAsync(metadata: IAddMediaMetadataParameters, request: ITwitterRequest): Promise<ITwitterResult>;
}

export const IUploadQueryExecutorToken = new InjectionToken<IUploadQueryExecutor>('IUploadQueryExecutor', {
  providedIn: 'root',
  factory: () => AppInjector.get(UploadQueryExecutor),
});

@Injectable({
  providedIn: 'root',
})
export class UploadQueryExecutor implements IUploadQueryExecutor {
  private readonly _twitterAccessor: ITwitterAccessor;
  private readonly _chunkedUploadFactory: IFactory<IChunkedUploader>;
  private readonly _uploadHelper: IUploadHelper;

  constructor(@Inject(ITwitterAccessorToken) twitterAccessor: ITwitterAccessor,
              @Inject(IFactoryToken) chunkedUploadFactory: IFactory<IChunkedUploader>,
              @Inject(IUploadHelperToken) uploadHelper: IUploadHelper) {
    this._twitterAccessor = twitterAccessor;
    this._chunkedUploadFactory = chunkedUploadFactory;
    this._uploadHelper = uploadHelper;
  }

  public async uploadBinaryAsync(uploadQueryParameters: IUploadParameters, baseRequest: ITwitterRequest): Promise<IChunkUploadResult> {
    let binary: ArrayBuffer = uploadQueryParameters.binary;
    let uploader: IChunkedUploader = this.createChunkedUploader();

    let initParameters = new ChunkUploadInitParameters();
    initParameters.totalBinaryLength = binary.byteLength;
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

    let totalSize = await UploadQueryExecutor.calculateSizeAsync("media", binary);
    let uploadedSize: number = 0;

    // uploadQueryParameters.uploadStateChanged(new MediaUploadProgressChangedEventArgs(UploadProgressState.INITIALIZED, 0, totalSize));
    for (let i = 0; i < binaryChunks.length; ++i) {
      let binaryChunk = binaryChunks[i];

      let chunkArrayBufferCurrent: () => Promise<ArrayBuffer> = async () => binaryChunk;
      SharebookConsts.fileCurrent.arrayBuffer = chunkArrayBufferCurrent;

      let startUploadedSize = uploadedSize;
      // Must be `media`, if using the real media type as content id, Twitter does not accept when invoking .Finalize().
      let appendParameters = new ChunkUploadAppendParameters(binaryChunk, uploadQueryParameters.mediaType, uploadQueryParameters.timeout);
      appendParameters.uploadProgressChanged = (args) => {
        uploadedSize = startUploadedSize + args.NumberOfBytesUploaded;
        uploadQueryParameters.uploadStateChanged(new MediaUploadProgressChangedEventArgs(UploadProgressState.PROGRESS_CHANGED, uploadedSize, totalSize));
      };
      appendParameters.customRequestParameters = uploadQueryParameters.appendCustomRequestParameters;


      let appendRequest = new TwitterRequest(baseRequest);
      debugger
      let appendOperationSucceeded = await uploader.appendAsync(appendParameters, appendRequest); // .ConfigureAwait(false);

      if (appendOperationSucceeded === false) {
        uploadQueryParameters.uploadStateChanged(new MediaUploadProgressChangedEventArgs(UploadProgressState.FAILED, uploadedSize, totalSize));
        return uploader.result;
      }
    }

    let finalizeRequest = new TwitterRequest(baseRequest);

    debugger
    let finalizeSucceeded: boolean = await uploader.finalizeAsync(uploadQueryParameters.finalizeCustomRequestParameters, finalizeRequest); // .ConfigureAwait(false);
    if (finalizeSucceeded) {
      let result = uploader.result;
     // uploadQueryParameters.uploadStateChanged(new MediaUploadProgressChangedEventArgs(UploadProgressState.COMPLETED, uploadedSize, totalSize));

      let category = uploadQueryParameters.mediaCategory;
      let isAwaitableUpload = category === MediaCategory.Gif || category === MediaCategory.Video;

      if (isAwaitableUpload && uploadQueryParameters.waitForTwitterProcessing) {
        let request = new TwitterRequest(baseRequest);
        await this._uploadHelper.waitForMediaProcessingToGetAllMetadataAsync(result.media, request); // .ConfigureAwait(false);
      }
    }

    debugger
    return uploader.result;
  }

  private static async calculateSizeAsync(contentId: string, binary: ArrayBuffer): Promise<number> {
    // using (var httpContent = MultipartTwitterQuery.CreateHttpContent(contentId, new Array<Uint8Array[]>()); // new[] { binary }
    // let httpContent = MultipartTwitterQuery.CreateHttpContent(contentId, new Array<Uint8Array[]>());
    return binary.byteLength + 200; // (await httpContent.ReadAsByteArrayAsync().ConfigureAwait(false)).Length;

    // let httpContent: MultipartFormDataContent = MultipartTwitterQuery.CreateHttpContent(contentId, [binary]); // new[] { binary }
    // return (await httpContent.ReadAsByteArrayAsync())/*.ConfigureAwait(false))*/.length;

  }

  private static getBinaryChunks(binary: ArrayBuffer, chunkSize: number): Array<Uint8Array> {
    let result = new Array<Uint8Array>();
    let numberOfChunks: number = Math.ceil(binary.byteLength / chunkSize) as number;

    for (let i = 0; i < numberOfChunks; ++i) {
      let skip: number = i * chunkSize;
      let take: number = Math.min(chunkSize, binary.byteLength - skip);

      const view = new Uint8Array(binary);
      let chunkBytes = view.filter((u, z) => z >= skip).filter((u, z) => z < take); // TODO: mega slow??!

      result.push(chunkBytes);
    }

    return result;
  }

  private createChunkedUploader(): IChunkedUploader {
    return this._chunkedUploadFactory.create('ChunkedUploader');
  }

  public addMediaMetadataAsync(metadata: IAddMediaMetadataParameters, request: ITwitterRequest): Promise<ITwitterResult> {
    let jsonConvert: JsonConvert = new JsonConvert();
    let json = jsonConvert.serializeObject(metadata);

    request.query.url = "https://upload.twitter.com/1.1/media/metadata/create.json";
    request.query.httpMethod = HttpMethod.POST;
    request.query.httpContent = json;  // new StringContent(json);

    return this._twitterAccessor.executeRequestAsync(request);

    // // let json = JsonConvert.SerializeObject(metadata);
    //
    // request.query.url = "Your server URL";     // "https://upload.twitter.com/1.1/media/metadata/create.json";
    // request.query.httpMethod = HttpMethod.POST;
    // // request.query.httpContent = new StringContent(json);
    //
    // return this._twitterAccessor.executeRequestAsync(request);
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

      // let waitTimeRemaining = media.uploadedMediaInfo.createdDate.add(timeBeforeOperationPermitted).subtract(DateTime.now);
      // if (waitTimeRemaining.TotalMilliseconds > 0) {
      //   await this.sleep(waitTimeRemaining.TotalMilliseconds as number);
      // }
    }

    request.query.url = `https://upload.twitter.com/1.1/media/upload.json?command=STATUS&media_id=${media.id}`;
    request.query.httpMethod = HttpMethod.GET;

    return await this._twitterAccessor.executeRequestAsync<IUploadedMediaInfo>(request);
  }

  private sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
