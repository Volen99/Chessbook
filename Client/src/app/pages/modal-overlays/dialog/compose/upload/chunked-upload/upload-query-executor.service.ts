import {Injectable} from "@angular/core";

import {IUploadParameters} from "../../../../../../shared/models/upload/upload-binary-parameters";
import {IAddMediaMetadataParameters} from "../../../../../../shared/models/upload/add-media-metadata-parameters";
import {ChunkUploadInitParameters} from "../../../../../../shared/models/upload/chunk-upload-init-parameters";
import {ChunkUploadAppendParameters} from "../../../../../../shared/models/upload/chunk-upload-append-parameters";
import {MediaCategory} from "../../../../../../shared/models/enums/media-category";
import {IChunkUploadResult} from "./core/chunk-uploader-result";
import {ChunkedUploaderService} from "./chunked-uploader.service";
import {AppInjector} from "../../../../../../app-injector";

export interface IUploadQueryExecutorService {
  // Upload a binary
  uploadBinaryAsync(uploadQueryParameters: IUploadParameters): Promise<IChunkUploadResult>;

  // Add metadata to a media that has been uploaded.
  addMediaMetadataAsync(metadata: IAddMediaMetadataParameters): Promise</*ITwitterResult*/ void>;
}

@Injectable()
export class UploadQueryExecutorService {
  constructor(/*private chunkedUploaderService: ChunkedUploaderService*/) {
  }

  public async uploadBinaryAsync(uploadQueryParameters: IUploadParameters): Promise<IChunkUploadResult> {
    let binary: ArrayBuffer = uploadQueryParameters.binary;

    let chunkedUploaderService = this.createChunkedUploader();

    let initParameters = new ChunkUploadInitParameters(uploadQueryParameters.queryMediaType);
    initParameters.totalBinaryLength = binary.byteLength;
    initParameters.mediaType = uploadQueryParameters.queryMediaType;
    initParameters.mediaCategory = uploadQueryParameters.queryMediaCategory;
    initParameters.additionalOwnerIds = uploadQueryParameters.additionalOwnerIds;
    initParameters.customRequestParameters = uploadQueryParameters.initCustomRequestParameters;

    let initOperationSucceeded = await chunkedUploaderService.initAsync(initParameters);

    if (initOperationSucceeded === false) {
      return chunkedUploaderService.result;
    }

    let binaryChunks = UploadQueryExecutorService.getBinaryChunks(binary, uploadQueryParameters.maxChunkSize);

    let totalSize = await UploadQueryExecutorService.calculateSizeAsync("media", binary);
    let uploadedSize: number = 0;

    // uploadQueryParameters.uploadStateChanged(new MediaUploadProgressChangedEventArgs(UploadProgressState.INITIALIZED, 0, totalSize));
    for (let i = 0; i < binaryChunks.length; ++i) {
      let binaryChunk: Uint8Array = binaryChunks[i];

      let startUploadedSize = uploadedSize;
      // Must be `media`, if using the real media type as content id, Twitter does not accept when invoking .Finalize().
      let appendParameters = new ChunkUploadAppendParameters(binaryChunk, uploadQueryParameters.queryMediaType, uploadQueryParameters.timeout);
      appendParameters.uploadProgressChanged = (args) => {
        uploadedSize = startUploadedSize + args.NumberOfBytesUploaded;
      };
      appendParameters.customRequestParameters = uploadQueryParameters.appendCustomRequestParameters;


      let appendOperationSucceeded = await chunkedUploaderService.appendAsync(appendParameters);
      if (appendOperationSucceeded === false) {
        return chunkedUploaderService.result;
      }
    }

    let finalizeSucceeded: boolean = await chunkedUploaderService.finalizeAsync(uploadQueryParameters.finalizeCustomRequestParameters); // .ConfigureAwait(false);
    if (finalizeSucceeded) {
      let result = chunkedUploaderService.result;
      // uploadQueryParameters.uploadStateChanged(new MediaUploadProgressChangedEventArgs(UploadProgressState.COMPLETED, uploadedSize, totalSize));

      let category = uploadQueryParameters.mediaCategory;
      let isAwaitableUpload = category === MediaCategory.Gif || category === MediaCategory.Video;

      // if (isAwaitableUpload && uploadQueryParameters.waitForTwitterProcessing) {
      //   let request = new TwitterRequest(baseRequest);
      //   await this._uploadHelper.waitForMediaProcessingToGetAllMetadataAsync(result.media, request); // .ConfigureAwait(false);
      // }
    }

    return chunkedUploaderService.result;
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

  // OMGGGGGGGGGGGGGGGGGGGGGGGGG 20.05.2021 | Lost Frequencies - Are You With Me (Official Music Video)
  private createChunkedUploader(): ChunkedUploaderService {
    let uploader = AppInjector.get(ChunkedUploaderService);

    uploader.createChunkedUploader();

    return uploader;
  }

  private sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
