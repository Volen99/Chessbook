import {Inject, Injectable} from "@angular/core";

import {IUploadRequester, IUploadRequesterToken} from "src/app/core/Public/Client/Requesters/IUploadRequester";
import {IRawExecutors} from 'src/app/core/Public/Client/IRawExecutors';
import {IAuthRequester, IAuthRequesterToken} from "../../core/Public/Client/Requesters/IAuthRequester";
import {IAccountSettingsRequester, IAccountSettingsRequesterToken} from "../../core/Public/Client/Requesters/IAccountSettingsRequester";
import {IHelpRequester, IHelpRequesterToken} from "../../core/Public/Client/Requesters/IHelpRequester";
import {ISearchRequester, ISearchRequesterToken} from "../../core/Public/Client/Requesters/ISearchRequester";
import {ITwitterListsRequester, ITwitterListsRequesterToken} from "../../core/Public/Client/Requesters/ITwitterListsRequester";
import {ITimelinesRequester, ITimelinesRequesterToken} from "../../core/Public/Client/Requesters/ITimelinesRequester";
import {ITrendsRequester, ITrendsRequesterToken} from "../../core/Public/Client/Requesters/ITrendsRequester";
import {ITweetsRequester, ITweetsRequesterToken} from "../../core/Public/Client/Requesters/ITweetsRequester";
import {IUsersRequester, IUsersRequesterToken} from "../../core/Public/Client/Requesters/IUsersRequester";
import {IAccountActivityRequester, IAccountActivityRequesterToken} from "../../core/Public/Client/Requesters/IAccountActivityRequester";

@Injectable({
  providedIn: 'root',
})
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
    @Inject(IAccountActivityRequesterToken) accountActivityRequester: IAccountActivityRequester,
    @Inject(IAuthRequesterToken) authRequester: IAuthRequester,
    @Inject(IAccountSettingsRequesterToken) accountSettingsRequester: IAccountSettingsRequester,
    @Inject(IHelpRequesterToken) helpRequester: IHelpRequester,
    @Inject(ISearchRequesterToken) searchRequester: ISearchRequester,
    @Inject(ITwitterListsRequesterToken) listsRequester: ITwitterListsRequester,
    @Inject(ITimelinesRequesterToken) timelinesRequester: ITimelinesRequester,
    @Inject(ITrendsRequesterToken) trendsRequester: ITrendsRequester,
    @Inject(ITweetsRequesterToken) tweetsRequester: ITweetsRequester,
    @Inject(IUploadRequesterToken) uploadRequester: IUploadRequester,
    @Inject(IUsersRequesterToken) usersRequester: IUsersRequester) {
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
