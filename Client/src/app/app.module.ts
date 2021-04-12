import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './theme/theme.module';
import { AuthModule } from './auth/auth.module';

import {EmptyComponent} from "./empty.component";
import {SharedMainModule} from "./shared/shared-main/shared-main.module";
import {SharedGlobalIconModule} from "./shared/shared-icons/shared-global-icon.module";
import {SharedModule} from "./shared/shared.module";
import {SharedFormModule} from "./shared/forms/shared-form.module";
import {NbSidebarModule} from "./sharebook-nebular/theme/components/sidebar/sidebar.module";
import {NbMenuModule} from "./sharebook-nebular/theme/components/menu/menu.module";
import {NbDatepickerModule} from "./sharebook-nebular/theme/components/datepicker/datepicker.module";
import {NbDialogModule} from "./sharebook-nebular/theme/components/dialog/dialog.module";
import {NbWindowModule} from "./sharebook-nebular/theme/components/window/window.module";
import {NbToastrModule} from "./sharebook-nebular/theme/components/toastr/toastr.module";
import {NbChatModule} from "./sharebook-nebular/theme/components/chat/chat.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CoreModule} from "./core/core.module";
import {PagesMenu} from "./pages/pages-menu";
import {ModalOverlaysModule} from "./pages/modal-overlays/modal-overlays.module";
import {NotificationComponent} from "./pages/notification.component";

@NgModule({
  declarations: [
    AppComponent,
    EmptyComponent,

    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    HttpClientModule,
    AppRoutingModule,
    SharedFormModule,
    SharedGlobalIconModule, // not used in appModule?!


    AuthModule.forRoot(),

    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),


    ModalOverlaysModule,

    SharedModule,
    SharedMainModule,

    ThemeModule,
    NbMenuModule,

    NgbModule,
  ],
  bootstrap: [AppComponent],
  providers: [PagesMenu],
  exports: [
  ]
})
export class AppModule {
}
