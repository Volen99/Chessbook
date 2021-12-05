import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {OverlayModule} from '@angular/cdk/overlay';
import {ClipboardModule} from "@angular/cdk/clipboard";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {
  NgbCollapseModule,
  NgbDropdownModule,
  NgbModalModule,
  NgbNavModule,
  NgbPopoverModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';

import {PostComponent} from "./components/post/post.component";
import {ProfilePicture49x49Component} from "./components/profile-picture-49x49/profile-picture49x49.component";
import {FromNowPipe} from "./angular/pipes/from-now.pipe";
import {DateToggleComponent} from "./date";
import {InfiniteScrollerDirective} from "./angular/directives/infinite-scroller.directive";
import {SharebookTemplateDirective} from "./angular/directives/sharebook-template.directive";
import {BytesPipe} from "./angular/pipes/bytes.pipe";
import {ActionDropdownComponent} from "./buttons/action-dropdown.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {HelpComponent} from "./misc/help.component";
import {NbIconModule} from "../../sharebook-nebular/theme/components/icon/icon.module";
import {NbContextMenuModule} from "../../sharebook-nebular/theme/components/context-menu/context-menu.module";
import {UserHistoryService} from "./users/user-history.service";
import {UserNotificationService} from "./users/user-notification.service";
import {NbUserModule} from "../../sharebook-nebular/theme/components/user/user.module";
import {NbCardModule} from "../../sharebook-nebular/theme/components/card/card.module";
import {ComponentsModule} from "../../components/components.module";
import {NumberFormatterPipe} from "./angular/pipes/number-formatter.pipe";
import {SocialContextComponent} from "./components/post/social-context/social-context.component";
import {EnumToArrayPipe} from "./angular/pipes/enum-to-array.pipe";
import {CharacterCounterComponent} from "./components/compose/character-counter/character-counter.component";

import {NbPopoverModule} from "../../sharebook-nebular/theme/components/popover/popover.module";
import { PopoverMoreComponent } from './components/post/popover-more-component/popover-more.component';
import {NbButtonModule} from "../../sharebook-nebular/theme/components/button/button.module";
import {TopMenuDropdownComponent} from "./misc/top-menu-dropdown.component";
import {ListOverflowComponent} from "./misc/list-overflow.component";
import {SmallLoaderComponent} from "./loaders/small-loader.component";
import {LoaderComponent} from "./loaders/loader.component";
import {RedundancyService} from "./post/redundancy.service";
import {LinkComponent} from "./angular/link.component";
import {IsVideoPipe} from "./angular/pipes/is-video.pipe";
import {SafeVideoLinkPipe} from "./angular/pipes/safe-video-link.pipe";
import {MatRippleModule} from "@angular/material/core";

@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
    // ReactiveFormsModule,
    RouterModule,
    // HttpClientModule,

    NgbDropdownModule,
    NgbModalModule,
    NgbPopoverModule,
    NgbNavModule,
    NgbTooltipModule,
    NgbCollapseModule,

    ClipboardModule,
    //
    // PrimeSharedModule,

    NbIconModule,
    NbContextMenuModule,
    NbUserModule,
    NbCardModule,
    ComponentsModule,
    FontAwesomeModule,
    OverlayModule,
    NbPopoverModule,
    NbButtonModule,
    MatRippleModule,
  ],

  declarations: [
    // VideoAvatarChannelComponent,
    //
    FromNowPipe,
    NumberFormatterPipe,
    BytesPipe,
    EnumToArrayPipe,
    // DurationFormatterPipe,
    IsVideoPipe,
    SafeVideoLinkPipe,
    //
     InfiniteScrollerDirective,
     SharebookTemplateDirective,
    //
     ActionDropdownComponent,
    // ButtonComponent,
    // DeleteButtonComponent,
    // EditButtonComponent,
    //
    DateToggleComponent,
    //
    LoaderComponent,
    SmallLoaderComponent,
    //
    HelpComponent,
    ListOverflowComponent,
    TopMenuDropdownComponent,
    //
    // UserQuotaComponent,
    PostComponent,
    ProfilePicture49x49Component,
    // EnumToArrayPipe,
    // FormDirective,
    // NextBtnDirective,
    // CheckboxDirective,
    // DisableDirective,
    // GroupByPipe,

    SocialContextComponent,
    CharacterCounterComponent,
    PopoverMoreComponent,

    LinkComponent,

  ],

  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    //
    NgbDropdownModule,
    // NgbModalModule,
    NgbPopoverModule,
    NgbNavModule,
    NgbTooltipModule,
    NgbCollapseModule,
    //
    ClipboardModule,
    //
    // PrimeSharedModule,
    //
    // VideoAvatarChannelComponent,
    //
    FromNowPipe,
    BytesPipe,
    NumberFormatterPipe,
    IsVideoPipe,
    SafeVideoLinkPipe,
    // DurationFormatterPipe,
    //
    InfiniteScrollerDirective,
    SharebookTemplateDirective,
    //
    ActionDropdownComponent,
    // ButtonComponent,
    // DeleteButtonComponent,
    // EditButtonComponent,
    //
    DateToggleComponent,
    //
    LoaderComponent,
    SmallLoaderComponent,
    //
    HelpComponent,
    ListOverflowComponent,
    TopMenuDropdownComponent,
    //
    // UserQuotaComponent,
    PostComponent,
    ProfilePicture49x49Component,
    EnumToArrayPipe,
    CharacterCounterComponent,
    // EnumToArrayPipe,
    // FormDirective,
    // NextBtnDirective,
    // CheckboxDirective,
    // DisableDirective,
    // GroupByPipe,

    LinkComponent,
  ],

  providers: [
    // DatePipe,
    //
    FromNowPipe,
    //
    // AUTH_INTERCEPTOR_PROVIDER,
    //
    // AccountService,
    //
    UserHistoryService,
    UserNotificationService,
    //
    RedundancyService,
    // VideoImportService,
    // VideoOwnershipService,
    // VideoService,
    //
    // VideoCaptionService,
    //
    // VideoChannelService
  ],
})
export class SharedMainModule {
}
