import { UserVideoRateType } from './user-video-rate.type'
import {IPost} from "../tweet";

export interface AccountVideoRate {
  video: IPost;
  rating: UserVideoRateType;
}
