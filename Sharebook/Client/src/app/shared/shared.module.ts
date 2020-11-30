import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgxStronglyTypedFormsModule} from 'ngx-strongly-typed-forms';
import {ModalModule} from 'angular-custom-modal';
import {PopUpComponent} from './pop-up/pop-up.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InterceptorService} from './services/interceptor.service';
import {RouterExtService} from './services/rouer-ext.service';
import {ToastrModule} from 'ngx-toastr';
import {ErrorInterceptorService} from './services/error-interceptor.service';
import {NavbarComponent} from './navbar/navbar.component';
import {HomeComponent} from './components/home/home.component';
import {SharedRoutingModule} from './shared-routing.module';
import {PaginationComponent} from './components/pagination/pagination.component';
import {StoreModule} from '@ngrx/store';
import {sharedReducers} from './shared.reducers';

import {Identity} from './components/identity/identity';
import {ConfigurationService} from './services/configuration.service';
import {SecurityService} from './services/security.service';
import {StorageService} from './services/storage.service';
import {DataService} from './services/data.service';
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import { UploadComponent } from './components/upload/upload.component';
import { WhoCanReplyComponent } from './components/upload/who-can-reply/who-can-reply.component';
import {FileUploadModule} from "../global-modules/upload/file-upload.module";
import { InsertedMediaComponent } from './components/upload/inserted-media/inserted-media.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { UploadHeaderComponent } from './components/upload/header/upload-header.component';
import { ShareButtonComponent } from './components/share-button/share-button.component';
import { SingleInsertedMediaComponent } from './components/upload/inserted-media/single-inserted-media/single-inserted-media.component';
import {MediaSplitDirective} from "./components/upload/inserted-media/media-split.directive";
import { KeyboardShortcutsComponent } from './components/keyboard-shortcuts/keyboard-shortcuts.component';
import { NavLeftComponent } from './components/nav-layers/nav-left/nav-left.component';
import { MessageBtnComponent } from './components/message-btn/message-btn.component';
import { SidebarColumnComponent } from './components/sidebar-column/sidebar-column.component';
import { MainComponent } from './components/main/main.component';
import { TrendsComponent } from './components/sidebar-column/trends/trends.component';
import { WhoToFollowComponent } from './components/sidebar-column/who-to-follow/who-to-follow.component';
import { SearchComponent } from './components/sidebar-column/search/search.component';

@NgModule({
  declarations: [
    Identity,
    PopUpComponent,
    NavbarComponent,
    HomeComponent,
    PaginationComponent,
    PageNotFoundComponent,
    UploadComponent,
    WhoCanReplyComponent,
    InsertedMediaComponent,
    TimelineComponent,
    UploadHeaderComponent,
    ShareButtonComponent,
    SingleInsertedMediaComponent,
    MediaSplitDirective,
    KeyboardShortcutsComponent,
    NavLeftComponent,
    MessageBtnComponent,
    SidebarColumnComponent,
    MainComponent,
    TrendsComponent,
    WhoToFollowComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forRoot(sharedReducers),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStronglyTypedFormsModule,
    ModalModule,
    ToastrModule.forRoot(),
    SharedRoutingModule,
    FileUploadModule,
  ],
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
    Identity,
    PopUpComponent,
    NavbarComponent,
    PaginationComponent,
    PageNotFoundComponent,
    TimelineComponent,
    ShareButtonComponent,
    KeyboardShortcutsComponent,
    MessageBtnComponent,
    NavLeftComponent,
    SidebarColumnComponent,
    MainComponent,
  ]
})
export class SharedModule {
}
