import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VideosDialogComponent} from './videos-dialog.component';
import {NbCardModule} from '../../sharebook-nebular/theme/components/card/card.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {
  DialogWrapperActionsComponent,
  DialogWrapperBodyComponent,
  DialogWrapperComponent,
  DialogWrapperTitleComponent
} from './dialog-wrapper.component';
import {NbButtonModule} from '../../sharebook-nebular/theme/components/button/button.module';
import {CustomDividerModule} from '../custom-divider/custom-divider.module';
import { VideosDialogCrudComponent } from './video-crud/videos-dialog-crud.component';
import {NbInputModule} from '../../sharebook-nebular/theme/components/input/input.module';
import {SharedMainModule} from '../shared-main/shared-main.module';
import {YoutubeVideosService} from './youtube-videos.service';

@NgModule({
  declarations: [
    VideosDialogComponent,
    DialogWrapperComponent,
    DialogWrapperTitleComponent,
    DialogWrapperBodyComponent,
    DialogWrapperActionsComponent,
    VideosDialogCrudComponent
  ],

  imports: [
    CommonModule,
    CustomDividerModule,
    NbCardModule,
    FontAwesomeModule,
    NbButtonModule,
    NbInputModule,
    SharedMainModule
  ],

  exports: [
    VideosDialogComponent,
    DialogWrapperComponent,
    DialogWrapperTitleComponent,
    DialogWrapperBodyComponent,
    DialogWrapperActionsComponent
  ],

  providers: [
    YoutubeVideosService,
  ]
})
export class VideosDialogModule {
}
