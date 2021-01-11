import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgxStronglyTypedFormsModule} from 'ngx-strongly-typed-forms';
import {ModalModule} from 'angular-custom-modal';
import {PopUpComponent} from './pop-up/pop-up.component';
import {InterceptorService} from '../api-authorization/from-shared/interceptor.service';
import {RouterExtService} from './services/rouer-ext.service';
import {ToastrModule} from 'ngx-toastr';
import {ErrorInterceptorService} from '../api-authorization/from-shared/error-interceptor.service';
import {SharedRoutingModule} from './shared-routing.module';
import {PaginationComponent} from './components/pagination/pagination.component';

import {ConfigurationService} from '../core/configuration.service';
import {SecurityService} from '../api-authorization/from-shared/security.service';
import {StorageService} from '../api-authorization/services/storage.service';
import {DataService} from '../api-authorization/from-shared/data.service';
import { UploadComponent } from './components/upload/upload.component';
import { WhoCanReplyComponent } from './components/upload/who-can-reply/who-can-reply.component';
import {FileUploadModule} from "../global-modules/upload/file-upload.module";
import { InsertedMediaComponent } from './components/upload/inserted-media/inserted-media.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { UploadHeaderComponent } from './components/upload/header/upload-header.component';
import { SingleInsertedMediaComponent } from './components/upload/inserted-media/single-inserted-media/single-inserted-media.component';
import {MediaSplitDirective} from "./components/upload/inserted-media/media-split.directive";
import { KeyboardShortcutsComponent } from './components/keyboard-shortcuts/keyboard-shortcuts.component';
import { MessageBtnComponent } from './components/message-btn/message-btn.component';
import { SidebarColumnComponent } from './components/sidebar-column/sidebar-column.component';
import { MainComponent } from './components/main/main.component';
import { TrendsComponent } from './components/sidebar-column/trends/trends.component';
import { WhoToFollowComponent } from './components/sidebar-column/who-to-follow/who-to-follow.component';
import { SearchComponent } from './components/sidebar-column/search/search.component';
import { MessagesComponent } from './components/messages/messages.component';
import { DetailHeaderNoMessageSelectedComponent } from './components/messages/detail-header-no-message-selected/detail-header-no-message-selected.component';
import { DetailHeaderMessageSelectedComponent } from './components/messages/detail-header-message-selected/detail-header-message-selected.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ListsComponent } from './components/lists/lists.component';
import { SettingsComponent } from './components/settings/settings.component';
import { YourAccountComponent } from './components/settings/your-account/your-account.component';
import { AccessibilityDisplayAndLanguagesComponent } from './components/settings/accessibility-display-and-languages/accessibility-display-and-languages.component';
import { LeftArrowComponent } from './components/miscellaneous/left-arrow/left-arrow.component';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';
import { UppercasePipe } from './pipes/uppercase.pipe';
import { FormatIntegerPipe } from './pipes/format-integer.pipe';
import {FormatTimePipe} from "./pipes/format-time.pipe";

@NgModule({
  declarations: [
    PopUpComponent,
    PaginationComponent,
    UploadComponent,
    WhoCanReplyComponent,
    InsertedMediaComponent,
    TimelineComponent,
    UploadHeaderComponent,
    SingleInsertedMediaComponent,
    MediaSplitDirective,
    KeyboardShortcutsComponent,
    MessageBtnComponent,
    SidebarColumnComponent,
    MainComponent,
    TrendsComponent,
    WhoToFollowComponent,
    SearchComponent,
    MessagesComponent,
    DetailHeaderNoMessageSelectedComponent,
    DetailHeaderMessageSelectedComponent,
    NotificationsComponent,
    ListsComponent,
    SettingsComponent,
    YourAccountComponent,
    AccessibilityDisplayAndLanguagesComponent,
    LeftArrowComponent,
    EnumToArrayPipe,
    UppercasePipe,
    FormatIntegerPipe,
    FormatTimePipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStronglyTypedFormsModule,
    ModalModule,
    ToastrModule.forRoot(),
    SharedRoutingModule,
    FileUploadModule,
  ],
  // Consider not providing services in shared modules. Services are usually singletons that are provided once for the
  // entire application or in a particular feature module. There are exceptions, however. For example, in the sample
  // code that follows, notice that the SharedModule provides FilterTextService. This is acceptable here because the
  // service is stateless;that is, the consumers of the service aren't impacted by new instances.
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, // lol
      useClass: ErrorInterceptorService,
      multi: true
    },
    DataService,
    RouterExtService,
    SecurityService,
    ConfigurationService,
    StorageService,
  ],
    exports: [
        ReactiveFormsModule,
        FormsModule,
        ModalModule,
        PopUpComponent,
        PaginationComponent,
        TimelineComponent,
        KeyboardShortcutsComponent,
        MessageBtnComponent,
        SidebarColumnComponent,
        MainComponent,
        MessagesComponent,
        NotificationsComponent,
        ListsComponent,
        SettingsComponent,
        LeftArrowComponent,
        EnumToArrayPipe,
    ]
})
// Shared Module - to contain all common components, directives and pipes used by a lot of places
export class SharedModule {
}
