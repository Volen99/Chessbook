import * as debug from 'debug';
import {Observable, Subject, throwError} from 'rxjs';
import {first, map} from 'rxjs/operators';
import {Injectable, NgZone} from '@angular/core';
import {SearchService} from './search.service';
import {ResultList} from "../models";
import {Post} from "../shared-main/post/post.model";
import {buildBulkObservable} from "../../helpers/rxjs";
import { User } from '../shared-main/user/user.model';

const logger = debug('peertube:search:FindInBulkService');

type BulkObservables<P extends number | string, R> = {
  notifier: Subject<P>
  result: Observable<R>
};

@Injectable()
export class FindInBulkService {

  private getVideoInBulk: BulkObservables<string, ResultList<Post>>;
  private getChannelInBulk: BulkObservables<string, ResultList<User>>;

  constructor(private searchService: SearchService, private ngZone: NgZone) {
    this.getVideoInBulk = this.buildBulkObservableObject(this.getVideosInBulk.bind(this));
    this.getChannelInBulk = this.buildBulkObservableObject(this.getChannelsInBulk.bind(this));
  }

  getVideo(uuid: string): Observable<Post> {
    logger('Schedule video fetch for uuid %s.', uuid);

    return this.getData({
      observableObject: this.getVideoInBulk,
      finder: v => v.uuid === uuid,
      param: uuid
    });
  }

  getChannel(handle: string): Observable<User> {
    logger('Schedule channel fetch for handle %s.', handle);

    return this.getData({
      observableObject: this.getChannelInBulk,
      finder: c => c.screenName === handle || c.screenName === handle, // nameWithHostForced
      param: handle
    });
  }

  private getData<P extends number | string, R>(options: {
    observableObject: BulkObservables<P, ResultList<R>>
    param: P
    finder: (d: R) => boolean
  }) {
    const {observableObject, param, finder} = options;

    return new Observable<R>(obs => {
      observableObject.result
        .pipe(
          first(),
          map(({data}) => data),
          map(data => data.find(finder))
        )
        .subscribe(result => {
          if (!result) {
            obs.error(new Error(`Element ${param} not found`));
          } else {
            obs.next(result);
            obs.complete();
          }
        });

      observableObject.notifier.next(param);
    });
  }

  private getVideosInBulk(uuids: string[]) {
    logger('Fetching videos %s.', uuids.join(', '));

    return this.searchService.searchVideos({uuids});
  }

  private getChannelsInBulk(handles: string[]) {
    logger('Fetching channels %s.', handles.join(', '));

    return this.searchService.searchVideoChannels({handles});
  }

  private getPlaylistsInBulk(uuids: string[]) {
    logger('Fetching playlists %s.', uuids.join(', '));

    // return this.searchService.searchVideoPlaylists({uuids});
  }

  private buildBulkObservableObject<T extends number | string, R>(bulkGet: (params: T[]) => Observable<R>) {
    const notifier = new Subject<T>();

    return {
      notifier,

      result: buildBulkObservable({
        time: 500,
        bulkGet,
        ngZone: this.ngZone,
        notifierObservable: notifier.asObservable()
      })
    };
  }
}
