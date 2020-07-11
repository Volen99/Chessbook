import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProfileViewComponent} from '../../components/profile/view/profile-view.component';
import {ViewComponent} from '../../components/history/view/view.component';

const routes: Routes = [
  { path: '', component: ProfileViewComponent },
  // { path: 'profile', component: ProfileViewComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
