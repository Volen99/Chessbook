import {CursorQueryParameters, ICursorQueryParameters} from "../CursorQueryParameters";
import {IGetUsersOptionalParameters} from "./GetUsersOptionalParameters";

export interface IGetCursorUsersOptionalParameters extends ICursorQueryParameters, IGetUsersOptionalParameters {
}

export class GetCursorUsersOptionalParameters extends CursorQueryParameters implements IGetUsersOptionalParameters {
  constructor(parameters?: IGetCursorUsersOptionalParameters) {
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

// public GetCursorUsersOptionalParameters()
// {
// }
//
// public GetCursorUsersOptionalParameters(IGetCursorUsersOptionalParameters parameters) : base(parameters)
// {
//   IncludeEntities = parameters?.IncludeEntities;
//   SkipStatus = parameters?.SkipStatus;
// }
