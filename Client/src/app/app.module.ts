import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {APP_INITIALIZER, Injector, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {SWIPER_CONFIG, SwiperConfigInterface, SwiperModule} from 'ngx-swiper-wrapper';          // TODO: lazy load them!!! aaaaaaaaaaaaaaaa

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ThemeModule} from './theme/theme.module';
import {AuthModule} from './auth/auth.module';
import {EmptyComponent} from "./empty.component";
import {SharedMainModule} from "./shared/shared-main/shared-main.module";
import {SharedModule} from "./shared/shared.module";
import {SharedFormModule} from "./shared/shared-forms/shared-form.module";
import {NbSidebarModule} from "./sharebook-nebular/theme/components/sidebar/sidebar.module";
import {NbMenuModule} from "./sharebook-nebular/theme/components/menu/menu.module";
import {NbDatepickerModule} from "./sharebook-nebular/theme/components/datepicker/datepicker.module";
import {NbDialogModule} from "./sharebook-nebular/theme/components/dialog/dialog.module";
import {NbToastrModule} from "./sharebook-nebular/theme/components/toastr/toastr.module";
import {CoreModule} from "./core/core.module";
import {PagesMenu} from "./pages/pages-menu";
import {ModalOverlaysModule} from "./pages/modal-overlays/modal-overlays.module";
import {LoggedOutHomeComponent} from "./logged-out-home/logged-out-home.component";
import {setAppInjector} from "./app-injector";
import {MediaModalComponent} from './features/media-modal/media-modal.component';
import {ModalRootComponent} from './features/modal-root/modal-root.component';
import {ImageLoaderComponent} from './features/image-loader/image-loader.component';
import {ZoomableImageComponent} from './features/zoomable-image/zoomable-image.component';
import {MediaContainerComponent} from './features/media-container/media-container.component';
import {NotFoundComponent} from "./pages/page-not-found/not-found.component";
import {NbCardModule} from "./sharebook-nebular/theme/components/card/card.module";
import {NbButtonModule} from "./sharebook-nebular/theme/components/button/button.module";
import {ServerService} from "./core/server/server.service";
import {PluginService} from "./core/plugins";

// registerLocaleData(localeOc, 'oc')

export function loadConfigFactory(server: ServerService, pluginService: PluginService) {
  return () => {
    // const result = server.loadHTMLConfig();
    //
    // if (result) return result.pipe(tap(() => pluginService.initializePlugins()));

    return pluginService.initializePlugins();
  };
}

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = { // TODO: lazy load them!!! aaaaaaaaaaaaaaaa
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    AppComponent,
    LoggedOutHomeComponent,
    EmptyComponent,
    MediaModalComponent,
    ModalRootComponent,
    ImageLoaderComponent,
    ZoomableImageComponent,
    MediaContainerComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    HttpClientModule,
    SharedFormModule,

    AuthModule.forRoot(),

    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    // NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),

    ModalOverlaysModule,

    SharedModule,
    SharedMainModule,

    ThemeModule,
    NbMenuModule,

    NgbModule,
    FontAwesomeModule,

    SwiperModule,
    NbCardModule,
    NbButtonModule,

    AppRoutingModule, // Put it after all the module because it has the 4õ4 route
  ],
  bootstrap: [AppComponent],
  providers: [PagesMenu, {
    provide: SWIPER_CONFIG,
    useValue: DEFAULT_SWIPER_CONFIG, // TODO: lazy load them!!! aaaaaaaaaaaaaaaa
  },
    // {provide: OverlayContainer}, // https://github.com/akveo/nebular/issues/1663
  ],
  exports: []
})
export class AppModule {
  constructor(injector: Injector) {
    setAppInjector(injector);
  }
}
