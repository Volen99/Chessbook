import {Inject, Injectable, InjectionToken} from "@angular/core";

import {
  AccountActivityClientParametersValidator,
  IAccountActivityClientParametersValidator,
  IAccountActivityClientParametersValidatorToken
} from "./AccountActivityClientParametersValidator";
import {
  AccountSettingsClientParametersValidator,
  IAccountSettingsClientParametersValidator,
  IAccountSettingsClientParametersValidatorToken
} from "./AccountSettingsClientParametersValidator";
import {
  AuthClientParametersValidator,
  IAuthClientParametersValidator,
  IAuthClientParametersValidatorToken
} from "./AuthClientParametersValidator";
import {
  HelpClientParametersValidator,
  IHelpClientParametersValidator,
  IHelpClientParametersValidatorToken
} from "./HelpClientParametersValidator";
import {
  IMessagesClientParametersValidator,
  IMessagesClientParametersValidatorToken,
  MessagesClientParametersValidator
} from "./MessageClientParametersValidator";
import {
  ITwitterListsClientParametersValidator,
  ITwitterListsClientParametersValidatorToken,
  TwitterListsClientParametersValidator
} from "./TwitterListsClientParametersValidator";
import {
  IUploadClientParametersValidator,
  IUploadClientParametersValidatorToken,
  UploadClientParametersValidator
} from "./UploadClientParametersValidator";
import {
  IUsersClientParametersValidator,
  IUsersClientParametersValidatorToken,
  UsersClientParametersValidator
} from "./UsersClientParametersValidator";
import {IUploadParameters} from "../../../Public/Parameters/Upload/UploadBinaryParameters";
import {AddMediaMetadataParameters} from "../../../Public/Parameters/Upload/AddMediaMetadataParameters";
import {
  ISearchClientParametersValidator,
  ISearchClientParametersValidatorToken,
  SearchClientParametersValidator
} from "./SearchClientParametersValidator";
import {
  ITrendsClientParametersValidator,
  ITrendsClientParametersValidatorToken,
  TrendsClientParametersValidator
} from "./TrendsClientParametersValidator";
import {
  ITimelineClientParametersValidator,
  ITimelineClientParametersValidatorToken,
  TimelineClientParametersValidator
} from "./TimelineClientParametersValidator";
import {
  ITweetsClientParametersValidator,
  ITweetsClientParametersValidatorToken,
  TweetsClientParametersValidator
} from "./TweetsClientParametersValidator";
import {ITwitterRequest} from 'src/app/core/Public/Models/Interfaces/ITwitterRequest';
import {TwitterListParameters} from "../../../Public/Parameters/ListsClient/TwitterListParameters";
import {
  AccountActivityParameters,
  AccountSettingsParameters,
  AuthParameters,
  HelpParameters,
  MessagesParameters,
  SearchParameters, TimelineParameters, TrendsParameters, TweetsParameters, UploadParameters, UserParameters
} from "./parameters-types";

export interface IParametersValidator extends IAccountActivityClientParametersValidator,
  IAccountSettingsClientParametersValidator,
  IAuthClientParametersValidator,
  IHelpClientParametersValidator,
  IMessagesClientParametersValidator,
  ISearchClientParametersValidator,
  ITwitterListsClientParametersValidator,
  ITimelineClientParametersValidator,
  ITrendsClientParametersValidator,
  ITweetsClientParametersValidator,
  IUploadClientParametersValidator,
  IUsersClientParametersValidator {
}

export const IParametersValidatorToken = new InjectionToken<IParametersValidator>('IParametersValidator', {
  providedIn: 'root',
  factory: () => new ParametersValidator(
    Inject(AccountActivityClientParametersValidator),
    Inject(AccountSettingsClientParametersValidator),
    Inject(AuthClientParametersValidator),
    Inject(HelpClientParametersValidator),
    Inject(MessagesClientParametersValidator),
    Inject(SearchClientParametersValidator),
    Inject(TwitterListsClientParametersValidator),
    Inject(TrendsClientParametersValidator),
    Inject(TimelineClientParametersValidator),
    Inject(TweetsClientParametersValidator),
    Inject(UploadClientParametersValidator),
    Inject(UsersClientParametersValidator)),
});

@Injectable()
export class ParametersValidator implements IParametersValidator {
  private readonly _accountActivityClientParametersValidator: IAccountActivityClientParametersValidator;
  private readonly _accountSettingsClientParametersValidator: IAccountSettingsClientParametersValidator;
  private readonly _authClientParametersValidator: IAuthClientParametersValidator;
  private readonly _helpClientParametersValidator: IHelpClientParametersValidator;
  private readonly _messagesClientParametersValidator: IMessagesClientParametersValidator;
  private readonly _searchClientParametersValidator: ISearchClientParametersValidator;
  private readonly _twitterListsClientParametersValidator: ITwitterListsClientParametersValidator;
  private readonly _trendsClientParametersValidator: ITrendsClientParametersValidator;
  private readonly _timelineClientParametersValidator: ITimelineClientParametersValidator;
  private readonly _tweetsClientParametersValidator: ITweetsClientParametersValidator;
  private readonly _uploadClientParametersValidator: IUploadClientParametersValidator;
  private readonly _usersClientParametersValidator: IUsersClientParametersValidator;

  constructor(
    @Inject(IAccountActivityClientParametersValidatorToken) accountActivityClientParametersValidator: IAccountActivityClientParametersValidator,
    @Inject(IAccountSettingsClientParametersValidatorToken) accountSettingsClientParametersValidator: IAccountSettingsClientParametersValidator,
    @Inject(IAuthClientParametersValidatorToken) authClientParametersValidator: IAuthClientParametersValidator,
    @Inject(IHelpClientParametersValidatorToken) helpClientParametersValidator: IHelpClientParametersValidator,
    @Inject(IMessagesClientParametersValidatorToken) messagesClientParametersValidator: IMessagesClientParametersValidator,
    @Inject(ISearchClientParametersValidatorToken) searchClientParametersValidator: ISearchClientParametersValidator,
    @Inject(ITwitterListsClientParametersValidatorToken) twitterListsClientParametersValidator: ITwitterListsClientParametersValidator,
    @Inject(ITrendsClientParametersValidatorToken) trendsClientParametersValidator: ITrendsClientParametersValidator,
    @Inject(ITimelineClientParametersValidatorToken) timelineClientParametersValidator: ITimelineClientParametersValidator,
    @Inject(ITweetsClientParametersValidatorToken) tweetsClientParametersValidator: ITweetsClientParametersValidator,
    @Inject(IUploadClientParametersValidatorToken) uploadClientParametersValidator: IUploadClientParametersValidator,
    @Inject(IUsersClientParametersValidatorToken) usersClientParametersValidator: IUsersClientParametersValidator) {
    this._accountActivityClientParametersValidator = accountActivityClientParametersValidator;
    this._accountSettingsClientParametersValidator = accountSettingsClientParametersValidator;
    this._authClientParametersValidator = authClientParametersValidator;
    this._helpClientParametersValidator = helpClientParametersValidator;
    this._messagesClientParametersValidator = messagesClientParametersValidator;
    this._searchClientParametersValidator = searchClientParametersValidator;
    this._twitterListsClientParametersValidator = twitterListsClientParametersValidator;
    this._trendsClientParametersValidator = trendsClientParametersValidator;
    this._timelineClientParametersValidator = timelineClientParametersValidator;
    this._tweetsClientParametersValidator = tweetsClientParametersValidator;
    this._uploadClientParametersValidator = uploadClientParametersValidator;
    this._usersClientParametersValidator = usersClientParametersValidator;
  }

  public validate(parameters: AccountActivityParameters
    | AccountSettingsParameters
    | AuthParameters
    | HelpParameters
    | MessagesParameters
    | SearchParameters
    | TwitterListParameters
    | TrendsParameters
    | TimelineParameters
    | TweetsParameters
    | UploadParameters
    | UserParameters, request?: ITwitterRequest): void {
    if (parameters instanceof AddMediaMetadataParameters) {                    // TODO: might bug
      this._uploadClientParametersValidator.validate(parameters);
    } else if (ParametersValidator.isAccountActivityParameters(parameters)) {
      this._accountActivityClientParametersValidator.validate(parameters);
    } else if (ParametersValidator.isAccountSettingsParameters(parameters)) {
      this._accountSettingsClientParametersValidator.validate(parameters);
    } else if (ParametersValidator.isAuthParameters(parameters)) {
      if (!request) {
        this._authClientParametersValidator.validate(parameters);
      } else {
        this._authClientParametersValidator.validate(parameters, request);
      }
    } else if (ParametersValidator.isHelpParameters(parameters)) {
      this._helpClientParametersValidator.validate(parameters);
    } else if (ParametersValidator.isMessagesParameters(parameters)) {
      this._messagesClientParametersValidator.validate(parameters);
    } else if (ParametersValidator.isSearchParameters(parameters)) {
      this._searchClientParametersValidator.validate(parameters);
    } else if (ParametersValidator.isTwitterListParameters(parameters)) {
      this._twitterListsClientParametersValidator.validate(parameters);
    } else if (ParametersValidator.isTrendsParameters(parameters)) {
      this._trendsClientParametersValidator.validate(parameters);
    } else if (ParametersValidator.isTimelineParameters(parameters)) {
      this._timelineClientParametersValidator.validate(parameters);
    } else if (ParametersValidator.isTweetsParameters(parameters)) {
      this._tweetsClientParametersValidator.validate(parameters);
    } else if (ParametersValidator.isUploadParameters(parameters)) {
      this._uploadClientParametersValidator.validate(parameters);
    } else if (ParametersValidator.isUserParameters(parameters)) {
      this._usersClientParametersValidator.validate(parameters);
    }
  }

  private static isAccountActivityParameters(parameters: any): parameters is AccountActivityParameters {
    return (parameters as AccountActivityParameters).customQueryParameters !== undefined;
  }

  private static isAccountSettingsParameters(parameters: any): parameters is AccountSettingsParameters {
    return (parameters as AccountSettingsParameters).customQueryParameters !== undefined;
  }

  private static isAuthParameters(parameters: any): parameters is AuthParameters {
    return (parameters as AuthParameters).customQueryParameters !== undefined;
  }

  private static isHelpParameters(parameters: any): parameters is HelpParameters {
    return (parameters as HelpParameters).customQueryParameters !== undefined;
  }

  private static isMessagesParameters(parameters: any): parameters is MessagesParameters {
    return (parameters as MessagesParameters).customQueryParameters !== undefined;
  }

  private static isSearchParameters(parameters: any): parameters is SearchParameters {
    return (parameters as SearchParameters).customQueryParameters !== undefined;
  }

  private static isTwitterListParameters(parameters: any): parameters is TwitterListParameters {
    return (parameters as TwitterListParameters).customQueryParameters !== undefined;
  }

  private static isTrendsParameters(parameters: any): parameters is TrendsParameters {
    return (parameters as TrendsParameters).customQueryParameters !== undefined;
  }

  private static isTimelineParameters(parameters: any): parameters is TimelineParameters {
    return (parameters as TimelineParameters).customQueryParameters !== undefined;
  }

  private static isTweetsParameters(parameters: any): parameters is TweetsParameters {
    return (parameters as TweetsParameters).customQueryParameters !== undefined;
  }

  private static isUploadParameters(parameters: any): parameters is UploadParameters {
    return (parameters as IUploadParameters).binary !== undefined;
  }

  private static isUserParameters(parameters: any): parameters is UserParameters {
    return (parameters as UserParameters).customQueryParameters !== undefined;
  }
}
