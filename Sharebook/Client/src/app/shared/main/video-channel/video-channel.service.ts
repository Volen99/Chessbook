import {Observable, ReplaySubject} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {Account} from '../account/account.model';
import {VideoChannel} from './video-channel.model';
import {RestService} from "../../../core/rest/rest.service";
import {RestExtractor} from "../../../core/rest/rest-extractor.service";
import {ComponentPaginationLight} from "../../../core/rest/component-pagination.model";
import {ResultList} from "../../models/result-list.model";
import {VideoChannelUpdate} from "../../models/videos/channel/video-channel-update.model";
import {VideoChannelCreate} from "../../models/videos/channel/video-channel-create.model";
import {Avatar} from "../../models/avatars/avatar.model";
import {AccountService} from "../account/account.service";
import {VideoChannel as VideoChannelServer} from "../../../shared/main/video-channel/video-channel.model";

@Injectable()
export class VideoChannelService {
  static BASE_VIDEO_CHANNEL_URL = environment.apiUrl + '/api/v1/video-channels/';

  videoChannelLoaded = new ReplaySubject<VideoChannel>(1);

  static extractVideoChannels(result: ResultList<VideoChannelServer>) {
    const videoChannels: VideoChannel[] = [];

    for (const videoChannelJSON of result.data) {
      let a: VideoChannel;

      videoChannels.push(new VideoChannel(videoChannelJSON));
    }

    return {data: videoChannels, total: result.total};
  }

  constructor(
    private authHttp: HttpClient,
    private restService: RestService,
    private restExtractor: RestExtractor
  ) {
  }

  getVideoChannel(videoChannelName: string) {
    return this.authHttp.get<VideoChannel>(VideoChannelService.BASE_VIDEO_CHANNEL_URL + videoChannelName)
      .pipe(
        map(videoChannelHash => new VideoChannel(videoChannelHash)),
        tap(videoChannel => this.videoChannelLoaded.next(videoChannel)),
        catchError(err => this.restExtractor.handleError(err))
      );
  }

  listAccountVideoChannels(
    account: Account,
    componentPagination?: ComponentPaginationLight,
    withStats = false,
    search?: string
  ): Observable<ResultList<VideoChannel>> {
    const pagination = componentPagination
      ? this.restService.componentPaginationToRestPagination(componentPagination)
      : {start: 0, count: 20};

    let params = new HttpParams();
    params = this.restService.addRestGetParams(params, pagination);
    params = params.set('withStats', withStats + '');

    if (search) {
      params = params.set('search', search);
    }

    const url = AccountService.BASE_ACCOUNT_URL + account.nameWithHost + '/video-channels';
    return this.authHttp.get<ResultList<VideoChannelServer>>(url, {params})
      .pipe(
        map(res => VideoChannelService.extractVideoChannels(res)),
        catchError(err => this.restExtractor.handleError(err))
      );
  }

  createVideoChannel(videoChannel: VideoChannelCreate) {
    return this.authHttp.post(VideoChannelService.BASE_VIDEO_CHANNEL_URL, videoChannel)
      .pipe(
        map(this.restExtractor.extractDataBool),
        catchError(err => this.restExtractor.handleError(err))
      );
  }

  updateVideoChannel(videoChannelName: string, videoChannel: VideoChannelUpdate) {
    return this.authHttp.put(VideoChannelService.BASE_VIDEO_CHANNEL_URL + videoChannelName, videoChannel)
      .pipe(
        map(this.restExtractor.extractDataBool),
        catchError(err => this.restExtractor.handleError(err))
      );
  }

  changeVideoChannelAvatar(videoChannelName: string, avatarForm: FormData) {
    const url = VideoChannelService.BASE_VIDEO_CHANNEL_URL + videoChannelName + '/avatar/pick';

    return this.authHttp.post<{ avatar: Avatar }>(url, avatarForm)
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

  removeVideoChannel(videoChannel: VideoChannel) {
    return this.authHttp.delete(VideoChannelService.BASE_VIDEO_CHANNEL_URL + videoChannel.nameWithHost)
      .pipe(
        map(this.restExtractor.extractDataBool),
        catchError(err => this.restExtractor.handleError(err))
      );
  }
}
