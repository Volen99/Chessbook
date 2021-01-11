import {NgModule} from '@angular/core';
import {VideoShareComponent} from './video-share.component';
import {QRCodeModule} from "angularx-qrcode";
import {SharedMainModule} from "../main/shared-main.module";
import {SharedFormModule} from "../shared-forms/shared-form.module";
import {SharedGlobalIconModule} from "../shared-icons/shared-global-icon.module";

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
