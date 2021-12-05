import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatRippleModule} from "@angular/material/core";

import {
  MeasureConverterPipe,
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
} from './pipes';
import {
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
} from './layouts';
import { InitUserService } from './services/init-user.service';
import { DEFAULT_THEME } from './styles/theme.default';
import { COSMIC_THEME } from './styles/theme.cosmic';
import { CORPORATE_THEME } from './styles/theme.corporate';
import { DARK_THEME } from './styles/theme.dark';
import {MATERIAL_DARK_THEME} from "./styles/material/theme.material-dark";
import {MATERIAL_LIGHT_THEME} from "./styles/material/theme.material-light";
import {NbLayoutModule} from "../sharebook-nebular/theme/components/layout/layout.module";
import {NbMenuModule} from "../sharebook-nebular/theme/components/menu/menu.module";
import {NbUserModule} from "../sharebook-nebular/theme/components/user/user.module";
import {NbActionsModule} from "../sharebook-nebular/theme/components/actions/actions.module";
import {NbSidebarModule} from "../sharebook-nebular/theme/components/sidebar/sidebar.module";
import {NbContextMenuModule} from "../sharebook-nebular/theme/components/context-menu/context-menu.module";
import {NbSecurityModule} from "../sharebook-nebular/security/security.module";
import {NbButtonModule} from "../sharebook-nebular/theme/components/button/button.module";
import {NbSelectModule} from "../sharebook-nebular/theme/components/select/select.module";
import {NbSpinnerModule} from "../sharebook-nebular/theme/components/spinner/spinner.module";
import {NbEvaIconsModule} from "../sharebook-nebular/eva-icons/eva-icons.module";
import {NbSearchModule} from "../sharebook-nebular/theme/components/search/search.module";
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {SearchInputComponent} from "./components/search-input/search-input.component";
import {TinyMCEComponent} from "./components/tiny-mce/tiny-mce.component";
import {AuthModule} from "../auth/auth.module";
import {NbThemeModule} from "../sharebook-nebular/theme/theme.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {SharedModule} from "../shared/shared.module";
import {CameraButtonModule} from '../shared/camera-button/camera-button.module';


const NB_MODULES = [
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbSecurityModule,
  NbButtonModule,
  NbSelectModule,
  NbSpinnerModule,
  NbEvaIconsModule,
];
const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  SearchInputComponent,
  TinyMCEComponent,
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,


];
const PIPES = [
  CapitalizePipe,
  MeasureConverterPipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
];

@NgModule({
  imports: [CommonModule, MatRippleModule, AuthModule, ...NB_MODULES, FontAwesomeModule, SharedModule, CameraButtonModule],
  exports: [CommonModule, MatRippleModule, ...PIPES, ...COMPONENTS],
  declarations: [...COMPONENTS, ...PIPES],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
      providers: [
        ...NbThemeModule.forRoot(
          {
            name: 'default',
          },
          [ DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME, DARK_THEME, MATERIAL_LIGHT_THEME, MATERIAL_DARK_THEME ],
        ).providers,
        InitUserService,
      ],
    };
  }
}
