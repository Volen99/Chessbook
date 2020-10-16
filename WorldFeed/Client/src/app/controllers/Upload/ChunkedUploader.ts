import {IChunkedUploader} from "../../core/Core/Upload/IChunkedUploader";
import {IMedia} from '../../core/Public/Models/Interfaces/IMedia';
import {IUploadQueryGenerator} from '../../core/Core/QueryGenerators/IUploadQueryGenerator';
import {ChunkUploadResult, IChunkUploadResult} from "../../core/Core/Upload/ChunkUploaderResult";
import Dictionary from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Dictionaries/Dictionary";
import {IChunkUploadInitParameters} from "../../core/Core/Upload/ChunkUploadInitParameters";
import {ITwitterRequest} from '../../core/Public/Models/Interfaces/ITwitterRequest';
import {HttpMethod} from "../../core/Public/Models/Enum/HttpMethod";
import {IUploadInitModel} from "../../core/Core/Upload/UploadInitModel";
import InvalidOperationException from 'src/app/c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/InvalidOperationException';
import {IChunkUploadAppendParameters} from "../../core/Core/Upload/ChunkUploadAppendParameters";
import {MultipartTwitterQuery} from "../../core/Public/MultipartTwitterQuery";
import {ICustomRequestParameters} from "../../core/Public/Parameters/CustomRequestParameters";
import {IUploadedMediaInfo} from "../../core/Public/Models/Interfaces/DTO/IUploadedMediaInfo";
import TimeSpan from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/TimeSpan";
import {UploadProgressState} from "../../core/Public/Parameters/Enum/UploadProgressState";
import {ITwitterAccessor} from "../../core/Core/Web/ITwitterAccessor";
import {MediaUploadProgressChangedEventArgs} from "../../core/Public/Events/MediaUploadProgressChangedEventArgs";
import {ITwitterResult} from "../../core/Core/Web/TwitterResult";
import {UploadedMediaInfo} from "../../core/Core/DTO/UploadedMediaInfo";

export class ChunkedUploader implements IChunkedUploader {
  private readonly _media: IMedia;
  private readonly _twitterAccessor: ITwitterAccessor;
  private readonly _uploadQueryGenerator: IUploadQueryGenerator;

  private _expectedBinaryLength?: number;
  private readonly _result: ChunkUploadResult;

  constructor(twitterAccessor: ITwitterAccessor, uploadQueryGenerator: IUploadQueryGenerator, media: IMedia) {
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
    let initQuery = this._uploadQueryGenerator.getChunkedUploadInitQuery(initParameters);

    request.query.url = initQuery;
    request.query.httpMethod = HttpMethod.POST;

    let twitterResult = await this._twitterAccessor.executeRequestAsync<IUploadInitModel>(request); // .ConfigureAwait(false);
    this._result.init = twitterResult;

    let initModel: IUploadInitModel = twitterResult?.model;
    if (initModel != null) {
      this._expectedBinaryLength = initParameters.totalBinaryLength;
      this._media.id = initModel.mediaId;
    }

    return initModel != null;
  }

  public async appendAsync(parameters: IChunkUploadAppendParameters, request: ITwitterRequest): Promise<boolean> {
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
    multipartQuery.Binaries = [parameters.binary];              // new[] { parameters.Binary };
    multipartQuery.timeout = parameters.timeout ?? TimeSpan.fromMilliseconds(-1); // Timeout.Infinite
    multipartQuery.ContentId = parameters.mediaType;
    multipartQuery.UploadProgressChanged = args => {
      let progressChangedEventArgs = new MediaUploadProgressChangedEventArgs(UploadProgressState.PROGRESS_CHANGED, args.NumberOfBytesUploaded, args.TotalOfBytesToUpload);
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

    let finalizeTwitterResult = await this._twitterAccessor.executeRequestAsync<UploadedMediaInfo>(request); // .ConfigureAwait(false);
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
      let binaryLengthCurrent;
      for (let i = 0; i < this.uploadedSegments.count; i++) {
        binaryLengthCurrent += this.uploadedSegments.getValue(i).length;   // TODO: might bug!!
      }
      // If all the data has not been sent then we do not construct the data
      if (binaryLengthCurrent === this._expectedBinaryLength) {
        let allSegments = this.uploadedSegments.toArray().sort((a, b) => a.key - b.key); // TODO: bug debug it
        this._media.data = allSegments.reduce((a, b) => [...a, ...b.value], []); // .ToArray();
      }
    }
  }

  private UploadInitModel = class {
    // [JsonProperty("media_id")];
    public MediaId: number;

    // [JsonProperty("expires_after_secs")];
    public ExpiresAfterInSeconds: number;
  };
}


