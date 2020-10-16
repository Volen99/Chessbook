import {CursorQueryParameters, ICursorQueryParameters} from "../../Public/Parameters/CursorQueryParameters";
import {IListParameters} from "../../Public/Parameters/ListsClient/TwitterListParameters";
import {ITwitterListIdentifier} from '../../Public/Models/Interfaces/ITwitterListIdentifier';

export interface IBaseGetUsersOfListParameters extends IListParameters, ICursorQueryParameters {
  // Users will include their entities when set to true
  IncludeEntities?: boolean;

  // When set to true statuses will not be included in the returned user objects.
  SkipStatus?: boolean;
}

export abstract class BaseGetUsersOfListParameters extends CursorQueryParameters implements IBaseGetUsersOfListParameters {
  constructor(listOrParameters: ITwitterListIdentifier | IBaseGetUsersOfListParameters) {
    if (BaseGetUsersOfListParameters.isITwitterListIdentifier(listOrParameters)) {
      super();

      this.list = listOrParameters;
    } else {
      super(listOrParameters);

      this.list = listOrParameters?.list;
      this.IncludeEntities = listOrParameters?.IncludeEntities;
      this.SkipStatus = listOrParameters?.SkipStatus;
    }
  }

  public list: ITwitterListIdentifier;
  public IncludeEntities: boolean;
  public SkipStatus: boolean;

  private static isITwitterListIdentifier(listOrParameters: ITwitterListIdentifier | IBaseGetUsersOfListParameters):
    listOrParameters is ITwitterListIdentifier {
    return (listOrParameters as ITwitterListIdentifier).id !== undefined;
  }
}

// protected BaseGetUsersOfListParameters(list: ITwitterListIdentifier)
// {
//   this.List = list;
// }
//
// protected BaseGetUsersOfListParameters(parameters: IBaseGetUsersOfListParameters) : base(parameters)
// {
//   List = parameters?.List;
//   IncludeEntities = parameters?.IncludeEntities;
//   SkipStatus = parameters?.SkipStatus;
// }
