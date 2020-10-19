import StringBuilder from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Text/StringBuilder";
import {Resources} from "../../properties/resources";
import {ICreateAccountActivityWebhookParameters} from "../../core/Public/Parameters/AccountActivity/RegisterAccountActivityWebhookParameters";
import {IGetAccountActivityWebhookEnvironmentsParameters} from "../../core/Public/Parameters/AccountActivity/GetAccountActivityWebhookEnvironmentsParameters";
import {IGetAccountActivityEnvironmentWebhooksParameters} from "../../core/Public/Parameters/AccountActivity/GetAccountActivityEnvironmentWebhooksParameters";
import {IDeleteAccountActivityWebhookParameters} from "../../core/Public/Parameters/AccountActivity/RemoveAccountActivityWebhookParameters";
import {ITriggerAccountActivityWebhookCRCParameters} from "../../core/Public/Parameters/AccountActivity/TriggerAccountActivityCRCParameters";
import {ISubscribeToAccountActivityParameters} from "../../core/Public/Parameters/AccountActivity/SubscribeToAllEnvironmentEventsParameters";
import {IUnsubscribeFromAccountActivityParameters} from "../../core/Public/Parameters/AccountActivity/UnsubscribeFromAccountActivityParameters";
import {ICountAccountActivitySubscriptionsParameters} from "../../core/Public/Parameters/AccountActivity/CountNumberOfSubscriptionsParameters";
import {IIsAccountSubscribedToAccountActivityParameters} from "../../core/Public/Parameters/AccountActivity/IsAccountSubscribedToAppAccountActivityParameters";
import {IGetAccountActivitySubscriptionsParameters} from "../../core/Public/Parameters/AccountActivity/GetListOfSubscriptionsParameters";

export interface IAccountActivityQueryGenerator {
  getCreateAccountActivityWebhookQuery(parameters: ICreateAccountActivityWebhookParameters): string;

  getAccountActivityWebhookEnvironmentsQuery(parameters: IGetAccountActivityWebhookEnvironmentsParameters): string;

  getAccountActivityEnvironmentWebhooksQuery(parameters: IGetAccountActivityEnvironmentWebhooksParameters): string;

  getDeleteAccountActivityWebhookQuery(parameters: IDeleteAccountActivityWebhookParameters): string;

  getTriggerAccountActivityWebhookCRCQuery(parameters: ITriggerAccountActivityWebhookCRCParameters): string;

  getSubscribeToAccountActivityQuery(parameters: ISubscribeToAccountActivityParameters): string;

  getUnsubscribeToAccountActivityQuery(parameters: IUnsubscribeFromAccountActivityParameters);

  getCountAccountActivitySubscriptionsQuery(parameters: ICountAccountActivitySubscriptionsParameters): string;

  getIsAccountSubscribedToAccountActivityQuery(parameters: IIsAccountSubscribedToAccountActivityParameters): string;

  getAccountActivitySubscriptionsQuery(parameters: IGetAccountActivitySubscriptionsParameters): string;
}

export class AccountActivityQueryGenerator implements IAccountActivityQueryGenerator {
  public getCreateAccountActivityWebhookQuery(parameters: ICreateAccountActivityWebhookParameters): string {
    let query = new StringBuilder(`${Resources.Webhooks_AccountActivity_All}/${parameters.environment}/webhooks.json?`);

    query.addParameterToQuery("url", parameters.webhookUrl);
    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getAccountActivityWebhookEnvironmentsQuery(parameters: IGetAccountActivityWebhookEnvironmentsParameters): string {
    let query = new StringBuilder(Resources.Webhooks_AccountActivity_GetAllWebhooks);
    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);
    return query.toString();
  }

  public getAccountActivityEnvironmentWebhooksQuery(parameters: IGetAccountActivityEnvironmentWebhooksParameters): string {
    let query = new StringBuilder(`${Resources.Webhooks_AccountActivity_All}/${parameters.environment}/webhooks.json`);
    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);
    return query.toString();
  }

  public getDeleteAccountActivityWebhookQuery(parameters: IDeleteAccountActivityWebhookParameters): string {
    let query = new StringBuilder(`${Resources.Webhooks_AccountActivity_All}/${parameters.environment}/webhooks/${parameters.webhookId}.json?`);
    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);
    return query.toString();
  }

  public getTriggerAccountActivityWebhookCRCQuery(parameters: ITriggerAccountActivityWebhookCRCParameters): string {
    let query = new StringBuilder(`${Resources.Webhooks_AccountActivity_All}/${parameters.environment}/webhooks/${parameters.webhookId}.json?`);
    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);
    return query.toString();
  }

  public getSubscribeToAccountActivityQuery(parameters: ISubscribeToAccountActivityParameters): string {
    let query = new StringBuilder(`https://api.twitter.com/1.1/account_activity/all/${parameters.environment}/subscriptions.json`);
    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);
    return query.toString();
  }

  public getUnsubscribeToAccountActivityQuery(parameters: IUnsubscribeFromAccountActivityParameters): string {
    let query = new StringBuilder(`https://api.twitter.com/1.1/account_activity/all/${parameters.environment}/subscriptions/${parameters.userId}.json`);
    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);
    return query.toString();
  }

  public getCountAccountActivitySubscriptionsQuery(parameters: ICountAccountActivitySubscriptionsParameters): string {
    let query = new StringBuilder("https://api.twitter.com/1.1/account_activity/all/subscriptions/count.json");
    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);
    return query.toString();
  }

  public getIsAccountSubscribedToAccountActivityQuery(parameters: IIsAccountSubscribedToAccountActivityParameters): string {
    let query = new StringBuilder(`https://api.twitter.com/1.1/account_activity/all/${parameters.environment}/subscriptions.json`);
    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);
    return query.toString();
  }

  public getAccountActivitySubscriptionsQuery(parameters: IGetAccountActivitySubscriptionsParameters): string {
    let query = new StringBuilder(`https://api.twitter.com/1.1/account_activity/all/${parameters.environment}/subscriptions/list.json`);
    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);
    return query.toString();
  }
}
