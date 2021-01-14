import { NgModule } from '@angular/core';

import { SharedMainModule } from '../../shared/shared-main';
import { DisplayComponent } from './display.component';
import { DisplayRoutingModule } from './display-routing-module';
import { SharedGlobalIconModule } from '../../shared/shared-icons/shared-global-icon.module';

@NgModule({
  declarations: [
    DisplayComponent,
  ],
  imports: [
    SharedMainModule,

    DisplayRoutingModule,
    SharedGlobalIconModule,
  ]
})
export class DisplayModule {
}
