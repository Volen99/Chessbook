// using HttpMethod = Tweetinvi.Models.HttpMethod;

import {ITwitterResult} from "../../core/Core/Web/TwitterResult";
import {ITwitterRequest} from "../../core/Public/Models/Interfaces/ITwitterRequest";
import {ITwitterAccessor} from "../../core/Core/Web/ITwitterAccessor";
import TimeSpan from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/TimeSpan";
import {HttpMethod} from 'src/app/core/Public/Models/Enum/HttpMethod';
import {MultipartTwitterQuery} from "../../core/Public/MultipartTwitterQuery";
import {IGetAccountSettingsParameters} from "../../core/Public/Parameters/AccountSettingsClient/GetAccountSettingsParameters";
import {IUpdateAccountSettingsParameters} from "../../core/Public/Parameters/AccountSettingsClient/UpdateAccountSettingsParameters";
import {IUpdateProfileParameters} from "../../core/Public/Parameters/AccountSettingsClient/UpdateProfileParameters";
import {IUpdateProfileImageParameters} from "../../core/Public/Parameters/AccountSettingsClient/UpdateProfileImageParameters";
import {IUpdateProfileBannerParameters} from "../../core/Public/Parameters/AccountSettingsClient/UpdateProfileBannerParameters";
import {IRemoveProfileBannerParameters} from "../../core/Public/Parameters/AccountSettingsClient/RemoveProfileBannerParameters";
import {IAccountSettingsQueryGenerator} from "./AccountSettingsQueryGenerator";
import {IAccountSettingsDTO} from "../../core/Public/Models/Interfaces/DTO/IAccountSettingsDTO";
import {IUserDTO} from "../../core/Public/Models/Interfaces/DTO/IUserDTO";
import {ProgressableStreamContent} from "../../core/Core/Upload/ProgressableStreamContent";
import {Encoding} from "tslint/lib/utils";
import {WorldFeedConsts} from "../../core/Public/worldFeed-consts";

export interface IAccountSettingsQueryExecutor {
  GetAccountSettingsAsync(parameters: IGetAccountSettingsParameters, request: ITwitterRequest): Promise<ITwitterResult<IAccountSettingsDTO>>;

  UpdateAccountSettingsAsync(parameters: IUpdateAccountSettingsParameters, request: ITwitterRequest): Promise<ITwitterResult<IAccountSettingsDTO>>;

  UpdateProfileAsync(parameters: IUpdateProfileParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>>;

  UpdateProfileImageAsync(parameters: IUpdateProfileImageParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>>;

  UpdateProfileBannerAsync(parameters: IUpdateProfileBannerParameters, request: ITwitterRequest): Promise<ITwitterResult>;

  RemoveProfileBannerAsync(parameters: IRemoveProfileBannerParameters, request: ITwitterRequest): Promise<ITwitterResult>;
}

export class AccountSettingsQueryExecutor implements IAccountSettingsQueryExecutor {
  private readonly _accountSettingsQueryGenerator: IAccountSettingsQueryGenerator;
  private readonly _twitterAccessor: ITwitterAccessor;

  constructor(accountSettingsQueryGenerator: IAccountSettingsQueryGenerator, twitterAccessor: ITwitterAccessor) {
    this._accountSettingsQueryGenerator = accountSettingsQueryGenerator;
    this._twitterAccessor = twitterAccessor;
  }

  public GetAccountSettingsAsync(parameters: IGetAccountSettingsParameters, request: ITwitterRequest): Promise<ITwitterResult<IAccountSettingsDTO>> {
    let query = this._accountSettingsQueryGenerator.GetAccountSettingsQuery(parameters);
    request.query.url = query;
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<IAccountSettingsDTO>(request);
  }

  public UpdateAccountSettingsAsync(parameters: IUpdateAccountSettingsParameters, request: ITwitterRequest): Promise<ITwitterResult<IAccountSettingsDTO>> {
    let query = this._accountSettingsQueryGenerator.GetUpdateAccountSettingsQuery(parameters);
    request.query.url = query;
    request.query.httpMethod = HttpMethod.POST;
    return this._twitterAccessor.executeRequestAsync<IAccountSettingsDTO>(request);
  }

  public UpdateProfileAsync(parameters: IUpdateProfileParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>> {
    let query = this._accountSettingsQueryGenerator.GetUpdateProfileQuery(parameters);
    request.query.url = query;
    request.query.httpMethod = HttpMethod.POST;
    return this._twitterAccessor.executeRequestAsync<IUserDTO>(request);
  }

  public UpdateProfileImageAsync(parameters: IUpdateProfileImageParameters, request: ITwitterRequest): Promise<ITwitterResult<IUserDTO>> {
    let query = this._accountSettingsQueryGenerator.GetUpdateProfileImageQuery(parameters);

    let multipartQuery = new MultipartTwitterQuery(request.query);
    multipartQuery.url = query;
    multipartQuery.httpMethod = HttpMethod.POST;
    multipartQuery.Binaries = [parameters.binary]; // parameters.Binary
    multipartQuery.ContentId = 'image';
    multipartQuery.timeout = parameters.timeout ?? TimeSpan.fromMilliseconds(WorldFeedConsts.INFINITE);
    multipartQuery.UploadProgressChanged = parameters.uploadProgressChanged;

    request.query = multipartQuery;

    return this._twitterAccessor.executeRequestAsync<IUserDTO>(request);
  }

        public  UpdateProfileBannerAsync(parameters: IUpdateProfileBannerParameters, request: ITwitterRequest): Promise<ITwitterResult>
        {
            let query = this._accountSettingsQueryGenerator.GetUpdateProfileBannerQuery(parameters);
            let banner = StringFormater.UrlEncode(Convert.ToBase64String(parameters.binary));
            let bannerHttpContent = new StringContent(`banner=${banner}`, Encoding.UTF8, "application/x-www-form-urlencoded");

            request.query.url = query;
            request.query.httpMethod = HttpMethod.POST;
            request.query.httpContent = new ProgressableStreamContent(bannerHttpContent, parameters.uploadProgressChanged);
            request.query.isHttpContentPartOfQueryParams = true;
            request.query.timeout = parameters.timeout ?? TimeSpan.fromMilliseconds(WorldFeedConsts.INFINITE);

            return this._twitterAccessor.executeRequestAsync(request);
        }

        public  RemoveProfileBannerAsync(parameters: IRemoveProfileBannerParameters, request: ITwitterRequest): Promise<ITwitterResult>
        {
            let query = this._accountSettingsQueryGenerator.GetRemoveProfileBannerQuery(parameters);
            request.query.url = query;
            request.query.httpMethod = HttpMethod.POST;
            return this._twitterAccessor.executeRequestAsync(request);
        }
    }
