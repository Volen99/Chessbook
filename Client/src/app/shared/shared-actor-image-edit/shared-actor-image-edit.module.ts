import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {SharedActorImageModule} from '../shared-actor-image/shared-actor-image.module';
import {ActorAvatarEditComponent} from './actor-avatar-edit.component';
import {ActorBannerEditComponent} from './actor-banner-edit.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {SharedMainModule} from "../shared-main/shared-main.module";

@NgModule({
  imports: [
    CommonModule,

    SharedMainModule,
    SharedActorImageModule,
    FontAwesomeModule,
  ],

  declarations: [
    ActorAvatarEditComponent,
    ActorBannerEditComponent
  ],

  exports: [
    ActorAvatarEditComponent,
    ActorBannerEditComponent
  ],

  providers: []
})
export class SharedActorImageEditModule {
}
