import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {PrivacyMode} from '../../Models/Enum/PrivacyMode';

export interface IListMetadataParameters extends ICustomRequestParameters {
  // The name for the list. A list's name must start with a letter and can consist only of
  // 25 or fewer letters, numbers, "-", or "_" characters.
  name: string;

  // The description to give the list.
  description: string;

  // Whether your list is public or private. Values can be public or private.
  // If no mode is specified the list will be public.
  privacyMode?: PrivacyMode;
}

export class ListMetadataParameters extends CustomRequestParameters implements IListMetadataParameters {
  constructor(parameters?: IListMetadataParameters) {
    super();

    if (parameters) {
      this.name = parameters?.name;
      this.description = parameters?.description;
      this.privacyMode = parameters?.privacyMode;
    }
  }

  public name: string;
  public description: string;
  public privacyMode?: PrivacyMode;
}

// public ListMetadataParameters()
// {
// }
//
// public ListMetadataParameters(IListMetadataParameters parameters)
// {
//   Name = parameters?.Name;
//   Description = parameters?.Description;
//   PrivacyMode = parameters?.PrivacyMode;
// }
