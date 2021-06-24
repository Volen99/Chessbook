import {IUser} from "../../core/interfaces/common/users";
import {getAbsoluteAPIUrl} from "../../helpers/utils";
import {Post} from "../shared-main/post/post.model";
import {IPostComment, IPostCommentAdmin} from "../models/posts/comment/post-comment.model";

export class PostComment {
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
  account: IUser;
  totalRepliesFromVideoAuthor: number;
  totalReplies: number;
  by: string;

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
    this.account = hash.account;
    this.totalRepliesFromVideoAuthor = hash.totalRepliesFromVideoAuthor;
    this.totalReplies = hash.totalReplies;

    if (this.account) {
      this.by = this.account.screenName;

      const absoluteAPIUrl = getAbsoluteAPIUrl();
      const thisHost = new URL(absoluteAPIUrl).host;
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

  account: IUser & { localUrl?: string };
  localUrl: string;

  video: {
    id: number
    uuid: string
    name: string
    localUrl: string
  };

  by: string;

  constructor(hash: IPostCommentAdmin, textHtml: string) {
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
      localUrl: Post.buildWatchUrl(hash.video)
    };

    this.localUrl = this.video.localUrl + ';threadId=' + this.threadId;

    this.account = hash.account;

    if (this.account) {
      this.by = this.account.screenName;

      this.account.localUrl = '/a/' + this.by;
    }
  }
}
