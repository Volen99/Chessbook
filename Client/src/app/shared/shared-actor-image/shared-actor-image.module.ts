import { NgModule } from '@angular/core';
import { SharedMainModule } from '../shared-main/shared-main.module';
import { ActorAvatarComponent } from './actor-avatar.component';

@NgModule({
  imports: [
    SharedMainModule,
  ],

  declarations: [
    ActorAvatarComponent
  ],

  exports: [
    ActorAvatarComponent
  ],

  providers: [ ]
})
export class SharedActorImageModule { }
