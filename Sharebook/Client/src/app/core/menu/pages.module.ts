import { NgModule } from '@angular/core';

import { PagesMenu } from './pages-menu';
import {MenuModule} from "./core/menu.module";
import {PagesComponent} from "./pages.component";
import {MenuInternalService} from "./core/menu.service";

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    MenuModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
  providers: [
    PagesMenu,
  ],
  exports: [
    PagesComponent,
  ]
})
export class PagesModule {
}
