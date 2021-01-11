import {NgModule} from '@angular/core';
import {UserInterfaceSettingsComponent} from './user-interface-settings.component';
import {UserVideoSettingsComponent} from './user-video-settings.component';
import {SharedMainModule} from "../main/shared-main.module";
import {SharedFormModule} from "../shared-forms/shared-form.module";

@NgModule({
  imports: [
    SharedMainModule,
    SharedFormModule
  ],

  declarations: [
    UserInterfaceSettingsComponent,
    UserVideoSettingsComponent
  ],

  exports: [
    UserInterfaceSettingsComponent,
    UserVideoSettingsComponent
  ],

  providers: []
})
export class SharedUserInterfaceSettingsModule {
}
