// using HttpMethod = Tweetinvi.Models.HttpMethod;
import {Inject, Injectable, InjectionToken} from "@angular/core";

import {ITwitterResult} from "../../core/Core/Web/TwitterResult";
import {ITwitterRequest} from "../../core/Public/Models/Interfaces/ITwitterRequest";
import {ITwitterAccessor, ITwitterAccessorToken} from "../../core/Core/Web/ITwitterAccessor";
import {HttpMethod} from 'src/app/core/Public/Models/Enum/HttpMethod';
import {MultipartTwitterQuery} from "../../core/Public/MultipartTwitterQuery";
import {IGetAccountSettingsParameters} from "../../core/Public/Parameters/AccountSettingsClient/GetAccountSettingsParameters";
import {IUpdateAccountSettingsParameters} from "../../core/Public/Parameters/AccountSettingsClient/UpdateAccountSettingsParameters";
import {IUpdateProfileParameters} from "../../core/Public/Parameters/AccountSettingsClient/UpdateProfileParameters";
import {IUpdateProfileImageParameters} from "../../core/Public/Parameters/AccountSettingsClient/UpdateProfileImageParameters";
import {IUpdateProfileBannerParameters} from "../../core/Public/Parameters/AccountSettingsClient/UpdateProfileBannerParameters";
import {IRemoveProfileBannerParameters} from "../../core/Public/Parameters/AccountSettingsClient/RemoveProfileBannerParameters";
import {
  AccountSettingsQueryGenerator,
  IAccountSettingsQueryGenerator,
  IAccountSettingsQueryGeneratorToken
} from "./AccountSettingsQueryGenerator";
import {IAccountSettingsDTO} from "../../core/Public/Models/Interfaces/DTO/IAccountSettingsDTO";
import {IUserDTO} from "../../core/Public/Models/Interfaces/DTO/IUserDTO";
import {ProgressableStreamContent} from "../../core/Core/Upload/ProgressableStreamContent";
import {SharebookConsts} from "../../core/Public/sharebook-consts";
import {TwitterAccessor} from "../../Tweetinvi.Credentials/TwitterAccessor";
import {StringFormatter} from "../../core/Core/Extensions/StringFormater";
import TimeSpan from "typescript-dotnet-commonjs/System/Time/TimeSpan";
import {AppInjector} from "../../sharebook/Injectinvi/app-injector";

export interface IAccountSettingsQueryExecutor {
  getAccountSettingsAsync(parameters: IGetAccountSettingsParameters, request: ITwitterRequest): Promise<ITwitterResult<IAccountSettingsDTO>>;

  updateAccountSettingsAsync(parameters: IUpdateAccountSettingsParameters, request: ITwitterRequest): Promise<ITwitterResult<IAccountSettingsDTO>>;

  updateProfileAsync(parameters: IUpdateProfileParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>>;

  updateProfileImageAsync(parameters: IUpdateProfileImageParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>>;

  updateProfileBannerAsync(parameters: IUpdateProfileBannerParameters, request: ITwitterRequest): Promise<ITwitterResult>;

  removeProfileBannerAsync(parameters: IRemoveProfileBannerParameters, request: ITwitterRequest): Promise<ITwitterResult>;
}

export const IAccountSettingsQueryExecutorToken = new InjectionToken<IAccountSettingsQueryExecutor>('IAccountSettingsQueryExecutor', {
  providedIn: 'root',
  factory: () => AppInjector.get(AccountSettingsQueryExecutor),
});

@Injectable({
  providedIn: 'root',
})
export class AccountSettingsQueryExecutor implements IAccountSettingsQueryExecutor {
  private readonly _accountSettingsQueryGenerator: IAccountSettingsQueryGenerator;
  private readonly _twitterAccessor: ITwitterAccessor;

  constructor(@Inject(IAccountSettingsQueryGeneratorToken) accountSettingsQueryGenerator: IAccountSettingsQueryGenerator,
              @Inject(ITwitterAccessorToken) twitterAccessor: ITwitterAccessor) {
    this._accountSettingsQueryGenerator = accountSettingsQueryGenerator;
    this._twitterAccessor = twitterAccessor;
  }

  public getAccountSettingsAsync(parameters: IGetAccountSettingsParameters, request: ITwitterRequest): Promise<ITwitterResult<IAccountSettingsDTO>> {
    let query = this._accountSettingsQueryGenerator.getAccountSettingsQuery(parameters);
    request.query.url = query;
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<IAccountSettingsDTO>(request);
  }

  public updateAccountSettingsAsync(parameters: IUpdateAccountSettingsParameters, request: ITwitterRequest): Promise<ITwitterResult<IAccountSettingsDTO>> {
    let query = this._accountSettingsQueryGenerator.getUpdateAccountSettingsQuery(parameters);
    request.query.url = query;
    request.query.httpMethod = HttpMethod.POST;

    return this._twitterAccessor.executeRequestAsync<IAccountSettingsDTO>(request);
  }

  public updateProfileAsync(parameters: IUpdateProfileParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>> {
    let query = this._accountSettingsQueryGenerator.getUpdateProfileQuery(parameters);
    request.query.url = query;
    request.query.httpMethod = HttpMethod.POST;

    return this._twitterAccessor.executeRequestAsync<IUserDTO>(request);
  }

  public updateProfileImageAsync(parameters: IUpdateProfileImageParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>> {
    let query = this._accountSettingsQueryGenerator.getUpdateProfileImageQuery(parameters);

    let multipartQuery = new MultipartTwitterQuery(request.query);
    multipartQuery.url = query;
    multipartQuery.httpMethod = HttpMethod.POST;
    multipartQuery.binaries = [parameters.binary]; // new[] { parameters.Binary }
    multipartQuery.contentId = 'image';
    multipartQuery.timeout = parameters.timeout ?? TimeSpan.fromMilliseconds(SharebookConsts.INFINITE);
    multipartQuery.uploadProgressChanged = parameters.uploadProgressChanged;

    request.query = multipartQuery;

    return this._twitterAccessor.executeRequestAsync<IUserDTO>(request);
  }

  public updateProfileBannerAsync(parameters: IUpdateProfileBannerParameters, request: ITwitterRequest): Promise<ITwitterResult> {
    let query = this._accountSettingsQueryGenerator.getUpdateProfileBannerQuery(parameters);
    // https://stackoverflow.com/questions/9267899/arraybuffer-to-base64-encoded-string
    let banner = StringFormatter.urlEncode(btoa(String.fromCharCode(...new Uint8Array(parameters.binary)))); // StringFormatter.urlEncode(Convert.ToBase64String(parameters.binary));
    let bannerHttpContent = null; // new StringContent(`banner=${banner}`, Encoding.UTF8, "application/x-www-form-urlencoded");

    request.query.url = query;
    request.query.httpMethod = HttpMethod.POST;
    request.query.httpContent = new ProgressableStreamContent(bannerHttpContent, parameters.uploadProgressChanged);
    request.query.isHttpContentPartOfQueryParams = true;
    request.query.timeout = parameters.timeout ?? TimeSpan.fromMilliseconds(SharebookConsts.INFINITE);

    return this._twitterAccessor.executeRequestAsync(request);
  }

  public removeProfileBannerAsync(parameters: IRemoveProfileBannerParameters, request: ITwitterRequest): Promise<ITwitterResult> {
    let query = this._accountSettingsQueryGenerator.getRemoveProfileBannerQuery(parameters);
    request.query.url = query;
    request.query.httpMethod = HttpMethod.POST;

    return this._twitterAccessor.executeRequestAsync(request);
  }
}
