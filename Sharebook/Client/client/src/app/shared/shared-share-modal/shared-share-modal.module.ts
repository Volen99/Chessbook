import { QRCodeModule } from 'angularx-qrcode';
import { NgModule } from '@angular/core';
import { SharedMainModule } from '../shared-main/shared-main.module';
import { VideoShareComponent } from './video-share.component';
import { SharedGlobalIconModule } from '../shared-icons/shared-global-icon.module';
import { SharedFormModule } from '../shared-forms/shared-form.module';

@NgModule({
  imports: [
    QRCodeModule,

    SharedMainModule,
    SharedFormModule,
    SharedGlobalIconModule
  ],

  declarations: [
    VideoShareComponent
  ],

  exports: [
    VideoShareComponent
  ],

  providers: []
})
export class SharedShareModal {
}
