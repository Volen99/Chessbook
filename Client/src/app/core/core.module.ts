import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessageService} from 'primeng/api';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

import {CommonMockModule} from "./mock/common/common-mock.module";
import {CommonBackendModule} from "./backend/common/common-backend.module";
import {LayoutService, StateService} from "./utils";
import {throwIfAlreadyLoaded} from "./module-import-guard";
import {UserStore} from "./stores/user.store";
import {UsersService} from "./backend/common/services/users.service";
import {InitUserService} from "../theme/services/init-user.service";
import {SettingsService} from "./backend/common/services/settings.service";
import {NbAuthModule} from "../sharebook-nebular/auth/auth.module";
import {RestService} from "./rest/rest.service";
import {RestExtractor} from "./rest/rest-extractor";
import {ScreenService} from "./wrappers/screen.service";
import {LocalStorageService, SessionStorageService} from "./wrappers/storage.service";
import {HooksService, PluginService} from "./plugins";
import {HtmlRendererService} from "./renderer/html-renderer.service";
import {LinkifierService} from "./renderer/linkifier.service";
import {MarkdownService} from "./renderer/markdown.service";
import {ConfirmService} from "./confirm/confirm.service";
import {Notifier} from "./notification/notifier.service";
import {IotBackendModule} from "./backend/iot/iot-backend.module";
import {PeerTubeSocket} from "./notification/sharebook-socket.service";
import {ServerService} from "./server/server.service";
import {RedirectService} from "./routing/redirect.service";
import {MetaService} from "./routing/meta.service";
import {MetaGuard} from "./routing/meta-guard.service";
import {HotkeyModule} from "angular2-hotkeys";
import {ServerConfigResolver} from "./routing/server-config-resolver.service";
import {UserRightGuard} from "./routing/user-right-guard.service";

export const NB_CORE_PROVIDERS = [
  ...CommonMockModule.forRoot().providers,
  ...CommonBackendModule.forRoot().providers,

  // ...EcommerceMockModule.forRoot().providers,
  ...IotBackendModule.forRoot().providers,

  LayoutService,
  StateService,
  RestService,
  RestExtractor,
  ScreenService,
  LocalStorageService,
  SessionStorageService,
  ServerConfigResolver,
];

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,

    HotkeyModule.forRoot({
      cheatSheetCloseEsc: true,
    })
  ],
  declarations: [],
  exports: [
    NbAuthModule,
    // KeyboardShortcutsComponent, // You don't use it here, coz you can't import 2 Core Modules :(
  ],
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


        ServerService,
        PluginService,
        HooksService,

        HtmlRendererService,
        LinkifierService,
        MarkdownService,

        ConfirmService,
        MessageService,
        RedirectService,
        Notifier,
        PeerTubeSocket,

        MetaService,
        MetaGuard,

        UserRightGuard,
      ],
    };
  }
}
