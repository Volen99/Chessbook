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

@NgModule({
  imports: [
    CommonModule,
    CustomDividerModule,
    NbCardModule,
    FontAwesomeModule,
    NbButtonModule
  ],
  declarations: [
    VideosDialogComponent,
    DialogWrapperComponent,
    DialogWrapperTitleComponent,
    DialogWrapperBodyComponent,
    DialogWrapperActionsComponent
  ],
  exports: [
    VideosDialogComponent,
    DialogWrapperComponent,
    DialogWrapperTitleComponent,
    DialogWrapperBodyComponent,
    DialogWrapperActionsComponent
  ]
})
export class VideosDialogModule {
}
