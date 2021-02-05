import {IUploadParameters} from "../../../shared/models/upload/upload-binary-parameters";
import {IAddMediaMetadataParameters} from "../../../shared/models/upload/add-media-metadata-parameters";
import {
  IUploadClientRequiredParametersValidator,
  UploadClientRequiredParametersValidatorService
} from "./upload-client-required-parameters-validator.service";
import {MediaCategory} from "../../../shared/models/enums/media-category";
import {SharebookLimits} from "../../../helpers/sharebook-limits";

export interface IUploadClientParametersValidator {
  validate(parameters: IUploadParameters): void;

  validate(parameters: IAddMediaMetadataParameters): void;
}

export class UploadClientParametersValidator implements IUploadClientParametersValidator {
  private readonly _uploadClientRequiredParametersValidator: IUploadClientRequiredParametersValidator;

  constructor(private uploadClientRequiredParametersValidator: UploadClientRequiredParametersValidatorService) {
    this._uploadClientRequiredParametersValidator = uploadClientRequiredParametersValidator;
  }

  public validate(parameters: IUploadParameters | IAddMediaMetadataParameters): void {
    if (this.isIUploadParameters(parameters)) {
      this._uploadClientRequiredParametersValidator.validate(parameters);
      if (parameters.mediaCategory === MediaCategory.Gif || parameters.mediaCategory === MediaCategory.Image ||
        parameters.mediaCategory === MediaCategory.DmGif || parameters.mediaCategory === MediaCategory.DmImage) {
        let maxUploadSize = SharebookLimits.UPLOAD_MAX_IMAGE_SIZE;
        if (parameters.binary.byteLength > maxUploadSize) {
          throw new Error(`${`nameof(parameters.binary)`}, maxUploadSize, nameof(this.Limits.UPLOAD_MAX_IMAGE_SIZE), "binary size"`);
        }
      }

      if (parameters.mediaCategory === MediaCategory.Video || parameters.mediaCategory === MediaCategory.DmVideo) {
        let maxUploadSize = SharebookLimits.UPLOAD_MAX_VIDEO_SIZE;
        if (parameters.binary.byteLength > maxUploadSize) {
          throw new Error(`${`nameof(parameters.binary)`}, maxUploadSize, nameof(this.Limits.UPLOAD_MAX_VIDEO_SIZE), "binary size"`);
        }
      }
    } else {
      this._uploadClientRequiredParametersValidator.validate(parameters);
    }
  }

  private isIUploadParameters(parameters: IUploadParameters | IAddMediaMetadataParameters): parameters is IUploadParameters {
    return (parameters as IUploadParameters).binary !== undefined;
  }
}
