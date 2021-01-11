import {forkJoin, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {LiveVideoService} from "../../shared/shared-video-live/live-video.service";
import {VideoChannelService} from "../../shared/main/video-channel/video-channel.service";
import {VideoCaptionService} from "../../shared/main/video-caption/video-caption.service";
import {VideoService} from "../../shared/main/video/video.service";
import {VideoDetails} from "../../shared/main/video/video-details.model";

@Injectable()
export class VideoUpdateResolver implements Resolve<any> {
  constructor(
    private videoService: VideoService,
    private liveVideoService: LiveVideoService,
    private videoChannelService: VideoChannelService,
    private videoCaptionService: VideoCaptionService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    const uuid: string = route.params['uuid'];

    return this.videoService.getVideo({videoId: uuid})
      .pipe(
        switchMap(video => forkJoin(this.buildVideoObservables(video))),
        map(([video, videoChannels, videoCaptions, liveVideo]) => ({video, videoChannels, videoCaptions, liveVideo}))
      );
  }

  private buildVideoObservables(video: VideoDetails) {
    return [
      this.videoService
        .loadCompleteDescription(video.descriptionPath)
        .pipe(map(description => Object.assign(video, {description}))),

      this.videoChannelService
        .listAccountVideoChannels(video.account)
        .pipe(
          map(result => result.data),
          map(videoChannels => videoChannels.map(c => ({
            id: c.id,
            label: c.displayName,
            support: c.support,
            avatarPath: c.avatar?.path
          })))
        ),

      this.videoCaptionService
        .listCaptions(video.id)
        .pipe(
          map(result => result.data)
        ),

      video.isLive
        ? this.liveVideoService.getVideoLive(video.id)
        : of(undefined)
    ];
  }
}
