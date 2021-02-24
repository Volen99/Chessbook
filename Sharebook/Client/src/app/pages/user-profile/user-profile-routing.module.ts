import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/*import { MetaGuard } from '@ngx-meta/core';*/
import { UserProfileComponent } from './user-profile.component';
import { FollowersComponent } from './followers/followers.component';

const accountsRoutes: Routes = [
  {
    path: '',
    component: UserProfileComponent,
    children: [
      {
        path: 'followers',
        component: FollowersComponent,
      },
    ]
  },
  // {
  //   path: 'sharebook',
  //   redirectTo: '/videos/local'
  // },
  // {
  //   path: ':accountId',
  //   component: UserProfileComponent,
  //   canActivateChild: [ MetaGuard ],
  //   children: [
  //     {
  //       path: '',
  //       redirectTo: 'video-channels',
  //       pathMatch: 'full'
  //     },
  //     {
  //       path: 'videos',
  //       component: UserProfileVideosComponent,
  //       data: {
  //         meta: {
  //           title: $localize`Account videos`
  //         },
  //         reuse: {
  //           enabled: true,
  //           key: 'users-profile-videos-list'
  //         }
  //       }
  //     },
  //     {
  //       path: 'video-channels',
  //       component: UserProfileVideoChannelsComponent,
  //       data: {
  //         meta: {
  //           title: $localize`Account video channels`
  //         }
  //       }
  //     },
  //     {
  //       path: 'about',
  //       component: UserProfileAboutComponent,
  //       data: {
  //         meta: {
  //           title: $localize`About account`
  //         }
  //       }
  //     }
  //   ]
  // }
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
