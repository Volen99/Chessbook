import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {ProfileComponent} from './profile.component';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ProfileComponent,
  ],
    imports: [
        CommonModule,
        RouterModule,
      ReactiveFormsModule,
    ],
  exports: [
    ProfileComponent,
  ],
  providers: []
})
export class ProfileModule {}
