import { NgModule, ModuleWithProviders } from '@angular/core';

import { NbSharedModule } from '../shared/shared.module';

import {
  NbSidebarComponent,
  NbSidebarFooterComponent,
  NbSidebarHeaderComponent,
} from './sidebar.component';

import { NbSidebarService } from './sidebar.service';
import {NbButtonModule} from "../button/button.module";
import {NbActionsModule} from "../actions/actions.module";
import {NbUserModule} from "../user/user.module";
import {NbContextMenuModule} from "../context-menu/context-menu.module";
import {SharedModule} from "../../../../shared/shared.module";
import {AuthModule} from "../../../../auth/auth.module";

const NB_SIDEBAR_COMPONENTS = [
  NbSidebarComponent,
  NbSidebarFooterComponent,
  NbSidebarHeaderComponent,
];

const NB_SIDEBAR_PROVIDERS = [
  NbSidebarService,
];

@NgModule({
  imports: [
    NbSharedModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    AuthModule,
    NbContextMenuModule,



    SharedModule,
  ],
  declarations: [
    ...NB_SIDEBAR_COMPONENTS,
  ],
  exports: [
    ...NB_SIDEBAR_COMPONENTS,
  ],
})
export class NbSidebarModule {
  static forRoot(): ModuleWithProviders<NbSidebarModule> {
    return {
      ngModule: NbSidebarModule,
      providers: [
        ...NB_SIDEBAR_PROVIDERS,
      ],
    };
  }
}
