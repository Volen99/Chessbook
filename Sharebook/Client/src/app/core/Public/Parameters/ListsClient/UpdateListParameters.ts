import {IListParameters} from "./TwitterListParameters";
import {IListMetadataParameters, ListMetadataParameters} from "./IListMetadataParameters";
import {TwitterListIdentifier} from "../../Models/TwitterListIdentifier";
import {IUserIdentifier} from "../../Models/Interfaces/IUserIdentifier";
import {ITwitterListIdentifier} from "../../Models/Interfaces/ITwitterListIdentifier";

// For more information visit : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/post-lists-update
export interface IUpdateListParameters extends IListMetadataParameters, IListParameters {
}

export class UpdateListParameters extends ListMetadataParameters implements IUpdateListParameters {
  constructor(listIdOrList: number | ITwitterListIdentifier, slug?: string, userId?: IUserIdentifier,
              parameters?: IUpdateListParameters) {
    if (listIdOrList) {
      super();
      let list: ITwitterListIdentifier;
      if (typeof listIdOrList === 'number') {
        list = new TwitterListIdentifier(listIdOrList);
      } else {
        list = listIdOrList;
      }

      this.list = list;
    } else if (slug && userId) {
      super();

      this.list = new TwitterListIdentifier(slug, userId);
    } else if (parameters) {
      super(parameters);
      this.list = parameters?.list;
    }
  }

  public list: ITwitterListIdentifier;
}

// public UpdateListParameters(IUpdateListParameters parameters) : base(parameters)
//     // {
//     //     List = parameters?.List;
//     // }
//
//     // public UpdateListParameters(long listId)
//     // {
//     //     List = new TwitterListIdentifier(listId);
//     // }
//
//     // public UpdateListParameters(string slug, IUserIdentifier userId)
//     // {
//     //     List = new TwitterListIdentifier(slug, userId);
//     // }
//
//     // public UpdateListParameters(ITwitterListIdentifier listId)
//     // {
//     //     List = listId;
//     // }
