import {inject, Inject, Injectable, InjectionToken} from "@angular/core";

import {IUploadParameters} from "../../../../../../shared/models/upload/upload-binary-parameters";
import {IAddMediaMetadataParameters} from "../../../../../../shared/models/upload/add-media-metadata-parameters";
import {IChunkedUploader} from "../../../../../../shared/models/upload/chunked-uploader";
import {ChunkUploadInitParameters} from "../../../../../../shared/models/upload/chunk-upload-init-parameters";
import {ChunkUploadAppendParameters} from "../../../../../../shared/models/upload/chunk-upload-append-parameters";
import {MediaCategory} from "../../../../../../shared/models/enums/media-category";
import {Resources} from "../../../../../../helpers/resourse";
import {TimeSpan} from "../shared/timespan";
import {IChunkUploadResult} from "./core/chunk-uploader-result";
import {IMedia} from "../../../../../../shared/models/upload/media/media";
import {IUploadedMediaInfo} from "../../../../../../shared/models/upload/media/uploaded-media-info";
import {ChunkedUploaderService} from "./chunked-uploader.service";

export interface IUploadQueryExecutorService {
  // Upload a binary
  uploadBinaryAsync(uploadQueryParameters: IUploadParameters): Promise<IChunkUploadResult>;

  // Add metadata to a media that has been uploaded.
  addMediaMetadataAsync(metadata: IAddMediaMetadataParameters): Promise</*ITwitterResult*/ void>;
}

@Injectable()
export class UploadQueryExecutorService {
  constructor(private chunkedUploaderService: ChunkedUploaderService) {
  }

  public async uploadBinaryAsync(uploadQueryParameters: IUploadParameters): Promise<IChunkUploadResult> {
    let binary: ArrayBuffer = uploadQueryParameters.binary;

    let initParameters = new ChunkUploadInitParameters(uploadQueryParameters.queryMediaType);
    initParameters.totalBinaryLength = binary.byteLength;
    initParameters.mediaType = uploadQueryParameters.queryMediaType;
    initParameters.mediaCategory = uploadQueryParameters.queryMediaCategory;
    initParameters.additionalOwnerIds = uploadQueryParameters.additionalOwnerIds;
    initParameters.customRequestParameters = uploadQueryParameters.initCustomRequestParameters;

    let initOperationSucceeded = await this.chunkedUploaderService.initAsync(initParameters);

    if (initOperationSucceeded === false) {
      return this.chunkedUploaderService.result;
    }

    let binaryChunks = UploadQueryExecutorService.getBinaryChunks(binary, uploadQueryParameters.maxChunkSize);

    let totalSize = await UploadQueryExecutorService.calculateSizeAsync("media", binary);
    let uploadedSize: number = 0;

    // uploadQueryParameters.uploadStateChanged(new MediaUploadProgressChangedEventArgs(UploadProgressState.INITIALIZED, 0, totalSize));
    for (let i = 0; i < binaryChunks.length; ++i) {
      let binaryChunk: Uint8Array = binaryChunks[i];

      let startUploadedSize = uploadedSize;
      // Must be `media`, if using the real media type as content id, Twitter does not accept when invoking .Finalize().
      let appendParameters = new ChunkUploadAppendParameters(binaryChunk,  uploadQueryParameters.queryMediaType, uploadQueryParameters.timeout);
      appendParameters.uploadProgressChanged = (args) => {
        uploadedSize = startUploadedSize + args.NumberOfBytesUploaded;
      };
      appendParameters.customRequestParameters = uploadQueryParameters.appendCustomRequestParameters;



      let appendOperationSucceeded = await this.chunkedUploaderService.appendAsync(appendParameters);
      if (appendOperationSucceeded === false) {
        return this.chunkedUploaderService.result;
      }
    }

    let finalizeSucceeded: boolean = await this.chunkedUploaderService.finalizeAsync(uploadQueryParameters.finalizeCustomRequestParameters); // .ConfigureAwait(false);
    if (finalizeSucceeded) {
      let result = this.chunkedUploaderService.result;
      // uploadQueryParameters.uploadStateChanged(new MediaUploadProgressChangedEventArgs(UploadProgressState.COMPLETED, uploadedSize, totalSize));

      let category = uploadQueryParameters.mediaCategory;
      let isAwaitableUpload = category === MediaCategory.Gif || category === MediaCategory.Video;

      // if (isAwaitableUpload && uploadQueryParameters.waitForTwitterProcessing) {
      //   let request = new TwitterRequest(baseRequest);
      //   await this._uploadHelper.waitForMediaProcessingToGetAllMetadataAsync(result.media, request); // .ConfigureAwait(false);
      // }
    }

    return this.chunkedUploaderService.result;
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

  // public addMediaMetadataAsync(metadata: IAddMediaMetadataParameters): Promise<ITwitterResult> {
  //   let jsonConvert: JsonConvert = new JsonConvert();
  //   let json = jsonConvert.serializeObject(metadata);
  //
  //   request.query.url = "https://upload.twitter.com/1.1/media/metadata/create.json";
  //   request.query.httpMethod = HttpMethod.POST;
  //   request.query.httpContent = json;  // new StringContent(json);
  //
  //   return this._twitterAccessor.executeRequestAsync(request);
  //
  //   // // let json = JsonConvert.SerializeObject(metadata);
  //   //
  //   // request.query.url = "Your server URL";     // "https://upload.twitter.com/1.1/media/metadata/create.json";
  //   // request.query.httpMethod = HttpMethod.POST;
  //   // // request.query.httpContent = new StringContent(json);
  //   //
  //   // return this._twitterAccessor.executeRequestAsync(request);
  // }

  // public async getMediaStatusAsync(media: IMedia, autoWait: boolean, request: ITwitterRequest): Promise<ITwitterResult<IUploadedMediaInfo>> {
  //   if (!media.hasBeenUploaded) {
  //     throw new Error(Resources.Exception_Upload_Status_NotUploaded);
  //   }
  //
  //   if (media.uploadedMediaInfo.processingInfo == null) {
  //     throw new Error(Resources.Exception_Upload_Status_No_ProcessingInfo);
  //   }
  //
  //   if (autoWait) {
  //     let timeBeforeOperationPermitted = TimeSpan.fromSeconds(media.uploadedMediaInfo.processingInfo.checkAfterInSeconds);
  //
  //     // let waitTimeRemaining = media.uploadedMediaInfo.createdDate.add(timeBeforeOperationPermitted).subtract(DateTime.now);
  //     // if (waitTimeRemaining.TotalMilliseconds > 0) {
  //     //   await this.sleep(waitTimeRemaining.TotalMilliseconds as number);
  //     // }
  //   }
  //
  //   request.query.url = `https://upload.twitter.com/1.1/media/upload.json?command=STATUS&media_id=${media.id}`;
  //   request.query.httpMethod = HttpMethod.GET;
  //
  //   return await this._twitterAccessor.executeRequestAsync<IUploadedMediaInfo>(request);
  // }

  private sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
