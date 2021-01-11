import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RecentVideosRecommendationService} from './recent-videos-recommendation.service';
import {RecommendedVideosComponent} from './recommended-videos.component';
import {RecommendedVideosStore} from './recommended-videos.store';
import {SharedMainModule} from "../../../shared/main/shared-main.module";
import {SharedSearchModule} from "../../../shared/search/shared-search.module";
import {SharedVideoPlaylistModule} from "../../../shared/shared-video-playlist/shared-video-playlist.module";
import {SharedVideoMiniatureModule} from "../../../shared/shared-video-miniature/shared-video-miniature.module";
import {SharedFormModule} from "../../../shared/shared-forms/shared-form.module";

@NgModule({
  imports: [
    CommonModule,

    SharedMainModule,
    SharedSearchModule,
    SharedVideoPlaylistModule,
    SharedVideoMiniatureModule,
    SharedFormModule
  ],
  declarations: [
    RecommendedVideosComponent
  ],
  exports: [
    RecommendedVideosComponent
  ],
  providers: [
    RecommendedVideosStore,
    RecentVideosRecommendationService
  ]
})
export class RecommendationsModule {
}
