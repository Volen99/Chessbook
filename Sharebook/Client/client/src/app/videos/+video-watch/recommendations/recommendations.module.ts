import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedMainModule } from '../../../shared/shared-main';
import { SharedSearchModule } from '../../../shared/shared-search';
import { RecentVideosRecommendationService } from './recent-videos-recommendation.service';
import { RecommendedVideosComponent } from './recommended-videos.component';
import { RecommendedVideosStore } from './recommended-videos.store';
import { SharedVideoPlaylistModule } from '../../../shared/shared-video-playlist';
import { SharedVideoMiniatureModule } from '../../../shared/shared-video-miniature';
import { SharedFormModule } from '../../../shared/shared-forms/shared-form.module';

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
