import {PostComment} from "./post-comment";

export class PostCommentThreadTree {
  comment: PostComment;
  children: PostCommentThreadTree[];
}
