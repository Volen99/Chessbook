import {Inject, InjectionToken} from "@angular/core";

import {IAccountActivityClientParametersValidator} from "../../../Core/Client/Validators/AccountActivityClientParametersValidator";
import {IAccountActivityRequestHandler} from "../../Models/Webhooks/IAccountActivityRequestHandler";
import {IWebhook} from "../../Models/Interfaces/IWebhook";
import {ICreateAccountActivityWebhookParameters} from "../../Parameters/AccountActivity/RegisterAccountActivityWebhookParameters";
import {IWebhookEnvironment} from "../../Models/Interfaces/IWebhookEnvironment";
import {IGetAccountActivityWebhookEnvironmentsParameters} from "../../Parameters/AccountActivity/GetAccountActivityWebhookEnvironmentsParameters";
import {IGetAccountActivityEnvironmentWebhooksParameters} from "../../Parameters/AccountActivity/GetAccountActivityEnvironmentWebhooksParameters";
import {IDeleteAccountActivityWebhookParameters} from "../../Parameters/AccountActivity/RemoveAccountActivityWebhookParameters";
import {ITriggerAccountActivityWebhookCRCParameters} from "../../Parameters/AccountActivity/TriggerAccountActivityCRCParameters";
import {ISubscribeToAccountActivityParameters} from "../../Parameters/AccountActivity/SubscribeToAllEnvironmentEventsParameters";
import {IWebhookSubscriptionsCount} from "../../Models/Interfaces/IWebhookSubscriptionsCount";
import {ICountAccountActivitySubscriptionsParameters} from "../../Parameters/AccountActivity/CountNumberOfSubscriptionsParameters";
import {IIsAccountSubscribedToAccountActivityParameters} from "../../Parameters/AccountActivity/IsAccountSubscribedToAppAccountActivityParameters";
import {IWebhookEnvironmentSubscriptions} from "../../Models/Interfaces/IWebhookEnvironmentSubscriptions";
import {IGetAccountActivitySubscriptionsParameters} from "../../Parameters/AccountActivity/GetListOfSubscriptionsParameters";
import {IUnsubscribeFromAccountActivityParameters} from "../../Parameters/AccountActivity/UnsubscribeFromAccountActivityParameters";
import {AccountActivityRequester} from "../../../../sharebook/Client/Requesters/AccountActivityRequester";
import {TwitterClient} from "../../../../sharebook/TwitterClient";
import {AccountActivityClient} from "../../../../sharebook/Client/Clients/AccountActivityClient";

// A client providing all the actions related with the account activity api
export interface IAccountActivityClient {
  // Validate all the Account activity client parameters
  parametersValidator: IAccountActivityClientParametersValidator;

  /// <summary>
  /// Creates an AccountActivity request handler that will properly route requests
  /// </summary>
  /// <returns>AccountActivity Request Handler</returns>
  createRequestHandler(): IAccountActivityRequestHandler;

  createAccountActivityWebhookAsync(environment: string, webhookUrl: string): Promise<IWebhook>;

  /// <summary>
  /// Registers a webhook URL for all event types. The URL will be validated via CRC request before saving.
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/api-reference/aaa-premium#post-account-activity-all-env-name-webhooks </para>
  /// </summary>
  /// <returns>The created webhook</returns>
  createAccountActivityWebhookAsync(parameters: ICreateAccountActivityWebhookParameters): Promise<IWebhook>;

  getAccountActivityWebhookEnvironmentsAsync(): Promise<IWebhookEnvironment[]>;

  /// <summary>
  /// Get the account activity webhook environments
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/api-reference/aaa-premium#get-account-activity-all-webhooks </para>
  /// </summary>
  /// <returns>The account activity environments and their associated webhooks</returns>
  getAccountActivityWebhookEnvironmentsAsync(parameters: IGetAccountActivityWebhookEnvironmentsParameters): Promise<IWebhookEnvironment[]>

  getAccountActivityEnvironmentWebhooksAsync(environment: string): Promise<IWebhook[]>;

  /// <summary>
  /// Returns the webhooks registered on a specific environment
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/api-reference/aaa-premium#get-account-activity-all-webhooks </para>
  /// </summary>
  /// <returns>The account activity registered webhooks of a specific environment</returns>
  getAccountActivityEnvironmentWebhooksAsync(parameters: IGetAccountActivityEnvironmentWebhooksParameters): Promise<IWebhook[]>

  deleteAccountActivityWebhookAsync(environment: string, webhookId: string): Promise<any>;

  deleteAccountActivityWebhookAsync(environment: string, webhook: IWebhook): Promise<any>;

  /// <summary>
  /// Remove the specified account activity webhook
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/api-reference/aaa-premium#delete-account-activity-all-env-name-webhooks-webhook-id </para>
  /// </summary>
  deleteAccountActivityWebhookAsync(parameters: IDeleteAccountActivityWebhookParameters): Promise<any>;

  /// <inheritdoc cref="IAccountActivityClient.TriggerAccountActivityWebhookCRCAsync(ITriggerAccountActivityWebhookCRCParameters)" />
  triggerAccountActivityWebhookCRCAsync(environment: string, webhookId: string): Promise<any>;

  /// <summary>
  /// Challenges a webhook and reenable it when it was disabled
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/api-reference/aaa-premium#put-account-activity-all-env-name-webhooks-webhook-id </para>
  /// </summary>
  triggerAccountActivityWebhookCRCAsync(parameters: ITriggerAccountActivityWebhookCRCParameters): Promise<any>;

  subscribeToAccountActivityAsync(environment: string): Promise<any>;

  /// <summary>
  /// Subscribes the provided application to all events for the provided environment for all message types. After activation, all events for the requesting user will be sent to the application’s webhook via POST request.
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/api-reference/aaa-premium#post-account-activity-all-env-name-subscriptions </para>
  /// </summary>
  subscribeToAccountActivityAsync(parameters: ISubscribeToAccountActivityParameters): Promise<any>;

  countAccountActivitySubscriptionsAsync(): Promise<IWebhookSubscriptionsCount>;

  /// <summary>
  /// Returns the count of subscriptions that are currently active on your account for all activities.
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/api-reference/aaa-premium#get-account-activity-all-subscriptions-count </para>
  /// </summary>
  /// <returns>Count information</returns>
  countAccountActivitySubscriptionsAsync(parameters: ICountAccountActivitySubscriptionsParameters): Promise<IWebhookSubscriptionsCount>;

  isAccountSubscribedToAccountActivityAsync(environment: string): Promise<boolean>;

  /// <summary>
  /// Check if an account is subscribed to the webhooks
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/api-reference/aaa-premium#get-account-activity-all-env-name-subscriptions </para>
  /// </summary>
  /// <returns>Whether the account is subscribed to the account activity environment</returns>
  isAccountSubscribedToAccountActivityAsync(parameters: IIsAccountSubscribedToAccountActivityParameters): Promise<boolean>;

  getAccountActivitySubscriptionsAsync(environment: string): Promise<IWebhookEnvironmentSubscriptions>

  /// <summary>
  /// Get the account activity subscriptions
  /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/api-reference/aaa-premium#get-account-activity-all-env-name-subscriptions-list </para>
  /// </summary>
  /// <returns>User subscriptions to account activities</returns>
  getAccountActivitySubscriptionsAsync(parameters: IGetAccountActivitySubscriptionsParameters): Promise<IWebhookEnvironmentSubscriptions>;

  unsubscribeFromAccountActivityAsync(environment: string, userId: number): Promise<void>;

  // Unsubscribe a user from account activity
  // <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/api-reference/aaa-premium#delete-account-activity-all-env-name-subscriptions-user-id-json </para>
  unsubscribeFromAccountActivityAsync(parameters: IUnsubscribeFromAccountActivityParameters): Promise<void>;
}

export const IAccountActivityClientToken = new InjectionToken<IAccountActivityClient>('IAccountActivityClient', {
  providedIn: 'root',
  factory: () => new AccountActivityClient(Inject(AccountActivityRequester), Inject(TwitterClient)),
});
