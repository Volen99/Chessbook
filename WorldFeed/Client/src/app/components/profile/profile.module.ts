import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../core/shared-core/shared.module';
import {ViewComponent} from './view/view.component';


@NgModule({
  declarations: [
    ViewComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    ViewComponent,
  ],
  providers: []
})
export class ProfileModule {}
