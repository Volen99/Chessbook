import {inject, Inject, Injectable, InjectionToken} from "@angular/core";

import {IUploadParameters} from "../../../Public/Parameters/Upload/UploadBinaryParameters";
import {IAddMediaMetadataParameters} from "../../../Public/Parameters/Upload/AddMediaMetadataParameters";
import {
  IUploadClientRequiredParametersValidator,
  IUploadClientRequiredParametersValidatorToken, UploadClientRequiredParametersValidator
} from './UploadClientRequiredParametersValidator';
import {MediaCategory} from "../../../Public/Models/Enum/MediaCategory";
import {SharebookLimits} from "../../../Public/Settings/SharebookLimits";
import {ITwitterClient, ITwitterClientToken} from "../../../Public/ITwitterClient";
import {TwitterArgumentLimitException} from "../../../Public/Exceptions/TwitterArgumentLimitException";
import {TwitterClient} from "../../../../sharebook/TwitterClient";

export interface IUploadClientParametersValidator {
  validate(parameters: IUploadParameters): void;

  validate(parameters: IAddMediaMetadataParameters): void;
}

export const IUploadClientParametersValidatorToken = new InjectionToken<IUploadClientParametersValidator>('IUploadClientParametersValidator', {
  providedIn: 'root',
  factory: () => new UploadClientParametersValidator(inject(TwitterClient), inject(UploadClientRequiredParametersValidator)),
});

@Injectable({
  providedIn: 'root',
})
export class UploadClientParametersValidator implements IUploadClientParametersValidator {
  private readonly _client: ITwitterClient;
  private readonly _uploadClientRequiredParametersValidator: IUploadClientRequiredParametersValidator;

  constructor(@Inject(ITwitterClientToken) client: ITwitterClient,
              @Inject(IUploadClientRequiredParametersValidatorToken) uploadClientRequiredParametersValidator: IUploadClientRequiredParametersValidator) {
    this._client = client;
    this._uploadClientRequiredParametersValidator = uploadClientRequiredParametersValidator;
  }

  get Limits(): SharebookLimits {
    return this._client.config.limits;
  }

  public validate(parameters: IUploadParameters | IAddMediaMetadataParameters): void {
    if (this.isIUploadParameters(parameters)) {
      this._uploadClientRequiredParametersValidator.validate(parameters);
      if (parameters.mediaCategory === MediaCategory.Gif || parameters.mediaCategory === MediaCategory.Image ||
        parameters.mediaCategory === MediaCategory.DmGif || parameters.mediaCategory === MediaCategory.DmImage) {
        let maxUploadSize = this.Limits.UPLOAD_MAX_IMAGE_SIZE;
        if (parameters.binary.length > maxUploadSize) {
          throw new TwitterArgumentLimitException(`${`nameof(parameters.binary)`}`, maxUploadSize, `nameof(this.Limits.UPLOAD_MAX_IMAGE_SIZE)`, "binary size");
        }
      }

      if (parameters.mediaCategory === MediaCategory.Video || parameters.mediaCategory === MediaCategory.DmVideo) {
        let maxUploadSize = this.Limits.UPLOAD_MAX_VIDEO_SIZE;
        if (parameters.binary.length > maxUploadSize) {
          throw new TwitterArgumentLimitException(`${`nameof(parameters.binary)`}`, maxUploadSize, `nameof(this.Limits.UPLOAD_MAX_VIDEO_SIZE)`, "binary size");
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
