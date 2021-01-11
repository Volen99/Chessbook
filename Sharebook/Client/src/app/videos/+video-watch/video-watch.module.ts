import {NgModule} from '@angular/core';
import {VideoCommentService} from '../../shared/shared-video-comment/video-comment.service';
import {VideoCommentAddComponent} from './comment/video-comment-add.component';
import {VideoCommentComponent} from './comment/video-comment.component';
import {VideoCommentsComponent} from './comment/video-comments.component';
import {VideoSupportComponent} from './modal/video-support.component';
import {RecommendationsModule} from './recommendations/recommendations.module';
import {TimestampRouteTransformerDirective} from './timestamp-route-transformer.directive';
import {VideoWatchPlaylistComponent} from './video-watch-playlist.component';
import {VideoWatchRoutingModule} from './video-watch-routing.module';
import {VideoWatchComponent} from './video-watch.component';
import {SharedMainModule} from "../../shared/main/shared-main.module";
import {SharedFormModule} from "../../shared/shared-forms/shared-form.module";
import {SharedVideoMiniatureModule} from "../../shared/shared-video-miniature/shared-video-miniature.module";
import {SharedVideoPlaylistModule} from "../../shared/shared-video-playlist/shared-video-playlist.module";
import {SharedUserSubscriptionModule} from "../../shared/shared-user-subscription/shared-user-subscription.module";
import {SharedModerationModule} from "../../shared/shared-moderation/shared-moderation.module";
import {SharedGlobalIconModule} from "../../shared/shared-icons/shared-global-icon.module";
import {SharedVideoCommentModule} from "../../shared/shared-video-comment/shared-video-comment.module";
import {SharedShareModal} from "../../shared/shared-share-modal/shared-share-modal.module";
import {SharedVideoModule} from "../../shared/shared-video/shared-video.module";

@NgModule({
  imports: [
    VideoWatchRoutingModule,
    RecommendationsModule,

    SharedMainModule,
    SharedFormModule,
    SharedVideoMiniatureModule,
    SharedVideoPlaylistModule,
    SharedUserSubscriptionModule,
    SharedModerationModule,
    SharedGlobalIconModule,
    SharedVideoCommentModule,
    SharedShareModal,
    SharedVideoModule,
  ],

  declarations: [
    VideoWatchComponent,
    VideoWatchPlaylistComponent,

    VideoSupportComponent,
    VideoCommentsComponent,
    VideoCommentAddComponent,
    VideoCommentComponent,

    TimestampRouteTransformerDirective,
    TimestampRouteTransformerDirective
  ],

  exports: [
    VideoWatchComponent,

    TimestampRouteTransformerDirective
  ],

  providers: [
    VideoCommentService
  ]
})
export class VideoWatchModule {
}
