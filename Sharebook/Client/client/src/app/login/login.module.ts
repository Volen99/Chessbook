import { NgModule } from '@angular/core';
import { SharedMainModule } from '../shared/shared-main';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { SharedGlobalIconModule } from '../shared/shared-icons/shared-global-icon.module';
import { SharedFormModule } from '../shared/shared-forms/shared-form.module';
import { SharedInstanceModule } from '../shared/shared-instance/shared-instance.module';

@NgModule({
  imports: [
    LoginRoutingModule,

    SharedMainModule,
    SharedFormModule,
    SharedGlobalIconModule,

    SharedInstanceModule
  ],

  declarations: [
    LoginComponent
  ],

  exports: [
    LoginComponent
  ],

  providers: []
})
export class LoginModule {
}
