import {TableModule} from 'primeng/table';
import {NgModule} from '@angular/core';
import {SharedFormModule} from '../shared-forms/shared-form.module';
import {AbuseDetailsComponent} from './abuse-details.component';
import {AbuseListTableComponent} from './abuse-list-table.component';
import {AbuseMessageModalComponent} from './abuse-message-modal.component';
import {ModerationCommentModalComponent} from './moderation-comment-modal.component';
import {SharedModerationModule} from "../shared-moderation/shared-moderation.module";
import {SharedGlobalIconModule} from "../shared-icons/shared-global-icon.module";
import {SharedVideoCommentModule} from "../shared-video-comment/shared-video-comment.module";
import {SharedMainModule} from "../main/shared-main.module";

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
