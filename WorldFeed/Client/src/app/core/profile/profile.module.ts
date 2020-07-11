import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileViewComponent} from '../../components/profile/view/profile-view.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    ProfileViewComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    ProfileViewComponent,
  ],
  providers: []
})
export class ProfileModule {}
