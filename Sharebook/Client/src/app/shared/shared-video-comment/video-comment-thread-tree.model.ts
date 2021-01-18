import { VideoCommentThreadTree as VideoCommentThreadTreeServerModel } from '../models';
import { VideoComment } from './video-comment.model';

export class VideoCommentThreadTree implements VideoCommentThreadTreeServerModel {
  comment: VideoComment;
  children: VideoCommentThreadTree[];
}
