import { CdkStepperModule } from '@angular/cdk/stepper';
import { NgModule } from '@angular/core';
import { SignupSharedModule } from '../../signup/shared/signup-shared.module';
import { CustomStepperComponent } from './custom-stepper.component';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterStepChannelComponent } from './register-step-channel.component';
import { RegisterStepTermsComponent } from './register-step-terms.component';
import { RegisterStepUserComponent } from './register-step-user.component';
import { RegisterComponent } from './register.component';
import { SharedInstanceModule } from '../../shared/shared-instance/shared-instance.module';
import { AccountModalComponent } from './#1-account-modal/account-modal.component';
/*import { FormDirective } from '../../shared/shared-main/angular/form.directive';*/

@NgModule({
  imports: [
    RegisterRoutingModule,

    CdkStepperModule,

    SignupSharedModule,

    SharedInstanceModule
  ],

  declarations: [
    RegisterComponent,
    AccountModalComponent,

    CustomStepperComponent,
    RegisterStepChannelComponent,
    RegisterStepTermsComponent,
    RegisterStepUserComponent,
    /*FormDirective*/
  ],

  exports: [
    RegisterComponent
  ],

  providers: []
})
export class RegisterModule {
}
