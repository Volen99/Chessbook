import {Injectable, InjectionToken} from "@angular/core";
import {IAddMediaMetadataParameters} from "../../../shared/models/upload/add-media-metadata-parameters";
import {IUploadParameters} from "../../../shared/models/upload/upload-binary-parameters";
import {IUploadClientParametersValidator} from "./upload-client-parameters-validator";

export interface IUploadClientRequiredParametersValidator extends IUploadClientParametersValidator {
}

export const IUploadClientRequiredParametersValidatorToken = new InjectionToken<IUploadClientRequiredParametersValidator>('IUploadClientRequiredParametersValidator', {
  providedIn: 'root',
  factory: () => new UploadClientRequiredParametersValidatorService(),
});

@Injectable()
export class UploadClientRequiredParametersValidatorService implements IUploadClientRequiredParametersValidator {
  public validate(parameters: IUploadParameters | IAddMediaMetadataParameters): void {
    if (parameters == null) {
      throw new Error(`nameof(parameters)`);
    }

    if (UploadClientRequiredParametersValidatorService.isIUploadParameters(parameters)) {
      if (parameters.binary == null) {
        throw new Error(`${`nameof(parameters.binary)`}`);
      }
    } else {
      if (parameters.mediaId == null) {
        throw new Error(`${`nameof(parameters.mediaId)`}`);
      }
    }
  }

  private static isIUploadParameters(parameters: IUploadParameters | IAddMediaMetadataParameters): parameters is IUploadParameters {
    return (parameters as IUploadParameters).binary !== undefined;
  }
}
