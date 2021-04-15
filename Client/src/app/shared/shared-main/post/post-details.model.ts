import {Post} from "./post.model";

export class PostDetails extends Post {
  descriptionPath: string;
  support: string;
  tags: string[];
  account: Account;
  commentsEnabled: boolean;

  waitTranscoding: boolean;
  state: any;  // VideoConstant<VideoState>;

  likesPercent: number;
  dislikesPercent: number;

  trackerUrls: string[];

  constructor(hash: Post) {
    super(hash);

    this.buildLikeAndDislikePercents();
  }

  buildLikeAndDislikePercents() {
    this.likesPercent = (this.favoriteCount / (this.favoriteCount + this.dislikeCount)) * 100;
    this.dislikesPercent = (this.dislikeCount / (this.favoriteCount + this.dislikeCount)) * 100;
  }
}