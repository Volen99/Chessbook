import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

import {TweetQueryGeneratorService} from "./tweet-query-generator.service";
import {PostsApi} from "./backend/posts.api";
import {TweetControllerService} from "./tweet-controller.service";
import {TweetQueryExecutorService} from "./tweet-query-executor.service.";
import {TweetsRequesterService} from "./tweets-requester.service";
import {PostsService} from "./posts.service";
import {TimelineApi} from "../timeline/backend/timeline.api";
import {SharedVideoCommentModule} from "../shared-post-comment/shared-video-comment.module";
import {SharedModerationModule} from "../shared-moderation/shared-moderation.module";
import {VideoCommentsComponent} from "./post-watch/shared/comment/video-comments.component";
import {VideoCommentComponent} from "./post-watch/shared/comment/video-comment.component";
import {VideoCommentAddComponent} from "./post-watch/shared/comment/video-comment-add.component";
import {SharedMainModule} from "../shared-main/shared-main.module";
import {SharedFormModule} from "../shared-forms/shared-form.module";

@NgModule({
  declarations: [
    VideoCommentsComponent,
    VideoCommentAddComponent,
    VideoCommentComponent,
  ],

  imports: [
    CommonModule,

    SharedMainModule,
    SharedFormModule,
    SharedModerationModule,
    SharedVideoCommentModule,
    FontAwesomeModule,
  ],

  providers: [
    PostsService,
    TweetQueryGeneratorService,
    TweetControllerService,
    TweetQueryExecutorService,
    TweetsRequesterService,
    PostsApi,
    TimelineApi,
  ],

  exports: [
  ]
})
export class PostsModule {
}
