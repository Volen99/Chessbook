import {VideoConstant} from "../videos/video-constant.model";
import {VideoChannelSummary} from "../videos/channel/video-channel.model";
import {Video} from "../videos/video.model";

export interface ChannelOverview {
  channel: VideoChannelSummary;
  videos: Video[];
}

export interface CategoryOverview {
  category: VideoConstant<number>;
  videos: Video[];
}

export interface TagOverview {
  tag: string;
  videos: Video[];
}

export interface VideosOverview {
  channels: ChannelOverview[];

  categories: CategoryOverview[];

  tags: TagOverview[];
}
