import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './theme/theme.module';
import { AuthModule } from './auth/auth.module';

import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import {EmptyComponent} from "./empty.component";
import {SharedMainModule} from "./shared/shared-main/shared-main.module";
import {SharedGlobalIconModule} from "./shared/shared-icons/shared-global-icon.module";
import {SharedModule} from "./shared/shared.module";
import {ComposeModule} from "./compose/compose.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {SharedFormModule} from "./shared/forms/shared-form.module";
import {PagesModule} from "./core/menu/pages.module";

@NgModule({
  declarations: [
      AppComponent,
      EmptyComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    HttpClientModule,
    AppRoutingModule,
    SharedFormModule,
    SharedGlobalIconModule, // not used in appModule?!

    AuthModule.forRoot(),
    //
    // NbSidebarModule.forRoot(),
    // NbMenuModule.forRoot(),
    // NbDatepickerModule.forRoot(),
    // NbDialogModule.forRoot(),
    // NbWindowModule.forRoot(),
    // NbToastrModule.forRoot(),
    // NbChatModule.forRoot({
    //   messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    // }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),

    SharedModule,
    SharedMainModule,
    ComposeModule,
    // NgbModule,
  ],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {
}
