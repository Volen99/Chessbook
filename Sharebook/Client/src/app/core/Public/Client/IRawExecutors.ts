import {IUploadRequester} from "./Requesters/IUploadRequester";
import {IAccountActivityRequester} from "./Requesters/IAccountActivityRequester";
import {IAccountSettingsRequester} from "./Requesters/IAccountSettingsRequester";
import {IAuthRequester} from "./Requesters/IAuthRequester";
import {IHelpRequester} from "./Requesters/IHelpRequester";
import {ITwitterListsRequester} from "./Requesters/ITwitterListsRequester";
import {ISearchRequester} from "./Requesters/ISearchRequester";
import {ITimelinesRequester} from "./Requesters/ITimelinesRequester";
import {ITrendsRequester} from "./Requesters/ITrendsRequester";
import {ITweetsRequester} from "./Requesters/ITweetsRequester";
import {IUsersRequester} from "./Requesters/IUsersRequester";
import {InjectionToken} from "@angular/core";

export interface IRawExecutors {
  // Client to execute all the actions related with webhooks
  accountActivity: IAccountActivityRequester;

  // Client to execute all actions related with the account associated with the clients' credentials
  accountSettings: IAccountSettingsRequester;

  // Client to execute all actions related with authentication
  auth: IAuthRequester;

  // Client to execute all actions from the help path
  help: IHelpRequester;

  // Client to execute all actions related with twitter lists
  lists: ITwitterListsRequester;

  // Client to execute all actions related with search
  search: ISearchRequester;

  // Client to execute all actions related with timelines
  timelines: ITimelinesRequester;

  // Client to execute all actions related with trends
  trends: ITrendsRequester;

  // Client to execute all actions related with tweets
  tweets: ITweetsRequester;

  // Client to execute all actions related with media upload
  upload: IUploadRequester;

  // Client to execute all actions related with users
  users: IUsersRequester;
}

export const IRawExecutorsToken = new InjectionToken<IRawExecutors>('IRawExecutors', {
  providedIn: 'root',
  factory: () => new,
});
