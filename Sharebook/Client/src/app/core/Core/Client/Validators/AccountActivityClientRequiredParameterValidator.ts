import {IAccountActivityClientParametersValidator} from "./AccountActivityClientParametersValidator";
import ArgumentNullException from 'src/app/c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/ArgumentNullException';
import ArgumentException from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/ArgumentException";
import {ICreateAccountActivityWebhookParameters} from "../../../Public/Parameters/AccountActivity/RegisterAccountActivityWebhookParameters";
import {IDeleteAccountActivityWebhookParameters} from "../../../Public/Parameters/AccountActivity/RemoveAccountActivityWebhookParameters";
import {ITriggerAccountActivityWebhookCRCParameters} from "../../../Public/Parameters/AccountActivity/TriggerAccountActivityCRCParameters";
import {ISubscribeToAccountActivityParameters} from "../../../Public/Parameters/AccountActivity/SubscribeToAllEnvironmentEventsParameters";
import {IIsAccountSubscribedToAccountActivityParameters} from "../../../Public/Parameters/AccountActivity/IsAccountSubscribedToAppAccountActivityParameters";
import {IGetAccountActivitySubscriptionsParameters} from "../../../Public/Parameters/AccountActivity/GetListOfSubscriptionsParameters";
import {IUnsubscribeFromAccountActivityParameters} from "../../../Public/Parameters/AccountActivity/UnsubscribeFromAccountActivityParameters";
import {AccountActivityParameters} from "./parameters-types";
import {InjectionToken} from "@angular/core";

export interface IAccountActivityClientRequiredParametersValidator extends IAccountActivityClientParametersValidator {
}

export const IAccountActivityClientRequiredParametersValidatorToken = new InjectionToken<IAccountActivityClientRequiredParametersValidator>('IAccountActivityClientRequiredParametersValidator', {
  providedIn: 'root',
  factory: () => new AccountActivityClientRequiredParametersValidator(),
});

type SubscribeParameters = ISubscribeToAccountActivityParameters
  | IIsAccountSubscribedToAccountActivityParameters
  | IGetAccountActivitySubscriptionsParameters;

export class AccountActivityClientRequiredParametersValidator implements IAccountActivityClientRequiredParametersValidator {
  public validate(parameters: AccountActivityParameters): void {
    if (parameters == null) {
      throw new ArgumentNullException(nameof(parameters));
    }

    if (this.isICreateAccountActivityWebhookParameters(parameters)) {
      if (parameters.environment == null) {
        throw new ArgumentNullException(`$${nameof(parameters.environment)}`);
      }

      if (parameters.webhookUrl == null) {
        throw new ArgumentNullException(`$${nameof(parameters.webhookUrl)}`);
      }
    } else if (this.isIDeleteAccountActivityWebhookParameters(parameters)) {
      if (parameters.environment == null) {
        throw new ArgumentNullException(`$${nameof(parameters.environment)}`);
      }

      if (parameters.webhookId == null) {
        throw new ArgumentNullException(`$${nameof(parameters.webhookId)}`);
      }
    } else if (this.isITriggerAccountActivityWebhookCRCParameters(parameters)) {
      if (parameters.environment == null) {
        throw new ArgumentNullException(`$${nameof(parameters.environment)}`);
      }

      if (parameters.webhookId == null) {
        throw new ArgumentNullException(`$${nameof(parameters.webhookId)}`);
      }
    } else if (this.isSubscribeParameters(parameters)) {
      if (parameters.environment == null) {
        throw new ArgumentNullException(`$${nameof(parameters.environment)}`);
      }
    } else if (this.isIUnsubscribeFromAccountActivityParameters(parameters)) {
      if (parameters.environment == null) {
        throw new ArgumentNullException(`$${nameof(parameters.environment)}`);
      }

      if (parameters.userId <= 0) {
        throw new ArgumentException(`$${nameof(parameters.userId)}`);
      }
    }
  }

  private isICreateAccountActivityWebhookParameters(parameters: AccountActivityParameters): parameters is ICreateAccountActivityWebhookParameters {
    return (parameters as ICreateAccountActivityWebhookParameters).environment !== undefined;
  }

  private isIDeleteAccountActivityWebhookParameters(parameters: AccountActivityParameters): parameters is IDeleteAccountActivityWebhookParameters {
    return (parameters as IDeleteAccountActivityWebhookParameters).environment !== undefined;
  }

  private isITriggerAccountActivityWebhookCRCParameters(parameters: AccountActivityParameters): parameters is ITriggerAccountActivityWebhookCRCParameters {
    return (parameters as ITriggerAccountActivityWebhookCRCParameters).environment !== undefined;
  }

  private isSubscribeParameters(parameters: AccountActivityParameters): parameters is SubscribeParameters {
    return (parameters as SubscribeParameters).environment !== undefined;
  }

  private isIUnsubscribeFromAccountActivityParameters(parameters: AccountActivityParameters): parameters is IUnsubscribeFromAccountActivityParameters {
    return (parameters as IUnsubscribeFromAccountActivityParameters).environment !== undefined;
  }
}
