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
import {IAccountSettingsQueryExecutor} from "./AccountSettingsQueryExecutor";

export interface IAccountSettingsController {
  GetAccountSettingsAsync(parameters: IGetAccountSettingsParameters, request: ITwitterRequest): Promise<ITwitterResult<IAccountSettingsDTO>>;

  UpdateAccountSettingsAsync(parameters: IUpdateAccountSettingsParameters, request: ITwitterRequest): Promise<ITwitterResult<IAccountSettingsDTO>>;

  UpdateProfileAsync(parameters: IUpdateProfileParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>>;

  UpdateProfileImageAsync(parameters: IUpdateProfileImageParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>>;

  UpdateProfileBannerAsync(parameters: IUpdateProfileBannerParameters, request: ITwitterRequest): Promise<ITwitterResult>;

  RemoveProfileBannerAsync(parameters: IRemoveProfileBannerParameters, request: ITwitterRequest): Promise<ITwitterResult>;
}

export class AccountSettingsController implements IAccountSettingsController {
  private readonly _accountSettingsQueryExecutor: IAccountSettingsQueryExecutor;

  constructor(accountSettingsQueryExecutor: IAccountSettingsQueryExecutor) {
    this._accountSettingsQueryExecutor = accountSettingsQueryExecutor;
  }

  public GetAccountSettingsAsync(parameters: IGetAccountSettingsParameters, request: ITwitterRequest): Promise<ITwitterResult<IAccountSettingsDTO>> {
    return this._accountSettingsQueryExecutor.GetAccountSettingsAsync(parameters, request);
  }

  public UpdateAccountSettingsAsync(parameters: IUpdateAccountSettingsParameters, request: ITwitterRequest): Promise<ITwitterResult<IAccountSettingsDTO>> {
    return this._accountSettingsQueryExecutor.UpdateAccountSettingsAsync(parameters, request);
  }

  public UpdateProfileAsync(parameters: IUpdateProfileParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>> {
    return this._accountSettingsQueryExecutor.UpdateProfileAsync(parameters, request);
  }

  public UpdateProfileImageAsync(parameters: IUpdateProfileImageParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>> {
    return this._accountSettingsQueryExecutor.UpdateProfileImageAsync(parameters, request);
  }

  public UpdateProfileBannerAsync(parameters: IUpdateProfileBannerParameters, request: ITwitterRequest): Promise<ITwitterResult> {
    return this._accountSettingsQueryExecutor.UpdateProfileBannerAsync(parameters, request);
  }

  public RemoveProfileBannerAsync(parameters: IRemoveProfileBannerParameters, request: ITwitterRequest): Promise<ITwitterResult> {
    return this._accountSettingsQueryExecutor.RemoveProfileBannerAsync(parameters, request);
  }
}
