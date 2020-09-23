import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProfileComponent} from './profile.component';
import {ScreenNameComponent} from './screen-name/screen-name.component';

const routes: Routes = [
  {
    path: '', component: ProfileComponent,
    children: [
      {
        path: 'screen_name', component: ScreenNameComponent
      },
      // {
      //   path: ':id', component: xxx
      // }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class ProfileRoutingModule {
}
