import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../core/shared-core/shared.module';
import {ViewComponent} from './view/view.component';
import { ScreenNameComponent } from './screen-name/screen-name.component';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ViewComponent,
    ScreenNameComponent,
  ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
      ReactiveFormsModule,
    ],
  exports: [
    ViewComponent,
    ScreenNameComponent,
  ],
  providers: []
})
export class ProfileModule {}
