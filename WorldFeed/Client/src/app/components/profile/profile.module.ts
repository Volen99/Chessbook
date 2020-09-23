import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {ProfileComponent} from './profile.component';
import { ScreenNameComponent } from './screen-name/screen-name.component';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ProfileComponent,
    ScreenNameComponent,
  ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
      ReactiveFormsModule,
    ],
  exports: [
    ProfileComponent,
    ScreenNameComponent,
  ],
  providers: []
})
export class ProfileModule {}
