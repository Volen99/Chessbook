import {ITwitterResult} from "../../core/Core/Web/TwitterResult";
import {ITwitterRequest} from "../../core/Public/Models/Interfaces/ITwitterRequest";
import {IGetAccountSettingsParameters} from "../../core/Public/Parameters/AccountSettingsClient/GetAccountSettingsParameters";
import {IAccountSettingsDTO} from "../../core/Public/Models/Interfaces/DTO/IAccountSettingsDTO";
import {IUpdateAccountSettingsParameters} from "../../core/Public/Parameters/AccountSettingsClient/UpdateAccountSettingsParameters";
import {IUpdateProfileParameters} from "../../core/Public/Parameters/AccountSettingsClient/UpdateProfileParameters";
import {IUpdateProfileImageParameters} from "../../core/Public/Parameters/AccountSettingsClient/UpdateProfileImageParameters";
import {IUpdateProfileBannerParameters} from "../../core/Public/Parameters/AccountSettingsClient/UpdateProfileBannerParameters";
import {IRemoveProfileBannerParameters} from "../../core/Public/Parameters/AccountSettingsClient/RemoveProfileBannerParameters";
import {IUserDTO} from "../../core/Public/Models/Interfaces/DTO/IUserDTO";
import {
  AccountSettingsQueryExecutor,
  IAccountSettingsQueryExecutor,
  IAccountSettingsQueryExecutorToken
} from "./AccountSettingsQueryExecutor";
import {Inject, Injectable, InjectionToken} from "@angular/core";

export interface IAccountSettingsController {
  getAccountSettingsAsync(parameters: IGetAccountSettingsParameters, request: ITwitterRequest): Promise<ITwitterResult<IAccountSettingsDTO>>;

  updateAccountSettingsAsync(parameters: IUpdateAccountSettingsParameters, request: ITwitterRequest): Promise<ITwitterResult<IAccountSettingsDTO>>;

  updateProfileAsync(parameters: IUpdateProfileParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>>;

  updateProfileImageAsync(parameters: IUpdateProfileImageParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>>;

  updateProfileBannerAsync(parameters: IUpdateProfileBannerParameters, request: ITwitterRequest): Promise<ITwitterResult>;

  removeProfileBannerAsync(parameters: IRemoveProfileBannerParameters, request: ITwitterRequest): Promise<ITwitterResult>;
}

export const IAccountSettingsControllerToken = new InjectionToken<IAccountSettingsController>('IAccountSettingsController', {
  providedIn: 'root',
  factory: () => new AccountSettingsController(Inject(AccountSettingsQueryExecutor)),
});

@Injectable()
export class AccountSettingsController implements IAccountSettingsController {
  private readonly _accountSettingsQueryExecutor: IAccountSettingsQueryExecutor;

  constructor(@Inject(IAccountSettingsQueryExecutorToken) accountSettingsQueryExecutor: IAccountSettingsQueryExecutor) {
    this._accountSettingsQueryExecutor = accountSettingsQueryExecutor;
  }

  public getAccountSettingsAsync(parameters: IGetAccountSettingsParameters, request: ITwitterRequest): Promise<ITwitterResult<IAccountSettingsDTO>> {
    return this._accountSettingsQueryExecutor.getAccountSettingsAsync(parameters, request);
  }

  public updateAccountSettingsAsync(parameters: IUpdateAccountSettingsParameters, request: ITwitterRequest): Promise<ITwitterResult<IAccountSettingsDTO>> {
    return this._accountSettingsQueryExecutor.updateAccountSettingsAsync(parameters, request);
  }

  public updateProfileAsync(parameters: IUpdateProfileParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>> {
    return this._accountSettingsQueryExecutor.updateProfileAsync(parameters, request);
  }

  public updateProfileImageAsync(parameters: IUpdateProfileImageParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>> {
    return this._accountSettingsQueryExecutor.updateProfileImageAsync(parameters, request);
  }

  public updateProfileBannerAsync(parameters: IUpdateProfileBannerParameters, request: ITwitterRequest): Promise<ITwitterResult> {
    return this._accountSettingsQueryExecutor.updateProfileBannerAsync(parameters, request);
  }

  public removeProfileBannerAsync(parameters: IRemoveProfileBannerParameters, request: ITwitterRequest): Promise<ITwitterResult> {
    return this._accountSettingsQueryExecutor.removeProfileBannerAsync(parameters, request);
  }
}
