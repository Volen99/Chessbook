import {GetUsersOptionalParameters, IGetUsersOptionalParameters} from "../Optionals/GetUsersOptionalParameters";
import {TweetMode} from '../../Settings/SharebookSettings';

// For more information visit : https://dev.twitter.com/rest/reference/get/account/verify_credentials
export interface IGetAuthenticatedUserParameters extends IGetUsersOptionalParameters {
  // Include the email of the user. This is only available if the application has been verified and approved by Twitter.
  includeEmail?: boolean;

  // Decide whether to use Extended or Compat mode
  tweetMode?: TweetMode;
}

export class GetAuthenticatedUserParameters extends GetUsersOptionalParameters implements IGetAuthenticatedUserParameters {
  constructor(parameters?: IGetAuthenticatedUserParameters) {
    if (parameters) {
      super(parameters);
      this.includeEmail = parameters?.includeEmail;
      return;
    }

    this.includeEmail = true;
  }


  public includeEmail?: boolean;
  public tweetMode?: TweetMode;
}


// public GetAuthenticatedUserParameters()
// {
//   IncludeEmail = true;
// }
//
// public GetAuthenticatedUserParameters(IGetAuthenticatedUserParameters parameters) : base(parameters)
// {
//   IncludeEmail = parameters?.IncludeEmail;
// }
