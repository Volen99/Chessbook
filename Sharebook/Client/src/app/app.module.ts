import {Injector, NgModule} from '@angular/core';
import {MatDialogModule} from "@angular/material/dialog";

import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {HistoryModule} from './components/history/history.module';
import {KidsModule} from './components/kids/kids.module';
import {ScienceModule} from './components/science/science.module';
import {ProfileModule} from './components/profile/profile.module';
import {TwitterClient} from "./sharebook/TwitterClient";
import {RawExecutors} from "./sharebook/Client/RawExecutors";
import {UploadClient} from "./sharebook/Client/Clients/UploadClient";
import {ParametersValidator} from "./core/Core/Client/Validators/ParametersValidator";
import {AuthClient} from "./sharebook/Client/Clients/AuthClient";
import {AccountSettingsClient} from "./sharebook/Client/Clients/AccountSettingsClient";
import {ExecuteClient} from "./sharebook/Client/Clients/ExecuteClient";
import {HelpClient} from "./sharebook/Client/Clients/HelpClient";
import {ListsClient} from "./sharebook/Client/Clients/ListsClient";
import {MessagesClient} from "./sharebook/Client/Clients/MessagesClient";
import {RateLimitsClient} from "./sharebook/Client/Clients/RateLimitsClient";
import {SearchClient} from "./sharebook/Client/Clients/SearchClient";
import {TimelinesClient} from "./sharebook/Client/Clients/TimelinesClient";
import {TrendsClient} from "./sharebook/Client/Clients/TrendsClient";
import {TweetsClient} from "./sharebook/Client/Clients/TweetsClient";
import {UsersClient} from "./sharebook/Client/Clients/UsersClient";
import {AccountActivityClient} from "./sharebook/Client/Clients/AccountActivityClient";
import {setAppInjector} from "./sharebook/Injectinvi/app-injector";
import {FileUploadModule} from "./global-modules/upload/file-upload.module";

// NgModuleS help organize an application into cohesive blocks of functionality.
// The @NgModule tells Angular how to compile and launch the app
@NgModule({
  declarations: [ // Only declarables – (components, directives and pipes)
    AppComponent,
  ],
  // The module's imports array appears exclusively in the @NgModule metadata object. It tells Angular
  // about other NgModules that this particular module needs to function properly.
  imports: [     // Only @NgModule classes – integrated (HttpClientModule, BrowserModule) or custom made
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HistoryModule,
    ScienceModule,
    KidsModule,
    ProfileModule,
    FileUploadModule,
    MatDialogModule,
  ],
  providers: [TwitterClient, RawExecutors, UploadClient, ParametersValidator, AuthClient, AccountSettingsClient,
    ExecuteClient, HelpClient, ListsClient, MessagesClient, RateLimitsClient, SearchClient, TimelinesClient,
    TrendsClient, TweetsClient, UploadClient, UsersClient, AccountActivityClient],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    setAppInjector(injector);
  }
}
