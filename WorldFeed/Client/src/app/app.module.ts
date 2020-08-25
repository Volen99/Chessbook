import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './core/shared-core/shared.module';
import {HistoryModule} from './components/history/history.module';
import {AuthenticationModule} from './components/authentication/authentication.module';
import {KidsModule} from './components/kids/kids.module';
import {ScienceModule} from './components/science/science.module';
import {ProfileModule} from './components/profile/profile.module';

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
    HistoryModule,
    ScienceModule,
    KidsModule,
    ProfileModule,
  ],
  providers: [], // Register service providers and inject them into components
  bootstrap: [AppComponent]
})
export class AppModule {
}
