import {IPost} from "../../posts/models/post.model";
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
import {ICard} from "../../posts/models/card.model";

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
    this.reposted = hash.reposted;
    this.repostCount = hash.repostCount;
    this.repost = hash.repost;

    this.entities = hash.entities;
    this.entities.medias = hash.entities.medias;

    this.favoriteCount = hash.favoriteCount;
    this.favorited = hash.favorited;
    this.dislikeCount = hash.dislikeCount;

    this.nsfw = hash.nsfw;

    this.user = hash.user;

    this.blacklisted = hash.blacklisted;
    this.blockedReason = hash.blockedReason;

    this.commentsCount = hash.commentsCount;
    this.tags = hash.tags;

    this.pinned = hash.pinned;
    this.poll = hash.poll;
    this.commentsEnabled = hash.commentsEnabled;
    this.card = hash.card;
    this.hasMedia = hash.hasMedia;
    this.clipThumbnail = hash.clipThumbnail;
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
  repostCount: number;
  reposted: boolean;
  hasMedia: boolean;
  blacklisted?: boolean;
  blockedReason?: string;
  tags: IPostTag[];
  repost: Post;
  pinned: boolean;
  poll: IPoll;
  commentsEnabled: boolean;
  card: ICard;
  clipThumbnail: string;

  get url(): string {
    return `/${this.user?.screenName}/post/${this.id.toLocaleString().toLocaleLowerCase()}`;
  }

  static buildClientUrl(screenName: string, postId: number) {
    return `/${screenName}/post/${postId}`;
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
