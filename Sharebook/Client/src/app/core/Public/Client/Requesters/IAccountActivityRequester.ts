import {ITwitterResult} from "../../../Core/Web/TwitterResult";
import {ICreateAccountActivityWebhookParameters} from "../../Parameters/AccountActivity/RegisterAccountActivityWebhookParameters";
import {IWebhookDTO} from "../../Models/Interfaces/DTO/Webhooks/IWebhookDTO";
import {IGetAccountActivityWebhookEnvironmentsParameters} from "../../Parameters/AccountActivity/GetAccountActivityWebhookEnvironmentsParameters";
import {IGetAccountActivityEnvironmentWebhooksParameters} from "../../Parameters/AccountActivity/GetAccountActivityEnvironmentWebhooksParameters";
import {IDeleteAccountActivityWebhookParameters} from "../../Parameters/AccountActivity/RemoveAccountActivityWebhookParameters";
import {ITriggerAccountActivityWebhookCRCParameters} from "../../Parameters/AccountActivity/TriggerAccountActivityCRCParameters";
import {ISubscribeToAccountActivityParameters} from "../../Parameters/AccountActivity/SubscribeToAllEnvironmentEventsParameters";
import {ICountAccountActivitySubscriptionsParameters} from "../../Parameters/AccountActivity/CountNumberOfSubscriptionsParameters";
import {IWebhookSubscriptionsCount} from "../../Models/Interfaces/IWebhookSubscriptionsCount";
import {IIsAccountSubscribedToAccountActivityParameters} from "../../Parameters/AccountActivity/IsAccountSubscribedToAppAccountActivityParameters";
import {IGetAccountActivitySubscriptionsParameters} from "../../Parameters/AccountActivity/GetListOfSubscriptionsParameters";
import {IWebhookEnvironmentSubscriptionsDTO} from "../../Models/Interfaces/DTO/Webhooks/IWebhookEnvironmentSubscriptionsDTO";
import {IUnsubscribeFromAccountActivityParameters} from "../../Parameters/AccountActivity/UnsubscribeFromAccountActivityParameters";
import {IGetAccountActivityWebhookEnvironmentsResultDTO} from "../../Models/Interfaces/DTO/Webhooks/IGetAccountActivityWebhookEnvironmentsResultDTO";
import {InjectionToken} from "@angular/core";

export interface IAccountActivityRequester {
  // <summary>
  // Registers a webhook URL for all event types. The URL will be validated via CRC request before saving.
  // <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/api-reference/aaa-premium#post-account-activity-all-env-name-webhooks </para>
  // </summary>
  // <returns>Twitter Result containing the created webhook</returns>
  createAccountActivityWebhookAsync(parameters: ICreateAccountActivityWebhookParameters): Promise<ITwitterResult<IWebhookDTO>>;

  // <summary>
  // Get the account activity webhook environments
  // <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/api-reference/aaa-premium#get-account-activity-all-webhooks </para>
  // </summary>
  // <returns>Twitter result containing the account activity environments</returns>
  getAccountActivityWebhookEnvironmentsAsync(parameters: IGetAccountActivityWebhookEnvironmentsParameters): Promise<ITwitterResult<IGetAccountActivityWebhookEnvironmentsResultDTO>>;

  // <summary>
  // Returns the webhooks registered on a specific environments
  // <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/api-reference/aaa-premium#get-account-activity-all-webhooks </para>
  // </summary>
  // <returns>Twitter result containing the account activity registered webhooks</returns>
  getAccountActivityEnvironmentWebhooksAsync(parameters: IGetAccountActivityEnvironmentWebhooksParameters): Promise<ITwitterResult<IWebhookDTO[]>>;

  // <summary>
  // Remove the specified account activity webhook
  // <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/api-reference/aaa-premium#delete-account-activity-all-env-name-webhooks-webhook-id </para>
  // </summary>
  deleteAccountActivityWebhookAsync(parameters: IDeleteAccountActivityWebhookParameters): Promise<ITwitterResult>;

  // <summary>
  // Challenges a webhook and reenable it when it was disabled
  // <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/api-reference/aaa-premium#put-account-activity-all-env-name-webhooks-webhook-id </para>
  // </summary>
  triggerAccountActivityWebhookCRCAsync(parameters: ITriggerAccountActivityWebhookCRCParameters): Promise<ITwitterResult>;

  // <summary>
  // Subscribes the provided application to all events for the provided environment for all message types. After activation, all events for the requesting user will be sent to the application’s webhook via POST request.
  // <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/api-reference/aaa-premium#post-account-activity-all-env-name-subscriptions </para>
  // </summary>
  subscribeToAccountActivityAsync(parameters: ISubscribeToAccountActivityParameters): Promise<ITwitterResult>;

  // <summary>
  // Returns the count of subscriptions that are currently active on your account for all activities.
  // <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/api-reference/aaa-premium#get-account-activity-all-subscriptions-count </para>
  // </summary>
  // <returns>Twitter result containing the count information</returns>
  countAccountActivitySubscriptionsAsync(parameters: ICountAccountActivitySubscriptionsParameters): Promise<ITwitterResult<IWebhookSubscriptionsCount>>;

  // <summary>
  // Check if an account is subscribed to the webhooks
  // <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/api-reference/aaa-premium#get-account-activity-all-env-name-subscriptions </para>
  // </summary>
  isAccountSubscribedToAccountActivityAsync(parameters: IIsAccountSubscribedToAccountActivityParameters): Promise<ITwitterResult>;

  // <summary>
  // Get the account activity subscriptions
  // <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/api-reference/aaa-premium#get-account-activity-all-env-name-subscriptions-list </para>
  // </summary>
  // <returns>Twitter result containing the user subscriptions to account activities</returns>
  getAccountActivitySubscriptionsAsync(parameters: IGetAccountActivitySubscriptionsParameters): Promise<ITwitterResult<IWebhookEnvironmentSubscriptionsDTO>>;

  // <summary>
  // Unsubscribe a user from account activity
  // <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/api-reference/aaa-premium#delete-account-activity-all-env-name-subscriptions-user-id-json </para>
  // </summary>
  unsubscribeFromAccountActivityAsync(parameters: IUnsubscribeFromAccountActivityParameters): Promise<ITwitterResult>;
}

export const IAccountActivityRequesterToken = new InjectionToken<IAccountActivityRequester>('IAccountActivityRequester', {
  providedIn: 'root',
  factory: () => new,
});
