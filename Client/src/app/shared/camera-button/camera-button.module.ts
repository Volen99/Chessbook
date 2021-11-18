import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CameraButtonComponent} from './camera-button.component';
import {NbTooltipModule} from '../../sharebook-nebular/theme/components/tooltip/tooltip.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NbButtonModule} from '../../sharebook-nebular/theme/components/button/button.module';
import {VideosDialogModule} from '../videos/videos-dialog.module';

@NgModule({
  declarations: [
    CameraButtonComponent
  ],

  imports: [
    CommonModule,
    NbTooltipModule,
    FontAwesomeModule,
    NbButtonModule,
    VideosDialogModule,
  ],

  exports: [
    CameraButtonComponent
  ],

  providers: [
  ]
})
export class CameraButtonModule {
}
