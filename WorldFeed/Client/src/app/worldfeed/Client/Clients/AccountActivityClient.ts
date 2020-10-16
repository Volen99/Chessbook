import {IAccountActivityClient} from "../../../core/Public/Client/Clients/IAccountActivityClient";
import {IAccountActivityRequester} from "../../../core/Public/Client/Requesters/IAccountActivityRequester";
import {ITwitterClient} from "../../../core/Public/ITwitterClient";
import {IAccountActivityClientParametersValidator} from "../../../core/Core/Client/Validators/AccountActivityClientParametersValidator";
import {IAccountActivityRequestHandler} from "../../../core/Public/Models/Webhooks/IAccountActivityRequestHandler";
import {IWebhook} from "../../../core/Public/Models/Interfaces/IWebhook";
import {
  CreateAccountActivityWebhookParameters,
  ICreateAccountActivityWebhookParameters
} from "../../../core/Public/Parameters/AccountActivity/RegisterAccountActivityWebhookParameters";
import {IWebhookEnvironment} from "../../../core/Public/Models/Interfaces/IWebhookEnvironment";
import {
  GetAccountActivityWebhookEnvironmentsParameters,
  IGetAccountActivityWebhookEnvironmentsParameters
} from "../../../core/Public/Parameters/AccountActivity/GetAccountActivityWebhookEnvironmentsParameters";
import {
  GetAccountActivityEnvironmentWebhooksParameters,
  IGetAccountActivityEnvironmentWebhooksParameters
} from "../../../core/Public/Parameters/AccountActivity/GetAccountActivityEnvironmentWebhooksParameters";
import {
  ITriggerAccountActivityWebhookCRCParameters,
  TriggerAccountActivityWebhookCRCParameters
} from "../../../core/Public/Parameters/AccountActivity/TriggerAccountActivityCRCParameters";
import {
  ISubscribeToAccountActivityParameters,
  SubscribeToAccountActivityParameters
} from "../../../core/Public/Parameters/AccountActivity/SubscribeToAllEnvironmentEventsParameters";
import {
  CountAccountActivitySubscriptionsParameters,
  ICountAccountActivitySubscriptionsParameters
} from "../../../core/Public/Parameters/AccountActivity/CountNumberOfSubscriptionsParameters";
import {
  IIsAccountSubscribedToAccountActivityParameters,
  IsAccountSubscribedToAccountActivityParameters
} from "../../../core/Public/Parameters/AccountActivity/IsAccountSubscribedToAppAccountActivityParameters";
import {
  IUnsubscribeFromAccountActivityParameters,
  UnsubscribeFromAccountActivityParameters
} from "../../../core/Public/Parameters/AccountActivity/UnsubscribeFromAccountActivityParameters";
import Type from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Types";
import {
  IRemoveProfileBannerParameters,
  RemoveProfileBannerParameters
} from "../../../core/Public/Parameters/AccountSettingsClient/RemoveProfileBannerParameters";
import {
  DeleteAccountActivityWebhookParameters,
  IDeleteAccountActivityWebhookParameters
} from "../../../core/Public/Parameters/AccountActivity/RemoveAccountActivityWebhookParameters";
import {IWebhookSubscriptionsCount} from "../../../core/Public/Models/Interfaces/IWebhookSubscriptionsCount";
import {IWebhookEnvironmentSubscriptions} from "../../../core/Public/Models/Interfaces/IWebhookEnvironmentSubscriptions";
import {
  GetAccountActivitySubscriptionsParameters,
  IGetAccountActivitySubscriptionsParameters
} from "../../../core/Public/Parameters/AccountActivity/GetListOfSubscriptionsParameters";

export class AccountActivityClient implements IAccountActivityClient {
  private readonly _accountActivityRequester: IAccountActivityRequester;
  private readonly _client: ITwitterClient;

  constructor(accountActivityRequester: IAccountActivityRequester, client: ITwitterClient) {
    this._accountActivityRequester = accountActivityRequester;
    this._client = client;
  }

  get parametersValidator(): IAccountActivityClientParametersValidator {
    return this._client.ParametersValidator;
  }

  public createRequestHandler(): IAccountActivityRequestHandler {
    return this._client.CreateTwitterExecutionContext().container.Resolve<IAccountActivityRequestHandler>();
  }

  public async createAccountActivityWebhookAsync(environmentOrParameters: string | ICreateAccountActivityWebhookParameters,
                                                 webhookUrl: string): Promise<IWebhook> {
    let parameters: ICreateAccountActivityWebhookParameters;
    if (Type.isString(environmentOrParameters)) {
      parameters = new CreateAccountActivityWebhookParameters(environmentOrParameters, webhookUrl);
    } else {
      parameters = environmentOrParameters;
    }

    let twitterResult = await this._accountActivityRequester.createAccountActivityWebhookAsync(parameters); // .ConfigureAwait(false);
    return this._client.Factories.createWebhook(twitterResult?.model);
  }

  public async getAccountActivityWebhookEnvironmentsAsync(parameters?: IGetAccountActivityWebhookEnvironmentsParameters): Promise<IWebhookEnvironment[]> {
    let parametersCurrent: IGetAccountActivityWebhookEnvironmentsParameters;
    if (!parameters) {
      parametersCurrent = new GetAccountActivityWebhookEnvironmentsParameters();
    } else {
      parametersCurrent = parameters;
    }

    let twitterResult = await this._accountActivityRequester.getAccountActivityWebhookEnvironmentsAsync(parametersCurrent); // .ConfigureAwait(false);
    return twitterResult?.model?.Environments.map(x => this._client.Factories.createWebhookEnvironment(x)); // .ToArray();
  }

  public async getAccountActivityEnvironmentWebhooksAsync(environmentOrParameters: string | IGetAccountActivityEnvironmentWebhooksParameters): Promise<IWebhook[]> {
    let parameters: IGetAccountActivityEnvironmentWebhooksParameters;
    if (Type.isString(environmentOrParameters)) {
      parameters = new GetAccountActivityEnvironmentWebhooksParameters(environmentOrParameters);
    } else {
      parameters = environmentOrParameters;
    }

    let twitterResult = await this._accountActivityRequester.getAccountActivityEnvironmentWebhooksAsync(parameters); // .ConfigureAwait(false);
    return twitterResult?.model?.map(x => this._client.Factories.createWebhook(x)); // .ToArray();
  }

  public deleteAccountActivityWebhookAsync(environmentOrParameters: string | IDeleteAccountActivityWebhookParameters,
                                           webhookIdOrWebhook: string | IWebhook): Promise<void> {
    let parameters: IDeleteAccountActivityWebhookParameters;
    if (Type.isString(environmentOrParameters)) {
      let webhookId: string;
      if (Type.isString(webhookIdOrWebhook)) {
        webhookId = webhookIdOrWebhook;
      } else {
        webhookId = webhookIdOrWebhook.id;
      }
      parameters = new DeleteAccountActivityWebhookParameters(environmentOrParameters, webhookId);
    } else {
      parameters = environmentOrParameters;
    }

    return this._accountActivityRequester.deleteAccountActivityWebhookAsync(parameters);
  }

  public triggerAccountActivityWebhookCRCAsync(environmentOrParameters: string | ITriggerAccountActivityWebhookCRCParameters,
                                               webhookId: string): Promise<void> {
    let parameters: ITriggerAccountActivityWebhookCRCParameters;
    if (Type.isString(environmentOrParameters)) {
      parameters = new TriggerAccountActivityWebhookCRCParameters(environmentOrParameters, webhookId);
    } else {
      parameters = environmentOrParameters;
    }

    return this._accountActivityRequester.triggerAccountActivityWebhookCRCAsync(parameters);
  }

  public subscribeToAccountActivityAsync(environmentOrParameters: string | ISubscribeToAccountActivityParameters): Promise<void> {
    let parameters: ISubscribeToAccountActivityParameters;
    if (Type.isString(environmentOrParameters)) {
      parameters = new SubscribeToAccountActivityParameters(environmentOrParameters);
    } else {
      parameters = environmentOrParameters;
    }

    return this._accountActivityRequester.subscribeToAccountActivityAsync(parameters);
  }

  public async countAccountActivitySubscriptionsAsync(parameters?: ICountAccountActivitySubscriptionsParameters): Promise<IWebhookSubscriptionsCount> {
    let parametersCurrent: ICountAccountActivitySubscriptionsParameters;
    if (!parameters) {
      parametersCurrent = new CountAccountActivitySubscriptionsParameters();
    } else {
      parametersCurrent = parameters;
    }

    let twitterResult = await this._accountActivityRequester.countAccountActivitySubscriptionsAsync(parametersCurrent); // .ConfigureAwait(false);
    return twitterResult?.model;
  }

  public async isAccountSubscribedToAccountActivityAsync(environmentOrParameters: string | IIsAccountSubscribedToAccountActivityParameters): Promise<boolean> {
    let parameters: IIsAccountSubscribedToAccountActivityParameters;
    if (Type.isString(environmentOrParameters)) {
      parameters = new IsAccountSubscribedToAccountActivityParameters(environmentOrParameters);
    } else {
      parameters = environmentOrParameters;
    }
    try {
      let twitterResult = await this._accountActivityRequester.isAccountSubscribedToAccountActivityAsync(parameters); // .ConfigureAwait(false);
      return twitterResult.response.statusCode === 204;
    } catch (TwitterException) {
      return false;
    }
  }

  public async getAccountActivitySubscriptionsAsync(environmentOrParameters: string | IGetAccountActivitySubscriptionsParameters): Promise<IWebhookEnvironmentSubscriptions> {
    let parameters: IGetAccountActivitySubscriptionsParameters;
    if (Type.isString(environmentOrParameters)) {
      parameters = new GetAccountActivitySubscriptionsParameters(environmentOrParameters);
    } else {
      parameters = environmentOrParameters;
    }

    let twitterResult = await this._accountActivityRequester.getAccountActivitySubscriptionsAsync(parameters); //.ConfigureAwait(false);
    return this._client.Factories.createWebhookEnvironmentSubscriptions(twitterResult?.model);
  }

  public unsubscribeFromAccountActivityAsync(environmentOrParameters: string | IUnsubscribeFromAccountActivityParameters,
                                             userId: number): Promise<void> {
    let parameters: IUnsubscribeFromAccountActivityParameters;
    if (Type.isString(environmentOrParameters)) {
      parameters = new UnsubscribeFromAccountActivityParameters(environmentOrParameters, userId);
    } else {
      parameters = environmentOrParameters;
    }

    return this._accountActivityRequester.unsubscribeFromAccountActivityAsync(parameters);
  }
}
