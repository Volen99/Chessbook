import {Video} from "../../../shared/main/video/video.model";
import {VideosOverview as VideosOverviewServer} from "../../../shared/models/overviews/videos-overview";
import {VideoChannelSummary} from "../../../shared/models/videos/channel/video-channel.model";
import {VideoConstant} from "../../../shared/models/videos/video-constant.model";

export class VideosOverview implements VideosOverviewServer {
  channels: {
    channel: VideoChannelSummary
    videos: Video[]
  }[];

  categories: {
    category: VideoConstant<number>
    videos: Video[]
  }[];

  tags: {
    tag: string
    videos: Video[]
  }[];

  [key: string]: any
}
