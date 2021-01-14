import { ChartModule } from 'primeng/chart';
import { NgModule } from '@angular/core';
import { SharedMainModule } from '../../shared/shared-main';
import { MyVideoChannelCreateComponent } from './my-video-channel-create.component';
import { MyVideoChannelUpdateComponent } from './my-video-channel-update.component';
import { MyVideoChannelsRoutingModule } from './my-video-channels-routing.module';
import { MyVideoChannelsComponent } from './my-video-channels.component';
import { SharedGlobalIconModule } from '../../shared/shared-icons/shared-global-icon.module';
import { SharedFormModule } from '../../shared/shared-forms/shared-form.module';

@NgModule({
  imports: [
    MyVideoChannelsRoutingModule,

    ChartModule,

    SharedMainModule,
    SharedFormModule,
    SharedGlobalIconModule
  ],

  declarations: [
    MyVideoChannelsComponent,
    MyVideoChannelCreateComponent,
    MyVideoChannelUpdateComponent
  ],

  exports: [],
  providers: []
})
export class MyVideoChannelsModule {
}
