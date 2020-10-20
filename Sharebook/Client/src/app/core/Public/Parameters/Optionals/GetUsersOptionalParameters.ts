import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";

export interface IGetUsersOptionalParameters extends ICustomRequestParameters {
  // Specifies if you want the user object to contain the user's latest tweets.
  skipStatus?: boolean;

  // Include user entities.
  includeEntities?: boolean;
}

export class GetUsersOptionalParameters extends CustomRequestParameters implements IGetUsersOptionalParameters {
  constructor(parameters?: IGetUsersOptionalParameters) {
    if (parameters) {
      super(parameters);

      this.includeEntities = parameters?.includeEntities;
      this.skipStatus = parameters?.skipStatus;
    } else {
      super();
    }
  }

  public includeEntities?: boolean;
  public skipStatus?: boolean;
}

// public GetUsersOptionalParameters()
// {
// }
//
// public GetUsersOptionalParameters(parameters: IGetUsersOptionalParameters) : base(parameters)
// {
//   IncludeEntities = parameters?.IncludeEntities;
//   SkipStatus = parameters?.SkipStatus;
// }
