import {NgModule} from '@angular/core';
import {ResetPasswordRoutingModule} from './reset-password-routing.module';
import {ResetPasswordComponent} from './reset-password.component';
import {SharedMainModule} from "../shared/main/shared-main.module";
import {SharedFormModule} from "../shared/shared-forms/shared-form.module";

@NgModule({
  imports: [
    ResetPasswordRoutingModule,

    SharedMainModule,
    SharedFormModule
  ],

  declarations: [
    ResetPasswordComponent
  ],

  exports: [
    ResetPasswordComponent
  ],

  providers: []
})
export class ResetPasswordModule {
}
