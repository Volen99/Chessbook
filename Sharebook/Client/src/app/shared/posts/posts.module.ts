import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TweetQueryGeneratorService} from "./tweet-query-generator.service";
import {PostsApi} from "./backend/posts.api";
import {TweetControllerService} from "./tweet-controller.service";
import {TweetQueryExecutorService} from "./tweet-query-executor.service.";
import {TweetsRequesterService} from "./tweets-requester.service";
import {PostsService} from "./posts.service";
import {TimelineApi} from "../timeline/backend/timeline.api";
import {SharedVideoCommentModule} from "../shared-post-comment/shared-video-comment.module";
import {SharedModerationModule} from "../moderation/shared-moderation.module";
import {VideoCommentsComponent} from "./comment/video-comments.component";
import {VideoCommentComponent} from "./comment/video-comment.component";
import {VideoCommentAddComponent} from "./comment/video-comment-add.component";
import {SharedMainModule} from "../shared-main/shared-main.module";
import {SharedFormModule} from "../forms/shared-form.module";
import {SharedGlobalIconModule} from "../shared-icons/shared-global-icon.module";

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
        SharedGlobalIconModule,
        SharedVideoCommentModule,
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

})
export class PostsModule {
}
