import { NgModule } from '@angular/core';

import { LoggedOutHomeRoutingModule } from './logged-out-home-routing.module';
import { LoggedOutHomeComponent } from './logged-out-home.component';

@NgModule({
  imports: [
    LoggedOutHomeRoutingModule,

    // SharedMainModule,
    // SharedFormModule,
    // SharedGlobalIconModule,
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
