import {IAccountSettingsClient} from "../../../core/Public/Client/Clients/IAccountSettingsClient";
import {ITwitterClient, ITwitterClientToken} from "../../../core/Public/ITwitterClient";
import {IAccountSettingsRequester} from "../../../core/Public/Client/Requesters/IAccountSettingsRequester";
import {IAccountSettingsClientParametersValidator} from "../../../core/Core/Client/Validators/AccountSettingsClientParametersValidator";
import {IAccountSettings} from "../../../core/Public/Models/Interfaces/IAccountSettings";
import {
  GetAccountSettingsParameters,
  IGetAccountSettingsParameters
} from "../../../core/Public/Parameters/AccountSettingsClient/GetAccountSettingsParameters";
import {IUpdateAccountSettingsParameters} from "../../../core/Public/Parameters/AccountSettingsClient/UpdateAccountSettingsParameters";
import {IUpdateProfileParameters} from "../../../core/Public/Parameters/AccountSettingsClient/UpdateProfileParameters";
import {IAuthenticatedUser} from "../../../core/Public/Models/Interfaces/IAuthenticatedUser";
import {IUser} from "../../../core/Public/Models/Interfaces/IUser";
import {
  IUpdateProfileImageParameters,
  UpdateProfileImageParameters
} from "../../../core/Public/Parameters/AccountSettingsClient/UpdateProfileImageParameters";
import {
  IUpdateProfileBannerParameters,
  UpdateProfileBannerParameters
} from "../../../core/Public/Parameters/AccountSettingsClient/UpdateProfileBannerParameters";
import {
  IRemoveProfileBannerParameters,
  RemoveProfileBannerParameters
} from "../../../core/Public/Parameters/AccountSettingsClient/RemoveProfileBannerParameters";
import {Inject, Injectable} from "@angular/core";

@Injectable()
export class AccountSettingsClient implements IAccountSettingsClient {
  private readonly _client: ITwitterClient;
  private readonly _accountRequester: IAccountSettingsRequester;

  constructor(@Inject(ITwitterClientToken) client: ITwitterClient) {
    this._client = client;
    this._accountRequester = client.raw.accountSettings;
  }

  get parametersValidator(): IAccountSettingsClientParametersValidator {
    return this._client.parametersValidator;
  }

  public async getAccountSettingsAsync(parameters?: IGetAccountSettingsParameters): Promise<IAccountSettings> {
    let parametersCurrent: IGetAccountSettingsParameters;
    if (!parameters) {
      parametersCurrent = new GetAccountSettingsParameters();
    } else {
      parametersCurrent = parameters;
    }

    let twitterResult = await this._accountRequester.getAccountSettingsAsync(parametersCurrent); // .ConfigureAwait(false);
    return this._client.factories.createAccountSettings(twitterResult?.model);
  }

  public async updateAccountSettingsAsync(parameters: IUpdateAccountSettingsParameters): Promise<IAccountSettings> {
    let twitterResult = await this._accountRequester.updateAccountSettingsAsync(parameters); // .ConfigureAwait(false);
    return this._client.factories.createAccountSettings(twitterResult?.model);
  }

  public async updateProfileAsync(parameters: IUpdateProfileParameters): Promise<IAuthenticatedUser> {
    let twitterResult = await this._accountRequester.updateProfileAsync(parameters); // .ConfigureAwait(false);
    return this._client.factories.createAuthenticatedUser(twitterResult?.model);
  }

  public async updateProfileImageAsync(binaryOrParameters: number[] | IUpdateProfileImageParameters): Promise<IUser> {
    let parameters: IUpdateProfileImageParameters;
    if (this.isIUpdateProfileImageParameters(binaryOrParameters)) {
      parameters = binaryOrParameters;
    } else {
      parameters = new UpdateProfileImageParameters(binaryOrParameters);
    }

    let twitterResult = await this._accountRequester.updateProfileImageAsync(parameters); // .ConfigureAwait(false);
    return this._client.factories.createUser(twitterResult?.model);
  }

  public updateProfileBannerAsync(binaryOrParameters: number[] | IUpdateProfileBannerParameters): Promise<any> {
    let parameters: IUpdateProfileBannerParameters;
    if (this.isIUpdateProfileBannerParameters(binaryOrParameters)) {
      parameters = binaryOrParameters;
    } else {
      parameters = new UpdateProfileBannerParameters(binaryOrParameters);
    }

    return this._accountRequester.updateProfileBannerAsync(parameters);
  }

  public removeProfileBannerAsync(parameters?: IRemoveProfileBannerParameters): Promise<any> {
    let parametersCurrent: IRemoveProfileBannerParameters;
    if (!parameters) {
      parametersCurrent = new RemoveProfileBannerParameters();
    } else {
      parametersCurrent = parameters;
    }

    return this._accountRequester.removeProfileBannerAsync(parametersCurrent);
  }

  private isIUpdateProfileImageParameters(binaryOrParameters: any): binaryOrParameters is IUpdateProfileImageParameters {
    return (binaryOrParameters as IUpdateProfileImageParameters).binary !== undefined;
  }

  private isIUpdateProfileBannerParameters(binaryOrParameters: any): binaryOrParameters is IUpdateProfileBannerParameters {
    return (binaryOrParameters as IUpdateProfileBannerParameters).binary !== undefined;
  }
}
