import {IUploadParameters} from "../../../Public/Parameters/Upload/UploadBinaryParameters";
import {IAddMediaMetadataParameters} from "../../../Public/Parameters/Upload/AddMediaMetadataParameters";
import {IUploadClientRequiredParametersValidator} from './UploadClientRequiredParametersValidator';
import {MediaCategory} from "../../../Public/Models/Enum/MediaCategory";
import {TwitterLimits} from "../../../Public/Settings/TwitterLimits";
import {ITwitterClient} from "../../../Public/ITwitterClient";
import {TwitterArgumentLimitException} from "../../../Public/Exceptions/TwitterArgumentLimitException";

export interface IUploadClientParametersValidator {
  validate(parameters: IUploadParameters): void;

  validate(parameters: IAddMediaMetadataParameters): void;
}

export class UploadClientParametersValidator implements IUploadClientParametersValidator {
  private readonly _client: ITwitterClient;
  private readonly _uploadClientRequiredParametersValidator: IUploadClientRequiredParametersValidator;

  constructor(client: ITwitterClient, uploadClientRequiredParametersValidator: IUploadClientRequiredParametersValidator) {
    this._client = client;
    this._uploadClientRequiredParametersValidator = uploadClientRequiredParametersValidator;
  }

  get Limits(): TwitterLimits {
    return this._client.config.limits;
  }

  public validate(parameters: IUploadParameters | IAddMediaMetadataParameters): void {
    if (this.isIUploadParameters(parameters)) {
      this._uploadClientRequiredParametersValidator.validate(parameters);
      if (parameters.mediaCategory === MediaCategory.Gif || parameters.mediaCategory === MediaCategory.Image ||
        parameters.mediaCategory === MediaCategory.DmGif || parameters.mediaCategory === MediaCategory.DmImage) {
        let maxUploadSize = this.Limits.UPLOAD_MAX_IMAGE_SIZE;
        if (parameters.binary.length > maxUploadSize) {
          throw new TwitterArgumentLimitException(`${nameof(parameters.binary)}`, maxUploadSize, nameof(this.Limits.UPLOAD_MAX_IMAGE_SIZE), "binary size");
        }
      }

      if (parameters.mediaCategory === MediaCategory.Video || parameters.mediaCategory === MediaCategory.DmVideo) {
        let maxUploadSize = this.Limits.UPLOAD_MAX_VIDEO_SIZE;
        if (parameters.binary.length > maxUploadSize) {
          throw new TwitterArgumentLimitException(`${nameof(parameters.binary)}`, maxUploadSize, nameof(this.Limits.UPLOAD_MAX_VIDEO_SIZE), "binary size");
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
