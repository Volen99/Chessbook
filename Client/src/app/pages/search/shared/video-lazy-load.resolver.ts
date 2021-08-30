import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import { SearchService } from 'app/shared/shared-search/search.service';
import {AbstractLazyLoadResolver} from './abstract-lazy-load.resolver';
import {Post} from "../../../shared/shared-main/post/post.model";

@Injectable()
export class VideoLazyLoadResolver extends AbstractLazyLoadResolver<Post> {

  constructor(protected router: Router, private searchService: SearchService) {
    super();
  }

  protected finder(url: string) {
    return this.searchService.searchVideos({search: url});
  }

  protected buildUrl(video: Post) {
    return Post.buildWatchUrl(video);
  }
}
