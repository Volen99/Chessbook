import {getAbsoluteAPIUrl} from "../../helpers/utils";
import {IUser, UserData} from "../../core/interfaces/common/users";
import {IPostComment} from "./models/post-comment-model";

export class PostComment implements IPostComment {
  id: number;
  url: string;
  text: string;
  threadId: number;
  inReplyToCommentId: number;
  videoId: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt: Date | string;
  isDeleted: boolean;
  user: IUser;
  totalRepliesFromVideoAuthor: number;
  totalReplies: number;
  by: string;
  accountAvatarUrl: string;

  isLocal: boolean;

  constructor(hash: IPostComment) {
    this.id = hash.id;
    this.url = hash.url;
    this.text = hash.text;
    this.threadId = hash.threadId;
    this.inReplyToCommentId = hash.inReplyToCommentId;
    this.videoId = hash.videoId;
    this.createdAt = new Date(hash.createdAt.toString());
    this.updatedAt = new Date(hash.updatedAt.toString());
    this.deletedAt = hash.deletedAt ? new Date(hash.deletedAt.toString()) : null;
    this.isDeleted = hash.isDeleted;
    this.user = hash.user;
    this.totalRepliesFromVideoAuthor = hash.totalRepliesFromVideoAuthor;
    this.totalReplies = hash.totalReplies;

    if (this.user) {
      this.by = UserData.CREATE_BY_STRING(this.user.name /*this.account.host*/);
      // this.accountAvatarUrl = UserData.GET_ACTOR_AVATAR_URL(this.users);

      const absoluteAPIUrl = getAbsoluteAPIUrl();
      const thisHost = new URL(absoluteAPIUrl).host;
      // this.isLocal = this.users.host.trim() === thisHost;
    }
  }
}

export class PostCommentAdmin {
  id: number;
  url: string;
  text: string;
  textHtml: string;

  threadId: number;
  inReplyToCommentId: number;

  createdAt: Date | string;
  updatedAt: Date | string;

  user: IUser & { localUrl?: string };
  localUrl: string;

  video: {
    id: number
    uuid: string
    name: string
    localUrl: string
  };

  by: string;
  accountAvatarUrl: string;

  constructor(hash: PostCommentAdmin, textHtml: string) {
    this.id = hash.id;
    this.url = hash.url;
    this.text = hash.text;
    this.textHtml = textHtml;

    this.threadId = hash.threadId;
    this.inReplyToCommentId = hash.inReplyToCommentId;

    this.createdAt = new Date(hash.createdAt.toString());
    this.updatedAt = new Date(hash.updatedAt.toString());

    this.video = {
      id: hash.video.id,
      uuid: hash.video.uuid,
      name: hash.video.name,
      localUrl: '/videos/watch/' + hash.video.uuid
    };

    this.localUrl = this.video.localUrl + ';threadId=' + this.threadId;

    this.user = hash.user;

    if (this.user) {
      this.by = UserData.CREATE_BY_STRING(this.user.name);
      // this.accountAvatarUrl = UserData.GET_ACTOR_AVATAR_URL(this.users);

      this.user.localUrl = '/accounts/' + this.by;
    }
  }
}
