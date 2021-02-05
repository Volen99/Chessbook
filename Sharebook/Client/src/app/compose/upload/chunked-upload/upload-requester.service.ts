import {Inject, Injectable} from "@angular/core";
import {UploadQueryExecutorService} from "./upload-query-executor.service";
import {
  IUploadClientRequiredParametersValidator,
  UploadClientRequiredParametersValidatorService
} from "../validators/upload-client-required-parameters-validator.service";
import {IUploadMediaStatusQueryExecutor} from "./upload-media-status-query-executor";
import {IUploadParameters} from "../../../shared/models/upload/upload-binary-parameters";
import {IAddMediaMetadataParameters} from "../../../shared/models/upload/add-media-metadata-parameters";
import {IMedia} from "../../../shared/models/upload/media/media";
import {IUploadedMediaInfo} from "../../../shared/models/upload/media/uploaded-media-info";
import {IChunkUploadResult} from "./core/chunk-uploader-result";
import {IUploadRequester} from "../../../shared/models/upload/upload-requester";


@Injectable()
export class UploadRequesterService {
  constructor(private uploadQueryExecutorService: UploadQueryExecutorService,
              private uploadClientRequiredParametersValidatorService: UploadClientRequiredParametersValidatorService) {
  }

  public uploadBinaryAsync(parameters: IUploadParameters): Promise<IChunkUploadResult> {
    this.uploadClientRequiredParametersValidatorService.validate(parameters);

    return this.uploadQueryExecutorService.uploadBinaryAsync(parameters);
  }

  // public addMediaMetadataAsync(parameters: IAddMediaMetadataParameters): Promise<ITwitterResult> {
  //   this.uploadClientRequiredParametersValidatorService.validate(parameters);
  //
  //   return this.executeRequestAsync(request => this.uploadQueryExecutorService.addMediaMetadataAsync(parameters, request));
  // }
  //
  // public getVideoProcessingStatusAsync(media: IMedia): Promise<ITwitterResult<IUploadedMediaInfo>> {
  //   return this.executeRequestAsync(request => this.uploadQueryExecutorService.getMediaStatusAsync(media, request));
  // }
  //
  // public waitForMediaProcessingToGetAllMetadataAsync(media: IMedia): Promise<void> {
  //   return this.executeRequestAsync(request => this._uploadHelper.waitForMediaProcessingToGetAllMetadataAsync(media, request));
  // }
}
