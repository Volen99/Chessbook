import {Inject, Injectable} from "@angular/core";
import {HttpParams} from "@angular/common/http";

import {UploadApi} from "../backend/upload.api";
import {IUploadInitModel} from "./core/upload-init-model";
import {IChunkUploadInitParameters} from "../../../../../../shared/models/upload/chunk-upload-init-parameters";
import {IChunkUploadAppendParameters} from "../../../../../../shared/models/upload/chunk-upload-append-parameters";
import {ICustomRequestParameters} from "../../../../../../shared/models/query/custom-request-parameters";
import {IUploadedMediaInfo, UploadedMediaInfo} from "../../../../../../shared/models/upload/media/uploaded-media-info";
import {ChunkUploadResult, IChunkUploadResult} from "./core/chunk-uploader-result";
import {IChunkedUploader} from "../../../../../../shared/models/upload/chunked-uploader";
import {IMedia} from "../../../../../../shared/models/upload/media/media";
import {UploadQueryGeneratorService} from "../query/upload-query-generator.service";
import {Media} from "./core/media";
import {Observable} from "rxjs";
import {AppInjector} from "../../../../../../app-injector";

@Injectable()
export class ChunkedUploaderService implements IChunkedUploader {
  private /*readonly*/ _media: IMedia;

  private _expectedBinaryLength?: number;
  private /*readonly*/ _result: ChunkUploadResult;

  constructor(private uploadQueryGeneratorService: UploadQueryGeneratorService, private uploadApi: UploadApi) {     // media comes through ctor?! 😲
    this._media = new Media();

    this._result = new ChunkUploadResult();
    this._result.media = this._media;

    this.uploadedSegments = new Map<number, Uint8Array>();  // dic
  }

  get mediaId(): number | null {
    return this._media.id;
  }

  set mediaId(value: number | null) {
    this._media.id = value;
  }

  public uploadedSegments: Map<number, Uint8Array>;   // dic
  public nextSegmentIndex: number = 0;

  public async initAsync(initParameters: IChunkUploadInitParameters): Promise<boolean> {
    let initQuery = this.uploadQueryGeneratorService.getChunkedUploadInitQuery(initParameters);

    let initModel: IUploadInitModel;
     await this.uploadApi.initAsync(initQuery).toPromise()
      .then((model: IUploadInitModel) => {
        initModel = model;
      });

    this._result.init = initModel;

    if (initModel != null) {
      this._expectedBinaryLength = initParameters.totalBinaryLength;
      this._media.id = initModel.mediaId;
    }

    return initModel != null;
  }

  public async appendAsync(parameters: IChunkUploadAppendParameters): Promise<boolean> {
    if (this.mediaId == null) {
      throw new Error(`You cannot append content to a non initialized chunked upload.
                 You need to invoke the initialize method OR set the MediaId property of an existing ChunkedUpload.`);
    }

    if (parameters.segmentIndex == null) {
      parameters.segmentIndex = this.nextSegmentIndex;
    }

    if (parameters.mediaId == null) {
      parameters.mediaId = this.mediaId;
    }

    let appendQuery: HttpParams = this.uploadQueryGeneratorService.getChunkedUploadAppendQuery(parameters);

    // let multipartQuery = new MultipartTwitterQuery(request.query);
    // multipartQuery.url = appendQuery;
    // multipartQuery.httpMethod = HttpMethod.POST;
    // multipartQuery.binaries = [parameters.binary];              // new[] { parameters.Binary };
    // multipartQuery.timeout = parameters.timeout ?? TimeSpan.fromMilliseconds(SharebookConsts.INFINITE); // Timeout.Infinite
    // multipartQuery.contentId = parameters.mediaType;
    // multipartQuery.uploadProgressChanged = args => {
    //   let progressChangedEventArgs = new MediaUploadProgressChangedEventArgs(UploadProgressState.PROGRESS_CHANGED, args.numberOfBytesUploaded, args.totalOfBytesToUpload);
    //   parameters.uploadProgressChanged(progressChangedEventArgs);
    // };

    let formData = new FormData();

    let reqData = new Blob([parameters.binary]);
    let arrayOfBlob = new Array<Blob>();
    arrayOfBlob.push(reqData);
    let file = new File(arrayOfBlob, "media", { type: 'image/png' });

    formData.set(file.name, file);

    let isSuccessStatusCode: any;
    await this.uploadApi.appendAsync(formData, appendQuery)
        .toPromise()
        .then(response => {
          isSuccessStatusCode = true; // uh, what if it is not true? If it goes to "then" then it is always true? Idk :(
        });

    // @ts-ignore
    this._result.appendsList.push(isSuccessStatusCode);

    if (isSuccessStatusCode) {
      this.uploadedSegments.set(parameters.segmentIndex, parameters.binary);
      ++this.nextSegmentIndex;
    }

    return isSuccessStatusCode;
  }

  public async finalizeAsync(customRequestParameters: ICustomRequestParameters): Promise<boolean> {
    if (this.mediaId == null) {
      throw new Error(`You cannot complete a non initialized chunked upload. Please
                                                             initialize the method, append some content and then complete the upload.`);
    }

    let finalizeQuery = this.uploadQueryGeneratorService.getChunkedUploadFinalizeQuery(this.mediaId/*.Value*/, customRequestParameters);

    let finalizeTwitterResult: UploadedMediaInfo;
    await this.uploadApi.finalizeAsync(finalizeQuery)
        .toPromise()
        .then((data: UploadedMediaInfo) => {
          finalizeTwitterResult = data;
        });

    let uploadedMediaInfos = finalizeTwitterResult;

    this.updateMedia(uploadedMediaInfos);

    this._result.finalize = finalizeTwitterResult;


    // by miiiiiiii aaaaaaaaaaaaaaaaaaaaaaaaaaa
    this.nextSegmentIndex = 0;

    return finalizeTwitterResult != null;     // finalizeTwitterResult.response.isSuccessStatusCode;
  }


  get result(): IChunkUploadResult {
    return this._result;
  }

  private updateMedia(uploadedMediaInfos: IUploadedMediaInfo): void {
    this._media.uploadedMediaInfo = uploadedMediaInfos;

    if (this._expectedBinaryLength != null) {
      // If all the data has not been sent then we do not construct the data
      let array = Array.from(this.uploadedSegments, ([name, value]) => ({ name, value }));
      if (array.reduce((acc, cur) => acc + cur.value.length, 0) === this._expectedBinaryLength) {
        let allSegments = array.sort((a, b) => b.name - a.name); // OrderBy(x => x.Key);
        this._media.data = allSegments.reduce((acc, cur) => [...acc, ...cur.value], []); // SelectMany(x => x.Value)
      }
    }
  }

  public createChunkedUploader() {
    // @ts-ignore
    this._media = new Media();

    this._result = new ChunkUploadResult();
    this._result.media = this._media;

    this.uploadedSegments = new Map<number, Uint8Array>();  // dic

    this._expectedBinaryLength = undefined;
  }

  private UploadInitModel = class {
    public mediaId: number;

    public expiresAfterInSeconds: number;
  };
}
