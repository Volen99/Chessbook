import {PostComment} from "./post-comment-model";
import {IPostCommentThreadTree} from "../models/posts/comment/post-comment.model";

export class PostCommentThreadTree implements IPostCommentThreadTree {
  comment: PostComment;
  hasDisplayedChildren: boolean;
  children: PostCommentThreadTree[];
}
