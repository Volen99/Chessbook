import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgxStronglyTypedFormsModule} from 'ngx-strongly-typed-forms';
import {ModalModule} from 'angular-custom-modal';
import {PopUpComponent} from '../../components/shared/pop-up/pop-up.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InterceptorService} from './services/interceptor.service';
import {RouterExtService} from './services/rouer-ext.service';
import {ToastrModule} from 'ngx-toastr';
import {ErrorInterceptorService} from './services/error-interceptor.service';
import {NavbarComponent} from '../../components/shared/navbar/navbar.component';
import {HomeComponent} from '../../components/shared/home/home.component';
import {SharedRoutingModule} from './shared-routing.module';
import {PaginationComponent} from '../../components/shared/pagination/pagination.component';
import {StoreModule} from '@ngrx/store';
import {coursesReducer} from '../../store/courses/reducers/courses.reducer';
import {postsReducer} from '../../store/posts/reducers/posts.reducer';
import {sharedReducers} from './shared.reducers';

import {CurrentUserService} from './services/current-user.service';
import {LoginMenuComponent} from '../../components/shared/navbar/login-menu/login-menu.component';
import {Identity} from '../../components/shared/identity/identity';
import {ConfigurationService} from './services/configuration.service';
import {SecurityService} from './services/security.service';
import {StorageService} from './services/storage.service';
import {DataService} from './services/data.service';

@NgModule({
  declarations: [
    Identity,
    PopUpComponent,
    LoginMenuComponent,
    NavbarComponent,
    HomeComponent,
    PaginationComponent,
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
    CurrentUserService,
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
    LoginMenuComponent,
    NavbarComponent,
    PaginationComponent,
  ]
})
export class SharedModule {
}
