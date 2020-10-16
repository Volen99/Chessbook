import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";

export interface IGetUsersOptionalParameters extends ICustomRequestParameters {
  // Specifies if you want the user object to contain the user's latest tweets.
  SkipStatus?: boolean;

  // Include user entities.
  IncludeEntities?: boolean;
}

export class GetUsersOptionalParameters extends CustomRequestParameters implements IGetUsersOptionalParameters {
  constructor(parameters?: IGetUsersOptionalParameters) {
    if (parameters) {
      super(parameters);

      this.IncludeEntities = parameters?.IncludeEntities;
      this.SkipStatus = parameters?.SkipStatus;
    } else {
      super();
    }
  }

  public IncludeEntities?: boolean;
  public SkipStatus?: boolean;
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
