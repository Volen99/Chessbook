import {NgModule} from '@angular/core';
import {AbuseService} from './abuse.service';
import {BatchDomainsModalComponent} from './batch-domains-modal.component';
import {BlocklistService} from './blocklist.service';
import {BulkService} from './bulk.service';
import {UserBanModalComponent} from './user-ban-modal.component';
import {UserModerationDropdownComponent} from './user-moderation-dropdown.component';
import {VideoBlockComponent} from './video-block.component';
import {VideoBlockService} from './video-block.service';
import {SharedVideoCommentModule} from "../shared-video-comment/shared-video-comment.module";
import {SharedMainModule} from "../main/shared-main.module";
import {SharedFormModule} from "../shared-forms/shared-form.module";
import {SharedGlobalIconModule} from "../shared-icons/shared-global-icon.module";
import {VideoReportComponent} from "./report-modals/video-report.component";
import {CommentReportComponent} from "./report-modals/comment-report.component";
import {AccountReportComponent} from "./report-modals/account-report.component";

@NgModule({
  imports: [
    SharedMainModule,
    SharedFormModule,
    SharedGlobalIconModule,
    SharedVideoCommentModule
  ],

  declarations: [
    UserBanModalComponent,
    UserModerationDropdownComponent,
    VideoBlockComponent,
    VideoReportComponent,
    BatchDomainsModalComponent,
    CommentReportComponent,
    AccountReportComponent
  ],

  exports: [
    UserBanModalComponent,
    UserModerationDropdownComponent,
    VideoBlockComponent,
    VideoReportComponent,
    BatchDomainsModalComponent,
    CommentReportComponent,
    AccountReportComponent
  ],

  providers: [
    BlocklistService,
    BulkService,
    AbuseService,
    VideoBlockService
  ]
})
export class SharedModerationModule {
}
