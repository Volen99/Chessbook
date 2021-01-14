import { NgModule } from '@angular/core';
import { SharedMainModule } from '../shared-main/shared-main.module';
import { LiveDocumentationLinkComponent } from './live-documentation-link.component';
import { LiveStreamInformationComponent } from './live-stream-information.component';
import { LiveVideoService } from './live-video.service';
import { SharedFormModule } from '../shared-forms/shared-form.module';
import { SharedGlobalIconModule } from '../shared-icons/shared-global-icon.module';

@NgModule({
  imports: [
    SharedMainModule,
    SharedFormModule,
    SharedGlobalIconModule
  ],

  declarations: [
    LiveStreamInformationComponent,
    LiveDocumentationLinkComponent
  ],

  exports: [
    LiveStreamInformationComponent,
    LiveDocumentationLinkComponent
  ],

  providers: [
    LiveVideoService
  ]
})
export class SharedVideoLiveModule {
}
