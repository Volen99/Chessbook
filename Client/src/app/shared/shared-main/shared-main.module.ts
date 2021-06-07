import {CommonModule, DatePipe} from '@angular/common';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";

import {SharedGlobalIconModule} from "../shared-icons/shared-global-icon.module";
import {BootstrapToggleDirective} from "./angular/directives/bootstrap-toggle.directive";
import {PostComponent} from "./components/post/post.component";
import {ProfilePicture49x49Component} from "./components/profile-picture-49x49/profile-picture49x49.component";
import {StaticHeaderComponent} from "./components/static-header/static-header.component";
import {FromNowPipe} from "./angular/pipes/from-now.pipe";
import {DateToggleComponent} from "./date";
import {InfiniteScrollerDirective} from "./angular/directives/infinite-scroller.directive";
import {SharebookTemplateDirective} from "./angular/directives/sharebook-template.directive";
import {BytesPipe} from "./angular/pipes/bytes.pipe";
import {ActionDropdownComponent} from "./buttons/action-dropdown.component";
import {OverlayModule} from '@angular/cdk/overlay';
// import { SharedModule as PrimeSharedModule } from 'primeng/api';
// import { ClipboardModule } from '@angular/cdk/clipboard';
// import { HttpClientModule } from '@angular/common/http';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
// import {
//   BytesPipe,
//   DurationFormatterPipe,
//   FromNowPipe,
//   InfiniteScrollerDirective
//   NumberFormatterPipe,
//   SharebookTemplateDirective
// } from './angular';
// import { ActionDropdownComponent, ButtonComponent, DeleteButtonComponent, EditButtonComponent } from './buttons';
// import { DateToggleComponent } from './date';
// import { FeedComponent } from './feeds';
// import { LoaderComponent, SmallLoaderComponent } from './loaders';
// import { HelpComponent, ListOverflowComponent, TopMenuDropdownComponent } from './misc';
// import { UserHistoryService, UserNotificationsComponent, UserNotificationService, UserQuotaComponent } from './users';
// import { RedundancyService, VideoImportService, VideoOwnershipService, VideoService } from './video';
// import { VideoCaptionService } from './video-caption';
// import { VideoChannelService } from './video-channel';
// import { StaticHeaderComponent } from './components/static-header/static-header.component';
// import { PostComponent } from './components/post/post.component';
// import { VideoAvatarChannelComponent } from '@app/shared/shared-main/account/video-avatar-channel.component';
// import { ActorAvatarInfoComponent } from '@app/shared/shared-main/account/actor-avatar-info.component';
// import { AUTH_INTERCEPTOR_PROVIDER } from '@app/shared/shared-main/auth/auth-interceptor.service';
// import { AccountService } from '@app/shared/shared-main/account/account.service';
// import { ProfilePicture49x49Component } from '@app/shared/shared-main/components/profile-picture-49x49/profile-picture49x49.component';
// import { EnumToArrayPipe } from './angular/enum-to-array.pipe';
// import { FormDirective } from '@app/shared/shared-main/angular/form.directive';
// import { NextBtnDirective } from '@app/shared/shared-main/angular/next-btn.directive';
// import { CheckboxDirective } from './angular/checkbox.directive';
// import { DisableDirective } from './angular/disable.directive';
// import { GroupByPipe } from './angular/pipes/group-by.pipe';
// import { BootstrapToggleDirective } from './angular/directives/bootstrap-toggle.directive';
import {
  NgbCollapseModule,
  NgbDropdownModule,
  NgbModalModule,
  NgbNavModule,
  NgbPopoverModule,
  NgbTooltipModule,
  NgbButtonsModule
} from '@ng-bootstrap/ng-bootstrap';
import {ClipboardModule} from "@angular/cdk/clipboard";
import {FeedComponent} from "./feeds/feed.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {HelpComponent} from "./misc/help.component";
import {NbIconModule} from "../../sharebook-nebular/theme/components/icon/icon.module";
import {NbContextMenuModule} from "../../sharebook-nebular/theme/components/context-menu/context-menu.module";
import {UserHistoryService} from "./users/user-history.service";
import {UserNotificationService} from "./users/user-notification.service";
import {ActorAvatarInfoComponent} from "./account/actor-avatar-info.component";
import {NbUserModule} from "../../sharebook-nebular/theme/components/user/user.module";
import {NbCardModule} from "../../sharebook-nebular/theme/components/card/card.module";
import {ComponentsModule} from "../../components/components.module";
import {NumberFormatterPipe} from "./angular/pipes/number-formatter.pipe";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {SocialContextComponent} from "./components/post/social-context/social-context.component";
import {EnumToArrayPipe} from "./angular/pipes/enum-to-array.pipe";
import {CharacterCounterComponent} from "./components/compose/character-counter/character-counter.component";
import {
  EmojiPickerDropdownComponent, EmojiPickerMenuComponent,
  ModifierPickerComponent,
  ModifierPickerMenuComponent
} from './components/compose/emoji-picker-dropdown/emoji-picker-dropdown.component';
import {PickerModule} from "@ctrl/ngx-emoji-mart";
import {EmojiModule} from "@ctrl/ngx-emoji-mart/ngx-emoji";
import { AnimatedNumberComponent } from './components/animated-number/animated-number.component';

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

    SharedGlobalIconModule,
    NbIconModule,
    NbContextMenuModule,
    NbUserModule,
    NbCardModule,
    ComponentsModule,
    FontAwesomeModule,
    OverlayModule,
    PickerModule,
    EmojiModule,
  ],

  declarations: [
    // VideoAvatarChannelComponent,
    ActorAvatarInfoComponent,
    //
    FromNowPipe,
    NumberFormatterPipe,
    BytesPipe,
    EnumToArrayPipe,
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
    FeedComponent,
    //
    // LoaderComponent,
    // SmallLoaderComponent,
    //
    HelpComponent,
    // ListOverflowComponent,
    // TopMenuDropdownComponent,
    //
    // UserQuotaComponent,
    StaticHeaderComponent,
    BootstrapToggleDirective,
    PostComponent,
    ProfilePicture49x49Component,
    // EnumToArrayPipe,
    // FormDirective,
    // NextBtnDirective,
    // CheckboxDirective,
    // DisableDirective,
    // GroupByPipe,
    // BootstrapToggleDirective,

    SocialContextComponent,
    CharacterCounterComponent,
    ModifierPickerMenuComponent,
    ModifierPickerComponent,
    EmojiPickerDropdownComponent,
    EmojiPickerMenuComponent,
    AnimatedNumberComponent,

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
    // NgbPopoverModule,
    NgbNavModule,
    NgbTooltipModule,
    // NgbCollapseModule,
    //
    ClipboardModule,
    //
    // PrimeSharedModule,
    //
    // VideoAvatarChannelComponent,
    ActorAvatarInfoComponent,
    //
    FromNowPipe,
    BytesPipe,
    NumberFormatterPipe,
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
    FeedComponent,
    //
    // LoaderComponent,
    // SmallLoaderComponent,
    //
    HelpComponent,
    // ListOverflowComponent,
    // TopMenuDropdownComponent,
    //
    // UserQuotaComponent,
    StaticHeaderComponent,
    BootstrapToggleDirective,
    PostComponent,
    ProfilePicture49x49Component,
    EnumToArrayPipe,
    CharacterCounterComponent,
    EmojiPickerDropdownComponent,
    // EnumToArrayPipe,
    // FormDirective,
    // NextBtnDirective,
    // CheckboxDirective,
    // DisableDirective,
    // GroupByPipe,
    // BootstrapToggleDirective,
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
    // RedundancyService,
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
