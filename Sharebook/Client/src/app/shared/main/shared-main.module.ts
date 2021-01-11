import {SharedModule as PrimeSharedModule} from 'primeng/api';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {CommonModule, DatePipe} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {
  NgbCollapseModule,
  NgbDropdownModule,
  NgbModalModule,
  NgbNavModule,
  NgbPopoverModule,
  NgbTooltipModule
} from '@ng-bootstrap/ng-bootstrap';
import {SharedGlobalIconModule} from "../shared-icons/shared-global-icon.module";
import {ActorAvatarInfoComponent} from "./account/actor-avatar-info.component";
import {VideoAvatarChannelComponent} from "./account/video-avatar-channel.component";
import {FromNowPipe} from "./angular/from-now.pipe";
import {NumberFormatterPipe} from "./angular/number-formatter.pipe";
import {BytesPipe} from "./angular/bytes.pipe";
import {DurationFormatterPipe} from "./angular/duration-formatter.pipe";
import {InfiniteScrollerDirective} from "./angular/infinite-scroller.directive";
import {PeerTubeTemplateDirective} from "./angular/peertube-template.directive";
import {ActionDropdownComponent} from "./buttons/action-dropdown.component";
import {ButtonComponent} from "./buttons/button.component";
import {DeleteButtonComponent} from "./buttons/delete-button.component";
import {EditButtonComponent} from "./buttons/edit-button.component";
import {DateToggleComponent} from "./date/date-toggle.component";
import {FeedComponent} from "./feeds/feed.component";
import {LoaderComponent} from "./loaders/loader.component";
import {SmallLoaderComponent} from "./loaders/small-loader.component";
import {HelpComponent} from "./misc/help.component";
import {ListOverflowComponent} from "./misc/list-overflow.component";
import {TopMenuDropdownComponent} from "./misc/top-menu-dropdown.component";
import {UserQuotaComponent} from "./users/user-quota.component";
import {UserNotificationsComponent} from "./users/user-notifications.component";
import {AUTH_INTERCEPTOR_PROVIDER} from "./auth/auth-interceptor.service";
import {AccountService} from "./account/account.service";
import {UserHistoryService} from "./users/user-history.service";
import {UserNotificationService} from "./users/user-notification.service";
import {RedundancyService} from "./video/redundancy.service";
import {VideoImportService} from "./video/video-import.service";
import {VideoOwnershipService} from "./video/video-ownership.service";
import {VideoService} from "./video/video.service";
import {VideoCaptionService} from "./video-caption/video-caption.service";
import {VideoChannelService} from "./video-channel/video-channel.service";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,

    NgbDropdownModule,
    NgbModalModule,
    NgbPopoverModule,
    NgbNavModule,
    NgbTooltipModule,
    NgbCollapseModule,

    /*ClipboardModule,*/

    PrimeSharedModule,

    SharedGlobalIconModule
  ],

  declarations: [
    VideoAvatarChannelComponent,
    ActorAvatarInfoComponent,

    FromNowPipe,
    NumberFormatterPipe,
    BytesPipe,
    DurationFormatterPipe,

    InfiniteScrollerDirective,
    PeerTubeTemplateDirective,

    ActionDropdownComponent,
    ButtonComponent,
    DeleteButtonComponent,
    EditButtonComponent,

    DateToggleComponent,

    FeedComponent,

    LoaderComponent,
    SmallLoaderComponent,

    HelpComponent,
    ListOverflowComponent,
    TopMenuDropdownComponent,

    UserQuotaComponent,
    UserNotificationsComponent
  ],

  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,

    NgbDropdownModule,
    NgbModalModule,
    NgbPopoverModule,
    NgbNavModule,
    NgbTooltipModule,
    NgbCollapseModule,

    ClipboardModule,

    PrimeSharedModule,

    VideoAvatarChannelComponent,
    ActorAvatarInfoComponent,

    FromNowPipe,
    BytesPipe,
    NumberFormatterPipe,
    DurationFormatterPipe,

    InfiniteScrollerDirective,
    PeerTubeTemplateDirective,

    ActionDropdownComponent,
    ButtonComponent,
    DeleteButtonComponent,
    EditButtonComponent,

    DateToggleComponent,

    FeedComponent,

    LoaderComponent,
    SmallLoaderComponent,

    HelpComponent,
    ListOverflowComponent,
    TopMenuDropdownComponent,

    UserQuotaComponent,
    UserNotificationsComponent
  ],

  providers: [
    DatePipe,

    FromNowPipe,

    AUTH_INTERCEPTOR_PROVIDER,

    AccountService,

    UserHistoryService,
    UserNotificationService,

    RedundancyService,
    VideoImportService,
    VideoOwnershipService,
    VideoService,

    VideoCaptionService,

    VideoChannelService
  ]
})
export class SharedMainModule {
}
