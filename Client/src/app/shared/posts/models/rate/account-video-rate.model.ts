import { UserVideoRateType } from './user-video-rate.type'
import {IPost} from "../post.model";

export interface AccountVideoRate {
  video: IPost;
  rating: UserVideoRateType;
}
