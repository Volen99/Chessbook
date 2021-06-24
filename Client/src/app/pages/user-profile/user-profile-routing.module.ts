import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserProfileComponent } from './user-profile.component';
import {FollowingComponent} from "./following/following.component";

const accountsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path : '',
        pathMatch:'full',
        component: UserProfileComponent,
        data: {
          meta: {
            title: `Home`
          }
        },
      },
      {
        path: 'following',
        component: FollowingComponent,
      },
      {
        path: 'followers',
        component: FollowingComponent,
      }
    ]
  },

];

@NgModule({
  imports: [
    RouterModule.forChild(accountsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserProfileRoutingModule {
}
