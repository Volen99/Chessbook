import {ICreateAccountActivityWebhookParameters} from "../../../Public/Parameters/AccountActivity/RegisterAccountActivityWebhookParameters";
import {IGetAccountActivityWebhookEnvironmentsParameters} from "../../../Public/Parameters/AccountActivity/GetAccountActivityWebhookEnvironmentsParameters";
import {IGetAccountActivityEnvironmentWebhooksParameters} from "../../../Public/Parameters/AccountActivity/GetAccountActivityEnvironmentWebhooksParameters";
import {IDeleteAccountActivityWebhookParameters} from "../../../Public/Parameters/AccountActivity/RemoveAccountActivityWebhookParameters";
import {ITriggerAccountActivityWebhookCRCParameters} from "../../../Public/Parameters/AccountActivity/TriggerAccountActivityCRCParameters";
import {ISubscribeToAccountActivityParameters} from "../../../Public/Parameters/AccountActivity/SubscribeToAllEnvironmentEventsParameters";
import {ICountAccountActivitySubscriptionsParameters} from "../../../Public/Parameters/AccountActivity/CountNumberOfSubscriptionsParameters";
import {IIsAccountSubscribedToAccountActivityParameters} from "../../../Public/Parameters/AccountActivity/IsAccountSubscribedToAppAccountActivityParameters";
import {IGetAccountActivitySubscriptionsParameters} from "../../../Public/Parameters/AccountActivity/GetListOfSubscriptionsParameters";
import {IUnsubscribeFromAccountActivityParameters} from "../../../Public/Parameters/AccountActivity/UnsubscribeFromAccountActivityParameters";
import {IAccountActivityClientRequiredParametersValidator} from "./AccountActivityClientRequiredParameterValidator";
import {AccountActivityParameters} from "./parameters-types";

export interface IAccountActivityClientParametersValidator {
  validate(parameters: ICreateAccountActivityWebhookParameters): void;

  validate(parameters: IGetAccountActivityWebhookEnvironmentsParameters): void;

  validate(parameters: IGetAccountActivityEnvironmentWebhooksParameters): void;

  validate(parameters: IDeleteAccountActivityWebhookParameters): void;

  validate(parameters: ITriggerAccountActivityWebhookCRCParameters): void;

  validate(parameters: ISubscribeToAccountActivityParameters): void;

  validate(parameters: ICountAccountActivitySubscriptionsParameters): void;

  validate(parameters: IIsAccountSubscribedToAccountActivityParameters): void;

  validate(parameters: IGetAccountActivitySubscriptionsParameters): void;

  validate(parameters: IUnsubscribeFromAccountActivityParameters): void;
}

export class AccountActivityClientParametersValidator implements IAccountActivityClientParametersValidator {
  private readonly _activityClientRequiredParametersValidator: IAccountActivityClientRequiredParametersValidator;

  constructor(activityClientRequiredParametersValidator: IAccountActivityClientRequiredParametersValidator) {
    this._activityClientRequiredParametersValidator = activityClientRequiredParametersValidator;
  }

  public validate(parameters: AccountActivityParameters): void {
    this._activityClientRequiredParametersValidator.validate(parameters);
  }
}
