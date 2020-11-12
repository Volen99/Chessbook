import {Inject, Injectable} from "@angular/core";

import {BaseRequester} from "../BaseRequester";
import {IAccountSettingsRequester} from "../../../core/Public/Client/Requesters/IAccountSettingsRequester";
import {ITwitterResult} from "../../../core/Core/Web/TwitterResult";
import {IAccountSettingsController, IAccountSettingsControllerToken} from "../../../controllers/AccountSettings/AccountSettingsController";
import {
  IAccountSettingsClientRequiredParametersValidator,
  IAccountSettingsClientRequiredParametersValidatorToken
} from "../../../core/Core/Client/Validators/AccountSettingsClientRequiredParametersValidator";
import {ITwitterClientEvents, ITwitterClientEventsToken} from "../../../core/Core/Events/TweetinviGlobalEvents";
import {ITwitterClient, ITwitterClientToken} from "../../../core/Public/ITwitterClient";
import {IGetAccountSettingsParameters} from "../../../core/Public/Parameters/AccountSettingsClient/GetAccountSettingsParameters";
import {IAccountSettingsDTO} from "../../../core/Public/Models/Interfaces/DTO/IAccountSettingsDTO";
import {IUpdateAccountSettingsParameters} from "../../../core/Public/Parameters/AccountSettingsClient/UpdateAccountSettingsParameters";
import {IUpdateProfileParameters} from "../../../core/Public/Parameters/AccountSettingsClient/UpdateProfileParameters";
import {IUserDTO} from "../../../core/Public/Models/Interfaces/DTO/IUserDTO";
import {IUpdateProfileImageParameters} from "../../../core/Public/Parameters/AccountSettingsClient/UpdateProfileImageParameters";
import {IUpdateProfileBannerParameters} from "../../../core/Public/Parameters/AccountSettingsClient/UpdateProfileBannerParameters";
import {IRemoveProfileBannerParameters} from "../../../core/Public/Parameters/AccountSettingsClient/RemoveProfileBannerParameters";

@Injectable({
  providedIn: 'root',
})
export class AccountSettingsRequester extends BaseRequester implements IAccountSettingsRequester {
  private readonly _accountSettingsController: IAccountSettingsController;
  private readonly _validator: IAccountSettingsClientRequiredParametersValidator;

  constructor(@Inject(ITwitterClientToken) client: ITwitterClient,
              @Inject(ITwitterClientEventsToken) clientEvents: ITwitterClientEvents,
              @Inject(IAccountSettingsControllerToken) accountSettingsController: IAccountSettingsController,
              @Inject(IAccountSettingsClientRequiredParametersValidatorToken) validator: IAccountSettingsClientRequiredParametersValidator) {
    super(client, clientEvents);
    this._accountSettingsController = accountSettingsController;
    this._validator = validator;
  }

  public getAccountSettingsAsync(parameters: IGetAccountSettingsParameters): Promise<ITwitterResult<IAccountSettingsDTO>> {
    this._validator.validate(parameters);
    return super.executeRequestAsync(request => this._accountSettingsController.getAccountSettingsAsync(parameters, request));
  }

  public updateAccountSettingsAsync(parameters: IUpdateAccountSettingsParameters): Promise<ITwitterResult<IAccountSettingsDTO>> {
    this._validator.validate(parameters);
    return super.executeRequestAsync(request => this._accountSettingsController.updateAccountSettingsAsync(parameters, request));
  }

  public updateProfileAsync(parameters: IUpdateProfileParameters): Promise<ITwitterResult<IUserDTO>> {
    this._validator.validate(parameters);
    return super.executeRequestAsync(request => this._accountSettingsController.updateProfileAsync(parameters, request));
  }

  public updateProfileImageAsync(parameters: IUpdateProfileImageParameters): Promise<ITwitterResult<IUserDTO>> {
    this._validator.validate(parameters);
    return super.executeRequestAsync(request => this._accountSettingsController.updateProfileImageAsync(parameters, request));
  }

  public updateProfileBannerAsync(parameters: IUpdateProfileBannerParameters): Promise<ITwitterResult> {
    this._validator.validate(parameters);
    return super.executeRequestAsync(request => this._accountSettingsController.updateProfileBannerAsync(parameters, request));
  }

  public removeProfileBannerAsync(parameters: IRemoveProfileBannerParameters): Promise<ITwitterResult> {
    this._validator.validate(parameters);
    return super.executeRequestAsync(request => this._accountSettingsController.removeProfileBannerAsync(parameters, request));
  }
}
