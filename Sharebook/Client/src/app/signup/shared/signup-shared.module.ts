import {NgModule} from '@angular/core';
import {SignupSuccessComponent} from './signup-success.component';
import {SharedMainModule} from "../../shared/main/shared-main.module";
import {SharedFormModule} from "../../shared/shared-forms/shared-form.module";
import {SharedGlobalIconModule} from "../../shared/shared-icons/shared-global-icon.module";

@NgModule({
  imports: [
    SharedMainModule,
    SharedFormModule,
    SharedGlobalIconModule
  ],

  declarations: [
    SignupSuccessComponent
  ],

  exports: [
    SharedMainModule,
    SharedFormModule,
    SharedGlobalIconModule,

    SignupSuccessComponent
  ],

  providers: []
})
export class SignupSharedModule {
}
