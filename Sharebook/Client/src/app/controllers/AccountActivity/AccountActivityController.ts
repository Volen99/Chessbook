import {ITwitterAccessor} from "../../core/Core/Web/ITwitterAccessor";
import {IAccountActivityController} from "../../core/Core/Controllers/IAccountActivityController";
import {ITwitterResult} from "../../core/Core/Web/TwitterResult";
import {HttpMethod} from 'src/app/core/Public/Models/Enum/HttpMethod';
import {ITwitterRequest} from "../../core/Public/Models/Interfaces/ITwitterRequest";
import {IAccountActivityQueryGenerator} from "./AccountActivityQueryGenerator";
import {ICreateAccountActivityWebhookParameters} from "../../core/Public/Parameters/AccountActivity/RegisterAccountActivityWebhookParameters";
import {IWebhookDTO} from "../../core/Public/Models/Interfaces/DTO/Webhooks/IWebhookDTO";
import {IGetAccountActivityWebhookEnvironmentsParameters} from "../../core/Public/Parameters/AccountActivity/GetAccountActivityWebhookEnvironmentsParameters";
import {TwitterCredentials} from "../../core/Public/Models/Authentication/TwitterCredentials";
import {IGetAccountActivityWebhookEnvironmentsResultDTO} from "../../core/Public/Models/Interfaces/DTO/Webhooks/IGetAccountActivityWebhookEnvironmentsResultDTO";
import {ConsumerOnlyCredentials} from "../../core/Public/Models/Authentication/ConsumerOnlyCredentials";
import {IGetAccountActivityEnvironmentWebhooksParameters} from "../../core/Public/Parameters/AccountActivity/GetAccountActivityEnvironmentWebhooksParameters";
import {IDeleteAccountActivityWebhookParameters} from "../../core/Public/Parameters/AccountActivity/RemoveAccountActivityWebhookParameters";
import {IIsAccountSubscribedToAccountActivityParameters} from "../../core/Public/Parameters/AccountActivity/IsAccountSubscribedToAppAccountActivityParameters";
import {IWebhookSubscriptionsCount} from "../../core/Public/Models/Interfaces/IWebhookSubscriptionsCount";
import {ICountAccountActivitySubscriptionsParameters} from "../../core/Public/Parameters/AccountActivity/CountNumberOfSubscriptionsParameters";
import {IWebhookEnvironmentSubscriptionsDTO} from "../../core/Public/Models/Interfaces/DTO/Webhooks/IWebhookEnvironmentSubscriptionsDTO";
import {IGetAccountActivitySubscriptionsParameters} from "../../core/Public/Parameters/AccountActivity/GetListOfSubscriptionsParameters";
import {IUnsubscribeFromAccountActivityParameters} from "../../core/Public/Parameters/AccountActivity/UnsubscribeFromAccountActivityParameters";
import {ISubscribeToAccountActivityParameters} from "../../core/Public/Parameters/AccountActivity/SubscribeToAllEnvironmentEventsParameters";
import {ITriggerAccountActivityWebhookCRCParameters} from "../../core/Public/Parameters/AccountActivity/TriggerAccountActivityCRCParameters";

export class AccountActivityController implements IAccountActivityController {
  private readonly _twitterAccessor: ITwitterAccessor;
  private readonly _accountActivityQueryGenerator: IAccountActivityQueryGenerator;

  constructor(twitterAccessor: ITwitterAccessor, accountActivityQueryGenerator: IAccountActivityQueryGenerator) {
    this._twitterAccessor = twitterAccessor;
    this._accountActivityQueryGenerator = accountActivityQueryGenerator;
  }

  public createAccountActivityWebhookAsync(parameters: ICreateAccountActivityWebhookParameters, request: ITwitterRequest): Promise<ITwitterResult<IWebhookDTO>> {
    request.query.url = this._accountActivityQueryGenerator.getCreateAccountActivityWebhookQuery(parameters);
    request.query.httpMethod = HttpMethod.POST;
    return this._twitterAccessor.executeRequestAsync<IWebhookDTO>(request);
  }

  public getAccountActivityWebhookEnvironmentsAsync(parameters: IGetAccountActivityWebhookEnvironmentsParameters, request: ITwitterRequest): Promise<ITwitterResult<IGetAccountActivityWebhookEnvironmentsResultDTO>> {
    let consumerCredentials = new ConsumerOnlyCredentials(request.query.twitterCredentials);

    request.query.url = this._accountActivityQueryGenerator.getAccountActivityWebhookEnvironmentsQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    request.query.twitterCredentials = new TwitterCredentials(consumerCredentials);

    return this._twitterAccessor.executeRequestAsync<IGetAccountActivityWebhookEnvironmentsResultDTO>(request);
  }

  public getAccountActivityEnvironmentWebhooksAsync(parameters: IGetAccountActivityEnvironmentWebhooksParameters, request: ITwitterRequest): Promise<ITwitterResult<IWebhookDTO[]>> {
    let consumerCredentials = new ConsumerOnlyCredentials(request.query.twitterCredentials);

    request.query.url = this._accountActivityQueryGenerator.getAccountActivityEnvironmentWebhooksQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    request.query.twitterCredentials = new TwitterCredentials(consumerCredentials);

    return this._twitterAccessor.executeRequestAsync<IWebhookDTO[]>(request);
  }

  public deleteAccountActivityWebhookAsync(parameters: IDeleteAccountActivityWebhookParameters, request: ITwitterRequest): Promise<ITwitterResult> {
    request.query.url = this._accountActivityQueryGenerator.getDeleteAccountActivityWebhookQuery(parameters);
    request.query.httpMethod = HttpMethod.DELETE;
    return this._twitterAccessor.executeRequestAsync(request);
  }

  public triggerAccountActivityWebhookCRCAsync(parameters: ITriggerAccountActivityWebhookCRCParameters, request: ITwitterRequest): Promise<ITwitterResult> {
    request.query.url = this._accountActivityQueryGenerator.getTriggerAccountActivityWebhookCRCQuery(parameters);
    request.query.httpMethod = HttpMethod.PUT;
    return this._twitterAccessor.executeRequestAsync(request);
  }

  public subscribeToAccountActivityAsync(parameters: ISubscribeToAccountActivityParameters, request: ITwitterRequest): Promise<ITwitterResult> {
    request.query.url = this._accountActivityQueryGenerator.getSubscribeToAccountActivityQuery(parameters);
    request.query.httpMethod = HttpMethod.POST;
    return this._twitterAccessor.executeRequestAsync(request);
  }

  public unsubscribeFromAccountActivityAsync(parameters: IUnsubscribeFromAccountActivityParameters, request: ITwitterRequest): Promise<ITwitterResult> {
    let consumerCredentials = new ConsumerOnlyCredentials(request.query.twitterCredentials);

    request.query.url = this._accountActivityQueryGenerator.getUnsubscribeToAccountActivityQuery(parameters);
    request.query.httpMethod = HttpMethod.DELETE;
    request.query.twitterCredentials = new TwitterCredentials(consumerCredentials);

    return this._twitterAccessor.executeRequestAsync(request);
  }

  public countAccountActivitySubscriptionsAsync(parameters: ICountAccountActivitySubscriptionsParameters, request: ITwitterRequest): Promise<ITwitterResult<IWebhookSubscriptionsCount>> {
    let consumerCredentials = new ConsumerOnlyCredentials(request.query.twitterCredentials);

    request.query.url = this._accountActivityQueryGenerator.getCountAccountActivitySubscriptionsQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    request.query.twitterCredentials = new TwitterCredentials(consumerCredentials);

    return this._twitterAccessor.executeRequestAsync<IWebhookSubscriptionsCount>(request);
  }

  public isAccountSubscribedToAccountActivityAsync(parameters: IIsAccountSubscribedToAccountActivityParameters, request: ITwitterRequest): Promise<ITwitterResult> {
    request.query.url = this._accountActivityQueryGenerator.getIsAccountSubscribedToAccountActivityQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync(request);
  }

  public getAccountActivitySubscriptionsAsync(parameters: IGetAccountActivitySubscriptionsParameters, request: ITwitterRequest): Promise<ITwitterResult<IWebhookEnvironmentSubscriptionsDTO>> {
    let consumerCredentials = new ConsumerOnlyCredentials(request.query.twitterCredentials);

    request.query.url = this._accountActivityQueryGenerator.getAccountActivitySubscriptionsQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    request.query.twitterCredentials = new TwitterCredentials(consumerCredentials);

    return this._twitterAccessor.executeRequestAsync<IWebhookEnvironmentSubscriptionsDTO>(request);
  }
}
