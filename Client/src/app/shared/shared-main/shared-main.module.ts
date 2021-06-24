import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {OverlayModule} from '@angular/cdk/overlay';
import {ClipboardModule} from "@angular/cdk/clipboard";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PickerModule} from "@ctrl/ngx-emoji-mart";
import {EmojiModule} from "@ctrl/ngx-emoji-mart/ngx-emoji";
import {
  NgbCollapseModule,
  NgbDropdownModule,
  NgbModalModule,
  NgbNavModule,
  NgbPopoverModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';

import {BootstrapToggleDirective} from "./angular/directives/bootstrap-toggle.directive";
import {PostComponent} from "./components/post/post.component";
import {ProfilePicture49x49Component} from "./components/profile-picture-49x49/profile-picture49x49.component";
import {FromNowPipe} from "./angular/pipes/from-now.pipe";
import {DateToggleComponent} from "./date";
import {InfiniteScrollerDirective} from "./angular/directives/infinite-scroller.directive";
import {SharebookTemplateDirective} from "./angular/directives/sharebook-template.directive";
import {BytesPipe} from "./angular/pipes/bytes.pipe";
import {ActionDropdownComponent} from "./buttons/action-dropdown.component";
import {FeedComponent} from "./feeds/feed.component";
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
import {
  EmojiPickerDropdownComponent, EmojiPickerMenuComponent,
  ModifierPickerComponent,
  ModifierPickerMenuComponent
} from './components/compose/emoji-picker-dropdown/emoji-picker-dropdown.component';

import { AnimatedNumberComponent } from './components/animated-number/animated-number.component';
import {NbPopoverModule} from "../../sharebook-nebular/theme/components/popover/popover.module";
import { PopoverMoreComponent } from './components/post/popover-more-component/popover-more.component';
import {NbButtonModule} from "../../sharebook-nebular/theme/components/button/button.module";
import {TopMenuDropdownComponent} from "./misc/top-menu-dropdown.component";
import {ListOverflowComponent} from "./misc/list-overflow.component";
import {SmallLoaderComponent} from "./loaders/small-loader.component";
import {LoaderComponent} from "./loaders/loader.component";

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
    PickerModule,
    EmojiModule,
    NbPopoverModule,
    NbButtonModule,
  ],

  declarations: [
    // VideoAvatarChannelComponent,
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
    LoaderComponent,
    SmallLoaderComponent,
    //
    HelpComponent,
    ListOverflowComponent,
    TopMenuDropdownComponent,
    //
    // UserQuotaComponent,
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
    PopoverMoreComponent,

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
    // NgbCollapseModule,
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
    LoaderComponent,
    SmallLoaderComponent,
    //
    HelpComponent,
    ListOverflowComponent,
    TopMenuDropdownComponent,
    //
    // UserQuotaComponent,
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
