import {VideoComment} from './video-comment.model';
import {VideoCommentThreadTree as VideoCommentThreadTreeServerModel} from '../models/videos/video-comment.model';

export class VideoCommentThreadTree implements VideoCommentThreadTreeServerModel {
  comment: VideoComment;
  children: VideoCommentThreadTree[];
}
