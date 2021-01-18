import { NgModule } from '@angular/core';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password.component';
import { SharedMainModule } from '../shared/shared-main';
import { SharedFormModule } from '../shared/shared-forms/shared-form.module';

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
