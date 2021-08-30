import {IPost} from "../../posts/models/tweet";
import {IUser} from "../../../core/interfaces/common/users";
import {ITweetEntities} from "../../post-object/Entities/interfaces/ITweetEntities";
import {ICoordinates} from "../../posts/models/properties/ICoordinates";
import {ITweetIdentifier} from "../../posts/models/tweet-identifier";
import {IPlace} from "../../posts/models/properties/IPlace";
import {IHashtagEntity} from "../../post-object/Entities/interfaces/IHashTagEntity";
import {IUrlEntity} from "../../post-object/Entities/interfaces/IUrlEntity";
import {IMediaEntity} from "../../post-object/Entities/interfaces/IMediaEntity";
import {IUserMentionEntity} from "../../post-object/Entities/interfaces/IUserMentionEntity";
import {IPoll} from "../../posts/models/poll/poll";
import {IPostTag} from "./post-details.model";
import {User} from "../user/user.model";
import {UserRight} from "../../models/users/user-right.enum";
import {PostPrivacy} from "../../models/enums/post-privacy";
import {IPostConstant} from "../../posts/models/post-constant.model";

export class Post /*implements IPost*/ {
  static buildWatchUrl(post: Partial<Pick<Post, 'id'>>) {
    // @ts-ignore
    return '/' + post.user.screenName.substring(1) + '/post/' + (post.id) ?? '';
  }

  constructor(hash: Post) {
    this.createdAt = new Date(hash.createdAt.toString());
    this.privacy = hash.privacy;

    this.id = hash.id;
    this.uuid = hash.uuid;

    this.status = hash.status;

    this.entities = hash.entities;
    this.entities.medias = hash.entities.medias;

    this.favoriteCount = hash.favoriteCount;
    this.dislikeCount = hash.dislikeCount;

    this.nsfw = hash.nsfw;

    this.user = hash.user;

    this.blacklisted = hash.blacklisted;
    this.blockedReason = hash.blockedReason;

    this.commentsCount = hash.commentsCount;
    this.tags = hash.tags;
  }

  privacy: IPostConstant<PostPrivacy>;
  uuid: string;
  id: number;
  idStr: string;
  commentsCount: number;
  status: string;
  favorited: boolean;
  favoriteCount: number;
  dislikeCount: number;
  nsfw: boolean;
  entities: ITweetEntities;
  user: IUser;
  createdAt: Date;
  replyCount: number;
  inReplyToStatusId: number;
  inReplyToUserId: number;
  inReplyToScreenName: string;
  reshareCount: number;
  reshared: boolean;
  hasMedia: boolean;
  blacklisted?: boolean;
  blockedReason?: string;
  tags: IPostTag[];
  resharedStatus: Post;

  get url(): string {
    return `/${this.user?.screenName}/post/${this.id.toLocaleString().toLocaleLowerCase()}`;
  }

  static buildClientUrl(videoUUID: string) {
    return '/videos/watch/' + videoUUID;
  }


  public ToString(): string {
    return this.status;
  }

  public equals(other: IPost): boolean {
    if (other == null) {
      return false;
    }
  }

  isRemovableBy(user: IUser) {
    return user && (this.user.screenName === user.screenName || user.hasRight(UserRight.REMOVE_ANY_VIDEO));
  }

  isBlockableBy(user: IUser) {
    return this.blacklisted !== true && user && user.hasRight(UserRight.MANAGE_VIDEO_BLACKLIST) === true;
  }

  isUnblockableBy(user: IUser) {
    return this.blacklisted === true && user && user.hasRight(UserRight.MANAGE_VIDEO_BLACKLIST) === true;
  }

  isUpdatableBy(user: IUser) {
    return user && (this.user.screenName === user.screenName || user.hasRight(UserRight.UPDATE_ANY_VIDEO));
  }

  canBeDuplicatedBy(user: IUser) {
    return user /*&& this.isLocal === false*/ && user.hasRight(UserRight.MANAGE_VIDEOS_REDUNDANCIES);
  }

  // getExactNumberOfViews() {
  //   if (this.views < 1000) return '';
  //
  //   if (this.isLive) {
  //     return $localize`${this.views} viewers`;
  //   }
  //
  //   return $localize`${this.views} views`;
  // }
}
