import {IListMetadataParameters, ListMetadataParameters} from "./IListMetadataParameters";

// For more information visit : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/post-lists-create

export interface ICreateListParameters extends IListMetadataParameters {
}

export class CreateListParameters extends ListMetadataParameters implements ICreateListParameters {
  constructor(nameOrParameters: string | IListMetadataParameters) {
    if (typeof nameOrParameters === 'string') {
      super();
      super.name = nameOrParameters;
    } else {
      super(nameOrParameters);
    }
  }
}

// public CreateListParameters(string name)
// {
//   Name = name;
// }
//
// public CreateListParameters(IListMetadataParameters parameters) : base(parameters)
// {
// }
