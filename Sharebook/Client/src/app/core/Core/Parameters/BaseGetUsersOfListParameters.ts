import {CursorQueryParameters, ICursorQueryParameters} from "../../Public/Parameters/CursorQueryParameters";
import {IListParameters} from "../../Public/Parameters/ListsClient/TwitterListParameters";
import {ITwitterListIdentifier, ITwitterListIdentifierToken} from '../../Public/Models/Interfaces/ITwitterListIdentifier';
import {Inject, InjectionToken} from "@angular/core";

export interface IBaseGetUsersOfListParameters extends IListParameters, ICursorQueryParameters {
  // Users will include their entities when set to true
  includeEntities?: boolean;

  // When set to true statuses will not be included in the returned user objects.
  skipStatus?: boolean;
}

export const IBaseGetUsersOfListParametersToken = new InjectionToken<IBaseGetUsersOfListParameters>('IBaseGetUsersOfListParameters', {
  providedIn: 'root',
  factory: () => null,
});

export abstract class BaseGetUsersOfListParameters extends CursorQueryParameters implements IBaseGetUsersOfListParameters {
  protected constructor(@Inject([ITwitterListIdentifierToken, IBaseGetUsersOfListParametersToken]) listOrParameters: ITwitterListIdentifier | IBaseGetUsersOfListParameters) {
    if (BaseGetUsersOfListParameters.isITwitterListIdentifier(listOrParameters)) {
      super();

      this.list = listOrParameters;
    } else {
      super(listOrParameters);

      this.list = listOrParameters?.list;
      this.includeEntities = listOrParameters?.includeEntities;
      this.skipStatus = listOrParameters?.skipStatus;
    }
  }

  public list: ITwitterListIdentifier;
  public includeEntities: boolean;
  public skipStatus: boolean;

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
