import {Injector, NgModule} from '@angular/core';
import {APP_BASE_HREF, registerLocaleData} from "@angular/common";
import localeOc from '../app/helpers/locales/oc';

import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {setAppInjector} from "./sharebook/Injectinvi/app-injector";
import {CoreModule} from "./core/core.module";
import {environment} from "../environments/environment";
import {StoreDevtools, StoreDevtoolsModule} from "@ngrx/store-devtools";
import {EmptyComponent} from "./empty.component";
import {QuickSettingsModalComponent} from "./modal/quick-settings-modal.component";
import {CustomModalComponent} from "./modal/custom-modal.component";
import {WelcomeModalComponent} from "./modal/welcome-modal.component";
import {InstanceConfigWarningModalComponent} from "./modal/instance-config-warning-modal.component";
import {ConfirmComponent} from "./modal/confirm.component";
import {ServerService} from "./core/server";
import {MetaLoader, MetaModule, MetaStaticLoader, PageTitlePositioning} from "@ngx-meta/core";
import {SharedInstanceModule} from "./shared/shared-instance/shared-instance.module";
import {SharedGlobalIconModule} from "./shared/shared-icons/shared-global-icon.module";
import {SharedMainModule} from "./shared/main/shared-main.module";
import {SharedFormModule} from "./shared/shared-forms/shared-form.module";
import {SharedUserInterfaceSettingsModule} from "./shared/user-settings";

registerLocaleData(localeOc, 'oc');

// NgModuleS help organize an application into cohesive blocks of functionality.
// The @NgModule tells Angular how to compile and launch the app
@NgModule({
  bootstrap: [AppComponent],

  declarations: [ // Declares which components, directives, and pipes belong to the module
    AppComponent,
    EmptyComponent,

    // MenuComponent,
    // LanguageChooserComponent,
    QuickSettingsModalComponent,
    // NotificationComponent,
    // HeaderComponent,
    // SearchTypeaheadComponent,
    // SuggestionComponent,
    // HighlightPipe,

    CustomModalComponent,
    WelcomeModalComponent,
    InstanceConfigWarningModalComponent,
    ConfirmComponent
  ],
  // Imports other modules with the components, directives, and pipes that components in the current module need
  // The module's imports array appears exclusively in the @NgModule metadata object. It tells Angular
  // about other NgModules that this particular module needs to function properly.
  imports: [     // Only @NgModule classes – integrated (HttpClientModule, BrowserModule) or custom made
    BrowserModule,

    CoreModule,
    SharedModule,
    SharedMainModule,
    SharedFormModule,
    SharedUserInterfaceSettingsModule,
    SharedGlobalIconModule,
    SharedInstanceModule,

    // MetaModule.forRoot({
    //   provide: MetaLoader,
    //   useFactory: (serverService: ServerService) => {
    //     return new MetaStaticLoader({
    //       pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
    //       pageTitleSeparator: ' - ',
    //       get applicationName() {
    //         return serverService.getTmpConfig().instance.name;
    //       },
    //       defaults: {
    //         get title() {
    //           return serverService.getTmpConfig().instance.name;
    //         },
    //         get description() {
    //           return serverService.getTmpConfig().instance.shortDescription;
    //         }
    //       }
    //     });
    //   },
    //   deps: [ServerService]
    // }),

    AppRoutingModule // Put it after all the module because it has the 404 route
  ],
  // Provides services that other application components can use
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '/',
    }
  ]
})

export class AppModule {
  constructor(injector: Injector) {
    setAppInjector(injector);
  }
}
