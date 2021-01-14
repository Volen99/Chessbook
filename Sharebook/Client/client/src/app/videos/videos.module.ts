import { NgModule } from '@angular/core';
import { OverviewService } from './video-list';
import { VideoOverviewComponent } from './video-list/overview/video-overview.component';
import { VideoLocalComponent } from './video-list/video-local.component';
import { VideoMostLikedComponent } from './video-list/video-most-liked.component';
import { VideoRecentlyAddedComponent } from './video-list/video-recently-added.component';
import { VideoTrendingComponent } from './video-list/video-trending.component';
import { VideoUserSubscriptionsComponent } from './video-list/video-user-subscriptions.component';
import { VideosRoutingModule } from './videos-routing.module';
import { VideosComponent } from './videos.component';
import { SharedMainModule } from '../shared/shared-main';
import { SharedVideoMiniatureModule } from '../shared/shared-video-miniature';
import { SharedUserSubscriptionModule } from '../shared/shared-user-subscription';
import { SharedGlobalIconModule } from '../shared/shared-icons/shared-global-icon.module';
import { SharedFormModule } from '../shared/shared-forms/shared-form.module';

@NgModule({
  imports: [
    VideosRoutingModule,

    SharedMainModule,
    SharedFormModule,
    SharedVideoMiniatureModule,
    SharedUserSubscriptionModule,
    SharedGlobalIconModule
  ],

  declarations: [
    VideosComponent,

    VideoTrendingComponent,
    VideoMostLikedComponent,
    VideoRecentlyAddedComponent,
    VideoLocalComponent,
    VideoUserSubscriptionsComponent,
    VideoOverviewComponent
  ],

  exports: [
    VideosComponent
  ],

  providers: [
    OverviewService
  ]
})
export class VideosModule {
}
