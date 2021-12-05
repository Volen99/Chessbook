import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

import {PostsApi} from "./backend/posts.api";
import {PostsService} from "./posts.service";
import {TimelineApi} from "../timeline/backend/timeline.api";
import {SharedVideoCommentModule} from "../shared-post-comment/shared-video-comment.module";
import {SharedModerationModule} from "../shared-moderation/shared-moderation.module";
import {SharedMainModule} from "../shared-main/shared-main.module";
import {SharedFormModule} from "../shared-forms/shared-form.module";
import {VideoViewsCounterComponent} from "./video-views-counter.component";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    VideoViewsCounterComponent,
  ],

    imports: [
        CommonModule,

        SharedMainModule,
        SharedFormModule,
        SharedModerationModule,
        SharedVideoCommentModule,
        FontAwesomeModule,
        ComponentsModule,
    ],

  providers: [
    PostsService,
    PostsApi,
    TimelineApi,
  ],

  exports: [
    VideoViewsCounterComponent,
  ]
})
export class PostsModule {
}
