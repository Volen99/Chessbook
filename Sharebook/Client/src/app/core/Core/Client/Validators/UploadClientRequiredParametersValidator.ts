import {Injectable, InjectionToken} from "@angular/core";

import {IUploadParameters} from "../../../Public/Parameters/Upload/UploadBinaryParameters";
import ArgumentNullException from 'src/app/c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/ArgumentNullException';
import {IAddMediaMetadataParameters} from "../../../Public/Parameters/Upload/AddMediaMetadataParameters";
import {IUploadClientParametersValidator} from "./UploadClientParametersValidator";

export interface IUploadClientRequiredParametersValidator extends IUploadClientParametersValidator {
}

export const IUploadClientRequiredParametersValidatorToken = new InjectionToken<IUploadClientRequiredParametersValidator>('IUploadClientRequiredParametersValidator', {
  providedIn: 'root',
  factory: () => new UploadClientRequiredParametersValidator(),
});

@Injectable()
export class UploadClientRequiredParametersValidator implements IUploadClientRequiredParametersValidator {
  public validate(parameters: IUploadParameters | IAddMediaMetadataParameters): void {
    if (parameters == null) {
      throw new ArgumentNullException(nameof(parameters));
    }

    if (UploadClientRequiredParametersValidator.isIUploadParameters(parameters)) {
      if (parameters.binary == null) {
        throw new ArgumentNullException(`${nameof(parameters.binary)}`);
      }
    } else {
      if (parameters.mediaId == null) {
        throw new ArgumentNullException(`${nameof(parameters.mediaId)}`);
      }
    }
  }

  private static isIUploadParameters(parameters: IUploadParameters | IAddMediaMetadataParameters): parameters is IUploadParameters {
    return (parameters as IUploadParameters).binary !== undefined;
  }
}
