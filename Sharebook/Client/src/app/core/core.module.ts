import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { NbAuthModule } from '@nebular/auth';

import { throwIfAlreadyLoaded } from './module-import-guard';
import {
  AnalyticsService,
  LayoutService,
  PlayerService,
  StateService,
} from './utils';

import { CommonBackendModule } from './backend/common/common-backend.module';
import { CommonMockModule } from './mock/common/common-mock.module';
import { EcommerceMockModule } from './mock/ecommerce/ecommerce-mock.module';
import { IotMockModule } from './mock/iot/iot-mock.module';
import { UserStore } from './stores/user.store';
import { UsersService } from './backend/common/services/users.service';
import { SettingsService } from './backend/common/services/settings.service';
import { InitUserService } from '../theme/services/init-user.service';
import {HooksService, PluginService} from "./plugins";
import {SharedGlobalIconModule} from "../shared/shared-icons/shared-global-icon.module";
import {RouterModule} from "@angular/router";
import {RestService} from "./rest/rest.service";
import {RestExtractor} from "./rest/rest-extractor";
import {ScreenService} from "./wrappers/screen.service";
import {LocalStorageService, SessionStorageService} from "./wrappers/storage.service";
import {HtmlRendererService} from "./renderer/html-renderer.service";
import {LinkifierService} from "./renderer/linkifier.service";
import {MarkdownService} from "./renderer/markdown.service";
import {ConfirmService} from "./confirm/confirm.service";
import {Notifier} from "./notification/notifier.service";
import {AuthService} from "./auth/auth.service";
import {PagesModule} from "./menu/pages.module";
import {MenuModule} from "./menu/core/menu.module";
import {PagesComponent} from "./menu/pages.component";
import {MenuInternalService, MenuService} from "./menu/core/menu.service";


export const NB_CORE_PROVIDERS = [
  ...CommonMockModule.forRoot().providers,
  ...CommonBackendModule.forRoot().providers,

  ...EcommerceMockModule.forRoot().providers,
  ...IotMockModule.forRoot().providers,

  AnalyticsService,
  LayoutService,
  PlayerService,
  StateService,
  RestService,
  RestExtractor,
  ScreenService,
  LocalStorageService,
  SessionStorageService,
];

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,

    PagesModule,
    SharedGlobalIconModule,
  ],
  exports: [
    NbAuthModule,
    PagesComponent,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
        UserStore,
        UsersService,
        InitUserService,
        SettingsService,
        PluginService,
        HooksService,
        AuthService,

        HtmlRendererService,
        LinkifierService,
        MarkdownService,

        ConfirmService,
        Notifier,

        MenuInternalService,
        MenuService,
      ],
    };
  }
}
