import {Routes} from '@angular/router';
import {FollowingListComponent} from './following-list/following-list.component';
import {FollowsComponent} from './follows.component';
import {UserRightGuard} from "../../core/routing/user-right-guard.service";
import {UserRight} from "../../shared/models/users/user-right.enum";
import {VideoRedundanciesListComponent} from "./video-redundancies-list/video-redundancies-list.component";
import {FollowersListComponent} from "./followers-list/followers-list.component";

export const FollowsRoutes: Routes = [
  {
    path: 'follows',
    component: FollowsComponent,
    canActivate: [UserRightGuard],
    data: {
      userRight: UserRight.MANAGE_SERVER_FOLLOW
    },
    children: [
      {
        path: '',
        redirectTo: 'following-list',
        pathMatch: 'full'
      },
      {
        path: 'following-list',
        component: FollowingListComponent,
        data: {
          meta: {
            title: $localize`Following list`
          }
        }
      },
      {
        path: 'followers-list',
        component: FollowersListComponent,
        data: {
          meta: {
            title: $localize`Followers list`
          }
        }
      },
      {
        path: 'following-add',
        redirectTo: 'following-list'
      },
      {
        path: 'video-redundancies-list.ts',
        component: VideoRedundanciesListComponent
      }
    ]
  }
];
