import { NgModule } from '@angular/core';
import { SharedMainModule } from '../shared-main/shared-main.module';
import { UserInterfaceSettingsComponent } from './user-interface-settings.component';
import { UserVideoSettingsComponent } from './user-video-settings.component';
import { SharedFormModule } from '@app/shared/shared-forms/shared-form.module';

@NgModule({
  imports: [
    SharedMainModule,
    SharedFormModule,
  ],

  declarations: [
    UserInterfaceSettingsComponent,
    UserVideoSettingsComponent,
  ],

  exports: [
    UserInterfaceSettingsComponent,
    UserVideoSettingsComponent,
  ],

  providers: []
})
export class SharedUserInterfaceSettingsModule {
}
