import {Injectable, InjectionToken} from "@angular/core";

import {IMessagesClientParametersValidator} from "./MessageClientParametersValidator";
import {IPublishMessageParameters} from "../../../Public/Parameters/MessageClient/PublishMessageParameters";
import {IGetMessageParameters} from "../../../Public/Parameters/MessageClient/GetMessageParameters";
import {IGetMessagesParameters} from "../../../Public/Parameters/MessageClient/GetMessagesParameters";
import {IDeleteMessageParameters} from "../../../Public/Parameters/MessageClient/DestroyMessageParameters";
import ArgumentNullException from "typescript-dotnet-commonjs/System/Exceptions/ArgumentNullException";

export interface IMessagesClientRequiredParametersValidator extends IMessagesClientParametersValidator {
}

export const IMessagesClientRequiredParametersValidatorToken = new InjectionToken<IMessagesClientRequiredParametersValidator>('IMessagesClientRequiredParametersValidator', {
  providedIn: 'root',
  factory: () => new MessagesClientRequiredParametersValidator(),
});

@Injectable({
  providedIn: 'root',
})
export class MessagesClientRequiredParametersValidator implements IMessagesClientRequiredParametersValidator {
  public validate(parameters: IPublishMessageParameters | IDeleteMessageParameters |
                              IGetMessageParameters | IGetMessagesParameters): void {
    if (parameters == null) {
      throw new ArgumentNullException(`nameof(parameters)`);
    }

    if (this.isIPublishMessageParameters(parameters)) {
      if (!parameters.text) {
        throw new ArgumentNullException(`${`nameof(parameters.text)`}`);
      }
    }
  }

  private isIPublishMessageParameters(parameters: any): parameters is IPublishMessageParameters {
    return (parameters as IPublishMessageParameters).mediaId !== undefined;
  }
}
