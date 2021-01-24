import { NgModule } from '@angular/core';

import { SharedMainModule } from '../shared/shared-main';
import { LoggedOutHomeRoutingModule } from './logged-out-home-routing.module';
import { SharedGlobalIconModule } from '../shared/shared-icons/shared-global-icon.module';
import { SharedFormModule } from '../shared/shared-forms/shared-form.module';
import { LoggedOutHomeComponent } from './logged-out-home.component';
import { RegisterModule } from '../signup/register/register.module';

@NgModule({
  imports: [
    LoggedOutHomeRoutingModule,

    SharedMainModule,
    SharedFormModule,
    SharedGlobalIconModule,
  ],

  declarations: [
    LoggedOutHomeComponent,
  ],

  exports: [
  ],

  providers: []
})
export class LoggedOutHomeModule {
}
