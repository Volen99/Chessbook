import {ActorInfo, UserNotificationType, VideoInfo} from "../../models/users/user-notification.model";
import {UserRight} from "../../models/users/user-right.enum";
import {AbuseState} from "../../models/moderation/abuse/abuse-state.model";
import {IUser, UserData} from "../../../core/interfaces/common/users";

export type FollowState = 'pending' | 'accepted'; // does not belong here kk

export interface IUserNotification {
  id: number;
  type: UserNotificationType;
  read: boolean;

  post?: VideoInfo & {
    user: IUser
  };

  videoImport?: {
    id: number
    video?: VideoInfo
    torrentName?: string
    magnetUri?: string
    targetUrl?: string
  };

  comment?: {
    id: number
    threadId: number
    account: ActorInfo
    post: VideoInfo
  };

  postLike?: {
    account: ActorInfo & { avatarUrl?: string },
    post: VideoInfo,
  };

  abuse?: {
    id: number
    state: AbuseState

    post?: VideoInfo

    comment?: {
      threadId: number

      post: {
        id: number
        uuid: string
        name: string
      }
    }

    account?: ActorInfo
  };

  videoBlacklist?: {
    id: number
    video: VideoInfo
  };

  account?: ActorInfo;

  actorFollow?: {
    id: number
    follower: ActorInfo
    state: FollowState

    following: {
      type: 'account' | 'channel' | 'instance'
      name: string
      displayName: string
      host: string
    }
  };

  createdAt: string;
  updatedAt: string;
}

export class UserNotification implements IUserNotification {
  id: number;
  type: UserNotificationType;
  read: boolean;

  post?: VideoInfo & {
    user: IUser & { avatarUrl?: string }
  };

  videoImport?: {
    id: number
    video?: VideoInfo
    torrentName?: string
    magnetUri?: string
    targetUrl?: string
  };

  comment?: {
    id: number
    threadId: number
    account: ActorInfo & { avatarUrl?: string }
    post: VideoInfo
  };

  postLike?: {
    account: ActorInfo & { avatarUrl?: string },
    post: VideoInfo,
  };

  abuse?: {
    id: number
    state: AbuseState

    post?: VideoInfo

    comment?: {
      threadId: number

      post: {
        id: number
        uuid: string
        name: string
      }
    }

    account?: ActorInfo
  };

  videoBlacklist?: {
    id: number
    video: VideoInfo
  };

  account?: ActorInfo & { avatarUrl?: string };

  actorFollow?: {
    id: number
    state: FollowState
    follower: ActorInfo & { avatarUrl?: string }
    following: {
      type: 'account' | 'channel' | 'instance'
      name: string
      displayName: string
      host: string
    }
  };

  createdAt: string;
  updatedAt: string;

  // Additional fields
  videoUrl?: string;
  commentUrl?: any[];
  abuseUrl?: string;
  abuseQueryParams?: { [id: string]: string } = {};
  videoAutoBlacklistUrl?: string;
  accountUrl?: string;
  videoImportIdentifier?: string;
  videoImportUrl?: string;
  instanceFollowUrl?: string;

  constructor(hash: IUserNotification, user: IUser) {
    this.id = hash.id;
    this.type = hash.type;
    this.read = hash.read;

    // We assume that some fields exist
    // To prevent a notification popup crash in case of bug, wrap it inside a try/catch
    try {
      this.post = hash.post;
      if (this.post) {
        this.setVideoChannelAvatarUrl(this.post.user);
      }

      this.videoImport = hash.videoImport;

      this.comment = hash.comment;
      if (this.comment) {
        this.setAccountAvatarUrl(this.comment.account);
      }

      this.postLike = hash.postLike;

      this.abuse = hash.abuse;

      this.videoBlacklist = hash.videoBlacklist;

      this.account = hash.account;
      if (hash.postLike) {
        this.account = hash.postLike.account;
      } else if (hash.type === 1) {
        // @ts-ignore
        this.account = hash.post.user;
      } else if (hash.comment) {
        this.account = hash.comment.account;
      }

      if (this.account) {
        this.setAccountAvatarUrl(this.account);
      }

      this.actorFollow = hash.actorFollow;
      if (this.actorFollow) this.setAccountAvatarUrl(this.actorFollow.follower);

      this.createdAt = hash.createdAt;
      this.updatedAt = hash.updatedAt;

      switch (this.type) {
        case UserNotificationType.NEW_VIDEO_FROM_SUBSCRIPTION:
          this.videoUrl = this.buildVideoUrl(this.post, this.account.screenName);
          this.accountUrl = this.buildAccountUrl(this.account);
          break;

        case UserNotificationType.UNBLACKLIST_ON_MY_VIDEO:
          this.videoUrl = this.buildVideoUrl(this.post, this.account.screenName);
          break;

        case UserNotificationType.NEW_COMMENT_ON_MY_VIDEO:
        case UserNotificationType.COMMENT_MENTION:
          if (!this.comment) break;
          this.accountUrl = this.buildAccountUrl(this.comment.account);
          this.commentUrl = this.buildCommentUrl(this.comment, this.comment.account.screenName);
          break;

        case UserNotificationType.NEW_ABUSE_FOR_MODERATORS:
          this.abuseUrl = '/admin/shared-moderation/abuses/list';
          this.abuseQueryParams.search = '#' + this.abuse.id;

          if (this.abuse.post) this.videoUrl = this.buildVideoUrl(this.abuse.post, this.account.screenName);
          else if (this.abuse.comment) this.commentUrl = this.buildCommentUrl(this.abuse.comment, this.abuse.account.screenName);
          else if (this.abuse.account) this.accountUrl = this.buildAccountUrl(this.abuse.account);
          break;

        case UserNotificationType.ABUSE_STATE_CHANGE:
          this.abuseUrl = '/my-account/abuses';
          this.abuseQueryParams.search = '#' + this.abuse.id;
          break;

        case UserNotificationType.ABUSE_NEW_MESSAGE:
          this.abuseUrl = user.hasRight(UserRight.MANAGE_ABUSES)
            ? '/admin/shared-moderation/abuses/list'
            : '/my-account/abuses';
          this.abuseQueryParams.search = '#' + this.abuse.id;
          break;

        case UserNotificationType.VIDEO_AUTO_BLACKLIST_FOR_MODERATORS:
          this.videoAutoBlacklistUrl = '/admin/shared-moderation/video-auto-blacklist/list';
          // Backward compatibility where we did not assign videoBlacklist to this type of notification before
          if (!this.videoBlacklist) this.videoBlacklist = {id: null, video: this.post};

          this.videoUrl = this.buildVideoUrl(this.videoBlacklist.video, this.account.screenName);
          break;

        case UserNotificationType.BLACKLIST_ON_MY_VIDEO:
          this.videoUrl = this.buildVideoUrl(this.videoBlacklist.video, this.account.screenName);
          break;

        case UserNotificationType.MY_VIDEO_PUBLISHED:
          this.videoUrl = this.buildVideoUrl(this.post, this.account.screenName);
          break;

        case UserNotificationType.MY_VIDEO_IMPORT_SUCCESS:
          this.videoImportUrl = this.buildVideoImportUrl();
          this.videoImportIdentifier = this.buildVideoImportIdentifier(this.videoImport);

          if (this.videoImport.video) this.videoUrl = this.buildVideoUrl(this.videoImport.video, this.account.screenName);
          break;

        case UserNotificationType.MY_VIDEO_IMPORT_ERROR:
          this.videoImportUrl = this.buildVideoImportUrl();
          this.videoImportIdentifier = this.buildVideoImportIdentifier(this.videoImport);
          break;

        case UserNotificationType.NEW_USER_REGISTRATION:
          this.accountUrl = this.buildAccountUrl(this.account);
          break;

        case UserNotificationType.NEW_FOLLOW:
          this.accountUrl = this.buildAccountUrl(this.actorFollow.follower);
          break;

        case UserNotificationType.NEW_INSTANCE_FOLLOWER:
          this.instanceFollowUrl = '/admin/follows/following-list';
          break;

        case UserNotificationType.AUTO_INSTANCE_FOLLOWING:
          this.instanceFollowUrl = '/admin/follows/following-list';
          break;

        case UserNotificationType.NEW_LIKE_ON_MY_POST:
          this.accountUrl = this.buildAccountUrl(this.postLike.account);
          this.videoUrl = this.buildVideoUrl(this.postLike.post, this.postLike.account.screenName);
          break;
      }
    } catch (err) {
      this.type = null;
      console.error(err);
    }
  }

  private buildVideoUrl(post: { id: number }, screenName: string) {
    return '/' + screenName.substring(1) + '/post/' + post.id;
  }

  private buildAccountUrl(account: { screenName: string }) {
    return '/' + UserData.CREATE_BY_STRING(account.screenName, /*account.host*/);
  }

  private buildVideoImportUrl() {
    return '/my-library/video-imports';
  }

  private buildVideoImportIdentifier(videoImport: { targetUrl?: string, magnetUri?: string, torrentName?: string }) {
    return videoImport.targetUrl || videoImport.magnetUri || videoImport.torrentName;
  }

  private buildCommentUrl(comment: { post: { id: number }, threadId: number }, screenName: string) {
    return [this.buildVideoUrl(comment.post, screenName), {threadId: comment.threadId}];
  }

  private setAccountAvatarUrl(actor: { avatarUrl?: string, avatar?: { url?: string, path: string } }) {
    // actor.avatarUrl = UserData.GET_ACTOR_AVATAR_URL(actor);

    return actor.avatarUrl;
  }

  private setVideoChannelAvatarUrl(actor: { avatarUrl?: string, avatar?: { url?: string, path: string } }) {
    // actor.avatarUrl = UserData.GET_ACTOR_AVATAR_URL(actor);

    return actor.avatarUrl;
  }
}
