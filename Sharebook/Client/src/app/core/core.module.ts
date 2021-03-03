import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommonMockModule} from "../core/mock/common/common-mock.module";
import {CommonBackendModule} from "../core/backend/common/common-backend.module";
import {AnalyticsService, LayoutService, PlayerService, StateService} from "../core/utils";
import {throwIfAlreadyLoaded} from "../core/module-import-guard";
import {UserStore} from "../core/stores/user.store";
import {UsersService} from "../core/backend/common/services/users.service";
import {InitUserService} from "../theme/services/init-user.service";
import {SettingsService} from "../core/backend/common/services/settings.service";
import {NbAuthModule} from "../sharebook-nebular/auth/auth.module";
import {RestService} from "../core/rest/rest.service";
import {RestExtractor} from "../core/rest/rest-extractor";
import {ScreenService} from "../core/wrappers/screen.service";
import {LocalStorageService, SessionStorageService} from "../core/wrappers/storage.service";
import {HooksService, PluginService} from "../core/plugins";
import {AuthService} from "../core/auth/auth.service";
import {HtmlRendererService} from "../core/renderer/html-renderer.service";
import {LinkifierService} from "../core/renderer/linkifier.service";
import {MarkdownService} from "../core/renderer/markdown.service";
import {ConfirmService} from "../core/confirm/confirm.service";
import {Notifier} from "../core/notification/notifier.service";
import {IotBackendModule} from "./backend/iot/iot-backend.module";

export const NB_CORE_PROVIDERS = [
  ...CommonMockModule.forRoot().providers,
  ...CommonBackendModule.forRoot().providers,

  // ...EcommerceMockModule.forRoot().providers,
  ...IotBackendModule.forRoot().providers,

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
  ],
  exports: [
    NbAuthModule,
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
      ],
    };
  }
}