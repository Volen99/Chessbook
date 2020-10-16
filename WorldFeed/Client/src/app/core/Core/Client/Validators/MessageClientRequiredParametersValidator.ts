import {IMessagesClientParametersValidator} from "./MessageClientParametersValidator";
import {MessagesParameters} from "./parameters-types";
import {IPublishMessageParameters} from "../../../Public/Parameters/MessageClient/PublishMessageParameters";
import ArgumentNullException from 'src/app/c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/ArgumentNullException';

export interface IMessagesClientRequiredParametersValidator extends IMessagesClientParametersValidator {
}

export class MessagesClientRequiredParametersValidator implements IMessagesClientRequiredParametersValidator {
  public validate(parameters: MessagesParameters): void {
    if (parameters == null) {
      throw new ArgumentNullException(nameof(parameters));
    }

    if (this.isIPublishMessageParameters(parameters)) {
      if (!(parameters.text)) {
        throw new ArgumentNullException(`${nameof(parameters.text)}`);
      }
    }
  }

  private isIPublishMessageParameters(parameters: MessagesParameters): parameters is IPublishMessageParameters {
    return (parameters as IPublishMessageParameters).mediaId !== undefined;
  }
}
