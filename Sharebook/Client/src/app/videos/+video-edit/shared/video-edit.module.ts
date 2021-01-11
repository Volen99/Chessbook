import {CalendarModule} from 'primeng/calendar';
import {NgModule} from '@angular/core';
import {I18nPrimengCalendarService} from './i18n-primeng-calendar.service';
import {VideoCaptionAddModalComponent} from './video-caption-add-modal.component';
import {VideoEditComponent} from './video-edit.component';
import {SharedFormModule} from "../../../shared/shared-forms/shared-form.module";
import {SharedMainModule} from "../../../shared/main/shared-main.module";
import {SharedGlobalIconModule} from "../../../shared/shared-icons/shared-global-icon.module";
import {SharedVideoLiveModule} from "../../../shared/shared-video-live/shared-video-live.module";

@NgModule({
  imports: [
    CalendarModule,

    SharedMainModule,
    SharedFormModule,
    SharedGlobalIconModule,
    SharedVideoLiveModule,
  ],

  declarations: [
    VideoEditComponent,
    VideoCaptionAddModalComponent
  ],

  exports: [
    CalendarModule,

    SharedMainModule,
    SharedFormModule,
    SharedGlobalIconModule,

    VideoEditComponent
  ],

  providers: [
    I18nPrimengCalendarService
  ]
})
export class VideoEditModule {
}
