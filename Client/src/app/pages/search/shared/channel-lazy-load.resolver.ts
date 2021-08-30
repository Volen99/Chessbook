import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import { User } from 'app/shared/shared-main/user/user.model';
import { SearchService } from 'app/shared/shared-search/search.service';
import {AbstractLazyLoadResolver} from './abstract-lazy-load.resolver';

@Injectable()
export class ChannelLazyLoadResolver extends AbstractLazyLoadResolver<User> {

  constructor(protected router: Router, private searchService: SearchService) {
    super();
  }

  protected finder(url: string) {
    return this.searchService.searchVideoChannels({search: url});
  }

  protected buildUrl(channel: User) {
    return '/video-channels/' + channel.screenName;
  }
}
