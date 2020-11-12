import {Inject, Injectable} from "@angular/core";

import {IChunkedUploader} from "../../core/Core/Upload/IChunkedUploader";
import {IMedia, IMediaToken} from '../../core/Public/Models/Interfaces/IMedia';
import {IUploadQueryGenerator, IUploadQueryGeneratorToken} from '../../core/Core/QueryGenerators/IUploadQueryGenerator';
import {ChunkUploadResult, IChunkUploadResult} from "../../core/Core/Upload/ChunkUploaderResult";
import {IChunkUploadInitParameters} from "../../core/Core/Upload/ChunkUploadInitParameters";
import {ITwitterRequest} from '../../core/Public/Models/Interfaces/ITwitterRequest';
import {HttpMethod} from "../../core/Public/Models/Enum/HttpMethod";
import {IUploadInitModel} from "../../core/Core/Upload/UploadInitModel";
import {IChunkUploadAppendParameters} from "../../core/Core/Upload/ChunkUploadAppendParameters";
import {MultipartTwitterQuery} from "../../core/Public/MultipartTwitterQuery";
import {ICustomRequestParameters} from "../../core/Public/Parameters/CustomRequestParameters";
import {IUploadedMediaInfo} from "../../core/Public/Models/Interfaces/DTO/IUploadedMediaInfo";
import {UploadProgressState} from "../../core/Public/Parameters/Enum/UploadProgressState";
import {ITwitterAccessor, ITwitterAccessorToken} from "../../core/Core/Web/ITwitterAccessor";
import {MediaUploadProgressChangedEventArgs} from "../../core/Public/Events/MediaUploadProgressChangedEventArgs";
import {ITwitterResult} from "../../core/Core/Web/TwitterResult";
import {UploadedMediaInfo} from "../../core/Core/DTO/UploadedMediaInfo";
import Dictionary from "typescript-dotnet-commonjs/System/Collections/Dictionaries/Dictionary";
import InvalidOperationException from "typescript-dotnet-commonjs/System/Exceptions/InvalidOperationException";
import TimeSpan from "typescript-dotnet-commonjs/System/Time/TimeSpan";
import {SharebookConsts} from "../../core/Public/sharebook-consts";

@Injectable({
  providedIn: 'root',
})
export class ChunkedUploader implements IChunkedUploader {
  private readonly _media: IMedia;
  private readonly _twitterAccessor: ITwitterAccessor;
  private readonly _uploadQueryGenerator: IUploadQueryGenerator;

  private _expectedBinaryLength?: number;
  private readonly _result: ChunkUploadResult;

  constructor(@Inject(ITwitterAccessorToken) twitterAccessor: ITwitterAccessor,
              @Inject(IUploadQueryGeneratorToken) uploadQueryGenerator: IUploadQueryGenerator,
              @Inject(IMediaToken) media: IMedia) {
    this._twitterAccessor = twitterAccessor;
    this._uploadQueryGenerator = uploadQueryGenerator;
    this._media = media;

    this._result = new ChunkUploadResult();
    this._result.media = this._media;

    this.uploadedSegments = new Dictionary<number, number[]>();
  }

  get mediaId(): number {
    return this._media.id;
  }

  set mediaId(value: number) {
    this._media.id = value;
  }

  public uploadedSegments: Dictionary<number, number[]>;
  public nextSegmentIndex: number;

  public async initAsync(initParameters: IChunkUploadInitParameters, request: ITwitterRequest): Promise<boolean> {
    debugger
    let initQuery = this._uploadQueryGenerator.getChunkedUploadInitQuery(initParameters);

    request.query.url = initQuery;
    request.query.httpMethod = HttpMethod.POST;

    let twitterResult = await this._twitterAccessor.executeRequestGenericAsync<IUploadInitModel>(request); // .ConfigureAwait(false);
    this._result.init = twitterResult;

    let initModel: IUploadInitModel = twitterResult?.model;

    if (initModel != null) {
      this._expectedBinaryLength = initParameters.totalBinaryLength;
      this._media.id = initModel.mediaId;
    }

    return initModel != null;
  }

  public async appendAsync(parameters: IChunkUploadAppendParameters, request: ITwitterRequest): Promise<boolean> {
    this.mediaId = 1;   // TODO: Delete!!
    if (this.mediaId == null) {
      throw new InvalidOperationException(`You cannot append content to a non initialized chunked upload.
                 You need to invoke the initialize method OR set the MediaId property of an existing ChunkedUpload.`);
    }

    if (parameters.segmentIndex == null) {
      parameters.segmentIndex = this.nextSegmentIndex;
    }

    if (parameters.mediaId == null) {
      parameters.mediaId = this.mediaId;
    }

    let appendQuery: string = this._uploadQueryGenerator.getChunkedUploadAppendQuery(parameters);

    let multipartQuery = new MultipartTwitterQuery(request.query);
    multipartQuery.url = appendQuery;
    multipartQuery.httpMethod = HttpMethod.POST;
    multipartQuery.binaries = [parameters.binary];              // new[] { parameters.Binary };
    multipartQuery.timeout = parameters.timeout ?? TimeSpan.fromMilliseconds(SharebookConsts.INFINITE); // Timeout.Infinite
    multipartQuery.contentId = parameters.mediaType;
    multipartQuery.uploadProgressChanged = args => {
      let progressChangedEventArgs = new MediaUploadProgressChangedEventArgs(UploadProgressState.PROGRESS_CHANGED, args.numberOfBytesUploaded, args.totalOfBytesToUpload);
      parameters.uploadProgressChanged(progressChangedEventArgs);
    };

    request.query = multipartQuery;

    let twitterResult: ITwitterResult = await this._twitterAccessor.executeRequestAsync(request); // .ConfigureAwait(false);
    this._result.appendsList.push(twitterResult);

    if (twitterResult.response.isSuccessStatusCode) {
      this.uploadedSegments.setValue(parameters.segmentIndex/*.Value*/, parameters.binary);
      ++this.nextSegmentIndex;
    }

    return twitterResult.response.isSuccessStatusCode;
  }

  public async finalizeAsync(customRequestParameters: ICustomRequestParameters, request: ITwitterRequest): Promise<boolean> {
    if (this.mediaId == null) {
      throw new InvalidOperationException(`You cannot complete a non initialized chunked upload. Please
                                                             initialize the method, append some content and then complete the upload.`);
    }

    let finalizeQuery = this._uploadQueryGenerator.getChunkedUploadFinalizeQuery(this.mediaId/*.Value*/, customRequestParameters);

    request.query.url = finalizeQuery;
    request.query.httpMethod = HttpMethod.POST;

    let finalizeTwitterResult = await this._twitterAccessor.executeRequestGenericAsync<UploadedMediaInfo>(request); // .ConfigureAwait(false);
    let uploadedMediaInfos = finalizeTwitterResult.model;

    this.updateMedia(uploadedMediaInfos);

    this._result.finalize = finalizeTwitterResult;

    return finalizeTwitterResult.response.isSuccessStatusCode;
  }


  get result(): IChunkUploadResult {
    return this._result;
  }

  private updateMedia(uploadedMediaInfos: IUploadedMediaInfo): void {
    this._media.uploadedMediaInfo = uploadedMediaInfos;

    if (this._expectedBinaryLength != null) {
      // If all the data has not been sent then we do not construct the data
      if (this.uploadedSegments.toArray().reduce((acc, cur) => acc + cur.value.length, 0) === this._expectedBinaryLength) {
        let allSegments = this.uploadedSegments.toArray().sort((a, b) => b.key - a.key);
        this._media.data = allSegments.reduce((acc, cur) => [...acc, ...cur.value], []);
      }
    }
  }

  private UploadInitModel = class {
    // [JsonProperty("media_id")];
    public mediaId: number;

    // [JsonProperty("expires_after_secs")];
    public expiresAfterInSeconds: number;
  };
}


