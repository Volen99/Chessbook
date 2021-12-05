import {Post} from "./post.model";

export interface IPostTag {
  name: string;
  postCount: number;
  id: number;
}

export class PostDetails extends Post {
  support: string;
  account: Account;
  commentsEnabled: boolean = true;

  waitTranscoding: boolean;
  state: any;  // VideoConstant<VideoState>;

  likesPercent: number;
  dislikesPercent: number;

  constructor(hash: Post) {
    super(hash);

    this.buildLikeAndDislikePercents();
  }

  buildLikeAndDislikePercents() {
    this.likesPercent = (this.favoriteCount / (this.favoriteCount + this.dislikeCount)) * 100;
    this.dislikesPercent = (this.dislikeCount / (this.favoriteCount + this.dislikeCount)) * 100;
  }
}
