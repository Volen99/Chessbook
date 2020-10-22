import {ITwitterRequest} from "../../Public/Models/Interfaces/ITwitterRequest";
import {ITwitterResult} from "../Web/TwitterResult";
import {ICreateAccountActivityWebhookParameters} from "../../Public/Parameters/AccountActivity/RegisterAccountActivityWebhookParameters";
import {IGetAccountActivityWebhookEnvironmentsParameters} from "../../Public/Parameters/AccountActivity/GetAccountActivityWebhookEnvironmentsParameters";
import {IGetAccountActivityEnvironmentWebhooksParameters} from "../../Public/Parameters/AccountActivity/GetAccountActivityEnvironmentWebhooksParameters";
import {IDeleteAccountActivityWebhookParameters} from "../../Public/Parameters/AccountActivity/RemoveAccountActivityWebhookParameters";
import {ITriggerAccountActivityWebhookCRCParameters} from "../../Public/Parameters/AccountActivity/TriggerAccountActivityCRCParameters";
import {IGetAccountActivitySubscriptionsParameters} from "../../Public/Parameters/AccountActivity/GetListOfSubscriptionsParameters";
import {ICountAccountActivitySubscriptionsParameters} from "../../Public/Parameters/AccountActivity/CountNumberOfSubscriptionsParameters";
import {ISubscribeToAccountActivityParameters} from "../../Public/Parameters/AccountActivity/SubscribeToAllEnvironmentEventsParameters";
import {IIsAccountSubscribedToAccountActivityParameters} from "../../Public/Parameters/AccountActivity/IsAccountSubscribedToAppAccountActivityParameters";
import {IUnsubscribeFromAccountActivityParameters} from "../../Public/Parameters/AccountActivity/UnsubscribeFromAccountActivityParameters";
import {IWebhookDTO} from "../../Public/Models/Interfaces/DTO/Webhooks/IWebhookDTO";
import {IGetAccountActivityWebhookEnvironmentsResultDTO} from "../../Public/Models/Interfaces/DTO/Webhooks/IGetAccountActivityWebhookEnvironmentsResultDTO";
import {IWebhookEnvironmentSubscriptionsDTO} from "../../Public/Models/Interfaces/DTO/Webhooks/IWebhookEnvironmentSubscriptionsDTO";
import {IWebhookSubscriptionsCount} from "../../Public/Models/Interfaces/IWebhookSubscriptionsCount";
import {InjectionToken} from "@angular/core";
import {AccountActivityController} from "../../../controllers/AccountActivity/AccountActivityController";

export interface IAccountActivityController {
  createAccountActivityWebhookAsync(parameters: ICreateAccountActivityWebhookParameters, request: ITwitterRequest): Promise<ITwitterResult<IWebhookDTO>>;

  getAccountActivityWebhookEnvironmentsAsync(parameters: IGetAccountActivityWebhookEnvironmentsParameters, request: ITwitterRequest): Promise<ITwitterResult<IGetAccountActivityWebhookEnvironmentsResultDTO>>;

  getAccountActivityEnvironmentWebhooksAsync(parameters: IGetAccountActivityEnvironmentWebhooksParameters, request: ITwitterRequest): Promise<ITwitterResult<IWebhookDTO[]>>;

  deleteAccountActivityWebhookAsync(parameters: IDeleteAccountActivityWebhookParameters, request: ITwitterRequest): Promise<ITwitterResult>;

  triggerAccountActivityWebhookCRCAsync(parameters: ITriggerAccountActivityWebhookCRCParameters, request: ITwitterRequest): Promise<ITwitterResult>;

  getAccountActivitySubscriptionsAsync(parameters: IGetAccountActivitySubscriptionsParameters, request: ITwitterRequest): Promise<ITwitterResult<IWebhookEnvironmentSubscriptionsDTO>>;

  countAccountActivitySubscriptionsAsync(parameters: ICountAccountActivitySubscriptionsParameters, request: ITwitterRequest): Promise<ITwitterResult<IWebhookSubscriptionsCount>>;

  subscribeToAccountActivityAsync(parameters: ISubscribeToAccountActivityParameters, request: ITwitterRequest): Promise<ITwitterResult>;

  isAccountSubscribedToAccountActivityAsync(parameters: IIsAccountSubscribedToAccountActivityParameters, request: ITwitterRequest): Promise<ITwitterResult>;

  unsubscribeFromAccountActivityAsync(parameters: IUnsubscribeFromAccountActivityParameters, request: ITwitterRequest): Promise<ITwitterResult>;
}

export const IAccountActivityControllerToken = new InjectionToken<IAccountActivityController>('IAccountActivityController', {
  providedIn: 'root',
  factory: () => new AccountActivityController(),
});
