import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ViewComponent} from './view/view.component';
import {ScreenNameComponent} from './screen-name/screen-name.component';

const routes: Routes = [
  {
    path: '', component: ViewComponent,
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
