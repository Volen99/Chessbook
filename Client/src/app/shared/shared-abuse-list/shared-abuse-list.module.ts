import {TableModule} from 'primeng/table';
import {NgModule} from '@angular/core';
import {SharedMainModule} from '../shared-main/shared-main.module';
import {AbuseDetailsComponent} from './abuse-details.component';
import {AbuseListTableComponent} from './abuse-list-table.component';
import {AbuseMessageModalComponent} from './abuse-message-modal.component';
import {ModerationCommentModalComponent} from './moderation-comment-modal.component';
import {SharedGlobalIconModule} from "../shared-icons/shared-global-icon.module";
import {SharedModerationModule} from "../moderation/shared-moderation.module";
import {SharedVideoCommentModule} from "../shared-post-comment/shared-video-comment.module";
import {SharedFormModule} from "../forms/shared-form.module";

@NgModule({
  imports: [
    TableModule,

    SharedMainModule,
    SharedFormModule,
    SharedModerationModule,
    SharedGlobalIconModule,
    SharedVideoCommentModule
  ],

  declarations: [
    AbuseDetailsComponent,
    AbuseListTableComponent,
    ModerationCommentModalComponent,
    AbuseMessageModalComponent
  ],

  exports: [
    AbuseDetailsComponent,
    AbuseListTableComponent,
    ModerationCommentModalComponent,
    AbuseMessageModalComponent
  ],

  providers: []
})
export class SharedAbuseListModule {
}
