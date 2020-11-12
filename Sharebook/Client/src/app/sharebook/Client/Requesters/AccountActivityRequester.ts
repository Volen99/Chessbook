import {Inject, Injectable} from "@angular/core";

import {BaseRequester} from "../BaseRequester";
import {IAccountActivityRequester} from "../../../core/Public/Client/Requesters/IAccountActivityRequester";
import {ITwitterResult} from "../../../core/Core/Web/TwitterResult";
import {
  IAccountActivityClientRequiredParametersValidator,
  IAccountActivityClientRequiredParametersValidatorToken
} from "../../../core/Core/Client/Validators/AccountActivityClientRequiredParameterValidator";
import {IAccountActivityController, IAccountActivityControllerToken} from "../../../core/Core/Controllers/IAccountActivityController";
import {ITwitterClient, ITwitterClientToken} from "../../../core/Public/ITwitterClient";
import {ITwitterClientEvents, ITwitterClientEventsToken} from "../../../core/Core/Events/TweetinviGlobalEvents";
import {ICreateAccountActivityWebhookParameters} from "../../../core/Public/Parameters/AccountActivity/RegisterAccountActivityWebhookParameters";
import {IDeleteAccountActivityWebhookParameters} from "../../../core/Public/Parameters/AccountActivity/RemoveAccountActivityWebhookParameters";
import {IGetAccountActivityEnvironmentWebhooksParameters} from "../../../core/Public/Parameters/AccountActivity/GetAccountActivityEnvironmentWebhooksParameters";
import {IGetAccountActivityWebhookEnvironmentsParameters} from "../../../core/Public/Parameters/AccountActivity/GetAccountActivityWebhookEnvironmentsParameters";
import {ITriggerAccountActivityWebhookCRCParameters} from "../../../core/Public/Parameters/AccountActivity/TriggerAccountActivityCRCParameters";
import {ISubscribeToAccountActivityParameters} from "../../../core/Public/Parameters/AccountActivity/SubscribeToAllEnvironmentEventsParameters";
import {ICountAccountActivitySubscriptionsParameters} from "../../../core/Public/Parameters/AccountActivity/CountNumberOfSubscriptionsParameters";
import {IIsAccountSubscribedToAccountActivityParameters} from "../../../core/Public/Parameters/AccountActivity/IsAccountSubscribedToAppAccountActivityParameters";
import {IGetAccountActivitySubscriptionsParameters} from "../../../core/Public/Parameters/AccountActivity/GetListOfSubscriptionsParameters";
import {IUnsubscribeFromAccountActivityParameters} from "../../../core/Public/Parameters/AccountActivity/UnsubscribeFromAccountActivityParameters";
import {IWebhookEnvironmentSubscriptionsDTO} from "../../../core/Public/Models/Interfaces/DTO/Webhooks/IWebhookEnvironmentSubscriptionsDTO";
import {IWebhookSubscriptionsCount} from "../../../core/Public/Models/Interfaces/IWebhookSubscriptionsCount";
import {IWebhookDTO} from "../../../core/Public/Models/Interfaces/DTO/Webhooks/IWebhookDTO";
import {IGetAccountActivityWebhookEnvironmentsResultDTO} from "../../../core/Public/Models/Interfaces/DTO/Webhooks/IGetAccountActivityWebhookEnvironmentsResultDTO";

@Injectable({
  providedIn: 'root',
})
export class AccountActivityRequester extends BaseRequester implements IAccountActivityRequester {
  private readonly _validator: IAccountActivityClientRequiredParametersValidator;
  private readonly _accountActivityController: IAccountActivityController;

  constructor(@Inject(ITwitterClientToken) client: ITwitterClient,
              @Inject(ITwitterClientEventsToken) twitterClientEvents: ITwitterClientEvents,
              @Inject(IAccountActivityClientRequiredParametersValidatorToken) validator: IAccountActivityClientRequiredParametersValidator,
              @Inject(IAccountActivityControllerToken) accountActivityController: IAccountActivityController) {
    super(client, twitterClientEvents);

    this._validator = validator;
    this._accountActivityController = accountActivityController;
  }

  public createAccountActivityWebhookAsync(parameters: ICreateAccountActivityWebhookParameters): Promise<ITwitterResult<IWebhookDTO>> {
    this._validator.validate(parameters);
    return super.executeRequestAsync(request => this._accountActivityController.createAccountActivityWebhookAsync(parameters, request));
  }

  public getAccountActivityWebhookEnvironmentsAsync(parameters: IGetAccountActivityWebhookEnvironmentsParameters): Promise<ITwitterResult<IGetAccountActivityWebhookEnvironmentsResultDTO>> {
    this._validator.validate(parameters);
    return super.executeRequestAsync(request => this._accountActivityController.getAccountActivityWebhookEnvironmentsAsync(parameters, request));
  }

  public getAccountActivityEnvironmentWebhooksAsync(parameters: IGetAccountActivityEnvironmentWebhooksParameters): Promise<ITwitterResult<IWebhookDTO[]>> {
    this._validator.validate(parameters);
    return super.executeRequestAsync(request => this._accountActivityController.getAccountActivityEnvironmentWebhooksAsync(parameters, request));
  }

  public deleteAccountActivityWebhookAsync(parameters: IDeleteAccountActivityWebhookParameters): Promise<ITwitterResult> {
    this._validator.validate(parameters);
    return super.executeRequestAsync(request => this._accountActivityController.deleteAccountActivityWebhookAsync(parameters, request));
  }

  public triggerAccountActivityWebhookCRCAsync(parameters: ITriggerAccountActivityWebhookCRCParameters): Promise<ITwitterResult> {
    this._validator.validate(parameters);
    return super.executeRequestAsync(request => this._accountActivityController.triggerAccountActivityWebhookCRCAsync(parameters, request));
  }

  public subscribeToAccountActivityAsync(parameters: ISubscribeToAccountActivityParameters): Promise<ITwitterResult> {
    this._validator.validate(parameters);
    return super.executeRequestAsync(request => this._accountActivityController.subscribeToAccountActivityAsync(parameters, request));
  }

  public countAccountActivitySubscriptionsAsync(parameters: ICountAccountActivitySubscriptionsParameters): Promise<ITwitterResult<IWebhookSubscriptionsCount>> {
    this._validator.validate(parameters);
    return super.executeRequestAsync(request => this._accountActivityController.countAccountActivitySubscriptionsAsync(parameters, request));
  }

  public isAccountSubscribedToAccountActivityAsync(parameters: IIsAccountSubscribedToAccountActivityParameters): Promise<ITwitterResult> {
    this._validator.validate(parameters);
    return super.executeRequestAsync(request => this._accountActivityController.isAccountSubscribedToAccountActivityAsync(parameters, request));
  }

  public getAccountActivitySubscriptionsAsync(parameters: IGetAccountActivitySubscriptionsParameters): Promise<ITwitterResult<IWebhookEnvironmentSubscriptionsDTO>> {
    this._validator.validate(parameters);
    return super.executeRequestAsync(request => this._accountActivityController.getAccountActivitySubscriptionsAsync(parameters, request));
  }

  public unsubscribeFromAccountActivityAsync(parameters: IUnsubscribeFromAccountActivityParameters): Promise<ITwitterResult> {
    this._validator.validate(parameters);
    return super.executeRequestAsync(request => this._accountActivityController.unsubscribeFromAccountActivityAsync(parameters, request));
  }
}
