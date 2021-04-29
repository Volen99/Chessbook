import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

import {User} from "../../shared/shared-main/user/user.model";
import {IUser} from "../interfaces/common/users";
import {TokenOptions, Tokens} from "../../../root-helpers/users/user-tokens";
import {
  flushUserInfoFromLocalStorage,
  getUserInfoFromLocalStorage, saveUserInfoIntoLocalStorage
} from "../../../root-helpers/users/user-local-storage-manager";
import {UserRight} from "../../shared/models/users/user-right.enum";
import {hasUserRight} from "../utils/users/user-role";
import {UserRole} from "../../shared/models/users/user-role";
import {UserVideoQuota} from "../../shared/models/users/user-video-quota.model";

export class AuthUser extends User implements IUser {
  tokens: Tokens;

  canSeeVideosLink = true;

  static load() {
    const tokens = Tokens.load();
    if (!tokens) {
      return null;
    }

    const userInfo = getUserInfoFromLocalStorage();
    if (!userInfo) {
      return null;
    }

    return new AuthUser(userInfo, tokens);
  }

  static flush() {
    flushUserInfoFromLocalStorage();

    Tokens.flush();
  }

  constructor(userHash: Partial<IUser>, hashTokens: TokenOptions) {
    super(userHash);

    this.tokens = new Tokens(hashTokens);
  }

  getAccessToken() {
    return this.tokens.accessToken;
  }

  getRefreshToken() {
    return this.tokens.refreshToken;
  }

  getTokenType() {
    return this.tokens.tokenType;
  }

  refreshTokens(accessToken: string, refreshToken: string) {
    this.tokens.accessToken = accessToken;
    this.tokens.refreshToken = refreshToken;
  }

  // hasRight(right: UserRight) {
  //   return hasUserRight(this.role, right);
  // }

  canManage(user: IUser) {
    const myRole = this.role;

    if (myRole === UserRole.ADMINISTRATOR) {
      return true;
    }

    // I'm a moderator: I can only manage users
    return user.role === UserRole.USER;
  }

  save() {
    saveUserInfoIntoLocalStorage({
      id: this.id,
      username: this.screenName,
      email: this.email,
      role: this.role,
    });

    this.tokens.save();
  }

  computeCanSeeVideosLink(quotaObservable: Observable<UserVideoQuota>): Observable<boolean> {
    // if (!this.isUploadDisabled()) {
    //   this.canSeeVideosLink = true;
    //   return of(this.canSeeVideosLink);
    // }

    // Check if the user has videos
    return quotaObservable.pipe(
      map(({videoQuotaUsed}) => {
        if (videoQuotaUsed !== 0) {
          // User already uploaded videos, so it can see the link
          this.canSeeVideosLink = true;
        } else {
          // No videos, no upload so the user don't need to see the videos link
          this.canSeeVideosLink = false;
        }

        return this.canSeeVideosLink;
      })
    );
  }

  followedBy: boolean;
}
