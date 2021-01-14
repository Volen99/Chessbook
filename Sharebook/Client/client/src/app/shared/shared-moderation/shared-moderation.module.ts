import { NgModule } from '@angular/core';
import { SharedFormModule } from '../shared-forms/shared-form.module';
import { SharedMainModule } from '../shared-main/shared-main.module';
import { SharedVideoCommentModule } from '../shared-video-comment';
import { AbuseService } from './abuse.service';
import { BatchDomainsModalComponent } from './batch-domains-modal.component';
import { BlocklistService } from './blocklist.service';
import { BulkService } from './bulk.service';
import { AccountReportComponent, CommentReportComponent, VideoReportComponent } from './report-modals';
import { UserBanModalComponent } from './user-ban-modal.component';
import { UserModerationDropdownComponent } from './user-moderation-dropdown.component';
import { VideoBlockComponent } from './video-block.component';
import { VideoBlockService } from './video-block.service';
import { SharedGlobalIconModule } from '../shared-icons/shared-global-icon.module';

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
