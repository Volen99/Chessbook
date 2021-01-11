import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavLeftComponent} from "./nav-layers/nav-left/nav-left.component";
import {RouterModule} from "@angular/router";
import {ShareButtonComponent} from "./nav-layers/nav-left/share-button/share-button.component";
import {throwIfAlreadyLoaded} from "./module-import-guard";
import {AuthService} from "./auth/auth.service";
import {ScopedTokensService} from "./scoped-tokens/scoped-tokens.service";
import {ConfirmService} from "./confirm/confirm.service";
import {ServerService} from "./server";
import {ThemeService} from "./theme";
import {MenuService} from "./menu";
import {LoginGuard} from "./routing/login-guard.service";
import {UserRightGuard} from "./routing/user-right-guard.service";
import {UnloggedGuard} from "./routing/unlogged-guard.service";
import {HooksService, PluginService} from "./plugins";
import {HtmlRendererService} from "./renderer/html-renderer.service";
import {LinkifierService} from "./renderer/linkifier.service";
import {MarkdownService} from "./renderer/markdown.service";
import {RestExtractor} from "./rest/rest-extractor.service";
import {RestService} from "./rest/rest.service";
import {ScreenService} from "./wrappers/screen.service";
import {LocalStorageService, SessionStorageService} from "./wrappers/storage.service";
import {RedirectService} from "./routing/redirect.service";
import {Notifier} from "./notification/notifier-service";
import {MessageService} from "primeng/api";
import {PeerTubeSocket} from "./notification/sharebook-socket.service";
import {ServerConfigResolver} from "./routing/server-config-resolver.service";
import {CanDeactivateGuard} from "./routing/can-deactivate-guard.service";
import {UserService} from "./users/user.service";
import {LoadingBarModule} from "@ngx-loading-bar/core";
import {ToastModule} from "primeng/toast";
import {CheatSheetComponent} from "./hotkeys/hotkeys.component";
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HotkeyModule} from "angular2-hotkeys";
import {LoadingBarRouterModule} from "@ngx-loading-bar/router";

// Everything that will ONLY be used in app.component.html!!!
@NgModule({
  declarations: [
    NavLeftComponent,
    ShareButtonComponent,
    CheatSheetComponent,
  ],
  imports: [
    CommonModule,
    RouterModule, // Nadmenia: Here I put only "RouterModule" without using .forRoot - why? Coz, in this core Module I don't
    // want to have those services that comes from RouterModule, if I had them and use them, lets say in NavLeftComponenet,
    // after injecting it, it would have been a DIFFERENT one, in the one we use in app.component

    BrowserAnimationsModule,

    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    LoadingBarModule,
    ToastModule,

    HotkeyModule.forRoot({
      cheatSheetCloseEsc: true
    })
  ],
  exports: [
    NavLeftComponent,
    ShareButtonComponent,

    LoadingBarHttpClientModule,
    LoadingBarModule,

    ToastModule,

    NavLeftComponent,
    ShareButtonComponent,
    CheatSheetComponent,
  ],
  providers: [
    AuthService,
    ScopedTokensService,
    ConfirmService,
    ServerService,
    ThemeService,
    MenuService,
    LoginGuard,
    UserRightGuard,
    UnloggedGuard,

    PluginService,
    HooksService,

    HtmlRendererService,
    LinkifierService,
    MarkdownService,

    RestExtractor,
    RestService,

    UserService,

    ScreenService,
    LocalStorageService,
    SessionStorageService,

    RedirectService,
    Notifier,
    MessageService,
    PeerTubeSocket,
    ServerConfigResolver,
    CanDeactivateGuard,
  ]
})
// to contain singleton services and components needed only once in the application
export class CoreModule {
  // @Optional says that the thing we will inject, is not mandatory to be there
  // @SkipSelf skips the current injector and goes one level up
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
