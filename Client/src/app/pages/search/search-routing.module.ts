import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SearchComponent} from './search.component';
import {VideoLazyLoadResolver} from "./shared/video-lazy-load.resolver";
import {ChannelLazyLoadResolver} from "./shared/channel-lazy-load.resolver";

const searchRoutes: Routes = [
  {
    path: '',
    component: SearchComponent,
    data: {
      meta: {
        title: `Search`
      }
    }
  },
  {
    path: 'lazy-load-video',
    component: SearchComponent,
    resolve: {
      data: VideoLazyLoadResolver
    }
  },
  {
    path: 'lazy-load-channel',
    component: SearchComponent,
    resolve: {
      data: ChannelLazyLoadResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(searchRoutes)],
  exports: [RouterModule]
})
export class SearchRoutingModule {
}
