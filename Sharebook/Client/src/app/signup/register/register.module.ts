import { CdkStepperModule } from '@angular/cdk/stepper';
import { NgModule } from '@angular/core';
import { SignupSharedModule } from '../../signup/shared/signup-shared.module';
import { CustomStepperComponent } from './custom-stepper.component';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterStepChannelComponent } from './register-step-channel.component';
import { RegisterComponent } from './register.component';
import { SharedInstanceModule } from '../../shared/shared-instance/shared-instance.module';
import { AccountModalComponent } from './#1-account-modal/account-modal.component';
import { CustomizeExperienceComponent } from './#2-customize-experience-modal/customize-experience.component';
import { CreateYourAccountComponent } from './#3-create-your-account-modal/create-your-account.component';
import { EmailVerificationCodeComponent } from './#4-email-verification-code-modal/email-verification-code.component';
import { PasswordComponent } from './#5-password-modal/password.component';
import { ProfilePictureComponent } from './#6-profile-picture-modal/profile-picture.component';
import { DescriptionComponent } from './#7-description-modal/description.component';
import { InterestsComponent } from './#8-interests-modal/interests.component';
import { SuggestionsForYouToFollowComponent } from './#9-suggestions-for-you-to-follow-modal/suggestions-for-you-to-follow.component';

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
    CustomizeExperienceComponent,
    CreateYourAccountComponent,
    EmailVerificationCodeComponent,
    PasswordComponent,
    ProfilePictureComponent,
    DescriptionComponent,
    InterestsComponent,
    SuggestionsForYouToFollowComponent,

    CustomStepperComponent,
    RegisterStepChannelComponent,
  ],

  exports: [
    RegisterComponent
  ],

  providers: []
})
export class RegisterModule {
}
