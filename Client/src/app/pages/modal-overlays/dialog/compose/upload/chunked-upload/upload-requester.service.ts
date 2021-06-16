import {Injectable} from "@angular/core";

import {UploadQueryExecutorService} from "./upload-query-executor.service";
import {
  UploadClientRequiredParametersValidatorService
} from "../validators/upload-client-required-parameters-validator.service";
import {IUploadParameters} from "../../../../../../shared/models/upload/upload-binary-parameters";
import {IChunkUploadResult} from "./core/chunk-uploader-result";


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
