import { NgModule } from '@angular/core';
import {AppComponent} from './app.component';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HistoryModule} from './history/history.module';

// NgModuleS help organize an application into cohesive blocks of functionality.
// The @NgModule tells Angular how to compile and launch the app
@NgModule({
  declarations: [ // Only declarables – (components, directives and pipes)
    AppComponent,
  ],
  imports: [     // Only @NgModule classes – integrated (HttpClientModule, BrowserModule) or custom made
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AuthenticationModule,
    FormsModule,
    HistoryModule,
  ],
  providers: [], // Register service providers and inject them into components
  bootstrap: [AppComponent]
})
export class AppModule { }
