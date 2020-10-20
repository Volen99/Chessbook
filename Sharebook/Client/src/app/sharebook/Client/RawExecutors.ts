import {IUploadRequester} from "src/app/core/Public/Client/Requesters/IUploadRequester";
import {IRawExecutors} from 'src/app/core/Public/Client/IRawExecutors';
import {IAuthRequester} from "../../core/Public/Client/Requesters/IAuthRequester";
import {IAccountSettingsRequester} from "../../core/Public/Client/Requesters/IAccountSettingsRequester";
import {IHelpRequester} from "../../core/Public/Client/Requesters/IHelpRequester";
import {ISearchRequester} from "../../core/Public/Client/Requesters/ISearchRequester";
import {ITwitterListsRequester} from "../../core/Public/Client/Requesters/ITwitterListsRequester";
import {ITimelinesRequester} from "../../core/Public/Client/Requesters/ITimelinesRequester";
import {ITrendsRequester} from "../../core/Public/Client/Requesters/ITrendsRequester";
import {ITweetsRequester} from "../../core/Public/Client/Requesters/ITweetsRequester";
import {IUsersRequester} from "../../core/Public/Client/Requesters/IUsersRequester";
import {IAccountActivityRequester} from "../../core/Public/Client/Requesters/IAccountActivityRequester";

export class RawExecutors implements IRawExecutors {
  private readonly _authRequester: IAuthRequester;
  private readonly _accountSettingsRequester: IAccountSettingsRequester;
  private readonly _helpRequester: IHelpRequester;
  private readonly _searchRequester: ISearchRequester;
  private readonly _listsRequester: ITwitterListsRequester;
  private readonly _timelinesRequester: ITimelinesRequester;
  private readonly _trendsRequester: ITrendsRequester;
  private readonly _tweetsRequester: ITweetsRequester;
  private readonly _uploadRequester: IUploadRequester;
  private readonly _usersRequester: IUsersRequester;
  private readonly _accountActivityRequester: IAccountActivityRequester;

  constructor(
    accountActivityRequester: IAccountActivityRequester,
    authRequester: IAuthRequester,
    accountSettingsRequester: IAccountSettingsRequester,
    helpRequester: IHelpRequester,
    searchRequester: ISearchRequester,
    listsRequester: ITwitterListsRequester,
    timelinesRequester: ITimelinesRequester,
    trendsRequester: ITrendsRequester,
    tweetsRequester: ITweetsRequester,
    uploadRequester: IUploadRequester,
    usersRequester: IUsersRequester) {
    this._accountActivityRequester = accountActivityRequester;
    this._authRequester = authRequester;
    this._accountSettingsRequester = accountSettingsRequester;
    this._helpRequester = helpRequester;
    this._searchRequester = searchRequester;
    this._listsRequester = listsRequester;
    this._timelinesRequester = timelinesRequester;
    this._trendsRequester = trendsRequester;
    this._tweetsRequester = tweetsRequester;
    this._uploadRequester = uploadRequester;
    this._usersRequester = usersRequester;
  }

  get auth(): IAuthRequester {
    return this._authRequester;
  }

  get accountSettings(): IAccountSettingsRequester {
    return this._accountSettingsRequester;
  }

  get help(): IHelpRequester {
    return this._helpRequester;
  }

  get search(): ISearchRequester {
    return this._searchRequester;
  }

  get lists(): ITwitterListsRequester {
    return this._listsRequester;
  }

  get timelines(): ITimelinesRequester {
    return this._timelinesRequester;
  }

  get trends(): ITrendsRequester {
    return this._trendsRequester;
  }

  get tweets(): ITweetsRequester {
    return this._tweetsRequester;
  }

  get upload(): IUploadRequester {
    return this._uploadRequester;
  }

  get users(): IUsersRequester {
    return this._usersRequester;
  }

  get accountActivity(): IAccountActivityRequester {
    return this._accountActivityRequester;
  }
}
